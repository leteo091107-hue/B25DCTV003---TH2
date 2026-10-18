import { fetchBooks } from './api.js';
import { getFavorites, saveFavorites } from './storage.js';
import { createBookCard } from './dom.js';

let books = [];
let favorites = getFavorites();

const bookGrid = document.getElementById('book-grid');
const statusBar = document.getElementById('status-bar');
const searchInput = document.getElementById('search-input');
const genreSelect = document.getElementById('genre-select');
const favCountEl = document.getElementById('fav-count');
const addForm = document.getElementById('add-book-form');
const themeBtn = document.getElementById('theme-toggle');

// Khởi chạy
async function init() {
  try {
    books = await fetchBooks();
    populateGenres();
    render();
  } catch (err) {
    statusBar.textContent = '❌ Lỗi khi tải dữ liệu!';
  }
}

// Tạo danh sách thể loại động bằng Set
function populateGenres() {
  const genres = new Set(books.map(b => b.genre));
  genres.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g;
    opt.textContent = g;
    genreSelect.appendChild(opt);
  });
}

// Render dữ liệu và tìm kiếm/lọc
function render() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedGenre = genreSelect.value;

  const filtered = books.filter(b => {
    const matchName = b.title.toLowerCase().includes(query);
    const matchGenre = selectedGenre ? b.genre === selectedGenre : true;
    return matchName && matchGenre;
  });

  statusBar.textContent = `Đang hiển thị ${filtered.length} / ${books.length} cuốn`;
  favCountEl.textContent = favorites.length;

  bookGrid.innerHTML = '';
  filtered.forEach(book => {
    const isFav = favorites.includes(String(book.id));
    bookGrid.appendChild(createBookCard(book, isFav));
  });
}

// Event delegation cho nút Yêu thích & Xóa
bookGrid.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  const card = e.target.closest('.book-card');
  const bookId = card.dataset.id;

  if (action === 'fav') {
    if (favorites.includes(bookId)) {
      favorites = favorites.filter(id => id !== bookId);
    } else {
      favorites.push(bookId);
    }
    saveFavorites(favorites);
    render();
  }

  if (action === 'delete') {
    if (confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      books = books.filter(b => String(b.id) !== bookId);
      favorites = favorites.filter(id => id !== bookId);
      saveFavorites(favorites);
      render();
    }
  }
});

// Sự kiện Lọc & Tìm kiếm
searchInput.addEventListener('input', render);
genreSelect.addEventListener('change', render);

// Validate Form realtime & submit
const currentYear = new Date().getFullYear();

function validateField(name, value) {
  if (name === 'title') return value.trim().length >= 3 ? '' : 'Tên sách phải từ 3 ký tự trở lên';
  if (name === 'author') return value.trim() !== '' ? '' : 'Tác giả không được để trống';
  if (name === 'genre') return value !== '' ? '' : 'Vui lòng chọn thể loại';
  if (name === 'year') {
    const y = Number(value);
    return y >= 1900 && y <= currentYear ? '' : `Năm xuất bản phải từ 1900 đến ${currentYear}`;
  }
  return '';
}

['title', 'author', 'genre', 'year'].forEach(field => {
  const input = addForm.elements[field];
  input.addEventListener('input', () => {
    document.getElementById(`error-${field}`).textContent = validateField(field, input.value);
  });
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  ['title', 'author', 'genre', 'year'].forEach(field => {
    const input = addForm.elements[field];
    const err = validateField(field, input.value);
    document.getElementById(`error-${field}`).textContent = err;
    if (err) isValid = false;
  });

  if (isValid) {
    const newBook = {
      id: String(Date.now()),
      title: addForm.elements.title.value.trim(),
      author: addForm.elements.author.value.trim(),
      genre: addForm.elements.genre.value,
      year: Number(addForm.elements.year.value)
    };
    books.unshift(newBook); // Thêm lên đầu
    render();
    addForm.reset();
  }
});

// Chế độ sáng/tối
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

init();
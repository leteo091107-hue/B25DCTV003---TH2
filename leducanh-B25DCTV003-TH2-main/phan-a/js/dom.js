export function createBookCard(book, isFav) {
  const card = document.createElement('div');
  card.className = 'book-card';
  card.dataset.id = book.id;

  const title = document.createElement('h3');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.textContent = `Tác giả: ${book.author}`;

  const genre = document.createElement('p');
  genre.textContent = `Thể loại: ${book.genre}`;

  const year = document.createElement('p');
  year.textContent = `Năm XB: ${book.year}`;

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const btnFav = document.createElement('button');
  btnFav.className = `btn-fav ${isFav ? 'active' : ''}`;
  btnFav.dataset.action = 'fav';
  btnFav.textContent = isFav ? '❤️ Đã thích' : '🤍 Yêu thích';

  const btnDel = document.createElement('button');
  btnDel.className = 'btn-delete';
  btnDel.dataset.action = 'delete';
  btnDel.textContent = '🗑️ Xóa';

  actions.appendChild(btnFav);
  actions.appendChild(btnDel);

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(genre);
  card.appendChild(year);
  card.appendChild(actions);

  return card;
}
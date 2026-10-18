export async function fetchBooks() {
  // Thay url bằng link mockapi của bạn nếu cần: https://<your-id>.mockapi.io/books
  const res = await fetch('../books.json');
  if (!res.ok) throw new Error('Không thể tải dữ liệu sách');
  return await res.json();
}
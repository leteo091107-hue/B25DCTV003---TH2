# Bài Thực Hành 02 - Lập Trình Web

## Hướng dẫn chạy dự án
1. **Phần A (JS Thuần)**: Mở file `phan-a/index.html` thông qua Live Server trên VS Code.
2. **Phần B (React)**:
   - Chạy `cd phan-b`
   - Chạy `npm install`
   - Chạy `npm run dev`

---

## So sánh giữa Phần A (DOM thuần) và Phần B (React)

| Tiêu chí | Phần A (JavaScript thuần) | Phần B (React) |
| :--- | :--- | :--- |
| **Tư duy lập trình** | Imperative (Mệnh lệnh): Phải tự truy vấn DOM (`querySelector`), tự tạo thẻ (`createElement`), tự chèn (`appendChild`) và cập nhật thủ công. | Declarative (Khai báo): Định nghĩa UI dựa trên State. Khi State thay đổi, React tự động cập nhật lại giao diện. |
| **Quản lý dữ liệu & UI** | Phải viết hàm `render()` để xóa HTML cũ và render lại toàn bộ hoặc cập nhật từng phần tử DOM bằng tay. | Dùng `useState`. Khi state thay đổi, React dùng Virtual DOM để re-render chỉ những thành phần bị thay đổi. |
| **Cấu trúc mã nguồn** | Chia thành các file ES Module chứa các hàm xử lý logic DOM, API, Storage. | Chia thành các **Component** độc lập, dễ re-use (Header, BookCard, GenreFilter,...), truyền dữ liệu qua **props**. |
| **Độ phức tạp mở rộng** | Khi ứng dụng phình to, việc quản lý các sự kiện và đồng bộ giữa DOM và dữ liệu rất dễ phát sinh lỗi. | Dễ scale và bảo trì hơn nhờ tư duy Component hóa và Luồng dữ liệu 1 chiều (Unidirectional Data Flow). |
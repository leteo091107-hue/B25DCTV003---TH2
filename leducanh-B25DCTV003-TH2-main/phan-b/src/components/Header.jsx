export default function Header({ favCount }) {
  return (
    <header className="header">
      <h1>📚 Thư Viện Lớp Học (React)</h1>
      <div>Yêu thích: <strong>{favCount}</strong> cuốn</div>
    </header>
  );
}
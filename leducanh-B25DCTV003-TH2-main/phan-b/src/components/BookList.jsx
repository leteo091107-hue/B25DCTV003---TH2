import BookCard from './BookCard';

export default function BookList({ books, favorites, onToggleFav }) {
  return (
    <div className="book-grid">
      {books.map(book => (
        <BookCard 
          key={book.id} 
          book={book} 
          isFav={favorites.includes(book.id)} 
          onToggleFav={onToggleFav} 
        />
      ))}
    </div>
  );
}
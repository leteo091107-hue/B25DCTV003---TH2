import { useState } from 'react';
import { initialBooks } from './data/books';
import Header from './components/Header';
import Section from './components/Section';
import GenreFilter from './components/GenreFilter';
import BookList from './components/BookList';
import Footer from './components/Footer';

export default function App() {
  const [books] = useState(initialBooks);
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = Array.from(new Set(books.map(b => b.genre)));

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredBooks = selectedGenre 
    ? books.filter(b => b.genre === selectedGenre) 
    : books;

  return (
    <div className="app-container">
      <Header favCount={favorites.length} />
      
      <main className="container">
        <Section title="Danh Mục Thể Loại">
          <GenreFilter 
            genres={genres} 
            selectedGenre={selectedGenre} 
            onSelectGenre={setSelectedGenre} 
          />
        </Section>

        <Section title={`Danh Sách Sách (${filteredBooks.length})`}>
          <BookList 
            books={filteredBooks} 
            favorites={favorites} 
            onToggleFav={toggleFavorite} 
          />
        </Section>
      </main>

      <Footer />
    </div>
  );
}
import React, { useState, useEffect, useCallback } from 'react';
import './index.css'; 
import { motion } from 'framer-motion';

const bookList = [
  {
    title: "A Door in the Dark",
    author: "Scott Reintgen",
    releaseDate: "2024"
  },
  {
    title: "Children of Blood and Bone",
    author: "Tomi Adeyemi",
    releaseDate: "2018"
  },
  {
    title: "You've Reached Sam",
    author: "Dustin Thao",
    releaseDate: "2021"
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    releaseDate: "2008"
  },
  {
    title: "Begin Again",
    author: "Emma Lord",
    releaseDate: "2024"
  },
  {
    title: "Throne of Glass",
    author: "Sarah J. Maas",
    releaseDate: "2012"
  },
  {
    title: "Red Queen",
    author: "Victoria Aveyard",
    releaseDate: "2011"
  },
  {
    title: "The Awakening",
    author: "Jerold Huber",
    releaseDate: "2002"
  },
  {
    title: "Into the hollow wind",
    author: "Kolbie Parker",
    releaseDate: "2027"
  },
  {
    title: "The Bleeding Hearts",
    author: "Kolbie Parker",
    releaseDate: "2026"
  }
];


function App() {
  const [books, setBook] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  //Counts the number of books in the TBR list 
  useEffect(() => {
    setBookCount(books.length);
  }, [books]);

  // Search the books in the array and then output books that meet that search
  //Called if the API is down and searches the local Array 
  const searchOfflineBooks = () => {
    const results = bookList.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); 
    setFilteredBooks(results.length > 0 ? results : [{ title: "No results", author: "", releaseDate: "" }]);
  };

  // Search the books using the Open Library API
  //If there is an error fetching the API it calls searchOfflineBooks function
  const searchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      const results = data.docs.slice(0, 5).map(book => ({
        title: book.title,
        author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
        releaseDate: book.first_publish_year ? book.first_publish_year.toString() : 'Unknown Date'
      }));
      setFilteredBooks(results.length > 0 ? results : [{ title: "No results", author: "", releaseDate: "" }]);
    } catch (error) {
      console.error("Error fetching data from Open Library API:", error);
      searchOfflineBooks();
    } finally {
      setIsLoading(false);
    }
  };

  //Clear the books that were returned from the search result 
  const clearResults = () => {
    setFilteredBooks([]);
    setSearchQuery("");
  };

  //Delete book from TBR list 
  const handleDeleteBook = (id) => {
    setBook(books.filter((todo) => todo.id !== id));
  };

  //Goes through the books state and updates the completed status of the book 
  const handleToggleCompleted = (id) => {
    setBook(
      books.map((book) => {
        if (book.id === id) {
          return { ...book, completed: !book.completed };
        } else {
          return book;
        }
      })
    );
  };

  //This adds a book to the TBR section from the search section
  //Updated so that a book can only be added once
  const addtoList = (book) => {
    const isBookInList = books.some(b => b.text === `${book.title} by ${book.author} (${book.releaseDate})`);
    if (!isBookInList) {
      setBook([...books, { id: Date.now(), text: `${book.title} by ${book.author} (${book.releaseDate})`, completed: false }]);
    }
  };

  return (
    <div>
      <h1>Book Bound</h1>
      <h2>Search</h2>
      <p className='info'>Your adventure in finding the next great read starts here. Search for your favorite books, discover new ones, and embark on a literary journey with us!</p>
      
      <div>
        <input
          type="text"
          id="searchInput"
          placeholder="Enter Book Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
        <button onClick={clearResults}>Clear</button>
        <div id="results">
        {isLoading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              style={{ margin: '20px auto', width: '50px', height: '50px', border: '5px solid #c5b5e3', borderTop: '5px solid #6a0dad', borderRadius: '50%' }}
            />
          )}
          {filteredBooks.map((book, index) => (
            <div className="book" key={index}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Publish Date:</strong> {book.releaseDate}</p>
              <button onClick={() => addtoList(book)}>Add to List</button>
            </div>
          ))}
        </div>
      </div>

      <h2>Books on Deck</h2>
      <p className='info'>Organize the books you can't wait to read! Add to your TBR (To Be Read) list and embark on endless journeys through the pages of great stories. Let's get reading!</p>
      <p className='count'>How many books in your list: {bookCount}</p> 
      
      <ul className='onDeck'>
        {books.map((book) => (
          <li className='onDecklist' key={book.id}>
            <input
              type="checkbox"
              checked={book.completed}
              onChange={() => handleToggleCompleted(book.id)}
            />
            <span style={{ textDecoration: book.completed ? "line-through" : "none" }}>
              {book.text}
            </span>
            <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
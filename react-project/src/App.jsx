import React, { useState, useEffect } from 'react';
import './index.css'; 

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
  const [newBook, setNewBook] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);

  //Counts the number of books in the TBR list 
  useEffect(() => {
    setBookCount(books.length);
  }, [books]);

  // Search the books in the array and then output books that meet that search
  const searchBooks = () => {
    const results = bookList.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5); // Limit results to the first 5 books
    setFilteredBooks(results.length > 0 ? results : [{ title: "No results", author: "", releaseDate: "" }]);
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

  //This function makes it so that you can add a book directly to TBR... I have disabled this function
  const handleSubmit = (event) => {
    event.preventDefault();
    setBook([...books, { id: Date.now(), text: newBook, completed: false }]);
    setNewBook("");
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
  const addtoList = (book) => {
    setBook([...books, { id: Date.now(), text: `${book.title} by ${book.author} (${book.releaseDate})`, completed: false }]);
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
      {/* Book on Deck. Maybe make it so the only way you can add a book is through searching up the book then clicking add and then you can only strike through and delete books in this section */}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newBook}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button type="submit">Add To Do</button>
      </form> */}
      <ul>
        {books.map((book) => (
          <li key={book.id}>
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
import React, { useState } from 'react';

const bookList = [
  {
    title: "A Door in the Dark",
    author: "Scott Reintgen",
    releaseDate: "2024-03-05"
  },
  {
    title: "Children of Blood and Bone",
    author: "Tomi Adeyemi",
    releaseDate: "2018-03-06"
  },
  {
    title: "You've Reached Sam",
    author: "Dustin Thao",
    releaseDate: "2021-11-09"
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    releaseDate: "2008-09-14"
  },
  {
    title: "Begin Again",
    author: "Emma Lord",
    releaseDate: "2024-01-09"
  }
];

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Search the books in the array and then output books that meet that search
  const searchBooks = () => {
    const results = bookList.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(results);
  };

  const clearResults = () => {
    setFilteredBooks([]);
    setSearchQuery("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div>
      <h1>Book Bound</h1>
      <h2>Search</h2>
      <p>Your adventure in finding the next great read starts here. Search for your favorite books, discover new ones, and embark on a literary journey with us!</p>
      <input
        type="text"
        id="searchInput"
        placeholder="Enter book title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>
      <button onClick={clearResults}>Clear</button>
      <div id="results">
        {filteredBooks.map((book, index) => (
          <div key={index}>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publish Date:</strong> {book.releaseDate}</p>
          </div>
        ))}
      </div>
      

      <h2>Books on Deck</h2>
      <p>Organize the books you can't wait to read! Add to your TBR (To Be Read) list and embark on endless journeys through the pages of great stories. Let's get reading!</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button type="submit">Add To Do</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
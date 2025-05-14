import { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Search({ user, onSave, query, setQuery, books, setBooks }) {
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  // Save favorite book to backend
  const saveFavorite = async (book) => {
    if (!user || !user.uid) {
      alert("Please log in to save favorites.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/favorites`, {
        user_id: user.uid,
        book_id: book.id,
        title: book.title,
        authors: book.authors,
        thumbnail: book.thumbnail,
      });
      toast.success("✅ Book saved!");
      onSave?.();
    } catch (err) {
      console.error("❌ Failed to save favorite:", err);

      if (err.response?.status === 409) {
        toast("📚 You've already saved this book.", { icon: "⚠️" });
      } else {
        toast.error("Failed to save favorite.");
      }
    }
  };

  const clearSearch = () => {
    setQuery('');
    setBooks([]);
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("searchResults");
  };

  const searchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
      );
      setBooks(res.data.items || []);
    } catch {
      toast.error("❌ Error fetching books");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded">
      {/* Animated Input + Button Area */}
      <div
        className="flex gap-2 mb-6 animate-fade-in"
        style={{ animationDelay: "100ms" }}
      >
        <input
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded shadow focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-800 transition bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
            searchBooks();
           }
          }}
        />
        <button
          className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-600 dark:hover:bg-blue-800 transition"
          onClick={searchBooks}
        >
          Search
        </button>
        {books.length > 0 && (
          <button
            onClick={clearSearch}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Clear
          </button>
        )}
      </div>
      {/* Loading and Empty States */}
      {loading && <p className="text-center text-gray-500 dark:text-gray-400">Loading books...</p>}
      {!loading && books.length === 0 && (
        <p className="text-center text-gray-400 dark:text-gray-500">Start searching for books...</p>
      )}

      <div className="grid gap-4">
        {!loading && books.map((book, index) => {
          const info = book.volumeInfo;

          return (
            <div
              key={book.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded shadow-md flex gap-4 bg-white dark:bg-gray-800 animate-fade-in transition transform hover:scale-[1.02] duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/book/${book.id}`}>
                <img
                  src={info.imageLinks?.thumbnail}
                  alt={info.title}
                  className="w-24 h-32 object-cover bg-gray-100 dark:bg-gray-700 rounded shadow cursor-pointer hover:scale-105 transition"
                />
              </Link>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{info.title}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {info.authors?.join(', ') || 'Unknown Author'}
                </p>
                <button
                  onClick={() =>
                    saveFavorite({
                      id: book.id,
                      title: info.title,
                      authors: info.authors?.join(", "),
                      thumbnail: info.imageLinks?.thumbnail,
                    })
                  }
                  className="mt-2 px-3 py-1 bg-green-500 dark:bg-green-700 text-white text-sm rounded hover:bg-green-600 dark:hover:bg-green-800 transition"
                >
                  ❤️ Save to Favorites
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
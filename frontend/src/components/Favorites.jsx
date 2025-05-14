import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Favorites({ user, refresh }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchFavorites = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/favorites/${user.uid}`);
      setFavorites(res.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  }, [user.uid]);

  const deleteFavorite = async (id) => {
    setDeletingId(id);

    setTimeout(async () => {
      try {
        await axios.delete(`${API_BASE}/favorites/${id}`);
        setFavorites((prev) => prev.filter((book) => book.id !== id));
        toast.success("✅ Removed from favorites.");
      } catch (error) {
        console.error("Error deleting favorite:", error);
        toast.error("❌ Failed to delete.");
      } finally {
        setDeletingId(null);
      }
    }, 400);
  };

  useEffect(() => {
    fetchFavorites();
  }, [refresh, fetchFavorites]);

  if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading favorites...</p>;
  if (favorites.length === 0) return <p className="text-center text-gray-400 dark:text-gray-500">No favorites yet.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">❤️ My Favorites</h2>
      <div className="grid gap-4">
        {favorites.map((book, index) => (
          <div
            key={book.id}
            className={`p-4 border rounded shadow-md bg-white dark:bg-gray-800 flex items-center justify-between transition-all duration-300 ${
              deletingId === book.id ? 'animate-fade-out' : 'animate-fade-in'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link
              to={`/book/${book.book_id}`}
              className="flex gap-4 items-center w-full hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={book.thumbnail || "/no-cover.png"}
                alt={book.title}
                className="w-20 h-28 object-cover rounded shadow-sm"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{book.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{book.authors}</p>
              </div>
            </Link>
            <button
              onClick={() => deleteFavorite(book.id)}
              className="bg-red-500 dark:bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-800 transition ml-4"
              disabled={deletingId === book.id}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
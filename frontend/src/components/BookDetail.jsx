import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { auth } from '../firebase';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
      setBook(res.data);

      const categories = res.data.volumeInfo.categories;
      if (categories && categories.length > 0) {
        const cat = encodeURIComponent(categories[0]);
        const relatedRes = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${cat}&maxResults=6`
        );
        setRelatedBooks(
          relatedRes.data.items
            ? relatedRes.data.items.filter((b) => b.id !== id)
            : []
        );
      } else {
        setRelatedBooks([]);
      }
    };
    fetchBook();
  }, [id]);

  
  const saveFavorite = async () => {
    const user = auth.currentUser;

    if (!user || !user.uid) {
      toast.error("❌ Please log in to save favorites.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/favorites`, {
        user_id: user.uid,
        book_id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors?.join(", "),
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      });

      toast.success("✅ Book saved to favorites!");
      setSaved(true);
    } catch (err) {
      if (err.response?.status === 409) {
        toast("📚 You've already saved this book.", {
          icon: "⚠️",
        });
      } else {
        toast.error("❌ Failed to save favorite.");
        console.error("Save error:", err);
      }
    }
  };

  if (!book) return <p className="text-center mt-10 text-gray-500">Loading book...</p>;

  const info = book.volumeInfo;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/" className="text-blue-500 hover:underline mb-6 block">
        ← Back to Home
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs w-full flex flex-col items-center">
            <img
              src={info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || "/no-cover.png"}
              alt={info.title}
              style={{ width: '300px', height: '440px' }}
              className="object-cover rounded mb-2 shadow"
              onError={e => { e.target.onerror = null; e.target.src = "/no-cover.png"; }}
            />
            <button
              onClick={saveFavorite}
              disabled={saved}
              className={`mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition ${
                saved ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {saved ? "Saved to Favorites" : "❤️ Save to Favorites"}
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">{info.title}</h2>
          <p className="text-md text-gray-600 dark:text-gray-300 mb-6">
            {info.authors?.join(', ') || 'Unknown Author'}
          </p>
          {/* Enhanced Description Block */}
          <div className="mt-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner border dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              📖 Description
            </h3>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {info.description ? (
                info.description
              ) : (
                <span className="text-gray-500">No description available for this book.</span>
              )}
            </p>
          </div>
          {/* End Enhanced Description Block */}
          {info.categories && (
            <div className="mt-4">
              <span className="font-semibold text-gray-700 dark:text-gray-200">Categories: </span>
              <span className="text-gray-600 dark:text-gray-400">{info.categories.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Related Books Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Related Books
        </h3>
        {relatedBooks.length === 0 ? (
          <p className="text-gray-500">No related books found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {relatedBooks.map((b) => {
              const r = b.volumeInfo;
              return (
                <Link
                  to={`/book/${b.id}`}
                  key={b.id}
                  className="group relative flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-0 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105"
                  style={{ minHeight: 260 }}
                >
                  <div className="w-full flex justify-center">
                    <img
                      src={r.imageLinks?.thumbnail || "/no-cover.png"}
                      alt={r.title}
                      className="w-24 h-36 object-cover rounded-lg shadow-md border-2 border-white group-hover:border-blue-400 transition"
                      onError={e => { e.target.onerror = null; e.target.src = "/no-cover.png"; }}
                    />
                  </div>
                  <div className="mt-4 text-center w-full">
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-100 truncate">
                      {r.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {r.authors?.join(', ') || 'Unknown'}
                    </p>
                  </div>
                  <span className="absolute top-2 right-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
                    View
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
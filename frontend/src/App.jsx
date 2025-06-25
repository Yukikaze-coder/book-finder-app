import Search from './components/Search';
import Favorites from './components/Favorites';
import Login from './components/Login';
import BookDetail from './components/BookDetail.jsx';
import Footer from './components/Footer'; 
import { auth } from './firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  const [user, setUser] = useState(null);
  const [refreshFavorites, setRefreshFavorites] = useState(false);
  const [tab, setTab] = useState("search");

  // Load saved state on first load
  const [query, setQuery] = useState(() => localStorage.getItem("searchQuery") || "");
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem("searchResults");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  // localStorage
  useEffect(() => {
    localStorage.setItem("searchQuery", query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("searchResults", JSON.stringify(books));
  }, [books]);

  const handleLogout = () => signOut(auth);

  const triggerRefresh = () => {
    setRefreshFavorites((prev) => !prev);
  };

  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="relative z-10 p-6 bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
          <div className="flex justify-center items-center mb-6">
            <h1 className="text-2xl font-bold text-center flex-1 ml-8">📚 Book Finder ©</h1>

          </div>

          <div className="flex justify-center mb-6">
            {user ? (
              <div className="flex items-center" style={{ gap: "8rem" }}>
                <img
                  src={user.photoURL || "/default-avatar.jpg"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700"
                />
                <span>{user.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 dark:bg-red-700 text-white px-4 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Login />
            )}
          </div>

          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <>
                    
                    <div className="flex justify-center mb-6 gap-4">
                      <button
                        onClick={() => setTab("search")}
                        className={`px-4 py-2 rounded transition-colors ${
                          tab === "search"
                            ? "bg-blue-600 dark:bg-blue-800 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        🔍 Search
                      </button>
                      <button
                        onClick={() => setTab("favorites")}
                        className={`px-4 py-2 rounded transition-colors ${
                          tab === "favorites"
                            ? "bg-blue-600 dark:bg-blue-800 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                        }`}
                      >
                        ❤️ Favorites
                      </button>
                    </div>

                  
                    <div className="animate-fade-in">
                      {tab === "search" && (
                        <Search
                          user={user}
                          onSave={triggerRefresh}
                          query={query}
                          setQuery={setQuery}
                          books={books}
                          setBooks={setBooks}
                        />
                      )}
                      {tab === "favorites" && (
                        <Favorites user={user} refresh={refreshFavorites} />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="mb-4">Please log in to use the app.</p>
                    <p className="mb-4">アプリを使用するにはログインしてください。</p>
                    <img
                      src="/banner.webp"
                      alt="Book Finder Banner"
                      className="mx-auto mb-8 rounded shadow-lg max-w-full h-auto"
                    />
                    
                  </div>
                )
              }
            />
            <Route path="/book/:id" element={<BookDetail user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer outer /> 
      </div>
    </Router>
  );
}

export default App;
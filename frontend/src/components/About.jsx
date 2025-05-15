import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 rounded-lg overflow-hidden">
      <Link to="/" className="text-blue-500 hover:underline block mb-6 text-center">
        ← 🏡 Home
      </Link>

      <div className="mb-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">About Book Finder</h1>
        <p className="text-5xl leading-relaxed text-blue-600">
          Book Finder is a full-stack web app that helps you search, save, and explore books using the Google Books API. It's designed for book lovers who want a modern, beautiful experience.
        </p>
        <p className="text-5xl leading-relaxed text-blue-600">
          Book Finderは、Google Books APIを使って書籍を検索、保存、閲覧できるフルスタックのウェブアプリです。モダンで美しい体験を求める読書愛好家のために設計されています。 
        </p>
      </div>

      <div className="w-3/4 h-80 rounded-lg shadow-lg overflow-hidden mx-auto">
        <img
          src="/About.jpg"
          alt="About Book Finder"
          className="w-1000 h-1000 object-cover" 
        />
      </div>
    </div>
  );
}
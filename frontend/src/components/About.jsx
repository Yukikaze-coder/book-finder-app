import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 rounded-lg overflow-hidden">
      <Link to="/" className="text-blue-500 hover:underline block mb-6">
        ← Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">About Book Finder</h1>
        <p className="text-5xl leading-relaxed text-blue-600">
          Book Finder is a full-stack web app that helps you search, save, and explore books using the Google Books API. It's designed for book lovers who want a modern, beautiful experience.
          Book Finderは、Google Books APIを使って書籍を検索、保存、閲覧できるフルスタックのウェブアプリです。モダンで美しい体験を求める読書愛好家のために設計されています。 
        </p>
      </div>

      <div className="w-full h-80 rounded-lg shadow-lg overflow-hidden">
        <img
          src="/About.jpg"
          alt="About Book Finder"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
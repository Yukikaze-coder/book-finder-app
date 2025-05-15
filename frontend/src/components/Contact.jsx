import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 rounded-lg overflow-hidden">
      <Link to="/" className="text-blue-500 hover:underline block mb-6 text-center">
        ← 🏡 Home
      </Link>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-2xl leading-relaxed text-blue-600">
          Have feedback or ideas? Reach out via social media or email us at{" "}
          <a href="mailto:hello@bookfinder.com" className="text-blue-500 underline">
            contact@bookfinder.com
          </a>.
        </p>
        <p className="text-2xl leading-relaxed text-blue-600">
          フィードバックやアイデアがあれば、ソーシャルメディアでご連絡いただくか、メールでお知らせください。{" "}
          <a href="mailto:hello@bookfinder.com" className="text-blue-500 underline">
            contact@bookfinder.com
          </a>.
        </p>
      </div>

      <div className="w-3/4 h-40 rounded-lg shadow-lg overflow-hidden mx-auto">
        <img
          src="/Contact.jpg"
          alt="Contact Book Finder"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
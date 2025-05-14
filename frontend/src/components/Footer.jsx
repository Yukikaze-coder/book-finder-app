import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-gray-950 text-white overflow-hidden">
      {/* animated blurred background bubbles */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="w-[400px] h-[400px] bg-pink-500 opacity-30 blur-3xl rounded-full animate-ping absolute top-10 left-1/4"></div>
        <div className="w-[300px] h-[300px] bg-indigo-500 opacity-20 blur-2xl rounded-full animate-pulse absolute top-20 right-1/4"></div>
      </div>

      {/* main footer content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <span className="animate-bounce">📚</span> Book Finder Code Chrysalis 2025
          </h2>
          <p className="text-sm text-gray-300 mt-1">Discover and save your favorite books.</p>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-12 text-base font-medium mt-6">
        <Link to="/about" className="hover:text-blue-400 transition">About</Link>
        <Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center flex-wrap gap-20 text-3xl mt-4">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook">
        <FaFacebookF className="hover:text-blue-400 transition" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
        <FaInstagram className="hover:text-pink-400 transition" />
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noreferrer" title="TikTok">
        <FaTiktok className="hover:text-white transition" />
        </a>
        <a href="https://x.com" target="_blank" rel="noreferrer" title="X">
        <FaXTwitter className="hover:text-gray-300 transition" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube">
        <FaYoutube className="hover:text-red-400 transition" />
        </a>
       </div>

      </div>
    </footer>
  );
}

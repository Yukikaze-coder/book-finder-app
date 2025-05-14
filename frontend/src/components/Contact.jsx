import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200 rounded-lg overflow-hidden">
      <Link to="/" className="text-blue-500 hover:underline block mb-6">
        ← Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-2xl leading-relaxed text-blue-600">
          Have feedback or ideas? Reach out via social media or email us at{" "}. ご意見やご提案がございましたら、ソーシャルメディアまたはメールでお問い合わせください。
          <a href="mailto:hello@bookfinder.com" className="text-blue-500 underline">
            contact@bookfinder.com
          </a>.
        </p>
      </div>

      <div className="w-full h-80 rounded-lg shadow-lg overflow-hidden">
        <img
          src="/Contact.jpg"
          alt="Contact Book Finder"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
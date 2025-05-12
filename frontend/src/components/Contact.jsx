import { Link } from "react-router-dom";


export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
        <Link to="/" className="text-blue-500 hover:underline block mb-6">
        ← Back to Home
        </Link>

      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg">Have feedback or ideas? Reach out via social media or email us at <a href="mailto:hello@bookfinder.com" className="text-blue-500 underline">hello@bookfinder.com</a>.</p>
    </div>
  );
}

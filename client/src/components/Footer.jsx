import { FaLeaf } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-2">
          <FaLeaf className="text-green-500 text-2xl" />
          <h2 className="text-2xl font-bold">AyurVeda AI</h2>
        </div>

        <p className="mt-4 text-gray-400">
          Personalized Ayurvedic Nutrition powered by AI.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          © 2026 AyurVeda AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
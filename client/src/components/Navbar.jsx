import { FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]">

      <div className="flex items-center justify-between px-6 md:px-8 py-4">

        <Link to="/" className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-green-500/15 border border-green-400/20 flex items-center justify-center shadow-[0_0_20px_rgba(74,222,128,0.25)]">
            <FaLeaf className="text-green-400 text-2xl" />
          </div>

          <div>

            <h1 className="text-2xl font-bold text-green-400 drop-shadow-[0_0_12px_rgba(74,222,128,0.8)]">
              AyurVeda AI
            </h1>

            <p className="text-xs text-gray-300 -mt-1">
              Smart Ayurvedic Wellness
            </p>

          </div>

        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-200">

          <Link to="/" className="hover:text-green-400 transition-colors duration-200">
            Home
          </Link>

          <a href="#features" className="hover:text-green-400 transition-colors duration-200">
            Features
          </a>

          <a href="#about" className="hover:text-green-400 transition-colors duration-200">
            About
          </a>

          <Link to="/bmi" className="hover:text-green-400 transition-colors duration-200">
            BMI
          </Link>

          <Link to="/dosha" className="hover:text-green-400 transition-colors duration-200">
            Dosha
          </Link>

          <Link to="/dashboard" className="hover:text-green-400 transition-colors duration-200">
            Dashboard
          </Link>

          <Link to="/aichat" className="hover:text-green-400 transition-colors duration-200">
            AI Chat
          </Link>

        </div>

        <div className="flex items-center gap-3">

          <Link
            to="/dashboard"
            className="hidden md:inline-flex px-4 py-2 rounded-full border border-green-500/30 text-green-300 hover:bg-green-500/10 transition-all duration-200 text-sm font-medium"
          >
            Live Demo
          </Link>

          <Link
            to="/bmi"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:from-green-400 hover:to-green-600 transition-all duration-200 hover:scale-105"
          >
            Get Started
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
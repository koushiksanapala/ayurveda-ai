import { Link } from 'react-router-dom';

function FloatingAIButton() {
  return (
    <Link
      to="/aichat"
      className="fixed bottom-6 right-6 z-50 group"
    >

      <div className="absolute inset-0 rounded-full bg-green-400 blur-xl opacity-40 group-hover:opacity-70 transition"></div>

      <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white flex items-center justify-center text-2xl shadow-[0_10px_30px_rgba(34,197,94,0.45)] hover:scale-110 transition-transform duration-200">
        🤖
      </div>

    </Link>
  );
}

export default FloatingAIButton;
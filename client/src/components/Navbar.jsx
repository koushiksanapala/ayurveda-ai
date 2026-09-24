import { FaLeaf } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'AI Chat', path: '/aichat' },
    { name: 'Voice AI', path: '/voice-ai' },
    { name: 'Food Scanner', path: '/food-scanner' },
    { name: 'BMI', path: '/bmi' },
    { name: 'Dosha', path: '/dosha' },
  ];

  const isActive = (path) => location.pathname === path;

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="fixed left-1/2 top-4 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-2xl border border-white/10 bg-[#101512]/95 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">

      <div className="flex items-center justify-between px-3 py-3 md:px-5 md:py-4">

        {/* LEFT SIDE */}

        <div className="flex min-w-0 items-center gap-3">

          {/* BACK */}

          {!isHome && (
            <button
              onClick={goBack}
              title="Go back"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-700 bg-gray-900 text-lg text-gray-300 transition hover:border-green-500/40 hover:bg-green-500/10 hover:text-green-400"
            >
              ←
            </button>
          )}

          {/* LOGO */}

          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10">
              <FaLeaf className="text-xl text-green-400" />
            </div>

            <div className="hidden sm:block">

              <h1 className="text-xl font-bold text-green-400">
                AyurVeda AI
              </h1>

              <p className="text-[10px] text-gray-500">
                Smart Ayurvedic Wellness
              </p>

            </div>

          </Link>

        </div>


        {/* DESKTOP NAVIGATION */}

        <div className="hidden items-center gap-1 lg:flex">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                isActive(item.path)
                  ? 'bg-green-500/10 text-green-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}

        </div>


        {/* RIGHT SIDE */}

        <div className="flex items-center gap-2">

          <Link
            to="/dashboard"
            className="hidden rounded-full border border-green-500/20 px-4 py-2 text-sm font-medium text-green-400 transition hover:bg-green-500/10 sm:inline-flex"
          >
            Dashboard
          </Link>

          <Link
            to="/aichat"
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-green-500 hover:scale-105"
          >
            AI Chat
          </Link>

        </div>

      </div>


      {/* MOBILE NAVIGATION */}

      <div className="flex gap-1 overflow-x-auto border-t border-white/5 px-3 py-2 lg:hidden">

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              isActive(item.path)
                ? 'bg-green-500/10 text-green-400'
                : 'text-gray-500 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            {item.name}
          </Link>
        ))}

      </div>

    </nav>
  );
}

export default Navbar;
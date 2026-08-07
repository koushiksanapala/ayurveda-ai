import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100 pt-24">

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-lime-200 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_55%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-5xl mx-auto text-center px-6"
      >

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 text-sm font-medium mb-6 shadow-sm">
          🌿 AI-Powered Ayurvedic Wellness
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">

          Discover Your Perfect Balance with{' '}

          <span className="text-green-600 drop-shadow-[0_0_12px_rgba(22,163,74,0.45)]">
            AI
          </span>

        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 leading-8 max-w-3xl mx-auto">
          Calculate BMI, identify your Ayurvedic Dosha, receive personalized diet recommendations,
          chat with an AI wellness assistant, and experience voice-based health guidance —
          all in one smart wellness platform.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">

          <Link
            to="/bmi"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-[0_10px_30px_rgba(34,197,94,0.35)] hover:from-green-400 hover:to-green-600 transition-all duration-200 hover:scale-105"
          >
            🚀 Get Started
          </Link>

          <a
            href="#about"
            className="px-8 py-4 rounded-2xl border border-green-500/20 bg-white/70 backdrop-blur text-green-700 font-semibold hover:bg-white transition-all duration-200 shadow-sm"
          >
            📖 Learn More
          </a>

        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">

          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            <div className="text-4xl mb-3">📊</div>

            <h3 className="text-xl font-bold text-gray-900">BMI Analysis</h3>

            <p className="mt-2 text-gray-600">
              Instant BMI calculation with health insights.
            </p>

          </div>

          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            <div className="text-4xl mb-3">🌿</div>

            <h3 className="text-xl font-bold text-gray-900">Dosha Detection</h3>

            <p className="mt-2 text-gray-600">
              Discover your Vata, Pitta, or Kapha constitution.
            </p>

          </div>

          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            <div className="text-4xl mb-3">🤖</div>

            <h3 className="text-xl font-bold text-gray-900">AI Wellness</h3>

            <p className="mt-2 text-gray-600">
              Personalized health guidance powered by AI.
            </p>

          </div>

        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3 text-sm text-gray-600">

          <div className="px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-green-100">
            🧘 Ayurveda
          </div>

          <div className="px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-green-100">
            🎤 Voice AI
          </div>

          <div className="px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-green-100">
            🍎 Nutrition
          </div>

          <div className="px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-green-100">
            ⚡ Real-time AI
          </div>

        </div>

      </motion.div>

    </section>
  );
}

export default Hero;
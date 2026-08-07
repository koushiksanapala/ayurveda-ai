import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import Footer from '../components/Footer';
import FloatingAIButton from '../components/FloatingAIButton';

function Landing() {
  return (
    <>

      <Navbar />

      <Hero />

      <section id="features">
        <Features />
      </section>

      <Stats />

      <section
        id="about"
        className="py-24 px-6 md:px-12 bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white"
      >

        <div className="max-w-6xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-medium mb-6">
            🌿 About Our Project
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-green-400 mb-6 drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]">
            About AyurVeda AI
          </h2>

          <p className="text-lg md:text-xl text-gray-300 leading-8 max-w-4xl mx-auto">
            AyurVeda AI is an intelligent wellness platform that combines traditional
            Ayurvedic principles with modern Artificial Intelligence. It helps users
            understand their body type, calculate BMI, receive personalized diet
            recommendations, interact with an AI health assistant, and use voice-based
            wellness guidance for a healthier lifestyle.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-14">

            <div className="bg-gray-900/80 border border-green-500/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_70px_rgba(34,197,94,0.15)] transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-3xl mb-5">
                🌿
              </div>
              <h3 className="text-2xl font-bold text-green-300 mb-3">Ayurveda</h3>
              <p className="text-gray-300 leading-7">
                Personalized wellness recommendations based on Vata, Pitta, and Kapha doshas.
              </p>
            </div>

            <div className="bg-gray-900/80 border border-green-500/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_70px_rgba(34,197,94,0.15)] transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-3xl mb-5">
                🤖
              </div>
              <h3 className="text-2xl font-bold text-green-300 mb-3">AI Assistant</h3>
              <p className="text-gray-300 leading-7">
                Instant health guidance powered by local AI models using Ollama technology.
              </p>
            </div>

            <div className="bg-gray-900/80 border border-green-500/20 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_70px_rgba(34,197,94,0.15)] transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-3xl mb-5">
                🎤
              </div>
              <h3 className="text-2xl font-bold text-green-300 mb-3">Voice AI</h3>
              <p className="text-gray-300 leading-7">
                Speak naturally and receive spoken Ayurvedic wellness responses in real time.
              </p>
            </div>

          </div>

        </div>

      </section>

      <FloatingAIButton />

      <Footer />

    </>
  );
}

export default Landing;
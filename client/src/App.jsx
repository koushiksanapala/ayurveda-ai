import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Landing from "./pages/Landing";
import BMI from "./pages/BMI";
import Dosha from "./pages/Dosha";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";

import VoiceAssistant from "./components/VoiceAssistant";
import FoodScanner from "./components/FoodScanner";


/* =====================================================
   BACK BUTTON
===================================================== */

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={goBack}
        className="inline-flex items-center gap-2 rounded-xl border border-green-500/20 bg-gray-900 px-4 py-2.5 text-sm font-semibold text-gray-300 shadow-lg transition hover:border-green-400/40 hover:bg-gray-800 hover:text-green-300"
      >
        ← Back
      </button>
    </div>
  );
}


/* =====================================================
   FEATURE PAGE
===================================================== */

function FeaturePage({
  title,
  icon,
  description,
  children,
}) {
  return (
    <div className="min-h-screen bg-[#07110d] px-4 pb-16 pt-24 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-7xl">

        <BackButton />

        {/* PAGE HEADER */}

        <div className="mb-7 rounded-[26px] border border-green-500/15 bg-gray-900/80 p-6 shadow-xl sm:p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500/10 text-3xl">
              {icon}
            </div>

            <div>

              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {title}
              </h1>

              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                {description}
              </p>

            </div>

          </div>

        </div>

        {children}

      </div>

    </div>
  );
}


/* =====================================================
   NORMAL PAGE WITH BACK
===================================================== */

function PageWithBack({ children }) {
  return (
    <div className="min-h-screen bg-[#07110d] px-4 pb-16 pt-24 text-white sm:px-6 md:px-10">

      <div className="mx-auto max-w-7xl">

        <BackButton />

        {children}

      </div>

    </div>
  );
}


/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Landing />}
        />


        {/* BMI */}

        <Route
          path="/bmi"
          element={
            <PageWithBack>
              <BMI />
            </PageWithBack>
          }
        />


        {/* DOSHA */}

        <Route
          path="/dosha"
          element={
            <PageWithBack>
              <Dosha />
            </PageWithBack>
          }
        />


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <PageWithBack>
              <Dashboard />
            </PageWithBack>
          }
        />


        {/* AI CHAT */}

        <Route
          path="/aichat"
          element={
            <PageWithBack>
              <AIChat />
            </PageWithBack>
          }
        />


        {/* VOICE AI */}

        <Route
          path="/voice-ai"
          element={
            <FeaturePage
              title="Voice AI"
              icon="🎙️"
              description="Speak naturally with your AyurVeda AI wellness assistant."
            >
              <VoiceAssistant />
            </FeaturePage>
          }
        />


        {/* FOOD SCANNER */}

        <Route
          path="/food-scanner"
          element={
            <FeaturePage
              title="Food Scanner"
              icon="🍎"
              description="Analyze food and explore its nutritional and Ayurvedic benefits."
            >
              <FoodScanner />
            </FeaturePage>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

import ChatBot from '../components/ChatBot';
import VoiceAssistant from '../components/VoiceAssistant';
import FoodScanner from '../components/FoodScanner';

function Dashboard() {
  const { state } = useLocation();

  const data = state || {
    name: 'Koushik',
    age: 20,
    gender: 'Male',
    height: 170,
    weight: 60,
    bmi: 20.8,
    bmiStatus: 'Healthy',
    dosha: 'Kapha',
  };

  const calories =
    data.gender === 'Male'
      ? Math.round(data.weight * 30)
      : Math.round(data.weight * 28);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? 'Good Morning ☀️'
      : hour < 18
      ? 'Good Afternoon 🌤️'
      : 'Good Evening 🌙';

  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('AyurVeda AI Health Report', 20, 20);

    doc.setFontSize(14);
    doc.text(`Name: ${data.name}`, 20, 40);
    doc.text(`Age: ${data.age}`, 20, 50);
    doc.text(`Gender: ${data.gender}`, 20, 60);
    doc.text(`Height: ${data.height} cm`, 20, 70);
    doc.text(`Weight: ${data.weight} kg`, 20, 80);

    doc.text(`BMI: ${data.bmi}`, 20, 100);
    doc.text(`BMI Status: ${data.bmiStatus}`, 20, 110);

    doc.text(`Dominant Dosha: ${data.dosha}`, 20, 130);

    doc.text(`Daily Calories: ${calories}`, 20, 150);

    doc.text('Health Tips:', 20, 170);
    doc.text('- Drink 2-3L water daily', 30, 180);
    doc.text('- Walk 30 minutes daily', 30, 190);
    doc.text('- Sleep 7-8 hours', 30, 200);

    doc.save('AyurVeda_AI_Report.pdf');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-6 md:p-8 pt-28"
    >

      <div className="text-center mb-10">

        <h1 className="text-4xl md:text-5xl font-extrabold text-green-400">
          🌿 AyurVeda AI Dashboard
        </h1>

        <p className="mt-4 text-2xl font-semibold text-green-300">
          {greeting}, {data.name}
        </p>

        <p className="text-gray-400 mt-2 text-lg">
          {new Date().toLocaleString()}
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={downloadReport}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-lg hover:scale-105 transition-all"
          >
            📄 Download Health Report
          </button>
        </div>

      </div>

      <div className="max-w-3xl mx-auto mb-10 bg-gray-900/80 border border-green-500/20 rounded-3xl p-6 shadow-2xl">

        <div className="flex items-center justify-between mb-3">

          <h2 className="text-2xl font-bold text-green-300">
            🌟 Today's Wellness Score
          </h2>

          <span className="text-green-400 font-bold text-xl">88 / 100</span>

        </div>

        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">

          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
            style={{ width: '88%' }}
          ></div>

        </div>

        <p className="text-gray-300 mt-4 text-center">
          Excellent balance today 🌿 Keep maintaining your healthy lifestyle.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-gray-900/80 border border-green-500/20 rounded-3xl p-6 shadow-2xl text-center">

          <div className="text-4xl mb-3">📊</div>

          <h2 className="text-xl font-bold text-green-300">BMI</h2>

          <div className="text-5xl font-extrabold mt-3">{data.bmi}</div>

          <p className="text-gray-300 mt-2">{data.bmiStatus}</p>

        </div>

        <div className="bg-gray-900/80 border border-green-500/20 rounded-3xl p-6 shadow-2xl text-center">

          <div className="text-4xl mb-3">🌿</div>

          <h2 className="text-xl font-bold text-green-300">Dominant Dosha</h2>

          <div className="text-5xl font-extrabold mt-3">{data.dosha}</div>

          <p className="text-gray-300 mt-2">Personalized wellness profile</p>

        </div>

        <div className="bg-gray-900/80 border border-orange-500/20 rounded-3xl p-6 shadow-2xl text-center">

          <div className="text-4xl mb-3">🔥</div>

          <h2 className="text-xl font-bold text-orange-300">Daily Calories</h2>

          <div className="text-5xl font-extrabold text-orange-400 mt-3">
            {calories}
          </div>

          <p className="text-gray-300 mt-2">Recommended intake</p>

        </div>

      </div>

      <div className="mt-12">
        <VoiceAssistant />
      </div>

      <div className="mt-12">
        <FoodScanner />
      </div>

      <div className="mt-12">
        <ChatBot />
      </div>

    </motion.div>
  );
}

export default Dashboard;
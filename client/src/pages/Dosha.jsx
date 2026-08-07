import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const questions = [
  {
    question: 'How is your body frame?',
    options: ['Thin', 'Medium', 'Broad'],
    dosha: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    question: 'How is your skin?',
    options: ['Dry', 'Warm', 'Oily'],
    dosha: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    question: 'How is your appetite?',
    options: ['Irregular', 'Strong', 'Slow'],
    dosha: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    question: 'How is your energy level?',
    options: ['Variable', 'High', 'Steady'],
    dosha: ['Vata', 'Pitta', 'Kapha'],
  },
  {
    question: 'How do you react to stress?',
    options: ['Anxious', 'Irritated', 'Calm'],
    dosha: ['Vata', 'Pitta', 'Kapha'],
  },
];

function Dosha() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [current, setCurrent] = useState(0);

  const [scores, setScores] = useState({
    Vata: 0,
    Pitta: 0,
    Kapha: 0,
  });

  const [result, setResult] = useState('');

  const totalQuestions = questions.length;
  const progress = ((current + 1) / totalQuestions) * 100;

  const handleAnswer = (index) => {
    const dosha = questions[current].dosha[index];

    const updated = {
      ...scores,
      [dosha]: scores[dosha] + 1,
    };

    setScores(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const dominant = Object.keys(updated).reduce((a, b) =>
        updated[a] > updated[b] ? a : b
      );

      setResult(dominant);
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard', {
      state: {
        ...state,
        dosha: result,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex justify-center items-center p-6 pt-28">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-gray-900/80 border border-green-500/20 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-8"
      >

        {!result ? (
          <>

            <div className="mb-8">

              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Dosha Assessment</span>
                <span>{current + 1}/{totalQuestions}</span>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>

              </div>

            </div>

            <div className="text-center mb-8">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-medium mb-4">
                🌿 Ayurvedic Analysis
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-green-400">
                {questions[current].question}
              </h1>

            </div>

            <div className="space-y-4">
              {questions[current].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-5 rounded-2xl bg-gray-800 border border-green-500/10 hover:border-green-400 hover:bg-gray-700 transition-all duration-200 text-lg"
                >
                  {option}
                </motion.button>
              ))}
            </div>

          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >

            <div className="bg-gradient-to-br from-green-500/10 to-black border border-green-500/20 rounded-[32px] p-8 shadow-2xl">

              <div className="text-5xl mb-4">🌿</div>

              <h2 className="text-3xl font-extrabold text-green-300">
                Your Dominant Dosha
              </h2>

              <div className="mt-4 text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]">
                {result}
              </div>

              <p className="mt-6 text-gray-300 leading-8 max-w-xl mx-auto">
                {result === 'Kapha' &&
                  'Kapha individuals benefit from light, warm, and energizing foods along with regular exercise.'}

                {result === 'Pitta' &&
                  'Pitta individuals benefit from cooling foods, hydration, and stress reduction practices.'}

                {result === 'Vata' &&
                  'Vata individuals benefit from warm, nourishing, grounding meals and consistent routines.'}
              </p>

              <button
                onClick={goToDashboard}
                className="mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:scale-105 transition-all shadow-lg"
              >
                Continue to Dashboard →
              </button>

            </div>

          </motion.div>
        )}

      </motion.div>

    </div>
  );
}

export default Dosha;
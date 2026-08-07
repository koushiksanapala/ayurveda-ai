import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function BMI() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
  });

  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateBMI = () => {
    const h = parseFloat(form.height) / 100;
    const w = parseFloat(form.weight);

    if (!h || !w) return;

    const value = (w / (h * h)).toFixed(1);

    setBmi(value);

    if (value < 18.5) setBmiStatus('Underweight');
    else if (value < 25) setBmiStatus('Healthy');
    else if (value < 30) setBmiStatus('Overweight');
    else setBmiStatus('Obese');
  };

  const continueNext = () => {
    navigate('/dosha', {
      state: {
        ...form,
        bmi,
        bmiStatus,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex justify-center items-center p-6 pt-28">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-gray-900/80 border border-green-500/20 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-8"
      >

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-medium mb-4">
            📊 Health Assessment
          </div>

          <h1 className="text-4xl font-extrabold text-green-400">
            BMI Calculator
          </h1>

          <p className="text-gray-400 mt-2">
            Enter your details to begin your wellness journey
          </p>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-green-500/30 text-white placeholder-gray-400 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-green-500/30 text-white placeholder-gray-400 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-green-500/30 text-white rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-green-500/30 text-white placeholder-gray-400 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-green-500/30 text-white placeholder-gray-400 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={calculateBMI}
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            Calculate BMI
          </button>

        </div>

        {bmi && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 bg-gray-800 border border-green-500/20 rounded-3xl p-6 text-center shadow-xl"
          >

            <h3 className="text-xl text-green-300 font-bold">
              Your BMI
            </h3>

            <div className="text-6xl font-extrabold text-white mt-3">
              {bmi}
            </div>

            <div className={`inline-block mt-4 px-4 py-2 rounded-full font-semibold ${
              bmi < 18.5
                ? 'bg-blue-500/20 text-blue-300'
                : bmi < 25
                ? 'bg-green-500/20 text-green-300'
                : bmi < 30
                ? 'bg-yellow-500/20 text-yellow-300'
                : 'bg-red-500/20 text-red-300'
            }`}>
              {bmiStatus}
            </div>

            <div className="mt-5 w-full bg-gray-700 rounded-full h-3 overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-700"
                style={{ width: `${Math.min((bmi / 35) * 100, 100)}%` }}
              ></div>

            </div>

            <p className="mt-4 text-gray-300 leading-7">
              Maintain a balanced diet, regular exercise, and proper sleep for optimal health.
            </p>

            <button
              onClick={continueNext}
              className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold hover:scale-105 transition-all"
            >
              Continue to Dosha →
            </button>

          </motion.div>
        )}

      </motion.div>

    </div>
  );
}

export default BMI;
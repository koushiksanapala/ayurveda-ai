import { useState } from 'react';

function FoodScanner() {
  const [foodName, setFoodName] = useState('');
  const [result, setResult] = useState(null);

  const scanFood = () => {
    if (!foodName.trim()) return;

    const food = foodName.toLowerCase();

    let data = {
      name: foodName,
      calories: 120,
      suggestion: 'Eat in moderation and maintain a balanced diet.',
    };

    if (food.includes('banana')) {
      data = {
        name: 'Banana',
        calories: 105,
        suggestion: 'Good source of potassium and energy.',
      };
    } else if (food.includes('apple')) {
      data = {
        name: 'Apple',
        calories: 95,
        suggestion: 'Excellent for digestion and immunity.',
      };
    } else if (food.includes('rice')) {
      data = {
        name: 'Rice',
        calories: 200,
        suggestion: 'Prefer moderate portions, especially for Kapha.',
      };
    } else if (food.includes('oats')) {
      data = {
        name: 'Oats',
        calories: 150,
        suggestion: 'Healthy breakfast rich in fiber.',
      };
    }

    setResult(data);
  };

  return (
    <div className="bg-gray-900 border border-green-500/20 rounded-3xl shadow-2xl overflow-hidden mt-8">

      <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-5">

        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          📷 AI Food Scanner
        </h2>

        <p className="text-green-100 mt-1">
          Analyze food and get calories & Ayurvedic suggestions
        </p>

      </div>

      <div className="p-6 bg-gradient-to-b from-gray-900 to-black">

        <div className="flex flex-col md:flex-row gap-3">

          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Enter food name (e.g., Banana, Rice, Oats)"
            className="flex-1 bg-gray-800 border border-green-500/30 text-white placeholder-gray-400 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          <button
            onClick={scanFood}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-200 hover:scale-105"
          >
            Scan
          </button>

        </div>

        <div className="flex flex-wrap gap-2 mt-4">

          <button
            onClick={() => setFoodName('Banana')}
            className="px-3 py-2 bg-gray-800 border border-green-500/20 text-green-300 rounded-xl text-sm hover:bg-gray-700 transition"
          >
            🍌 Banana
          </button>

          <button
            onClick={() => setFoodName('Apple')}
            className="px-3 py-2 bg-gray-800 border border-green-500/20 text-green-300 rounded-xl text-sm hover:bg-gray-700 transition"
          >
            🍎 Apple
          </button>

          <button
            onClick={() => setFoodName('Rice')}
            className="px-3 py-2 bg-gray-800 border border-green-500/20 text-green-300 rounded-xl text-sm hover:bg-gray-700 transition"
          >
            🍚 Rice
          </button>

          <button
            onClick={() => setFoodName('Oats')}
            className="px-3 py-2 bg-gray-800 border border-green-500/20 text-green-300 rounded-xl text-sm hover:bg-gray-700 transition"
          >
            🥣 Oats
          </button>

        </div>

        {result && (
          <div className="mt-6 bg-gray-800 border border-green-500/20 rounded-2xl p-6 shadow-lg">

            <h3 className="text-2xl font-bold text-green-400 mb-4">
              🍽 {result.name}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-black/30 rounded-xl p-4 border border-green-500/10">

                <p className="text-gray-300 text-sm">Estimated Calories</p>

                <p className="text-3xl font-bold text-orange-400 mt-1">
                  {result.calories} kcal
                </p>

              </div>

              <div className="bg-black/30 rounded-xl p-4 border border-green-500/10">

                <p className="text-gray-300 text-sm">Ayurvedic Suggestion</p>

                <p className="text-gray-100 mt-1 leading-7">
                  {result.suggestion}
                </p>

              </div>

            </div>

            <div className="mt-5 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-200 text-sm leading-6">
              💡 Tip: Combine this food with fresh vegetables and adequate water intake for a more balanced Ayurvedic meal.
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default FoodScanner;
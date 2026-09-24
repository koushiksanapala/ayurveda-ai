import { useState } from 'react';

function FoodScanner() {
  const [foodName, setFoodName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const scanFood = async () => {
    if (!foodName.trim() || loading) return;

    setLoading(true);
    setResult(null);

    const prompt = `
Analyze the food "${foodName}".

Return ONLY valid JSON. No markdown. No extra text.

Use exactly this structure:

{
  "food": "food name",
  "calories": "estimated calories for typical serving",
  "serving": "typical serving",
  "nutrition": ["nutrient 1", "nutrient 2", "nutrient 3"],
  "ayurvedic": "one short Ayurvedic description",
  "benefits": ["benefit 1", "benefit 2"],
  "tip": "one short practical eating tip"
}

Rules:
- Keep every value short.
- Calories are estimates, not exact.
- Mention a typical serving.
- Do not diagnose diseases.
- Avoid medical claims.
- Keep the response compact.
`;

    try {
      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error('AI request failed');
      }

      let cleaned = data.reply
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      setResult(parsed);
    } catch (error) {
      console.error('Food Scanner Error:', error);

      setResult({
        food: foodName,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };


  const selectFood = (food) => {
    setFoodName(food);
    setResult(null);
  };


  return (
    <div className="rounded-[26px] border border-gray-800 bg-[#111612] shadow-xl">

      {/* SCANNER AREA */}

      <div className="p-6 sm:p-8">

        {/* SEARCH BOX */}

        <div className="rounded-2xl border border-gray-800 bg-[#0c110e] p-3">

          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  scanFood();
                }
              }}
              placeholder="What did you eat?"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-white outline-none placeholder:text-gray-600"
            />

            <button
              onClick={scanFood}
              disabled={loading || !foodName.trim()}
              className="rounded-xl bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? 'Checking...' : 'Analyze'}
            </button>

          </div>

        </div>


        {/* QUICK FOODS */}

        <div className="mt-7">

          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-600">
            Popular Foods
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">

            {[
              ['🍌', 'Banana'],
              ['🍎', 'Apple'],
              ['🍚', 'Rice'],
              ['🥣', 'Oats'],
              ['🥛', 'Milk'],
              ['🍗', 'Chicken'],
            ].map(([icon, name]) => (

              <button
                key={name}
                onClick={() => selectFood(name)}
                className={`rounded-xl border p-3 text-left transition ${
                  foodName.toLowerCase() === name.toLowerCase()
                    ? 'border-green-500/40 bg-green-500/10'
                    : 'border-gray-800 bg-[#151a16] hover:border-green-500/25 hover:bg-[#192019]'
                }`}
              >

                <div className="text-xl">
                  {icon}
                </div>

                <p className="mt-2 text-xs font-medium text-gray-400">
                  {name}
                </p>

              </button>

            ))}

          </div>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="mt-8 rounded-2xl border border-gray-800 bg-[#0c110e] p-8 text-center">

            <div className="mx-auto flex w-fit items-center gap-1">

              <span className="h-2 w-2 animate-bounce rounded-full bg-green-400" />

              <span
                className="h-2 w-2 animate-bounce rounded-full bg-green-400"
                style={{ animationDelay: '120ms' }}
              />

              <span
                className="h-2 w-2 animate-bounce rounded-full bg-green-400"
                style={{ animationDelay: '240ms' }}
              />

            </div>

            <p className="mt-4 text-sm text-gray-500">
              Analyzing {foodName}...
            </p>

          </div>

        )}


        {/* ERROR */}

        {result?.error && !loading && (

          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">

            <p className="text-sm text-red-300">
              ⚠️ Couldn't analyze this food. Please try again.
            </p>

          </div>

        )}


        {/* RESULT */}

        {result && !result.error && !loading && (

          <div className="mt-8">

            {/* RESULT TITLE */}

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
                  Analysis Result
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white">
                  {result.food}
                </h3>

              </div>

              <p className="text-xs text-gray-600">
                {result.serving}
              </p>

            </div>


            {/* CALORIES + NUTRITION */}

            <div className="grid gap-4 md:grid-cols-3">

              {/* CALORIES */}

              <div className="rounded-2xl border border-orange-500/10 bg-[#171512] p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-lg">
                    🔥
                  </div>

                  <p className="text-sm text-gray-500">
                    Calories
                  </p>

                </div>

                <p className="mt-5 text-3xl font-bold text-orange-400">
                  {result.calories}
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Estimated per serving
                </p>

              </div>


              {/* NUTRITION */}

              <div className="rounded-2xl border border-gray-800 bg-[#151a16] p-5 md:col-span-2">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-lg">
                    🥗
                  </div>

                  <p className="text-sm text-gray-500">
                    Key Nutrition
                  </p>

                </div>

                <div className="mt-5 flex flex-wrap gap-2">

                  {result.nutrition?.map((item, index) => (

                    <span
                      key={index}
                      className="rounded-full border border-gray-700 bg-[#0d120f] px-3 py-2 text-xs text-gray-300"
                    >
                      {item}
                    </span>

                  ))}

                </div>

              </div>

            </div>


            {/* AYURVEDIC VIEW */}

            <div className="mt-4 rounded-2xl border border-green-500/10 bg-green-500/5 p-5">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-lg">
                  🌿
                </div>

                <div>

                  <p className="text-sm font-semibold text-green-400">
                    Ayurvedic View
                  </p>

                  <p className="mt-2 text-sm leading-6 text-gray-300">
                    {result.ayurvedic}
                  </p>

                </div>

              </div>

            </div>


            {/* BENEFITS + TIP */}

            <div className="mt-4 grid gap-4 md:grid-cols-2">

              {/* BENEFITS */}

              <div className="rounded-2xl border border-gray-800 bg-[#151a16] p-5">

                <div className="flex items-center gap-3">

                  <span className="text-lg">
                    ✅
                  </span>

                  <p className="font-semibold text-white">
                    Benefits
                  </p>

                </div>

                <div className="mt-4 space-y-3">

                  {result.benefits?.map((benefit, index) => (

                    <div
                      key={index}
                      className="flex gap-2 text-sm text-gray-400"
                    >

                      <span className="text-green-400">
                        •
                      </span>

                      <span>
                        {benefit}
                      </span>

                    </div>

                  ))}

                </div>

              </div>


              {/* TIP */}

              <div className="rounded-2xl border border-gray-800 bg-[#151a16] p-5">

                <div className="flex items-center gap-3">

                  <span className="text-lg">
                    💡
                  </span>

                  <p className="font-semibold text-white">
                    Smart Tip
                  </p>

                </div>

                <p className="mt-4 text-sm leading-6 text-gray-400">
                  {result.tip}
                </p>

              </div>

            </div>


            {/* SMALL NOTE */}

            <p className="mt-5 text-center text-[11px] text-gray-700">
              Nutrition values are approximate and depend on portion size and preparation.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default FoodScanner;
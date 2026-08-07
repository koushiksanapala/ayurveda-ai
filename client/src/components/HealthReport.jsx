import { useNavigate } from "react-router-dom";

function HealthReport({ bmi, status }) {

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold text-green-700 mb-6">
        Health Report
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span>BMI</span>
          <span>{bmi}</span>
        </div>

        <div className="flex justify-between">
          <span>Status</span>
          <span>{status}</span>
        </div>

        <div className="flex justify-between">
          <span>Daily Calories</span>
          <span>2200 kcal</span>
        </div>

        <div className="flex justify-between">
          <span>Water Intake</span>
          <span>2.5 L</span>
        </div>

      </div>

      <button
        onClick={() => navigate("/dosha")}
        className="w-full mt-8 bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
      >
        Continue to Dosha Assessment →
      </button>

    </div>
  );
}

export default HealthReport;
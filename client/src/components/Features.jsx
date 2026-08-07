import { FaWeight, FaRobot, FaLeaf } from "react-icons/fa";

const features = [
  {
    icon: <FaWeight className="text-4xl text-green-700" />,
    title: "BMI Calculator",
    desc: "Calculate BMI instantly using height and weight.",
  },
  {
    icon: <FaLeaf className="text-4xl text-green-700" />,
    title: "Dosha Analysis",
    desc: "Know your Vata, Pitta and Kapha constitution.",
  },
  {
    icon: <FaRobot className="text-4xl text-green-700" />,
    title: "AI Diet Assistant",
    desc: "Get personalized Ayurvedic diet recommendations.",
  },
];

function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-gray-800">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-3xl p-8 shadow-lg hover:scale-105 transition duration-300"
            >
              {item.icon}
              <h3 className="text-2xl font-bold mt-5">{item.title}</h3>
              <p className="text-gray-600 mt-4">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
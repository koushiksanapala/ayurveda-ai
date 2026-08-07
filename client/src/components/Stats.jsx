import { motion } from "framer-motion";

const stats = [
  { number: "10K+", title: "Users" },
  { number: "98%", title: "Accuracy" },
  { number: "24/7", title: "AI Support" },
  { number: "100+", title: "Diet Plans" },
];

function Stats() {
  return (
    <section className="bg-green-700 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08 }}
            className="text-white"
          >
            <h2 className="text-5xl font-bold">{stat.number}</h2>
            <p className="mt-3 text-lg">{stat.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
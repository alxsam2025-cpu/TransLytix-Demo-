// src/sections/OurSolution.jsx
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function OurSolution() {
  return (
    <motion.div
      className="prose max-w-none"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-bold text-green-800 mb-6">Our Solution</h2>
      <p className="text-lg text-gray-700 mb-6">
        We are building a real-time road data app that allows citizens to report
        road conditions and enables governments, planners, and investors to access
        actionable insights.
      </p>

      {/* Mission & Vision Cards */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div
          className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-green-600 cursor-pointer"
          variants={cardVariants}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0px 8px 24px rgba(22,163,74,0.5)",
          }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
        >
          <h3 className="text-2xl font-semibold text-green-700 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-700">
            To empower citizens and governments with real-time road data, enabling
            better planning, transparent accountability, and smarter infrastructure
            investments.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-brown-600 cursor-pointer"
          variants={cardVariants}
          whileHover={{
            scale: 1.05,
            y: -10,
            boxShadow: "0px 8px 24px rgba(120,53,15,0.5)",
          }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
        >
          <h3 className="text-2xl font-semibold text-brown-700 mb-3">
            Our Vision
          </h3>
          <p className="text-gray-700">
            To become Africa’s most trusted road intelligence platform, connecting
            communities, powering economies, and ensuring roads serve people — not
            politics.
          </p>
        </motion.div>
      </motion.div>

      {/* Key Benefits List */}
      <motion.ul
        className="list-disc pl-6 space-y-3 text-gray-800 font-medium"
        variants={containerVariants}
      >
        {[
          "Track road quality and damage",
          "Provide evidence for planning, budgeting, and accountability",
          "Reduce the politicization of infrastructure issues",
          "Promote trust in state agencies and transparency in delivery",
        ].map((item, i) => (
          <motion.li
            key={i}
            variants={listVariants}
            whileHover={{
              scale: 1.1,
              x: 10,
              color: i % 2 === 0 ? "#166534" : "#78350f", // alternate green/brown
            }}
            transition={{ type: "spring", stiffness: 250, damping: 12 }}
            className="cursor-pointer"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        className="mt-6 text-lg text-gray-700 font-medium"
        variants={cardVariants}
      >
        This is not just about roads — it&apos;s about{" "}
        <span className="text-green-700 font-bold">connecting people</span>,{" "}
        <span className="text-brown-700 font-bold">powering economies</span>, and
        <span className="text-black font-bold"> holding decision-makers accountable</span>{" "}
        through data.
      </motion.p>
    </motion.div>
  );
}



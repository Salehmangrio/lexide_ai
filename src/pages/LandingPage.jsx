// npm i framer-motion lucide-react react-router-dom

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">AI Legal Brain</span>
              <br />
              Works While You Win Cases
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-4xl mx-auto">
              Draft contracts • Research precedents • Review documents • Answer complex legal questions —
              in seconds, not hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group px-10 py-5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                         rounded-full text-xl font-semibold shadow-2xl flex items-center gap-3 transition-all"
              >
                Get Started Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
              </motion.button>
            </div>
          </motion.div>

          {/* Trust Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-blue-300"
          >
            {["Used by many lawyers", "99.9% uptime", "GDPR & HIPAA compliant", "Trained on 10M+ legal docs"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span className="text-sm md:text-base">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
} 
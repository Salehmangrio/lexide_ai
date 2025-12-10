// npm i lucide-react framer-motion

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Scale,
  Users,
  ArrowRight,
  Sparkles,
  Gavel,
  PhoneCall,
  CheckCircle,
} from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();

  const startChat = () => navigate("/app/chat");
  const findAdvocate = () => navigate("/app/advocates");


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}


      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get Legal Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Your Way</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Instant answers from AI • Real-time consultation with top advocates • One platform for all your legal needs.
          </p>

          {/* Two Main Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Ask Lexide AI */}
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer"
              onClick={startChat}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition"></div>
              <div className="p-10 text-left">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ask Lexide AI
                  <Sparkles className="inline-block w-6 h-6 ml-2 text-yellow-500" />
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Get instant, accurate answers to any legal question. Draft contracts, understand laws, review documents — in seconds.
                </p>

                <div className="space-y-3 mb-8">
                  {["24/7 Instant Answers", "Cites Precedents & Laws", "Draft Contracts Automatically", "100% Private & Secure"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <button className="group/btn flex items-center gap-3 text-blue-600 font-semibold text-lg hover:gap-5 transition-all">
                  Start Chatting Now
                  <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition" />
                </button>
              </div>
            </motion.div>

            {/* Card 2: Connect with Advocates */}
            <motion.div
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer"
              onClick={findAdvocate}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-10 transition"></div>
              <div className="p-10 text-left">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Connect with Advocates
                  <Gavel className="inline-block w-6 h-6 ml-2 text-indigo-600" />
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Book verified lawyers instantly. Get video/audio consultations, case filing, and personalized legal strategy.
                </p>

                <div className="space-y-3 mb-8">
                  {["Verified Top Lawyers", "Video/Audio Calls", "Fixed Price Packages", "Same-Day Appointments"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <button className="group/btn flex items-center gap-3 text-indigo-600 font-semibold text-lg hover:gap-5 transition-all">
                  Find Your Advocate
                  <PhoneCall className="w-6 h-6 group-hover/btn:translate-x-2 transition" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10+", label: "Cases Solved" },
            { number: "6", label: "Expert Advocates" },
            { number: "4.9", label: "User Rating" },
            { number: "24/7", label: "AI Support" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-5xl font-bold">{stat.number}</div>
              <div className="text-blue-100 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      {/* <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why wait for justice when help is one click away?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={startChat}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-semibold rounded-full shadow-xl flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-7 h-7" />
              Chat with Lexide AI Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={findAdvocate}
              className="px-10 py-5 bg-gray-900 text-white text-xl font-semibold rounded-full shadow-xl flex items-center justify-center gap-3"
            >
              <Users className="w-7 h-7" />
              Book a Real Advocate
            </motion.button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scale className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">Lexide AI</span>
          </div>
          <p>© 2025 Lexide AI Technologies Pvt. Ltd. • Not legal advice • Always verify with a licensed professional.</p>
        </div>
      </footer>
    </div>
  );
}
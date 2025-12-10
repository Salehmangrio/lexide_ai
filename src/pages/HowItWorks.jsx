// npm i lucide-react framer-motion

import React from "react";
import { motion } from "framer-motion";
import {
  Brain, Users, Video, FileText, MessageSquare, Shield,
  Scale, CheckCircle, Sparkles, Clock, FileCheck,
  Headphones, Globe, Lock, Zap, Star, Calendar, DollarSign
} from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">


      {/* Hero */}
      <section className="px-6 py-24 text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            How Lexide AI Works ?
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
            Get instant legal answers from AI <span className="font-bold">OR</span> book a verified lawyer —
            all in one simple, secure platform.
          </p>
          <div className="flex justify-center gap-4 mt-10">
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-full text-lg font-medium">
              No credit card required
            </div>
            <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-full text-lg font-medium">
              Start in 30 seconds
            </div>
          </div>
        </motion.div>
      </section>

      {/* Core Features - Two Paths */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Two Powerful Ways to Solve Your Legal Problem
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* AI Assistant Path */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl"
            >
              <div className="flex items-center gap-5 mb-10">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Brain className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Ask Lexide AI</h3>
                  <p className="text-xl opacity-90">Free • Instant • 24/7</p>
                </div>
              </div>

              <div className="space-y-6 text-lg">
                <FeatureItem icon={<Zap />} text="Get accurate answers in seconds — no waiting" />
                <FeatureItem icon={<FileText />} text="Draft contracts, notices, wills, NDAs automatically" />
                <FeatureItem icon={<MessageSquare />} text="Chat naturally — just type your question" />
                <FeatureItem icon={<Globe />} text="Explains laws in simple, easy-to-understand language" />
                <FeatureItem icon={<Clock />} text="Available anytime — even at 2 AM" />
                <FeatureItem icon={<Lock />} text="100% private — your chats are never shared" />
              </div>

              <a
                href="/app"
                className="mt-12 w-full py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition flex items-center justify-center gap-4 text-xl shadow-xl"
              >
                <Sparkles className="w-8 h-8" />
                Try AI Chat Now — Free
              </a>
            </motion.div>

            {/* Real Advocate Path */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-10 text-white shadow-2xl"
            >
              <div className="flex items-center gap-5 mb-10">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Book a Verified Advocate</h3>
                  <p className="text-xl opacity-90">Video/Audio Call • Fixed Price</p>
                </div>
              </div>

              <div className="space-y-6 text-lg">
                <FeatureItem icon={<Video />} text="Face-to-face video or audio consultation" />
                <FeatureItem icon={<Star />} text="Only top-rated, verified lawyers" />
                <FeatureItem icon={<Headphones />} text="Speak in English, Urdu, or regional languages" />
                <FeatureItem icon={<CheckCircle />} text="Fixed price per session — no hidden fees" />
                <FeatureItem icon={<Calendar />} text="Same-day appointments often available" />
                <FeatureItem icon={<Shield />} text="Secure & confidential — protected by law" />
              </div>

              <a
                href="/app/advocates"
                className="mt-12 w-full py-5 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-gray-100 transition flex items-center justify-center gap-4 text-xl shadow-xl"
              >
                <Video className="w-8 h-8" />
                Book a Lawyer Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Get Legal Help in Just 4 Simple Steps
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              { step: "1", title: "Sign Up Free", desc: "Create your account in 30 seconds — no credit card needed", icon: <Sparkles /> },
              { step: "2", title: "Ask or Book", desc: "Use AI chat for instant answers OR book a real lawyer", icon: <Brain /> },
              { step: "3", title: "Get Solution", desc: "Receive clear answers, documents, or expert advice", icon: <FileCheck /> },
              { step: "4", title: "Peace of Mind", desc: "Solve your legal issue quickly and affordably", icon: <Shield /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Lexide AI */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Why Thousands Trust Lexide AI
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Fastest Legal Help", desc: "Get answers in seconds instead of days", icon: <Zap className="w-12 h-12" /> },
              { title: "Most Affordable", desc: "Free AI + fixed-price lawyers — save up to 90%", icon: <DollarSign className="w-12 h-12" /> },
              { title: "Most Trusted", desc: "Verified lawyers • Encrypted chats • Privacy guaranteed", icon: <Shield className="w-12 h-12" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-10 text-center shadow-xl border border-gray-100"
              >
                <div className="text-blue-600 mb-6 flex justify-center">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-lg text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Start Solving Your Legal Problem Today
          </h2>
          <p className="text-2xl mb-12 opacity-90">
            Join 50,000+ people already using Lexide AI
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/auth"
              className="px-14 py-7 bg-white text-blue-600 rounded-2xl text-2xl font-bold hover:shadow-2xl transition flex items-center justify-center gap-4"
            >
              <Sparkles className="w-9 h-9" />
              Start Free — No Card Needed
            </a>
            <a
              href="/app/advocates"
              className="px-14 py-7 bg-transparent border-4 border-white text-white rounded-2xl text-2xl font-bold hover:bg-white/10 transition flex items-center justify-center gap-4"
            >
              <Users className="w-9 h-9" />
              Book a Lawyer
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scale className="w-9 h-9 text-blue-500" />
            <span className="text-3xl font-bold text-white">Lexide AI</span>
          </div>
          <p className="text-lg">Making Legal Help Simple, Fast, and Affordable</p>
          <p className="text-sm mt-3">Not legal advice • Always verify with a licensed professional</p>
        </div>
      </footer>
    </div>
  );
}

// Helper Component
function FeatureItem({ icon, text }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-8 h-8 flex-shrink-0 mt-1">{icon}</div>
      <p>{text}</p>
    </div>
  );
}
// npm i lucide-react framer-motion

import { motion } from "framer-motion";
import { 
  Check, X, Sparkles, Video, Users, Shield, Clock, 
  MessageSquare, FileCheck, Headphones, Zap, Star, Scale 
} from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Unlimited AI legal help — <span className="font-bold text-blue-600">completely free</span><br />
            Only pay when you book a real advocate. No subscriptions. No hidden fees.
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-blue-100 text-blue-700 px-6 py-3 rounded-full font-bold text-lg">
              Zero Cost for AI Chat
            </div>
            <div className="bg-green-100 text-green-700 px-6 py-3 rounded-full font-bold text-lg">
              Pay Only for Lawyer Calls
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Free AI Plan */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 px-8 py-3 rounded-bl-3xl font-bold text-lg">
                MOST POPULAR
              </div>
              <div className="flex items-center gap-4 mb-8">
                <Sparkles className="w-12 h-12" />
                <div>
                  <h3 className="text-3xl font-bold">Lexide AI Chat</h3>
                  <p className="text-5xl font-bold mt-2">Free Forever</p>
                </div>
              </div>

              <ul className="space-y-5 text-lg mb-10">
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span><strong>Unlimited</strong> AI legal questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span>Draft contracts, notices, wills</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span>24/7 instant answers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span>100% private & encrypted</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span>No credit card required</span>
                </li>
              </ul>

              <a
                href="/app"
                className="w-full py-5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition flex items-center justify-center gap-3 text-xl shadow-xl"
              >
                <MessageSquare className="w-7 h-7" />
                Start Chatting Now — Free
              </a>
            </motion.div>

            {/* Advocate Consultation */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <Video className="w-12 h-12" />
                <div>
                  <h3 className="text-3xl font-bold">Book a Lawyer</h3>
                  <p className="text-4xl font-bold mt-2">Pay Per Session</p>
                </div>
              </div>

              <div className="bg-white/20 rounded-2xl p-6 mb-8">
                <p className="text-2xl font-bold text-center mb-2">Starting from</p>
                <p className="text-5xl font-bold text-center">PKR 3,000</p>
                <p className="text-center text-lg opacity-90">per 30-minute consultation</p>
              </div>

              <ul className="space-y-5 text-lg mb-10">
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span>Video or audio call with verified advocate</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span>Fixed price — no meter running</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span>Same-day appointments available</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span>Top-rated lawyers only</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-7 h-7 flex-shrink-0 mt-0.5" />
                  <span>Secure payment • Full refund if not satisfied</span>
                </li>
              </ul>

              <a
                href="/app/advocates"
                className="w-full py-5 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-gray-100 transition flex items-center justify-center gap-3 text-xl shadow-xl"
              >
                <Users className="w-7 h-7" />
                View Lawyers & Prices
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Save Up to 90% Compared to Traditional Lawyers
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Traditional Lawyer</h3>
              <p className="text-5xl font-bold text-red-600 mb-4">PKR 15,000+</p>
              <ul className="space-y-3 text-left text-gray-600">
                <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-500" /> Visit office</li>
                <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-500" /> Wait days for appointment</li>
                <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-500" /> Hourly billing</li>
                <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-500" /> Hidden charges</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl scale-110">
              <h3 className="text-3xl font-bold mb-4">Lexide AI + Lawyer</h3>
              <p className="text-6xl font-bold mb-4">PKR 0 – 8,000</p>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3"><Check className="w-6 h-6 text-green-400" /> Free AI answers</li>
                <li className="flex items-center gap-3"><Check className="w-6 h-6 text-green-400" /> Instant video call</li>
                <li className="flex items-center gap-3"><Check className="w-6 h-6 text-green-400" /> Fixed price</li>
                <li className="flex items-center gap-3"><Check className="w-6 h-6 text-green-400" /> No hidden fees</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">You Save</h3>
              <p className="text-6xl font-bold text-green-600 mb-4">90%+</p>
              <p className="text-xl text-gray-700">Every single time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            Start Free Today — Pay Only When You Need a Lawyer
          </h2>
          <p className="text-2xl mb-12 opacity-90">
            Join 50,000+ people already saving with Lexide AI
          </p>
          <a
            href="/auth"
            className="inline-flex items-center gap-4 px-14 py-7 bg-white text-blue-600 rounded-2xl text-2xl font-bold hover:shadow-2xl transition"
          >
            <Sparkles className="w-9 h-9" />
            Start Free — No Credit Card Needed
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scale className="w-9 h-9 text-blue-500" />
            <span className="text-3xl font-bold text-white">Lexide AI</span>
          </div>
          <p className="text-lg">Transparent • Affordable • Trusted</p>
          <p className="text-sm mt-3">Not legal advice • Always verify with a licensed professional</p>
        </div>
      </footer>
    </div>
  );
}
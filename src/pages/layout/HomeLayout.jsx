// src/layouts/HomeLayout.jsx
import { Scale, LogOut, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from '../../suppabase/db.js';
import toast from 'react-hot-toast';

const HomeLayout = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const howItWorks = () => {
    navigate("how-it-works");
    setMobileMenuOpen(false);
  };
  const pricing = () => {
    navigate("pricing");
    setMobileMenuOpen(false);
  };
  const home = () => {
    navigate("/app");
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully!");
      navigate("/auth", { replace: true });
    } catch (err) {
      toast.error("Logout failed. Try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <button
                onClick={home}
                className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition"
              >
                Lexide AI
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={howItWorks}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                How it works
              </button>
              <button
                onClick={pricing}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Pricing
              </button>
              <NavLink
                to="/app"
                className="text-gray-600 hover:text-gray-900 font-medium transition"
                // className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium shadow-md"
              >
                Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center rounded-full gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium shadow-md"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              <div className="flex flex-col gap-4">
                <button
                  onClick={howItWorks}
                  className="text-left text-lg text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  How it works
                </button>
                <button
                  onClick={pricing}
                  className="text-left text-lg text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Pricing
                </button>
                <NavLink
                  to="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left text-lg text-gray-700 hover:text-blue-600 font-medium transition"
                //   className="block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-center font-medium shadow-md"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium shadow-md"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* Optional Mobile Bottom Spacing */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default HomeLayout;
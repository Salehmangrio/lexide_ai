// npm i lucide-react @supabase/supabase-js

import { useState, useEffect } from "react";
import { supabase } from "../suppabase/db.js"; 
import { Search, MapPin, Clock, Star, Filter, Video, CheckCircle, Scale, AlertCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AdvocatesPage() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  // Fetch advocates from Supabase
  useEffect(() => {
    async function fetchAdvocates() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("advocates")
          .select("*")
          .order("rating", { ascending: false });

        if (error) throw error;

        setAdvocates(data || []);
        setFilteredAdvocates(data || []);
      } catch (err) {
        console.error("Error fetching advocates:", err);
        setError("Failed to load advocates. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchAdvocates();
  }, []);

  // Filter logic (runs when data or filters change)
  useEffect(() => {
    let filtered = advocates;

    if (searchTerm) {
      filtered = filtered.filter(
        (adv) =>
          adv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          adv.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialization !== "All") {
      filtered = filtered.filter((adv) => adv.specialization === selectedSpecialization);
    }

    if (selectedLocation !== "All") {
      filtered = filtered.filter((adv) => adv.location === selectedLocation);
    }

    setFilteredAdvocates(filtered);
  }, [searchTerm, selectedSpecialization, selectedLocation, advocates]);

  // Extract unique values for filters
  const specializations = ["All", ...new Set(advocates.map((a) => a.specialization))];
  const locations = ["All", ...new Set(advocates.map((a) => a.location))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading advocates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
     
      {/* Hero */}
      <section className="px-6 py-12 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect with Verified Advocates Instantly
          </h1>
          <p className="text-xl opacity-90">
            Book video/audio consultations • Fixed prices • Same-day appointments
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialization("All");
                setSelectedLocation("All");
              }}
              className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Advocates Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {filteredAdvocates.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 mb-4">No advocates found</p>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredAdvocates.map((adv) => (
              <div
                key={adv.id}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={adv.photo || "/fallback-avatar.jpg"}
                    alt={adv.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => (e.target.src = "/fallback-avatar.jpg")}
                  />
                  {adv.verified && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </div>
                  )}
                  {adv.available && (
                    <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Available Now
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{adv.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{adv.specialization}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {adv.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {adv.experience}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(adv.rating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {adv.rating} ({adv.reviews || 0} reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {adv.languages?.map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{adv.price || "PKR 5,000"}</p>
                      <p className="text-sm text-gray-500">per session</p>
                    </div>
                    <NavLink to={`/app/advocate/${adv.id}`} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Book Now
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// src/pages/BookAdvocatePage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { supabase } from "../suppabase/db.js";
import {
  CheckCircle, Video, Clock, Star, Shield,
  CreditCard, MapPin, Loader2, AlertCircle, Lock,
} from "lucide-react";

// Replace with your real Stripe key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function BookAdvocatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [advocate, setAdvocate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAdvocate() {
      try {
        const { data, error } = await supabase
          .from("advocates")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Advocate not found");
        setAdvocate(data);
      } catch (err) {
        setError(err.message || "Failed to load advocate");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchAdvocate();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600 font-medium">Loading advocate details...</p>
        </div>
      </div>
    );
  }

  if (error || !advocate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center max-w-md shadow-2xl">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <p className="text-2xl font-bold text-red-700 mb-4">
            {error || "Advocate not found"}
          </p>
          <button
            onClick={() => navigate("/app/advocates")}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition text-lg font-medium"
          >
            Back to Advocates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mt-6">Book Consultation</h1>

      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Mobile Layout: Stacked */}
        <div className="block lg:hidden space-y-8">
          <AdvocateProfileCard advocate={advocate} />
          <PaymentSection advocate={advocate} stripePromise={stripePromise} />
        </div>

        {/* Desktop Layout: Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10 xl:gap-16">
          <AdvocateProfileCard advocate={advocate} />
          <PaymentSection advocate={advocate} stripePromise={stripePromise} />
        </div>
      </div>
    </div>
  );
}

// Reusable Advocate Profile Card
function AdvocateProfileCard({ advocate }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Hero Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-blue-600 to-indigo-700">
        <img
          src={advocate.photo || "/fallback-avatar.jpg"}
          alt={advocate.name}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-8 border-white shadow-2xl"
          onError={(e) => e.target.src = "/fallback-avatar.jpg"}
        />
      </div>

      <div className="pt-24 md:pt-32 px-8 pb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{advocate.name}</h2>
        <p className="text-xl md:text-2xl text-blue-600 font-semibold mt-2">{advocate.specialization}</p>

        <div className="flex justify-center items-center gap-3 mt-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 md:w-7 md:h-7 ${i < Math.floor(advocate.rating || 5) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-lg md:text-xl font-medium text-gray-700">
            {advocate.rating || "4.9"} ({advocate.reviews || 0} reviews)
          </span>
        </div>

        <div className="mt-8 space-y-5 text-left bg-gray-50 rounded-3xl p-6">
          <InfoItem icon={<MapPin className="w-6 h-6 text-blue-600" />} text={advocate.location} />
          <InfoItem icon={<Clock className="w-6 h-6 text-blue-600" />} text={advocate.experience} />
          <InfoItem icon={<Video className="w-6 h-6 text-green-600" />} text="Video/Audio Call" />
          <InfoItem icon={<Shield className="w-6 h-6 text-green-600" />} text="Verified Advocate" bold />
        </div>

        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">
          <p className="text-5xl md:text-6xl font-bold text-center">{advocate.price || "PKR 5,000"}</p>
          <p className="text-center text-xl md:text-2xl mt-3 opacity-90">30-minute consultation</p>
        </div>
      </div>
    </div>
  );
}

// Reusable Info Item
function InfoItem({ icon, text, bold }) {
  return (
    <div className="flex items-center gap-4">
      {icon}
      <span className={`text-lg md:text-xl ${bold ? "font-bold text-green-600" : "text-gray-700"}`}>
        {text}
      </span>
    </div>
  );
}

// Payment Section
function PaymentSection({ advocate, stripePromise }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
      <div className="flex items-center gap-4 mb-8">
        <CreditCard className="w-12 h-12 text-blue-600" />
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Complete Payment</h3>
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm advocate={advocate} />
      </Elements>
    </div>
  );
}

// Stripe Checkout Form
function CheckoutForm({ advocate }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError("");

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt((advocate.price || "5000").replace(/\D/g, "")) * 100,
          advocateId: advocate.id,
        }),
      });

      if (!response.ok) throw new Error("Payment failed");

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setSucceeded(true);
        await supabase.from("bookings").insert({
          advocate_id: advocate.id,
          amount: parseInt((advocate.price || "5000").replace(/\D/g, "")),
          payment_status: "paid",
          transaction_id: result.paymentIntent.id,
        });
        setTimeout(() => navigate("/booking-success"), 3000);
      }
    } catch (err) {
      setError("Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
        <label className="block text-lg md:text-xl font-semibold text-gray-800 mb-6">
          Enter Card Details
        </label>
        <div className="p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-inner">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#1f2937",
                  "::placeholder": { color: "#9ca3af" },
                  fontFamily: "Inter, sans-serif",
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center">
          {error}
        </div>
      )}

      {succeeded ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-10 rounded-3xl text-center">
          <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-600" />
          <p className="text-3xl font-bold">Payment Successful!</p>
          <p className="text-xl mt-3">Your consultation is confirmed!</p>
        </div>
      ) : (
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xl md:text-2xl rounded-3xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-70"
        >
          {processing ? (
            <Loader2 className="w-9 h-9 animate-spin" />
          ) : (
            <>
              <Lock className="w-9 h-9" />
              Pay {advocate.price || "PKR 5,000"} & Book Now
            </>
          )}
        </button>
      )}
    </form>
  );
}
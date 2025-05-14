'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type BookingData = {
  venueId: string;
  eventName: string;
  date: string;
  time: string;
  hours: number;
  message?: string;
};

export default function BookingSummaryPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bookingDetails");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setBookingData(parsed);
      } catch (err) {
        console.error("❌ Failed to parse bookingDetails:", err);
      }
    }
  }, []);

  const handleConfirmBooking = async () => {
    if (!bookingData) {
      toast.error("Booking details missing.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to confirm your booking.");
      router.push("/login");
      return;
    }

    const startTime = new Date(`${bookingData.date}T${bookingData.time}`);
    const endTime = new Date(startTime.getTime() + bookingData.hours * 60 * 60 * 1000);

    const payload = {
      venue_id: parseInt(bookingData.venueId),
      event_name: bookingData.eventName,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      message: bookingData.message,
    };

    try {
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Error ${response.status}`);
      }

      localStorage.setItem("latestBooking", JSON.stringify(bookingData));
      toast.success("✅ Booking confirmed! Redirecting to homepage...");

      setTimeout(() => router.push("/home-page"), 2500);
    } catch (error: any) {
      toast.error(error.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) {
    return <p className="p-4 text-center">Loading booking summary...</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow rounded p-6 mt-10">
      <h2 className="text-xl font-bold text-center mb-4">Booking Summary</h2>
      <p><strong>Event:</strong> {bookingData.eventName}</p>
      <p><strong>Date:</strong> {bookingData.date}</p>
      <p><strong>Time:</strong> {bookingData.time}</p>
      <p><strong>Hours:</strong> {bookingData.hours}</p>
      <p><strong>Message:</strong> {bookingData.message || "—"}</p>

      <button
        onClick={handleConfirmBooking}
        disabled={loading}
        className="mt-6 w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 font-semibold"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
}

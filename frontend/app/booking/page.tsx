'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function BookingFormPage() {
  const searchParams = useSearchParams();
  const venueId = searchParams.get("venue_id");
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hours, setHours] = useState<number | string>(1);
  const [message, setMessage] = useState("");

  const handleContinue = () => {
    if (!venueId || !eventName || !date || !time || !hours || Number(hours) < 1) {
      alert("Please fill all required fields with valid values");
      return;
    }

    const bookingDetails = {
      venueId,
      eventName,
      date,
      time,
      hours: Number(hours),
      message,
    };

    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    router.push("/summary");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4">Create Booking</h2>

      <label className="block mb-2">Event Name</label>
      <input
        className="border p-2 w-full mb-4"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />

      <label className="block mb-2">Date</label>
      <input
        type="date"
        className="border p-2 w-full mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label className="block mb-2">Time</label>
      <input
        type="time"
        className="border p-2 w-full mb-4"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <label className="block mb-2">Duration (hours)</label>
      <input
        type="number"
        min={1}
        className="border p-2 w-full mb-4"
        value={hours}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            setHours("");
          } else {
            const parsed = parseInt(value);
            setHours(isNaN(parsed) ? "" : parsed);
          }
        }}
      />

      <label className="block mb-2">Message (optional)</label>
      <textarea
        className="border p-2 w-full mb-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleContinue}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Continue to Summary
      </button>
    </div>
  );
}

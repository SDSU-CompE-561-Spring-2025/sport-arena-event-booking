'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function BookingSummaryPage() {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Fake fetch or replace with actual fetch logic
    const stored = localStorage.getItem("latestBooking");
    if (stored) {
      setBooking(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl mt-10 shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-[#003049] text-2xl">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {booking ? (
            <div className="space-y-4">
              <p><strong>Venue:</strong> {booking.venueName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              {booking.message && <p><strong>Message:</strong> {booking.message}</p>}

              <div className="text-green-600 font-semibold">
                ✅ Your booking has been confirmed!
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Link href="/user-dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">Back to Home</Button>
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No booking data found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { components } from "@/types/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type Booking = components["schemas"]["BookingResponse"];

export default function UserProfile() {
  const router = useRouter();
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [previousBookings, setPreviousBookings] = useState<Booking[]>([]);
  const [venueMap, setVenueMap] = useState<Record<number, string>>({});
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null); // 🆕 Token state

  // Load token and fetch bookings once component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:8000/bookings/", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data: Booking[] = await res.json();
      const today = new Date();

      const upcoming = data.filter((b) => new Date(b.start_time) >= today);
      const past = data.filter((b) => new Date(b.start_time) < today);

      setCurrentBookings(upcoming);
      setPreviousBookings(past);

      const venueIds = Array.from(new Set(data.map((b) => b.venue_id)));
      await fetchVenuesById(venueIds);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchVenuesById = async (venueIds: number[]) => {
    const map: Record<number, string> = {};
    await Promise.all(
      venueIds.map(async (id) => {
        try {
          const res = await fetch(`http://localhost:8000/venue/venues/${id}`);
          const venue = await res.json();
          map[id] = venue.name || `Venue #${id}`;
        } catch {
          map[id] = `Venue #${id}`;
        }
      })
    );
    setVenueMap(map);
  };

  const handleCancelClick = (booking: Booking) => {
    setBookingToCancel(booking);
    setShowDialog(true);
  };

  const confirmCancel = async () => {
    if (!bookingToCancel || !authToken) {
      alert("You're not logged in.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/bookings/${bookingToCancel.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to cancel booking");

      setCurrentBookings(currentBookings.filter((b) => b.id !== bookingToCancel.id));
      toast.success("Booking cancelled!");
    } catch (err) {
      alert("Failed to cancel booking.");
      console.error(err);
    } finally {
      setBookingToCancel(null);
      setShowDialog(false);
    }
  };

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const handleGoHome = () => router.push("/home-page");

  return (
    <div className="min-h-screen bg-white p-6">
        <h1 className="text-3xl font-bold text-white">EventEz</h1>

      <section>
        <h2 className="text-xl font-semibold">Current Bookings</h2>
        {currentBookings.length === 0 && <p className="text-gray-500">No current bookings.</p>}
        {currentBookings.map((booking) => (
          <Card key={booking.id} className="my-2">
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{booking.event_name}</p>
                  <p className="text-sm text-gray-700">{venueMap[booking.venue_id]}</p>
                  <p className="text-sm">{formatDateTime(booking.start_time)}</p>
                </div>
                <Button onClick={() => handleCancelClick(booking)} className="bg-red-600 text-white">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Previous Bookings</h2>
        {previousBookings.length === 0 && <p className="text-gray-500">No previous bookings.</p>}
        {previousBookings.map((booking) => (
          <Card key={booking.id} className="my-2">
            <CardContent>
              <p className="font-semibold">{booking.event_name}</p>
              <p className="text-sm text-gray-700">{venueMap[booking.venue_id]}</p>
              <p className="text-sm">{formatDateTime(booking.start_time)}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to cancel this booking?</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDialog(false)}>Nevermind</Button>
            <Button onClick={confirmCancel} className="bg-red-600 text-white">Yes, Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Star, Users, Search, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// Types
type Booking = {
  id: number;
  venue: string;
  date: string;
  location?: string;
  time?: string;
  guests?: number;
};

export default function UserProfile() {
  const [previousBookings, setPreviousBookings] = useState<Booking[]>([]);
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setPreviousBookings([
      { id: 1, venue: "Venue A", date: "2025-04-01", location: "New York", time: "6:00 PM", guests: 50 },
      { id: 2, venue: "Venue B", date: "2025-03-15", location: "Chicago", time: "3:00 PM", guests: 30 },
    ]);
    setCurrentBookings([
      { id: 3, venue: "Venue C", date: "2025-05-10", location: "Los Angeles", time: "5:30 PM", guests: 100 },
    ]);
  };

  const handleCancelClick = (booking: Booking) => {
    setBookingToCancel(booking);
    setShowDialog(true);
  };

  const confirmCancel = () => {
    if (bookingToCancel) {
      setCurrentBookings(currentBookings.filter(b => b.id !== bookingToCancel.id));
      setBookingToCancel(null);
    }
    setShowDialog(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleGoHome = () => {
    router.push("/home-page");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <nav className="bg-[#003049] shadow px-6 py-4 mb-6 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-10">
        <h1 className="text-3xl font-bold text-white">EventEz</h1>
        <div className="flex gap-4 items-center">
          <Button
            onClick={handleGoHome}
            className="bg-white text-[#003049] px-4 py-2 rounded-full font-semibold hover:bg-gray-100"
          >
            Home Page
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
              <button className="p-2 rounded-full bg-white hover:bg-gray-100 border">
                <User className="w-6 h-6 text-[#003049]" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              sideOffset={8}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-1 z-50"
            >
              <DropdownMenu.Item
                onSelect={() => router.push("/update-user")}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-md"
              >
                Update Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={handleLogout}
                className="cursor-pointer px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </nav>

      <h1 className="text-2xl font-bold">User Profile</h1>

      <section>
        <h2 className="text-xl font-semibold">Current Bookings</h2>
        {currentBookings.map(booking => (
          <Card key={booking.id} className="my-2">
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{booking.venue}</p>
                  <p>{booking.date} at {booking.time}</p>
                  <p>{booking.location}</p>
                  <p>{booking.guests} guests</p>
                </div>
                <Button onClick={() => handleCancelClick(booking)} className="bg-red-600 text-white hover:bg-red-700">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Previous Bookings</h2>
        {previousBookings.map(booking => (
          <Card key={booking.id} className="my-2">
            <CardContent>
              <p className="font-semibold">{booking.venue}</p>
              <p>{booking.date} at {booking.time}</p>
              <p>{booking.location}</p>
              <p>{booking.guests} guests</p>
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
            <Button variant="ghost" onClick={() => setShowDialog(false)}>
              Nevermind
            </Button>
            <Button onClick={confirmCancel} className="bg-red-600 text-white hover:bg-red-700">
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

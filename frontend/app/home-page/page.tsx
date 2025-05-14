"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { components } from "@/types/api";

type Venue = components["schemas"]["VenueResponse"];
type VenueWithImage = Venue & { image?: string };

export default function UserDashboard() {
  const router = useRouter();
  const [venues, setVenues] = useState<VenueWithImage[]>([]);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    location: "",
    capacity: "",
    eventType: "",
    rating: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      getUserRoleFromStorage();
      await getVenues();
    };

    fetchData();
  }, []);

  const getUserRoleFromStorage = () => {
    const role = localStorage.getItem("user_role");
    if (role !== null) {
      setUserRole(parseInt(role));
    }
  };

  const getVenues = async () => {
    try {
      const res = await fetch("http://localhost:8000/venue/venues");
      const data: Venue[] = await res.json();
      if (Array.isArray(data)) {
        setVenues(data);
      } else {
        setVenues([]);
      }
    } catch (err) {
      console.error("Error fetching venues:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    router.push("/login");
  };

  const filteredVenues = venues.filter((venue) => {
    return (
      (!filters.location || venue.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.eventType || venue.event_type.toLowerCase() === filters.eventType.toLowerCase()) &&
      (!filters.rating || venue.hourly_rate >= parseFloat(filters.rating))
    );
  });

  return (
    <div className="min-h-screen bg-white p-6 pt-24">
      {userRole === 0 && (
        <div className="mb-4 flex justify-end">
          <Link href="/create-venue">
            <button className="bg-[#F77F00] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#e76f00]">
              <span className="text-xl">+</span> Add Venue
            </button>
          </Link>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Available Venues</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Location"
          className="border border-[#003049] text-[#003049] p-2 rounded"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Capacity"
          className="border border-[#003049] text-[#003049] p-2 rounded"
          value={filters.capacity}
          onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
        />
        <select
          className="border border-[#003049] text-[#003049] p-2 rounded"
          value={filters.eventType}
          onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}
        >
          <option value="">All Event Types</option>
          <option value="Concert">Concert</option>
          <option value="Wedding">Wedding</option>
          <option value="Workshop">Workshop</option>
          <option value="Conference">Conference</option>
          <option value="Festival">Festival</option>
        </select>
        <input
          type="number"
          placeholder="Min Hourly Rate"
          step="0.1"
          className="border border-[#003049] text-[#003049] p-2 rounded"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue) => (
          <div
            key={venue.venue_id ?? `fallback-${venue.name}`}
            className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={venue.image ? `http://localhost:8000${venue.image}` : "https://via.placeholder.com/400x200?text=No+Image"}
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
              <p className="text-sm text-gray-600 mb-1">{venue.location}</p>
              <p className="text-sm text-gray-500 mb-2">Type: {venue.event_type}</p>
              <p className="text-sm text-gray-500 mb-2">Capacity: {venue.capacity}</p>
              <p className="text-sm text-gray-500 mb-2">Rate: ${venue.hourly_rate}/hr</p>
              <div className="flex justify-between">
                <Link href={`/venues/${venue.venue_id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Venue Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

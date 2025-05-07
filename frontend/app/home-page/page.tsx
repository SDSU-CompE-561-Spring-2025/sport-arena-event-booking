"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Users, Search } from "lucide-react";

const mockVenues = [
  {
    id: 1,
    name: "Sunset Arena",
    description: "A spacious venue ideal for concerts and sports.",
    rating: 4.8,
    capacity: 5000,
    location: "San Diego",
    eventType: "Concert",
    imageUrl: "https://via.placeholder.com/400x200?text=Sunset+Arena",
  },
  {
    id: 2,
    name: "Lakeside Hall",
    description: "Perfect for weddings and large corporate events.",
    rating: 4.5,
    capacity: 800,
    location: "Austin",
    eventType: "Wedding",
    imageUrl: "https://via.placeholder.com/400x200?text=Lakeside+Hall",
  },
  {
    id: 3,
    name: "Downtown Studio",
    description: "An intimate space for workshops and meetups.",
    rating: 4.2,
    capacity: 150,
    location: "New York",
    eventType: "Workshop",
    imageUrl: "https://via.placeholder.com/400x200?text=Downtown+Studio",
  },
  {
    id: 4,
    name: "Viejas Arena",
    description: "A spacious venue ideal for concerts and sports.",
    rating: 4.8,
    capacity: 10000,
    location: "San Diego",
    eventType: "Concert",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.sdnews.com%2Fwp-content%2Fuploads%2F20240426071905%2Fsdsu-viejas-pic-1-lmc-.jpg&f=1&nofb=1&ipt=7b3c44e32b7d024dd732881ac330babca75c24b6f38de77dffaabee88005c53c",
  },
  {
    id: 5,
    name: "Grand Pavilion",
    description: "Modern architecture with multi-purpose use.",
    rating: 4.7,
    capacity: 1200,
    location: "Chicago",
    eventType: "Conference",
    imageUrl: "https://via.placeholder.com/400x200?text=Grand+Pavilion",
  },
  {
    id: 6,
    name: "Harbor Conference Center",
    description: "Ideal for business events and networking.",
    rating: 4.4,
    capacity: 600,
    location: "Austin",
    eventType: "Conference",
    imageUrl: "https://via.placeholder.com/400x200?text=Harbor+Conference",
  },
  {
    id: 7,
    name: "Greenfield Grounds",
    description: "Open air venue great for festivals and outdoor sports.",
    rating: 4.6,
    capacity: 3000,
    location: "New York",
    eventType: "Festival",
    imageUrl: "https://via.placeholder.com/400x200?text=Greenfield+Grounds",
  },
];

export default function UserDashboard() {
  const [filters, setFilters] = useState({
    location: "",
    capacity: "",
    eventType: "",
    rating: "",
  });

  const filteredVenues = mockVenues.filter((venue) => {
    return (
      (!filters.location || venue.location.includes(filters.location)) &&
      (!filters.capacity || venue.capacity >= parseInt(filters.capacity)) &&
      (!filters.eventType || venue.eventType === filters.eventType) &&
      (!filters.rating || venue.rating >= parseFloat(filters.rating))
    );
  });

  return (
    <div className="min-h-screen bg-white-100 p-6">
      <nav className="bg-[#003049] shadow px-6 py-4 mb-6 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white">EventEz</h1>
        <div className="w-full sm:w-1/3 flex items-center border border-white rounded px-2">
          <Search className="text-white w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search venues..."
            className="flex-grow bg-transparent text-white placeholder-white focus:outline-none py-2"
          />
        </div>
        <Link href="/user-dashboard" className="text-blue-600 hover:underline">
          <button className="bg-white border-[#F77F00] text-[#003049] px-4 py-2 rounded-full font-semibold hover:opacity-90">
            My Dashboard
          </button>
        </Link>
      </nav>

      <h1 className="text-3xl font-bold mb-4">Available Venues</h1>

      <div className="flex flex-wrap gap-4 mb-6 bg-transparent border-none">
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
          className="border border-[#003049] text-[#003049]  p-2 rounded"
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
          placeholder="Min Rating"
          step="0.1"
          className="border border-[#003049] text-[#003049] p-2 rounded"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={venue.imageUrl}
              alt={venue.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{venue.name}</h2>
              <p className="text-black mb-2">{venue.description}</p>
              <p className="text-sm text-black mb-1 flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" /> {venue.rating}
              </p>
              <p className="text-sm text-black mb-3 flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-500" /> {venue.capacity}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    localStorage.setItem('selectedVenueId', venue.id.toString());
                    window.location.href = '/booking';
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Book Venue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

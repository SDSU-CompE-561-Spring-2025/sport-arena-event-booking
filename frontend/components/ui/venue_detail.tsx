// components/VenueDetail.tsx
'use client';
import Image from 'next/image';
import Gallery from './gallery';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { Star, Users, Search } from "lucide-react";
import Link from "next/link";

export default function VenueDetail({ venue }: any) {
  const router = useRouter();

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: '#EAE2B7' }}>
      <div className="min-h-screen bg-yellow-100 p-6">
      <nav className="bg-[#003049] shadow px-6 py-4 mb-6 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white">EventEz</h1>
        <div className="w-full sm:w-1/3 flex items-center border border-[#F77F00] rounded px-2">
          <Search className="text-white w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search venues..."
            className="flex-grow bg-transparent text-white placeholder-white focus:outline-none py-2"
          />
        </div>
        <Link href="/user-dashboard" className="text-blue-600 hover:underline">
          <button className="bg-[#F77F00] text-[#003049] px-4 py-2 rounded-full font-semibold hover:opacity-90">
            My Dashboard
          </button>
        </Link>
      </nav>
      </div>




      <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>
      <Gallery images={venue.images} />
      <div className="flex items-center gap-4 my-4">
        <span>⭐ {venue.rating} ({venue.reviews})</span>
        <span>👥 {venue.capacity}</span>
        <span>📐 {venue.size} sqft</span>
      </div>
      <p className="mb-6">{"About the Venue"}</p>
      <p className="mb-6">{venue.description}</p>

      <Button size="lg" onClick={() => router.push('/booking')}>
        Book Now
      </Button>

    </div>
  );
}
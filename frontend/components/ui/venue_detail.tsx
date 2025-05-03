// components/VenueDetail.tsx
'use client';
import Image from 'next/image';
import Gallery from './gallery';
import { Button } from './button';

export default function VenueDetail({ venue }: any) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>
      <Gallery images={venue.images} />
      <div className="flex items-center gap-4 my-4">
        <span>⭐ {venue.rating} ({venue.reviews})</span>
        <span>👥 {venue.capacity}</span>
        <span>📐 {venue.size} sqft</span>
      </div>
      <p className="mb-6">{venue.description}</p>
      <Button />
    </div>
  );
}
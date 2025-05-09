import { components } from "@/types/api";
import Link from "next/link";

type Venue = components["schemas"]["VenueResponse"];

export default async function VenuePage({ params }: { params: { slug: string } }) {
  const venue_id = params.slug;

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/venue/venues/${venue_id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return <div className="p-4 text-red-600 font-semibold">Venue not found</div>;
    }

    const venue: Venue = await res.json();

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl mt-6">
        <h1 className="text-3xl font-bold mb-4">{venue.name}</h1>

        {venue.image && (
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        <div className="space-y-2 text-gray-700">
          <p><strong>Location:</strong> {venue.location}</p>
          <p><strong>Type:</strong> {venue.event_type}</p>
          <p><strong>Hourly Rate:</strong> ${venue.hourly_rate}</p>
        </div>

        <div className="mt-6">
          <Link href={`/booking?venue_id=${venue.venue_id}`}>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded">
              Book Venue
            </button>
          </Link>
        </div>
      </div>
    );
  } catch (err) {
    console.error("Error loading venue:", err);
    return <div className="p-4 text-red-600">Failed to load venue</div>;
  }
}

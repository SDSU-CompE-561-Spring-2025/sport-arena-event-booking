import VenueDetail from '@/components/ui/venue_detail';
import { Star, Users } from "lucide-react";
import { components } from "@/types/api";

// type Venue = {
//     name: string;
//     description: string;
//     rating?: number;
//     reviews?: number;
//     capacity?: number;
//     size?: number;
//     images?: string[];
// };

// const venueData: Record<string, Venue> = {
//     'sunset-arena': {
//         name: 'Sunset Arena',
//         // rating: 4.8,
//         reviews: 120,
//         capacity: 5000,
//         size: 1800,
//         images: ['/venue_image_placeholder.png', '/venue_image_placeholder.png', '/venue_image_placeholder.png'],
//         description: 'A spacious venue ideal for concerts and sports.',
//     },
//     'lakeside-hall': {
//         name: 'Lakeside Hall',
//         // rating: 4.8,
//         reviews: 120,
//         capacity: 5000,
//         size: 1800,
//         images: ['/venue_image_placeholder.png', '/venue_image_placeholder.png', '/venue_image_placeholder.png'],
//         description: 'Perfect for weddings and large corporate events.',
//     }
// };

type Venue = components["schemas"]["VenueResponse"];

export default async function VenuePage({ params }: { params: { id: string } }) {
    const res = await fetch(`http://localhost:8000/venue/venues/${params.id}`, {
        cache: "no-store",
        });

        if (!res.ok) return <div>Venue not found</div>;

        const venue: Venue = await res.json();

        return <VenueDetail venue={venue} />;
}
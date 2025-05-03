import VenueDetail from '@/components/ui/venue_detail';
import { Star, Users } from "lucide-react";

type Venue = {
    name: string;
    description: string;
    rating?: number;
    reviews?: number;
    capacity?: number;
    size?: number;
    images?: string[];
};

const venueData: Record<string, Venue> = {
    'sunset-arena': {
        name: 'Sunset Arena',
        rating: 4.8,
        reviews: 120,
        capacity: 5000,
        size: 1800,
        images: ['/public/venue_image_placeholder.png', '/app/frontend/public/venue_image_placeholder.png'],
        description: 'A spacious venue ideal for concerts and sports.',
    },
    'lakeside-hall': {
        name: 'Lakeside Hall',
        description: 'Perfect for weddings and large corporate events.',
    }
};


export default async function VenuePage({ params }: { params: { slug: string } }) {
    const param = await params;

    const venue = venueData[param.slug]; 

    if (!venue) return <div>Venue not found</div>;

    return <VenueDetail venue={venue} />;
}
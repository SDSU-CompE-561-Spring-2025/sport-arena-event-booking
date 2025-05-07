import VenueDetail from '@/components/ui/venue_detail';
import { Star, Users } from "lucide-react";
import { components } from "@/types/api";

type Venue = components["schemas"]["VenueResponse"];

export default async function VenuePage({ params }: { params: { slug: string } }) {
    const my_params = await params
    const res = await fetch(`http://localhost:8000/venue/venues/${my_params.slug}`, {
        cache: "no-store",
        });

        if (!res.ok) return <div>Venue not found</div>;

        const venue: Venue = await res.json();

        return <VenueDetail venue={venue} />;
}
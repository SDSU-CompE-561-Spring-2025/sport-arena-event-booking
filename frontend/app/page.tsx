import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex justify-center">
        <div className="rounded-lg">
          <Image
            src="/icon.png"
            alt="Arena Booking"
            width={500}
            height={300}
            className="rounded-md"
          />
        </div>
      </section>

      {/* Description */}
      <section className="text-center max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-[#003049] mb-4">EventEz</h2>
        <p className="text-gray-700 text-lg">
          EventEz is your one-stop platform to find, book, and manage venues for sports, concerts, events, and more.
          Whether you're hosting a local tournament or a live gig, we make booking fast and hassle-free.
        </p>

        <div className="mt-6 flex justify-center">
          <Link href="/home-page">
            <Button size="lg">View Available Venues</Button>
          </Link>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-xl font-semibold mb-4 text-[#003049]">Featured Venues</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: 250, name: "City Sports Arena", image: "/venue-4.jpg" },
            { id: 251, name: "Sunset Stadium", image: "/venue-2.jpg" },
            { id: 254, name: "Downtown Hall", image: "/venue-3.jpg" },
          ].map((venue) => (
            <Card key={venue.id}>
              <CardHeader>
                <Image
                  src={venue.image}
                  alt={venue.name}
                  width={400}
                  height={250}
                  className="rounded-md"
                  unoptimized
                />
                <CardTitle className="mt-2 text-center">{venue.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Link href={`/venues/${venue.id}`}>
                  <Button>Book Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

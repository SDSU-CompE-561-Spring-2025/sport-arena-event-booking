import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Hero Section /}
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

      {/ Description */}
      <section className="text-center max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-[#003049] mb-4">EventEz</h2>
        <p className="text-gray-700 text-lg">
          EventEz is your one-stop platform to find, book, and manage venues for sports, concerts, events, and more.
          Whether you're hosting a local tournament or a live gig, we make booking fast and hassle-free.
        </p>
      </section>


    </>
  );
}

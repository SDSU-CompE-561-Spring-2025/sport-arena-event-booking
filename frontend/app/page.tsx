import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-yellow-100 p-6">
      {/* Header */}
      <header className="bg-blue-950 text-white p-4 flex justify-between items-center rounded-md">
        <h1 className="text-xl font-bold">EventEz</h1>
        <div className="space-x-2">
          <Link href="/login">
            <Button variant="secondary">LOGIN</Button>
          </Link>
          <Link href="/signup">
            <Button>SIGNUP</Button>
          </Link>
        </div>
      </header>

      {/* Centered Image */}
      <section className="mt-10 flex justify-center">
        <div className="bg-orange-500 rounded-lg shadow-lg p-4">
          <Image
            src="/arena.png"
            alt="Arena Booking"
            width={500}
            height={300}
            className="rounded-md"
          />
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-blue-950 text-white px-4 py-2 text-sm flex justify-between items-center shadow-md h-14">
      <Link href="/">
        <h1 className="text-xl font-bold">EventEz</h1>
      </Link>

      <div className="space-x-2">
        {isLoggedIn ? (
          <>
            <Link href="/user-dashboard">
              <Button variant="secondary">Dashboard</Button>
            </Link>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Signup</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { User } from "lucide-react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<number | null>(null);
  const [initials, setInitials] = useState<string>("");
  const [hasMounted, setHasMounted] = useState(false);


 useEffect(() => {
  setHasMounted(true);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('user_role');
  const fname = localStorage.getItem('first_name') || "";
  const lname = localStorage.getItem('last_name') || "";

  setIsLoggedIn(!!token);
  if (role !== null) setUserRole(parseInt(role));

  // const firstInitial = fname.charAt(0).toUpperCase();
  // const lastInitial = lname.charAt(0).toUpperCase();
  // setInitials(`${firstInitial}${lastInitial}`);
}, []);

useEffect(() => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("user_role");

  setIsLoggedIn(!!token);
  if (role !== null) setUserRole(parseInt(role));

  const fetchInitials = async () => {
    try {
      const res = await fetch("http://localhost:8000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await res.json();
      const firstInitial = user.first_name?.charAt(0).toUpperCase() || "U";
      const lastInitial = user.last_name?.charAt(0).toUpperCase() || "U";
      setInitials(`${firstInitial}${lastInitial}`);
    } catch (err) {
      setInitials("U");
    }
  };

  if (token) fetchInitials();
}, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-blue-950 text-white px-4 py-2 text-sm flex justify-between items-center shadow-md h-14">
      <Link href="/">
        <h1 className="text-xl font-bold text-white">EventEz</h1>
      </Link>

      <div className="flex items-center gap-2">
        {userRole === 0 && (
          <>
            <Link href="/create-venue">
              <Button size="sm" className="flex items-center gap-1 text-white bg-transparent border border-white hover:bg-white hover:text-blue-950">
                + Add Venue
              </Button>
            </Link>

            <Link href="/user-dashboard">
              <Button size="sm" className="flex items-center gap-1 text-white bg-transparent border border-white hover:bg-white hover:text-blue-950">
                My Venues
              </Button>
            </Link>

            {/* <Link href="/venue-details">
             <Button size="sm" className="flex items-center gap-1">
                Venue Details
              </Button>
            </Link> */}
          </>
        )}

        {isLoggedIn ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                size="sm"
                className="bg-white text-blue-950 w-8 h-8 p-0 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-sm"
              >
                {hasMounted && initials ? initials : "U"}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              sideOffset={8}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-1 z-50"
            >
              <DropdownMenu.Item
                onSelect={() => router.push('/view-profile')}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-md font-medium text-blue-950"
              >
                View Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => router.push('/update-user?edit=true')}
                className="cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-md text-blue-950"
              >
                Update Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={handleLogout}
                className="cursor-pointer px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <>
            <Link href="/login">
              {/* <Button size="sm" variant="secondary" className="text-white">Login</Button> */}
              <Button size="sm" className="text-white bg-transparent border border-white hover:bg-white hover:text-blue-950">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="text-white bg-transparent border border-white hover:bg-white hover:text-blue-950">Signup</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

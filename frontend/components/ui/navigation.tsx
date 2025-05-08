'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, User, Calendar, Home } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Navigation() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-[#003049]'
    } rounded-none`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/home-page" className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${isScrolled ? 'text-[#003049]' : 'text-white'}`}>
              EventEz
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className={`relative w-full ${
              isScrolled ? 'bg-gray-100' : 'bg-white/10'
            } rounded-full transition-colors duration-200`}>
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isScrolled ? 'text-gray-500' : 'text-white'
              }`} />
              <input
                type="text"
                placeholder="Search venues..."
                className={`w-full pl-10 pr-4 py-2 rounded-full bg-transparent ${
                  isScrolled ? 'text-gray-900 placeholder-gray-500' : 'text-white placeholder-white/70'
                } focus:outline-none focus:ring-2 focus:ring-[#F77F00]/50`}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/home-page" className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}>
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link href="/my-booking" className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-200 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}>
              <Calendar className="w-5 h-5" />
              <span>My Bookings</span>
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className={`p-2 rounded-full transition-colors duration-200 ${
                  isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                }`}>
                  <User className={`w-5 h-5 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                sideOffset={8}
                className="bg-white rounded-lg shadow-lg p-2 min-w-[200px] border border-gray-100"
              >
                <DropdownMenu.Item
                  onSelect={() => router.push('/user-dashboard')}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => router.push('/update-user')}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer"
                >
                  <span>Settings</span>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />
                <DropdownMenu.Item
                  onSelect={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                >
                  <span>Logout</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </nav>
  );
} 
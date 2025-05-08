import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  isScrolled?: boolean;
}

export function Logo({ className = '', isScrolled = false }: LogoProps) {
  return (
    <Link href="/home-page" className={`flex items-center space-x-2 ${className}`}>
      <div className={`relative flex items-center justify-center ${isScrolled ? 'text-[#003049]' : 'text-white'}`}>
        {/* Main logo container */}
        <div className={`relative w-12 h-12 rounded-xl transform rotate-45 ${
          isScrolled ? 'bg-[#F77F00]' : 'bg-white'
        } transition-all duration-300`}>
          {/* EZ Letters */}
          <div className="absolute inset-0 flex items-center justify-center -rotate-45">
            <span className={`text-2xl font-black tracking-tighter ${
              isScrolled ? 'text-white' : 'text-[#003049]'
            }`}>
              EZ
            </span>
          </div>
        </div>
        {/* Decorative elements */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
          isScrolled ? 'bg-[#F77F00]' : 'bg-white'
        } transition-all duration-300`} />
        <div className={`absolute -bottom-1 -left-1 w-2 h-2 rounded-full ${
          isScrolled ? 'bg-[#F77F00]' : 'bg-white'
        } transition-all duration-300`} />
      </div>
      <span className={`text-2xl font-bold tracking-wide ${
        isScrolled ? 'text-[#003049]' : 'text-white'
      }`}>
        Event<span className="text-[#F77F00]">Ez</span>
      </span>
    </Link>
  );
} 
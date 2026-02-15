
import React from 'react';
import { Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-black/10">
      <div className="max-w-[1800px] mx-auto px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo matching the original HYRUP aesthetic */}
          <div className="flex items-center">
            <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 25C15 19.4772 19.4772 15 25 15H45V45H15V25Z" fill="#ff5c35"/>
              <path d="M15 55H45V85H25C19.4772 85 15 80.5228 15 75V55Z" fill="#ff5c35"/>
              <path d="M55 15H75C80.5228 15 85 19.4772 85 25V75C85 80.5228 80.5228 85 75 85H55V15Z" fill="#ff5c35"/>
            </svg>
            <span className="text-4xl font-black tracking-tighter text-foreground ml-2">HYRUP</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="btn btn-nav btn-primary">Fix Forward</a>
          <a href="#" className="btn btn-nav btn-outline">Careers</a>
          <a href="#" className="btn btn-nav btn-primary">Join Now</a>
          <div className="w-[2px] h-10 bg-black/10 mx-2"></div>
          <button className="btn btn-nav btn-dark-toggle flex items-center gap-3">
            <Moon size={18} strokeWidth={2.5} />
            <span className="font-bold">Dark</span>
          </button>
        </div>

        {/* Mobile menu - simplified */}
        <div className="lg:hidden">
            <a href="#" className="btn btn-primary px-6 py-3 text-sm">Join</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

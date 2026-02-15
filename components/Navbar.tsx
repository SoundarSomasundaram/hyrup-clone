
import React from 'react';
import { Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-black/10">
      <div className="max-w-[1800px] mx-auto px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo matching the original HYRUP aesthetic */}
          <div className="flex items-center">
            <img src="/logo.webp" alt="HYRUP Logo" className="w-[42px] h-[42px]" />
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

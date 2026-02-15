
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto px-8 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo matching the original HYRUP aesthetic */}
          <div className="flex items-center">
            <img src="/logo.webp" alt="HYRUP Logo" className="w-[42px] h-[42px]" />
            <span className="text-4xl font-black tracking-tighter text-foreground ml-2 transition-colors duration-300">HYRUP</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="btn btn-nav btn-primary">Fix Forward</a>
          <a href="#" className="btn btn-nav btn-outline dark:border-white dark:text-white dark:hover:bg-white/10">Careers</a>
          <a href="#" className="btn btn-nav btn-primary">Join Now</a>
          <div className="w-[2px] h-10 bg-black/10 dark:bg-white/10 mx-2"></div>
          <button
            onClick={toggleTheme}
            className="btn btn-nav btn-dark-toggle flex items-center gap-3 dark:border-white/50 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all"
          >
            {isDark ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
            <span className="font-bold">{isDark ? 'Light' : 'Dark'}</span>
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

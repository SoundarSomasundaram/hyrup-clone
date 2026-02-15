
import React from 'react';
import { Instagram, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-foreground/5 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.webp" alt="HYRUP Logo" className="w-6 h-6" />
              <span className="text-2xl font-bold tracking-tight">HYRUP</span>
            </div>
            <p className="text-foreground/50 max-w-xs mb-8 leading-relaxed">
              Built by students, for students. Get hired for your skills, not your degree.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:text-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase system-text-sm tracking-[0.2em] opacity-40">Product</h4>
            <ul className="space-y-4 text-foreground/60 font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">For Students</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Find Jobs</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Find Mentors</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase system-text-sm tracking-[0.2em] opacity-40">Company</h4>
            <ul className="space-y-4 text-foreground/60 font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Fix Forward</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase system-text-sm tracking-[0.2em] opacity-40">Support</h4>
            <ul className="space-y-4 text-foreground/60 font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="system-text-sm opacity-40">© {new Date().getFullYear()} HYRUP. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="system-text-sm opacity-40 flex items-center gap-2">
              Made with <Heart size={14} className="text-accent fill-accent" /> by students
            </span>
            <a href="#" className="system-text-sm opacity-20 hover:opacity-40 transition-opacity">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative z-10 pt-48 md:pt-56 pb-16 md:pb-24 px-8">
      <div className="max-w-[1400px] mx-auto text-center">
        <div className="inline-block mb-10 px-8 py-2.5 bg-black/5 border border-black/10 rounded-sm">
          <span className="system-text-sm text-accent flex items-center justify-center gap-3">
            <span className="text-base">🎓</span> FREE FOR STUDENTS
          </span>
        </div>
        
        <h1 className="headline-xl mb-8 text-foreground">
          Get Hired For Your <span className="text-[#ff7c5c]">Skills</span>,<br />
          Not Your Degree
        </h1>
        
        <p className="text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto mb-14 leading-snug font-medium tracking-tight">
          The student career launchpad where your abilities matter more than your college name. 
          Connect with mentors, build real skills, and land opportunities that actually fit you.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#" className="btn bg-accent text-black border-2 border-black px-12 py-5 text-base tracking-widest font-bold w-full sm:w-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            Get Started Free →
          </a>
          <a href="#features" className="btn bg-black text-white border-2 border-black px-12 py-5 text-base tracking-widest font-bold w-full sm:w-auto shadow-[8px_8px_0px_0px_rgba(255,92,53,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

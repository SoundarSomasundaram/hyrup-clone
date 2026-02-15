
import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const FixForward: React.FC = () => {
  return (
    <section className="relative z-10 py-24 md:py-32 px-4 md:px-8 border-y border-black/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-2 bg-accent/15 border border-accent/30 rounded-full">
            <span className="system-text-sm text-accent font-bold tracking-[0.2em]">HYRUP PRESENTS</span>
          </div>
          <h2 className="headline-lg mb-6 leading-tight">
            <span className="text-accent">FIX FORWARD</span> Challenge
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed font-medium">
            Healthcare's broken? Fix it. Education system outdated? Rebuild it. Climate crisis? Solve it. 
            See something broken in your world? Don't just complain — fix it and pass it forward.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Main Content Card with Glassmorphism */}
          <div className="relative overflow-hidden bg-white/15 backdrop-blur-xl border border-white/25 p-10 rounded-3xl shadow-2xl shadow-black/5 group">
            <div className="absolute -inset-24 bg-accent/5 blur-3xl rounded-full opacity-50 pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="headline-md mb-6">The Meaning Behind FixForward</h3>
              <div className="space-y-6 text-foreground/70 leading-relaxed font-medium text-lg">
                <p>There's a saying — when someone helps you, you don't just thank them. You help someone else in need. The cycle continues.</p>
                <p>FixForward is built on the same idea. You see something broken in society? Fix it. Not just for yourself, but for the next generation. Forward the fix.</p>
                <p>We're looking for problem-solvers who see issues in their daily lives and have the courage to create solutions that ripple forward.</p>
              </div>
              
              <ul className="mt-12 space-y-5">
                {[
                  'Build tech that actually matters', 
                  'Vibe with industry mentors', 
                  'Win cash + flex your project', 
                  'Network with builders'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 group/item">
                    <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center group-hover/item:bg-accent group-hover/item:text-black transition-all">
                      <ArrowRight size={14} />
                    </div>
                    <span className="font-bold text-foreground/80 tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Status Column */}
          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl flex items-center gap-6 shadow-lg shadow-black/5 group hover:bg-white/30 transition-all">
              <div className="w-16 h-16 shrink-0 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:scale-105 transition-all">
                <Calendar className="text-accent group-hover:text-black transition-colors" size={32} />
              </div>
              <div>
                <h4 className="font-black text-xl mb-1 tracking-tight">Registration Closes</h4>
                <p className="system-text-sm opacity-60 font-bold">Last Date: 25th February</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl flex items-center gap-6 shadow-lg shadow-black/5 group hover:bg-white/30 transition-all">
              <div className="w-16 h-16 shrink-0 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:scale-105 transition-all">
                <span className="text-2xl font-black text-accent group-hover:text-black transition-colors">₹3L</span>
              </div>
              <div>
                <h4 className="font-black text-xl mb-1 tracking-tight">Prize Pool</h4>
                <p className="system-text-sm opacity-60 font-bold">Cash, awards, jobs & internships</p>
              </div>
            </div>

            <div className="pt-4">
              <a href="#" className="w-full bg-accent text-black border-2 border-black px-10 py-7 text-lg tracking-widest font-black rounded-xl flex items-center justify-center gap-3 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase">
                REGISTER FOR FIX FORWARD <ArrowRight size={24} strokeWidth={3} />
              </a>
            </div>
            
            <p className="text-center system-text-sm opacity-40 font-bold tracking-widest">
              [ OPEN FOR ALL COLLEGE STUDENTS ]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FixForward;

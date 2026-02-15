
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="relative z-10 py-24 px-4 md:px-8 bg-foreground/[0.02]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="system-text-sm uppercase tracking-[0.2em] opacity-40 mb-4 block">[ ABOUT HYRUP ]</span>
          <h2 className="headline-lg mb-6 leading-tight">
            We're Fixing The <span className="text-accent">Broken System</span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Built by students, for students. We're tired of LinkedIn DMs that go nowhere, 
            job applications that disappear into black holes, and a system that values college names over actual skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-foreground/[0.04] border border-foreground/10 p-10 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 bg-foreground/40 rounded-sm"></div>
              <span className="system-text-sm uppercase tracking-widest opacity-60">THE PROBLEM</span>
            </div>
            <h3 className="headline-md mb-4">Your Resume Gets Ignored</h3>
            <p className="text-lg opacity-70 leading-relaxed">
              Cold emails, endless scrolling, zero responses. The traditional job hunt is broken. 
              Your tier-3 college name shouldn't decide your career.
            </p>
          </div>

          <div className="bg-accent/5 border border-accent/20 p-10 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 bg-accent rounded-sm"></div>
              <span className="system-text-sm uppercase tracking-widest text-accent font-bold">THE SOLUTION</span>
            </div>
            <h3 className="headline-md mb-4">Skills Over Degrees</h3>
            <p className="text-lg opacity-70 leading-relaxed">
              HYRUP matches you with opportunities based on what you can actually do. 
              Real mentors. Real skills. Real jobs. No gatekeeping.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

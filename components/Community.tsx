
import React from 'react';

const ProgressBar: React.FC<{ label: string; count: string; percent: string }> = ({ label, count, percent }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium opacity-80">{label}</span>
      <span className="text-accent font-bold">{count} students</span>
    </div>
    <div className="w-full h-3 bg-foreground/5 rounded-full overflow-hidden">
      <div 
        className="h-full bg-accent rounded-full transition-all duration-1000 ease-out" 
        style={{ width: percent }}
      />
    </div>
  </div>
);

const Community: React.FC = () => {
  return (
    <section className="relative z-10 py-32 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="system-text-sm uppercase tracking-[0.2em] opacity-40 mb-4 block">[ STUDENT COMMUNITY ]</span>
          <h2 className="headline-lg mb-6 leading-tight">
            Join <span className="text-accent">3,154+</span> Students Already On HYRUP
          </h2>
          <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
            Students from colleges across India are already building their future with HYRUP.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-foreground/[0.03] border border-foreground/5 p-10 rounded-2xl">
            <h3 className="headline-md mb-8">Top Active Colleges</h3>
            <ProgressBar label="SASTRA University" count="834" percent="100%" />
            <ProgressBar label="JIT" count="676" percent="81%" />
            <ProgressBar label="PEC" count="559" percent="67%" />
            <ProgressBar label="Manipur University" count="358" percent="43%" />
          </div>

          <div className="space-y-6">
             <div className="bg-accent/5 border border-accent/20 p-10 rounded-2xl">
                <h3 className="headline-md mb-8">Community Growth</h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="headline-lg text-accent">3,154</span>
                      <span className="system-text-sm text-accent font-bold">+12% this month</span>
                    </div>
                    <p className="opacity-50 mt-1">Total Active Students</p>
                  </div>
                  <div className="h-px bg-foreground/10" />
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="headline-lg text-accent">500+</span>
                      <span className="system-text-sm text-accent font-bold tracking-tight">hiring now</span>
                    </div>
                    <p className="opacity-50 mt-1">Partner Companies</p>
                  </div>
                </div>
             </div>

             <div className="bg-foreground bg-opacity-[0.98] text-white p-10 rounded-2xl relative overflow-hidden group">
                <div className="relative z-10">
                   <h3 className="headline-md mb-4 italic">"HYRUP helped me get my first internship at a startup even before my final exams."</h3>
                   <p className="opacity-60">— Rahul S., SASTRA Student</p>
                </div>
                <div className="absolute -bottom-10 -right-10 text-white/5 text-9xl font-black">“</div>
             </div>
          </div>
        </div>

        <div className="mt-12 bg-linear-to-r from-accent/20 via-accent/10 to-accent/20 border border-accent/30 p-12 text-center rounded-2xl">
          <h3 className="headline-lg mb-4">100% Free. Forever.</h3>
          <p className="text-lg opacity-70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join thousands of students who are already using HYRUP to build their careers. 
            No hidden fees, no premium plans, no credit card required.
          </p>
          <a href="#" className="btn btn-primary px-12 py-5 rounded-lg text-lg inline-block">START FOR FREE →</a>
        </div>
      </div>
    </section>
  );
};

export default Community;

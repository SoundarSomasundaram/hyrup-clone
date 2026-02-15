
import React from 'react';

const FeatureCard: React.FC<{ emoji: string; title: string; desc: string }> = ({ emoji, title, desc }) => (
  <div className="relative overflow-hidden bg-white/15 backdrop-blur-xl border border-white/20 p-8 rounded-2xl hover:border-accent/40 hover:bg-white/25 transition-all duration-300 group shadow-lg shadow-black/5">
    {/* Subtle Glow Effect on Hover */}
    <div className="absolute -inset-24 bg-accent/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10">
      <div className="w-16 h-16 bg-white/20 border border-white/30 rounded-xl flex items-center justify-center mb-8 group-hover:bg-accent/20 group-hover:border-accent/30 group-hover:scale-110 transition-all duration-300">
        <span className="text-4xl">{emoji}</span>
      </div>
      <h3 className="headline-md mb-4 group-hover:text-accent transition-colors duration-300">{title}</h3>
      <p className="text-foreground/70 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="relative z-10 py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="system-text-sm uppercase tracking-[0.2em] opacity-50 mb-4 block">[ PLATFORM FEATURES ]</span>
          <h2 className="headline-lg mb-6 leading-tight">
            Everything You Need To <span className="text-accent">Launch Your Career</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We built the tools we wished we had. Professional features for the next generation of builders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            emoji="🎯" 
            title="Skill-Based Profiles" 
            desc="Showcase what you can actually do, not where you studied. Build a portfolio that proves your worth through actual output." 
          />
          <FeatureCard 
            emoji="⚡" 
            title="5-Minute Skill Proof" 
            desc="Quick assessments designed to showcase your abilities to top employers. Validate your expertise without the friction." 
          />
          <FeatureCard 
            emoji="🤖" 
            title="Smart Job Matching" 
            desc="AI-powered connections that look at your projects and interests, not just keywords. Real fit for real people." 
          />
          <FeatureCard 
            emoji="🎓" 
            title="Mentor-Led Communities" 
            desc="Join exclusive circles led by industry veterans. Get the inside track on how the industry really works." 
          />
          <FeatureCard 
            emoji="🚀" 
            title="Early Access Jobs" 
            desc="Access high-growth opportunities before they hit the public boards. Stay ahead of the curve with our direct feed." 
          />
          <FeatureCard 
            emoji="💬" 
            title="Direct Connections" 
            desc="Skip the gatekeepers. Our platform facilitates meaningful conversations between talent and those who hire them." 
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

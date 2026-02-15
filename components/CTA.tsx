
import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="relative z-10 py-32 px-4 md:px-8 bg-foreground/[0.04]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="headline-xl mb-6">
          Ready To Launch Your <span className="text-accent">Career?</span>
        </h2>
        <p className="text-xl text-foreground/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join 3,154+ students who are getting hired for their skills, not their degrees.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#" className="btn btn-primary px-12 py-5 text-xl w-full sm:w-auto rounded-lg shadow-xl shadow-accent/25">
            JOIN HYRUP NOW →
          </a>
        </div>
        <p className="system-text-sm opacity-40 mt-8 tracking-wide uppercase">
          No credit card required • 100% free forever • 2 min setup
        </p>
      </div>
    </section>
  );
};

export default CTA;


import React from 'react';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="bg-foreground/[0.03] border border-foreground/10 p-8 rounded hover:border-accent/30 transition-colors">
    <div className="headline-lg text-accent mb-2">{value}</div>
    <div className="system-text-sm opacity-60 uppercase tracking-wider">{label}</div>
  </div>
);

const Stats: React.FC = () => {
  return (
    <section className="relative z-10 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value="3,154+" label="Students Connected" />
        <StatCard value="500+" label="Partner Companies" />
        <StatCard value="2K+" label="Active Jobs" />
        <StatCard value="100%" label="Free Forever" />
      </div>
    </section>
  );
};

export default Stats;

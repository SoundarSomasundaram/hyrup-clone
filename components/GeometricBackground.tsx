
import React from 'react';

const FloatingShape: React.FC<{ 
  className?: string; 
  children: React.ReactNode; 
  animationClass?: string 
}> = ({ className, children, animationClass = "animate-float" }) => (
  <div className={`absolute pointer-events-none ${animationClass} ${className}`}>
    {children}
  </div>
);

const DoubleCircle: React.FC<{ size: number; opacity: string }> = ({ size, opacity }) => (
  <div className={`relative ${opacity}`} style={{ width: size, height: size }}>
    <div className="absolute inset-0 border-2 border-black rounded-full" />
    <div className="absolute inset-[15%] border border-black rounded-full" />
  </div>
);

const DoubleSquare: React.FC<{ size: number; opacity: string; rotate?: string }> = ({ size, opacity, rotate = "rotate-0" }) => (
  <div className={`relative ${opacity} ${rotate}`} style={{ width: size, height: size }}>
    <div className="absolute inset-0 border-2 border-black" />
    <div className="absolute inset-[15%] border border-black" />
  </div>
);

const Star: React.FC<{ size: number; opacity: string; lines?: number }> = ({ size, opacity, lines = 12 }) => (
  <div className={`relative ${opacity}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black">
      {[...Array(lines)].map((_, i) => (
        <line 
          key={i} 
          x1="50" y1="50" x2="50" y2="0" 
          transform={`rotate(${(360 / lines) * i} 50 50)`} 
          strokeWidth="1.5" 
        />
      ))}
    </svg>
  </div>
);

const GeometricBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Left Area */}
      <FloatingShape className="top-[10%] left-[5%]" animationClass="animate-float-slow">
        <DoubleCircle size={180} opacity="opacity-[0.06]" />
      </FloatingShape>

      <FloatingShape className="top-[25%] left-[20%]" animationClass="animate-spin-slow">
        <Star size={120} opacity="opacity-[0.04]" lines={16} />
      </FloatingShape>

      {/* Top Right Area */}
      <FloatingShape className="top-[15%] right-[8%]" animationClass="animate-float">
        <DoubleSquare size={140} opacity="opacity-[0.05]" rotate="rotate-[15deg]" />
      </FloatingShape>

      <FloatingShape className="top-[40%] right-[25%]" animationClass="animate-float-fast">
        <DoubleCircle size={100} opacity="opacity-[0.07]" />
      </FloatingShape>

      {/* Mid Section - Keeping significant gap */}
      <FloatingShape className="top-[55%] left-[10%]" animationClass="animate-float">
        <DoubleSquare size={120} opacity="opacity-[0.04]" rotate="-rotate-[10deg]" />
      </FloatingShape>

      <FloatingShape className="top-[50%] right-[5%]" animationClass="animate-spin-slow">
        <Star size={200} opacity="opacity-[0.03]" lines={24} />
      </FloatingShape>

      {/* Bottom Section */}
      <FloatingShape className="bottom-[15%] left-[18%]" animationClass="animate-float-slow">
        <Star size={150} opacity="opacity-[0.05]" lines={12} />
      </FloatingShape>

      <FloatingShape className="bottom-[20%] right-[12%]" animationClass="animate-float">
        <DoubleSquare size={160} opacity="opacity-[0.06]" rotate="rotate-[35deg]" />
      </FloatingShape>

      <FloatingShape className="bottom-[5%] left-[40%]" animationClass="animate-float-fast">
        <DoubleCircle size={80} opacity="opacity-[0.04]" />
      </FloatingShape>
      
    </div>
  );
};

export default GeometricBackground;

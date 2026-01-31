import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
  animationDelay: number;
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 150;

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-foreground animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
      
      {/* Gradient overlays for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, hsl(220 88% 50% / 0.08) 0%, transparent 50%)",
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 80% 20%, hsl(260 70% 50% / 0.05) 0%, transparent 40%)",
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 20% 80%, hsl(200 80% 50% / 0.04) 0%, transparent 40%)",
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, hsl(0 0% 0% / 0.3) 100%)",
        }}
      />
    </div>
  );
};

export default StarryBackground;

import React from "react";

interface CurvedBorderCardProps {
  children: React.ReactNode;
  className?: string;
  curveIntensity?: number;
}

const CurvedBorderCard: React.FC<CurvedBorderCardProps> = ({
  children,
  className = "",
  curveIntensity = 0.3,
}) => {
  // Style pour la transformation incurvée
  const curvedStyle = {
    transform: `perspective(1000px) rotateY(${curveIntensity * 5}deg) scale(${
      1 - curveIntensity * 0.05
    })`,
    borderLeft: `${curveIntensity * 15}px solid transparent`,
    borderRight: `${curveIntensity * 15}px solid transparent`,
  };

  return (
    <div
      className={`relative p-6 bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
      style={curvedStyle}
    >
      {/* Effet de bordure incurvée */}
      <div
        className="absolute inset-0 border-2 border-transparent"
        style={{
          clipPath: `polygon(
            0% ${curveIntensity * 20}%, 
            10% 0%, 
            90% 0%, 
            100% ${curveIntensity * 20}%, 
            100% ${100 - curveIntensity * 20}%, 
            90% 100%, 
            10% 100%, 
            0% ${100 - curveIntensity * 20}%
          )`,
        }}
      ></div>

      {/* Contenu */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CurvedBorderCard;

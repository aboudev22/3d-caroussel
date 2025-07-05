import React from "react";
const App: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* Masque SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <clipPath id="clipCurve" clipPathUnits="objectBoundingBox">
            <path
              d="
              M0,0.2 
              Q0.5,0 1,0.2 
              L1,0.8 
              Q0.5,1 0,0.8 
              Z
            "
            />
          </clipPath>
        </defs>
      </svg>

      <section
        className="w-full bg-gradient-to-r h-64 from-pink-500 to-indigo-500 px-4 py-20 flex flex-wrap justify-center gap-6"
        style={{ clipPath: "url(#clipCurve)" }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} title={`Card ${i + 1}`} />
        ))}
      </section>
    </div>
  );
};

export default App;

const Card = ({ title }: { title: string }) => {
  return (
    <div className="w-48 h-full bg-white rounded-xl shadow-lg flex items-center justify-center text-lg font-semibold text-gray-800 hover:scale-105 transition-transform duration-300">
      {title}
    </div>
  );
};

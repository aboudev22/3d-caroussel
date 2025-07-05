import React from "react";
import CurvedBorderCard from "./curved";
const App: React.FC = () => {
  return (
    <div className="relative w-full">
      <section
        className="w-full bg-gradient-to-r h-64 from-pink-500 to-indigo-500 px-4 py-20 flex flex-wrap justify-center gap-6"
        style={{ clipPath: "url(#clipCurve)" }}
      >
        <CurvedBorderCard curveIntensity={0.4} className="text-gray-800">
          <h2 className="text-xl font-bold mb-2">Titre incurvé</h2>
          <p>
            Ce composant utilise des transformations CSS pour créer un effet de
            courbure plus sophistiqué qu'un simple border-radius.
          </p>
        </CurvedBorderCard>
      </section>
    </div>
  );
};

export default App;



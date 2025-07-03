import { useEffect, useRef, useState } from "react";

export default function App() {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const [cardTransforms, setCardTransforms] = useState<
    { angle: number; height: number }[]
  >([]);

  useEffect(() => {
    const updateTransforms = () => {
      if (!containerRef.current) return;

      const cards = containerRef.current.querySelectorAll(".card");
      const screenCenterX = window.innerWidth / 2;

      const maxAngle = 45;
      const maxDistance = window.innerWidth / 2;
      const minHeight = 200;
      const maxHeight = 220;

      const newTransforms = Array.from(cards).map((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(cardCenterX - screenCenterX);

        const angle = (-(cardCenterX - screenCenterX) / maxDistance) * maxAngle;
        const clampedAngle = Math.max(Math.min(angle, maxAngle), -maxAngle);

        const t = Math.min(distanceFromCenter / maxDistance, 1);
        const height = minHeight + (maxHeight - minHeight) * t;

        return { angle: clampedAngle, height };
      });

      setCardTransforms(newTransforms);
    };

    updateTransforms();

    window.addEventListener("resize", updateTransforms);
    window.addEventListener("scroll", updateTransforms, true);
    return () => {
      window.removeEventListener("resize", updateTransforms);
      window.removeEventListener("scroll", updateTransforms, true);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-white flex justify-center items-center overflow-hidden">
      <div
        ref={containerRef}
        className="w-full py-10 px-10 overflow-x-scroll flex gap-6 items-center"
        style={{
          perspective: "1000px",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const transform = cardTransforms[i] || { angle: 0, height: 208 };
          return (
            <div
              key={i}
              className="card flex items-center justify-center flex-none bg-violet-200 w-52 rounded-xl shadow-md transition-all duration-300"
              style={{
                transform: `rotateY(${transform.angle}deg)`,
                height: `${transform.height}px`,
                transformStyle: "preserve-3d",
              }}
            >
              <p className="text-xl font-semibold">item {i}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

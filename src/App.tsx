import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: "x",
  });

  return (
    <div className="relative w-screen h-screen bg-white flex justify-center items-center overflow-hidden">
      <div
        ref={containerRef}
        className="w-full py-10 px-[30vw] overflow-x-scroll flex gap-6 items-center hide-scrollbar snap-x snap-mandatory"
        style={{ perspective: "1000px" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <Card3D
            key={i}
            index={i}
            scrollProgress={scrollXProgress}
            totalItems={12}
          />
        ))}
      </div>
    </div>
  );
}

const Card3D = ({
  index,
  scrollProgress,
  totalItems,
}: {
  index: number;
  scrollProgress: MotionValue<number>;
  totalItems: number;
}) => {
  // Calcul de la position centrale relative
  const centerPos = index / totalItems;

  // Rotation progressive basée sur la distance au centre
  const rotateY = useTransform(
    scrollProgress,
    [0, 1],
    [-60 - centerPos * 120, 60 + (1 - centerPos) * 120],
    { clamp: false }
  );

  // Effets secondaires
  const height = useTransform(
    scrollProgress,
    [centerPos - 0.3, centerPos, centerPos + 0.3],
    [300, 200, 300]
  );

  const opacity = useTransform(
    scrollProgress,
    [centerPos - 0.4, centerPos - 0.2, centerPos + 0.2, centerPos + 0.4],
    [0.6, 1, 1, 0.6]
  );

  return (
    <motion.div
      className="flex items-center justify-center flex-none bg-red-200 w-52 rounded-xl shadow-lg snap-center"
      style={{
        rotateY,
        height,
        opacity,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
    >
      <p className="text-xl font-semibold">item {index}</p>
    </motion.div>
  );
};
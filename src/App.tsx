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
        className="w-full py-10 px-10 overflow-x-scroll flex gap-6 items-center hide-scrollbar"
        style={{ perspective: "1000px" }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          // Position relative de chaque carte dans le conteneur
          const start = i / 12;
          const end = (i + 1) / 12;

          return (
            <Card3D
              key={i}
              index={i}
              scrollProgress={scrollXProgress}
              range={[start, end]}
            />
          );
        })}
      </div>
    </div>
  );
}

const Card3D = ({
  index,
  scrollProgress,
  range,
}: {
  index: number;
  scrollProgress: MotionValue<number>;
  range: [number, number];
}) => {
  // Rotation basée sur la position dans le scroll
  const rotateY = useTransform(
    scrollProgress,
    [range[0], (range[0] + range[1]) / 2, range[1]],
    [-45, 0, 45]
  );

  // Hauteur basée sur la position
  const height = useTransform(
    scrollProgress,
    [range[0], (range[0] + range[1]) / 2, range[1]],
    [220, 200, 220]
  );

  // Scale pour l'effet de perspective
  const scale = useTransform(
    scrollProgress,
    [range[0], (range[0] + range[1]) / 2, range[1]],
    [0.9, 1, 0.9]
  );

  return (
    <motion.div
      className="flex items-center justify-center flex-none bg-red-200 w-52 rounded-xl shadow-md"
      style={{
        rotateY,
        height,
        scale,
        transformStyle: "preserve-3d",
      }}
    >
      <p className="text-xl font-semibold">item {index}</p>
    </motion.div>
  );
};

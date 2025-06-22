import { motion } from "framer-motion";
import { IMAGE_URLS } from "@/lib/constants/constants";
import clsx from "clsx";

interface PoniProps {
  initialPosition: {
    top: string;
    left?: string;
  };
  isAnimate: boolean | null;
  targetPosition: {
    top: string;
    left?: string;
  };
  direction?: "left" | "right";
  onAnimationComplete: () => void;
}

export const Poni = ({
  initialPosition,
  isAnimate,
  targetPosition,
  direction = "left",
  onAnimationComplete,
}: PoniProps) => {
  return (
    <motion.div
      className="absolute w-20 h-20"
      initial={isAnimate ? initialPosition : targetPosition}
      animate={targetPosition}
      transition={{
        duration: 1.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.img
        src={IMAGE_URLS.main.popo}
        alt="poni"
        className={clsx(
          "w-full h-full object-contain",
          direction === "right" ? "-scale-x-100" : "scale-x-100"
        )}
        transition={{
          duration: 1,
          repeat: 0,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

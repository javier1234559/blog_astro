import { useScroll, motion, useSpring } from "framer-motion";

interface ProgressScrollProps {
  color?: string;
  height?: number;
  position?: "top" | "bottom";
  zIndex?: number;
}

function ProgressScroll({
  color = "#3B82F6", 
  height = 8,
  position = "top",
  zIndex = 50,
}: ProgressScrollProps = {}) {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed left-0 right-0"
      style={{
        transformOrigin: "0%",
        scaleX,
        backgroundColor: color,
        height,
        [position]: 0,
        zIndex,
      }}
    />
  );
}

export default ProgressScroll;
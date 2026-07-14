import { motion, useMotionValue, useSpring } from "framer-motion";

export default function InteractiveBackground() {
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 25,
  });

  function handleMove(e) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  return (
    <div
      onMouseMove={handleMove}
      className="fixed inset-0 -z-10 overflow-hidden bg-[#0B0F19]"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div className="h-full w-full rounded-full bg-amber-400/10 blur-[120px]" />
      </motion.div>
    </div>
  );
}
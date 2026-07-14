import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveBackground() {
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0B0F19]">

      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f2a44_0%,#0B0F19_70%)]" />

      {/* Mouse Spotlight */}
      <motion.div
        animate={{
          left: mouse.x,
          top: mouse.y,
        }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 18,
        }}
        className="absolute h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div className="h-full w-full rounded-full bg-cyan-400/15 blur-[170px]" />
      </motion.div>

      {/* Secondary Glow */}
      <motion.div
        animate={{
          left: mouse.x * 0.8,
          top: mouse.y * 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 22,
        }}
        className="absolute h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div className="h-full w-full rounded-full bg-violet-500/10 blur-[220px]" />
      </motion.div>

      {/* Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
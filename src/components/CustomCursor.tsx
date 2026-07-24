import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']")
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full mix-blend-screen"
        animate={{
          x: pos.x - (hovering ? 24 : 4),
          y: pos.y - (hovering ? 24 : 4),
          width: hovering ? 48 : 8,
          height: hovering ? 48 : 8,
          borderColor: hovering ? "#7B61FF" : "#00F5FF",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.3 }}
        style={{
          border: "1.5px solid #00F5FF",
          boxShadow: "0 0 20px #00F5FF, 0 0 40px rgba(0,245,255,0.3)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-1.5 h-1.5 rounded-full bg-[#00F5FF]"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: "spring", stiffness: 800, damping: 30, mass: 0.2 }}
      />
    </>
  );
}

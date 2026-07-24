import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const nodes = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            ctx.strokeStyle = `rgba(0,245,255,${0.15 * (1 - d / 140)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(0,245,255,0.6)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050816]" />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
      {/* orbs */}
      <motion.div
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.25), transparent 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(0,245,255,0.22), transparent 70%)" }}
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(0,255,153,0.15), transparent 70%)" }}
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />
      {/* network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#050816_100%)]" />
    </div>
  );
}

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const SKILLS = [
  { name: "SIEM", pct: 95, status: "ONLINE", color: "#00FF99" },
  { name: "Linux", pct: 92, status: "ACTIVE", color: "#00F5FF" },
  { name: "Networking", pct: 88, status: "ACTIVE", color: "#00F5FF" },
  { name: "Threat Hunting", pct: 85, status: "RUNNING", color: "#7B61FF" },
  { name: "Incident Response", pct: 82, status: "READY", color: "#00FF99" },
  { name: "Wazuh", pct: 90, status: "ONLINE", color: "#00FF99" },
  { name: "Docker", pct: 80, status: "ACTIVE", color: "#00F5FF" },
  { name: "NodeJS", pct: 85, status: "ACTIVE", color: "#00F5FF" },
  { name: "NextJS", pct: 82, status: "ACTIVE", color: "#7B61FF" },
  { name: "React", pct: 88, status: "ACTIVE", color: "#00F5FF" },
  { name: "Supabase", pct: 84, status: "CONNECTED", color: "#00FF99" },
  { name: "PostgreSQL", pct: 78, status: "ACTIVE", color: "#7B61FF" },
];

export function SkillCommandCenter() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {SKILLS.map((s, i) => (
        <SkillCard key={s.name} skill={s} index={i} />
      ))}
    </div>
  );
}

function SkillCard({ skill, index }: { skill: typeof SKILLS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="group relative rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-4 overflow-hidden hover:border-[#00F5FF]/40"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${skill.color}20, transparent 70%)`,
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono text-white/40">MODULE_{String(index + 1).padStart(2, "0")}</div>
          <StatusBadge color={skill.color} label={skill.status} />
        </div>
        <div className="text-white font-semibold text-sm mb-1">{skill.name}</div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-black font-mono" style={{ color: skill.color }}>
            {skill.pct}
          </span>
          <span className="text-xs text-white/40">%</span>
        </div>
        <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + index * 0.04, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
          />
        </div>
        <Heartbeat color={skill.color} />
      </div>
    </motion.div>
  );
}

function StatusBadge({ color, label }: { color: string; label: string }) {
  return (
    <div
      className="flex items-center gap-1.5 px-1.5 py-0.5 rounded font-mono text-[9px]"
      style={{ background: color + "15", color, border: `1px solid ${color}40` }}
    >
      <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: color }} />
      {label}
    </div>
  );
}

function Heartbeat({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 20" className="w-full h-4 mt-2 opacity-60">
      <motion.path
        d="M0 10 L20 10 L25 4 L30 16 L35 10 L55 10 L60 6 L65 14 L70 10 L100 10"
        fill="none"
        stroke={color}
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

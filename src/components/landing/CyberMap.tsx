import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  label: string;
}

const NODES: Node[] = [
  { x: 20, y: 45, label: "US" },
  { x: 30, y: 40, label: "EU" },
  { x: 48, y: 55, label: "AF" },
  { x: 70, y: 40, label: "AS" },
  { x: 78, y: 65, label: "ID" },
  { x: 85, y: 55, label: "JP" },
  { x: 55, y: 30, label: "RU" },
  { x: 25, y: 70, label: "BR" },
];

export function CyberMap() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs font-mono text-white/50 tracking-widest">GLOBAL_THREAT_MAP</div>
          <div className="text-white font-semibold">Simulated attack surface</div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00FF99]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF99] animate-pulse" /> STREAMING
        </div>
      </div>

      <div className="relative aspect-[2/1] w-full">
        {/* dotted world silhouette (procedural) */}
        <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="dots" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.3" fill="rgba(0,245,255,0.25)" />
            </pattern>
          </defs>
          <ellipse cx="50" cy="25" rx="48" ry="22" fill="url(#dots)" />
          {NODES.map((a, i) =>
            NODES.slice(i + 1).map((b, j) => (
              <motion.line
                key={`${i}-${j}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="rgba(123,97,255,0.4)"
                strokeWidth="0.15"
                strokeDasharray="1 1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: (i + j) * 0.1 }}
              />
            ))
          )}
          {NODES.map((n, i) => (
            <g key={i}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="0.8"
                fill="#00F5FF"
                animate={{ r: [0.8, 1.6, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="0.8"
                fill="none"
                stroke="#00F5FF"
                strokeWidth="0.15"
                animate={{ r: [0.8, 4, 0.8], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              />
              <text x={n.x + 1.5} y={n.y + 0.5} fill="rgba(255,255,255,0.5)" fontSize="1.6" fontFamily="monospace">
                {n.label}
              </text>
            </g>
          ))}
        </svg>

        {/* radar sweep */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(0,245,255,0.5) 30deg, transparent 60deg)",
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

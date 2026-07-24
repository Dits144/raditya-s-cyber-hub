import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Line {
  type: "cmd" | "out";
  text: string;
}

const RESPONSES: Record<string, string[]> = {
  help: ["available: whoami, cat skills.txt, ls projects, cat about.md, sudo hack, clear"],
  whoami: ["Muhammad Raditya Anwar", "SOC / SIEM · Blue Team · Full Stack"],
  "cat skills.txt": ["Linux", "Docker", "SIEM", "SOC", "Wazuh", "NextJS", "NodeJS", "Networking"],
  "ls projects": ["monitoring-system", "ctf-platform", "security-dashboard", "automation-bot"],
  "cat about.md": ["Cybersecurity engineer focused on detection engineering,", "SIEM tuning, and building resilient systems."],
  "sudo hack": ["nice try 😉  — this is a portfolio, not a target."],
  clear: [],
};

export function TerminalSection() {
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: "raditya-shell v1.0 — type 'help' or click a command" },
    { type: "cmd", text: "whoami" },
    { type: "out", text: "Muhammad Raditya Anwar" },
  ]);
  const [input, setInput] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (cmd: string) => {
    const c = cmd.trim();
    if (!c) return;
    if (c === "clear") {
      setLines([]);
      return;
    }
    const out = RESPONSES[c] ?? [`command not found: ${c}`];
    setLines((l) => [...l, { type: "cmd", text: c }, ...out.map((t) => ({ type: "out" as const, text: t }))]);
  };

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const quick = ["whoami", "cat skills.txt", "ls projects", "cat about.md", "sudo hack", "clear"];

  return (
    <div className="rounded-2xl border border-[#00F5FF]/20 bg-black/70 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_rgba(0,245,255,0.1)]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/80">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF3CAC]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#7B61FF]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00FF99]/70" />
        </div>
        <div className="ml-3 text-xs font-mono text-white/60">interactive-shell — bash</div>
      </div>

      <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2 border-b border-white/5">
        {quick.map((q) => (
          <button
            key={q}
            onClick={() => run(q)}
            className="px-2.5 py-1 text-[11px] font-mono rounded border border-[#00F5FF]/30 text-[#00F5FF]/80 hover:bg-[#00F5FF]/10 hover:text-[#00F5FF] transition"
          >
            {q}
          </button>
        ))}
      </div>

      <div
        ref={boxRef}
        onClick={() => inputRef.current?.focus()}
        className="p-5 font-mono text-sm h-[320px] overflow-y-auto cursor-text"
      >
        {lines.map((l, i) => (
          <div key={i} className={l.type === "cmd" ? "text-[#00F5FF]" : "text-white/80"}>
            {l.type === "cmd" ? <span className="text-[#00FF99]">➜ </span> : null}
            {l.text}
          </div>
        ))}
        <div className="flex items-center text-[#00F5FF]">
          <span className="text-[#00FF99]">➜ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(input);
                setInput("");
              }
            }}
            className="flex-1 bg-transparent outline-none text-[#00F5FF] font-mono ml-1"
            placeholder="type a command…"
          />
          <span className="w-2 h-4 bg-[#00F5FF] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function LiveStatusWidget() {
  const items = [
    { label: "Firewall", value: "ONLINE", color: "#00FF99" },
    { label: "WAF", value: "ACTIVE", color: "#00FF99" },
    { label: "Threat Level", value: "LOW", color: "#00F5FF" },
    { label: "SOC", value: "MONITORING", color: "#7B61FF" },
    { label: "Server", value: "UPTIME 99.9%", color: "#00FF99" },
    { label: "Alerts", value: "0 CRIT · 2 MED", color: "#FF3CAC" },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-mono text-white/50 tracking-widest">SYSTEM_STATUS</div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00FF99]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF99] animate-pulse" /> REALTIME
        </div>
      </div>
      <div className="space-y-2.5">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between text-sm font-mono"
          >
            <span className="text-white/70">{it.label}</span>
            <span className="flex items-center gap-2" style={{ color: it.color }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: it.color }} />
              {it.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

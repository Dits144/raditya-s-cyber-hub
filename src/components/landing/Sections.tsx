import { motion } from "framer-motion";

const EVENTS = [
  { year: "2019", title: "Started Learning Programming", desc: "First lines of code — HTML, JS, curiosity." },
  { year: "2021", title: "Networking", desc: "Deep dive into TCP/IP, routing, and network defense." },
  { year: "2022", title: "Cyber Security", desc: "Pentesting basics, CTFs, defensive fundamentals." },
  { year: "2023", title: "Blue Team", desc: "Detection engineering, log analysis, threat hunting." },
  { year: "2024", title: "Fullstack Development", desc: "React, Node, Supabase — shipping real products." },
  { year: "2025", title: "Security Monitoring", desc: "Wazuh, ELK, Suricata — production SIEM stacks." },
  { year: "Now", title: "SOC / SIEM", desc: "Live incident response and continuous monitoring." },
];

export function TimelineSection() {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00F5FF]/40 to-transparent" />
      <div className="space-y-8">
        {EVENTS.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`relative flex items-start gap-4 sm:gap-8 ${
              i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 mt-2">
              <div className="relative w-3 h-3 rounded-full bg-[#00F5FF] shadow-[0_0_20px_#00F5FF]">
                <div className="absolute inset-0 rounded-full bg-[#00F5FF] animate-ping opacity-60" />
              </div>
            </div>
            <div className="pl-12 sm:pl-0 sm:w-1/2 sm:px-8">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-5 hover:border-[#00F5FF]/40 transition">
                <div className="font-mono text-xs text-[#00FF99] mb-1">{e.year}</div>
                <div className="text-white font-semibold mb-1">{e.title}</div>
                <div className="text-white/60 text-sm">{e.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const TECH = [
  "React", "NextJS", "TypeScript", "NodeJS", "Supabase", "Docker", "Linux",
  "Ubuntu", "Git", "GitHub", "Tailwind", "Wazuh", "ELK", "PostgreSQL", "MySQL",
  "Suricata", "Grafana", "Nginx",
];

export function TechCloud() {
  return (
    <div className="relative flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
      {TECH.map((t, i) => {
        const colors = ["#00F5FF", "#7B61FF", "#00FF99", "#FF3CAC", "#0066FF"];
        const c = colors[i % colors.length];
        return (
          <motion.div
            key={t}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            animate={{ y: [0, -6, 0] }}
            whileHover={{ scale: 1.1, y: -8 }}
            style={{
              animationDelay: `${i * 0.15}s`,
              transitionDuration: "0.3s",
            }}
          >
            <div
              className="px-4 py-2 rounded-full font-mono text-sm backdrop-blur-md border cursor-pointer"
              style={{
                color: c,
                borderColor: c + "60",
                background: c + "10",
                boxShadow: `0 0 20px ${c}30`,
              }}
            >
              {t}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function GithubFake() {
  const days = 7 * 26;
  const cells = Array.from({ length: days }, () => Math.floor(Math.random() * 5));
  const stats = [
    { label: "Repositories", value: "42" },
    { label: "Commits", value: "1.2k" },
    { label: "Stars", value: "128" },
    { label: "Followers", value: "230" },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs font-mono text-white/50 tracking-widest mb-1">CONTRIBUTIONS</div>
          <div className="text-white font-semibold">Last 6 months</div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
          less
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((l) => (
              <div
                key={l}
                className="w-2.5 h-2.5 rounded-sm"
                style={{ background: `rgba(0,255,153,${0.15 + l * 0.2})` }}
              />
            ))}
          </div>
          more
        </div>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
        {cells.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.003 }}
            className="w-2.5 h-2.5 rounded-sm"
            style={{ background: v === 0 ? "rgba(255,255,255,0.05)" : `rgba(0,255,153,${0.15 + v * 0.2})` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="text-xs font-mono text-white/50">{s.label}</div>
            <div className="text-xl font-black text-[#00F5FF] font-mono">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

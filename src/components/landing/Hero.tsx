import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight } from "lucide-react";

const LINES = [
  { prompt: "> boot portfolio", output: "Hello World." },
  { prompt: "> whoami", output: "I'm Muhammad Raditya Anwar" },
  { prompt: "> cat role.txt", output: "Cyber Security Engineer" },
  { prompt: "> cat role.txt", output: "SOC Analyst · Blue Team" },
  { prompt: "> cat role.txt", output: "SIEM Specialist" },
  { prompt: "> cat role.txt", output: "Full Stack Developer" },
  { prompt: "> mission", output: "Digital Problem Solver" },
];

export function HeroTerminal() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"prompt" | "output">("prompt");

  useEffect(() => {
    if (step >= LINES.length) return;
    const target = phase === "prompt" ? LINES[step].prompt : LINES[step].output;
    if (typed.length < target.length) {
      const t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 32);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (phase === "prompt") {
        setPhase("output");
        setTyped("");
      } else {
        setStep((s) => s + 1);
        setPhase("prompt");
        setTyped("");
      }
    }, phase === "prompt" ? 250 : 900);
    return () => clearTimeout(t);
  }, [typed, step, phase]);

  const finished = LINES.slice(0, step);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#00F5FF]/25 bg-black/60 backdrop-blur-xl shadow-[0_0_60px_rgba(0,245,255,0.15)]">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#00F5FF]/15 bg-black/70">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF3CAC]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#7B61FF]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00FF99]/70" />
        </div>
        <div className="flex items-center gap-2 ml-3 text-xs font-mono text-[#00F5FF]/70">
          <Terminal className="w-3.5 h-3.5" />
          raditya@soc:~/portfolio
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-[#00FF99]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF99] animate-pulse" />
          LIVE
        </div>
      </div>

      <div className="p-5 sm:p-7 font-mono text-sm sm:text-base min-h-[380px]">
        {finished.map((l, i) => (
          <div key={i} className="mb-2">
            <div className="text-[#00F5FF]/80">{l.prompt}</div>
            <div
              className={
                i === 0
                  ? "text-[#00FF99] text-lg sm:text-xl font-semibold"
                  : i === 1
                  ? "text-white text-2xl sm:text-3xl font-bold tracking-tight font-sans"
                  : "text-[#7B61FF] pl-2"
              }
            >
              {l.output}
            </div>
          </div>
        ))}
        {step < LINES.length && (
          <div className="mb-2">
            <div className="text-[#00F5FF]/80">
              {phase === "prompt" ? typed : LINES[step].prompt}
              {phase === "prompt" && (
                <span className="inline-block w-2 h-4 bg-[#00F5FF] align-middle ml-1 animate-pulse" />
              )}
            </div>
            {phase === "output" && (
              <div
                className={
                  step === 0
                    ? "text-[#00FF99] text-lg sm:text-xl font-semibold"
                    : step === 1
                    ? "text-white text-2xl sm:text-3xl font-bold tracking-tight font-sans"
                    : "text-[#7B61FF] pl-2"
                }
              >
                {typed}
                <span className="inline-block w-2 h-4 bg-[#00F5FF] align-middle ml-1 animate-pulse" />
              </div>
            )}
          </div>
        )}
        {step >= LINES.length && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-[#00F5FF]"
          >
            <ChevronRight className="w-4 h-4" />
            <span className="inline-block w-2 h-4 bg-[#00F5FF] animate-pulse" />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function HeroHologram() {
  return (
    <div className="relative aspect-square max-w-md mx-auto">
      {/* rotating rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-dashed border-[#00F5FF]/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border border-[#7B61FF]/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-[#7B61FF] shadow-[0_0_12px_#7B61FF]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 rounded-full bg-[#00FF99] shadow-[0_0_12px_#00FF99]" />
      </motion.div>
      <motion.div
        className="absolute inset-12 rounded-full border border-dashed border-[#00FF99]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* radar pulse */}
      <motion.div
        className="absolute inset-16 rounded-full border-2 border-[#00F5FF]/60"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* center portrait */}
      <div className="absolute inset-20 rounded-full overflow-hidden border-2 border-[#00F5FF]/60 shadow-[0_0_60px_rgba(0,245,255,0.5)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/40 via-[#050816] to-[#00F5FF]/30" />
        <div className="absolute inset-0 flex items-center justify-center font-mono text-6xl font-black text-[#00F5FF] text-shadow-neon">
          MR
        </div>
        {/* scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF99] to-transparent shadow-[0_0_10px_#00FF99]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
        {/* hologram lines */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,245,255,0.4) 0px, rgba(0,245,255,0.4) 1px, transparent 1px, transparent 4px)",
          }}
        />
      </div>

      {/* floating chips */}
      {[
        { t: "SOC", top: "8%", left: "8%", color: "#00F5FF" },
        { t: "SIEM", top: "5%", right: "10%", color: "#7B61FF" },
        { t: "BLUE TEAM", bottom: "8%", left: "5%", color: "#00FF99" },
        { t: "WAZUH", bottom: "5%", right: "8%", color: "#FF3CAC" },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute px-2.5 py-1 rounded-md font-mono text-[10px] backdrop-blur-md border"
          style={{
            ...(c as any),
            color: c.color,
            borderColor: c.color + "60",
            background: c.color + "15",
            boxShadow: `0 0 20px ${c.color}40`,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.3 }}
        >
          {c.t}
        </motion.div>
      ))}
    </div>
  );
}

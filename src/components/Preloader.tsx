import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { text: "> Initializing Security Environment...", delay: 300 },
  { text: "> Checking System Integrity...", delay: 400, progress: true },
  { text: "  [OK] System Integrity Verified", delay: 300 },
  { text: "> Scanning Network...", delay: 400 },
  { text: "  Found 4 Secure Connections", delay: 300 },
  { text: "> Checking Firewall...", delay: 300 },
  { text: "  Firewall Status : ACTIVE", delay: 300 },
  { text: "> Loading Security Modules... [wazuh, elk, suricata]", delay: 400 },
  { text: "> Verifying Identity...", delay: 300 },
  { text: "> Checking IP Address... 103.***.***.***", delay: 350 },
  { text: "> Checking SSL Certificate... VALID", delay: 300 },
  { text: "> Loading Portfolio Assets...", delay: 350 },
  { text: "> Connecting to SOC Dashboard...", delay: 400 },
  { text: "  [AUTH] Authentication Success", delay: 300 },
  { text: "", delay: 200 },
  { text: "  Welcome, Muhammad Raditya Anwar", delay: 500 },
];

interface PreloaderProps {
  onDone: () => void;
}

export function Preloader({ onDone }: PreloaderProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let acc = 0;
    LINES.forEach((line, i) => {
      acc += line.delay;
      setTimeout(() => {
        if (cancelled) return;
        setVisibleLines((prev) => [...prev, line.text]);
      }, acc);
    });
    const total = acc + 700;
    const start = Date.now();
    const iv = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / total) * 100);
      setProgress(p);
      if (p >= 100) clearInterval(iv);
    }, 40);
    const finish = setTimeout(() => {
      setDone(true);
      setTimeout(onDone, 700);
    }, total);
    return () => {
      cancelled = true;
      clearInterval(iv);
      clearTimeout(finish);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Scanlines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,245,255,0.15) 0px, rgba(0,245,255,0.15) 1px, transparent 1px, transparent 3px)",
            }}
          />
          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,245,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative w-full max-w-2xl px-6 font-mono text-[13px] sm:text-sm text-[#00F5FF]">
            <div className="mb-4 flex items-center gap-2 text-xs text-[#00F5FF]/70">
              <span className="h-2 w-2 rounded-full bg-[#00FF99] animate-pulse" />
              SOC-BOOT v2.5.0 — secure shell
            </div>

            <div className="min-h-[380px] leading-relaxed">
              {visibleLines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    l.startsWith("  [OK]") || l.includes("Success") || l.includes("ACTIVE") || l.includes("VALID")
                      ? "text-[#00FF99]"
                      : l.startsWith(">")
                      ? "text-[#00F5FF]"
                      : "text-[#7B61FF]"
                  }
                >
                  {l || "\u00A0"}
                </motion.div>
              ))}
              <span className="inline-block w-2 h-4 bg-[#00F5FF] align-middle animate-pulse ml-1" />
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-xs text-[#00F5FF]/70 mb-1">
                <span>LOADING PORTFOLIO</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#00F5FF]/10 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00F5FF] via-[#7B61FF] to-[#00FF99]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

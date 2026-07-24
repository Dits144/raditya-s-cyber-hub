import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Shield, Code2, Server, Lock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BackgroundFX } from "@/components/BackgroundFX";
import { HeroTerminal, HeroHologram } from "@/components/landing/Hero";
import { SkillCommandCenter } from "@/components/landing/SkillCommandCenter";
import { TerminalSection, LiveStatusWidget } from "@/components/landing/Terminal";
import { TimelineSection, TechCloud, GithubFake } from "@/components/landing/Sections";
import { CyberMap } from "@/components/landing/CyberMap";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

function SectionTitle({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-10"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F5FF]/30 bg-[#00F5FF]/5 text-[#00F5FF] text-xs font-mono mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-pulse" />
        {tag}
      </div>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3 font-display">
        {title}
      </h2>
      {subtitle && <p className="text-white/60 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      <div className="container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF99]/40 bg-[#00FF99]/5 text-[#00FF99] text-xs font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF99] animate-pulse" />
              STATUS: ONLINE · SOC MONITORING
            </div>
            <HeroTerminal />

            <div className="flex flex-wrap gap-3 mt-8">
              <Button asChild size="lg" className="bg-[#00F5FF] text-[#050816] hover:bg-[#00F5FF]/90 shadow-[0_0_30px_rgba(0,245,255,0.4)]">
                <Link to="/projects">
                  Explore Ops <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-[#7B61FF]/50 text-[#7B61FF] hover:bg-[#7B61FF]/10 hover:text-[#7B61FF]">
                <Link to="/contact">
                  <Mail className="mr-2 w-4 h-4" /> Establish Contact
                </Link>
              </Button>
            </div>

            <div className="flex gap-3 mt-6">
              {[
                { icon: Github, href: "https://github.com/radityaanwar" },
                { icon: Linkedin, href: "https://linkedin.com/in/radityaanwar" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-white/10 bg-white/[0.02] text-white/70 hover:text-[#00F5FF] hover:border-[#00F5FF]/50 transition"
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <HeroHologram />
        </motion.div>
      </div>
    </section>
  );
}

function StatsRow() {
  const stats = [
    { icon: Shield, label: "Years in Security", value: "2+", color: "#00F5FF" },
    { icon: Server, label: "SIEM Deployments", value: "12", color: "#7B61FF" },
    { icon: Code2, label: "Projects Shipped", value: "24", color: "#00FF99" },
    { icon: Lock, label: "Incidents Handled", value: "150+", color: "#FF3CAC" },
  ];
  return (
    <section className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-4 hover:border-[#00F5FF]/40 transition"
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ background: s.color + "15", color: s.color, boxShadow: `0 0 20px ${s.color}30` }}
              >
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black font-mono" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-white/50 font-mono">{s.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const { data: projects } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("sort_order", { ascending: true })
        .limit(3);
      return data || [];
    },
  });

  const fallback = [
    { id: "1", title: "Wazuh SIEM Deployment", summary: "Full stack SIEM with custom decoders and detection rules.", tags: ["Wazuh", "ELK", "Docker"] },
    { id: "2", title: "SOC Monitoring Dashboard", summary: "Realtime alert triage with automated enrichment.", tags: ["React", "Supabase", "MITRE"] },
    { id: "3", title: "Automation Bot", summary: "Incident response automation for L1 triage.", tags: ["Node", "n8n", "API"] },
  ];
  const list = projects?.length ? projects : fallback;

  return (
    <section className="container mx-auto px-6 py-20">
      <SectionTitle tag="//_ops" title="Featured Operations" subtitle="Selected projects across SIEM, blue-team ops, and full stack engineering." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p: any, i: number) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 overflow-hidden hover:border-[#00F5FF]/40"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#00F5FF]/0 via-[#7B61FF]/0 to-[#00FF99]/0 group-hover:from-[#00F5FF]/20 group-hover:via-[#7B61FF]/20 group-hover:to-[#00FF99]/20 transition-opacity opacity-0 group-hover:opacity-100 -z-10" />
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-mono text-white/40">PROJECT_{String(i + 1).padStart(2, "0")}</div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00FF99]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF99]" /> DEPLOYED
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00F5FF] transition">{p.title}</h3>
            <p className="text-sm text-white/60 mb-4 line-clamp-2">{p.summary}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(p.tags || []).slice(0, 3).map((t: string) => (
                <span key={t} className="px-2 py-0.5 rounded font-mono text-[10px] border border-[#7B61FF]/40 bg-[#7B61FF]/10 text-[#7B61FF]">
                  {t}
                </span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="opacity-0 group-hover:opacity-100 transition"
            >
              <Link
                to={`/projects/${p.id}`}
                className="inline-flex items-center gap-1.5 text-[#00F5FF] font-mono text-xs"
              >
                view details <ExternalLink className="w-3 h-3" />
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CertificatesMasonry() {
  const { data: certs } = useQuery({
    queryKey: ["featured-certificates-landing"],
    queryFn: async () => {
      const { data } = await supabase
        .from("certificates")
        .select("*")
        .eq("is_featured", true)
        .order("sort_order", { ascending: true })
        .limit(6);
      return data || [];
    },
  });

  const fallback = Array.from({ length: 6 }).map((_, i) => ({
    id: String(i),
    title: ["CompTIA Security+", "Blue Team Level 1", "Wazuh Certified", "TryHackMe SOC L1", "Google Cybersecurity", "Cisco CCNA"][i],
    issuer: ["CompTIA", "SecurityBlue.Team", "Wazuh", "TryHackMe", "Google", "Cisco"][i],
    year: [2024, 2024, 2023, 2023, 2023, 2022][i],
  }));
  const list = certs?.length ? certs : fallback;

  return (
    <section className="container mx-auto px-6 py-20">
      <SectionTitle tag="//_credentials" title="Certifications" subtitle="Verified credentials across defensive security, networking, and cloud." />
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {list.map((c: any, i: number) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="break-inside-avoid relative rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-5 overflow-hidden group hover:border-[#7B61FF]/50"
            style={{ minHeight: 120 + (i % 3) * 40 }}
          >
            <motion.div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
              style={{
                background: "linear-gradient(120deg, transparent 40%, rgba(0,245,255,0.15) 50%, transparent 60%)",
              }}
            />
            <div className="flex items-center justify-between mb-3">
              <div className="p-1.5 rounded bg-[#7B61FF]/10 border border-[#7B61FF]/30">
                <Shield className="w-4 h-4 text-[#7B61FF]" />
              </div>
              <span className="text-[10px] font-mono text-white/40">{c.year}</span>
            </div>
            <h3 className="text-white font-semibold mb-1">{c.title}</h3>
            <p className="text-xs text-white/50 mb-4">{c.issuer}</p>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button className="text-[10px] font-mono px-2 py-1 rounded border border-[#00F5FF]/40 text-[#00F5FF] hover:bg-[#00F5FF]/10">
                VIEW
              </button>
              <button className="text-[10px] font-mono px-2 py-1 rounded border border-[#00FF99]/40 text-[#00FF99] hover:bg-[#00FF99]/10">
                VERIFY
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="container mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl p-10 sm:p-14"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,245,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.08) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#7B61FF]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#00F5FF]/20 blur-3xl" />
        </div>
        <div className="relative text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF99]/40 bg-[#00FF99]/5 text-[#00FF99] text-xs font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF99] animate-pulse" />
            SECURE_CHANNEL_OPEN
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4 font-display">
            Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F5FF] via-[#7B61FF] to-[#FF3CAC]">deploy</span> together?
          </h2>
          <p className="text-white/60 mb-8">
            Available for SOC engineering, blue-team consulting, and full-stack product work.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-[#00F5FF] text-[#050816] hover:bg-[#00F5FF]/90 shadow-[0_0_30px_rgba(0,245,255,0.5)]">
              <Link to="/contact"><Mail className="mr-2 w-4 h-4" /> Send Transmission</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5">
              <a href="https://github.com/radityaanwar" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 w-4 h-4" /> GitHub
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TerminalFooter() {
  return (
    <div className="container mx-auto px-6 pb-10">
      <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur p-5 font-mono text-sm">
        <div className="text-[#00F5FF]">➜ exit</div>
        <div className="text-white/70 mt-1">Thanks for visiting.</div>
        <div className="text-[#00FF99]">Stay Secure. <span className="inline-block w-2 h-4 bg-[#00FF99] align-middle animate-pulse ml-1" /></div>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <>
      <BackgroundFX />
      <div className="relative z-10">
        <Layout>
          <Hero />
          <StatsRow />

          <section className="container mx-auto px-6 py-20 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SectionTitle tag="//_command_center" title="Skills · Modules" subtitle="Live status of every module in my stack." />
              <SkillCommandCenter />
            </div>
            <div className="space-y-6">
              <LiveStatusWidget />
              <CyberMap />
            </div>
          </section>

          <section className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-6">
            <div>
              <SectionTitle tag="//_shell" title="Interactive Terminal" subtitle="Type a command or click a suggestion." />
              <TerminalSection />
            </div>
            <div>
              <SectionTitle tag="//_activity" title="Contribution Graph" subtitle="Consistency across security and code." />
              <GithubFake />
            </div>
          </section>

          <section className="container mx-auto px-6 py-20">
            <SectionTitle tag="//_timeline" title="Journey" subtitle="From first line of code to live SOC monitoring." />
            <TimelineSection />
          </section>

          <FeaturedProjects />

          <section className="container mx-auto px-6 py-20">
            <SectionTitle tag="//_stack" title="Tech Cloud" subtitle="Tools I reach for daily." />
            <TechCloud />
          </section>

          <CertificatesMasonry />
          <ContactCTA />
          <TerminalFooter />
        </Layout>
      </div>
    </>
  );
}

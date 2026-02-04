import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, ChevronDown, Award, Briefcase, Code, Shield } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { GlowCard } from "@/components/ui/glow-card";
import { StatsCard } from "@/components/ui/stats-card";
import { Tag } from "@/components/ui/tag";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/motion";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Pre-title */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Shield className="w-4 h-4" />
              Cybersecurity Enthusiast
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 variants={staggerItem} className="hero-title mb-6">
            <span className="text-foreground">Muhammad</span>
            <br />
            <span className="gradient-text">Raditya Anwar</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={staggerItem} className="hero-subtitle mb-8 max-w-2xl mx-auto">
            SOC / SIEM Specialist • Blue Team • Incident Response
            <br className="hidden sm:block" />
            <span className="text-primary">Building secure systems</span> and protecting digital assets
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-4 mb-12">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon">
              <Link to="/projects">
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10">
              <a href="#" download>Download CV</a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground">
              <Link to="/contact">Contact Me</Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={staggerItem} className="flex justify-center gap-4">
            <a
              href="https://github.com/radityaanwar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/radityaanwar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-muted-foreground"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const { data: projectsCount } = useQuery({
    queryKey: ["projects-count"],
    queryFn: async () => {
      const { count } = await supabase.from("projects").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: certsCount } = useQuery({
    queryKey: ["certificates-count"],
    queryFn: async () => {
      const { count } = await supabase.from("certificates").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  return (
    <Section className="py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <StatsCard icon={Award} value={certsCount || 6} label="Certificates" color="primary" />
        <StatsCard icon={Code} value={projectsCount || 3} label="Projects" color="accent" />
        <StatsCard icon={Briefcase} value="10+" label="Tools Mastered" color="success" />
        <StatsCard icon={Shield} value="2+" label="Years Experience" color="primary" />
      </motion.div>
    </Section>
  );
}

function FeaturedProjects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["featured-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("sort_order", { ascending: true })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  return (
    <Section>
      <SectionHeader
        title="Featured Projects"
        subtitle="Showcasing my work in cybersecurity, SIEM implementation, and security automation"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 rounded-xl bg-card animate-pulse" />
          ))
        ) : (
          projects?.map((project) => (
            <GlowCard key={project.id} className="group">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.slice(0, 3).map((tag: string) => (
                  <Tag key={tag} variant="primary" size="sm">{tag}</Tag>
                ))}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {project.summary}
              </p>
              <Link
                to={`/projects/${project.id}`}
                className="inline-flex items-center text-primary text-sm font-medium hover:underline"
              >
                View Details <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </GlowCard>
          ))
        )}
      </motion.div>

      <motion.div variants={fadeUp} className="text-center mt-10">
        <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
          <Link to="/projects">
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}

function FeaturedCertificates() {
  const { data: certificates, isLoading } = useQuery({
    queryKey: ["featured-certificates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("is_featured", true)
        .order("sort_order", { ascending: true })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  return (
    <Section className="bg-card/30">
      <SectionHeader
        title="Certifications"
        subtitle="Professional certifications and courses completed in cybersecurity and related fields"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-card animate-pulse" />
          ))
        ) : (
          certificates?.map((cert) => (
            <GlowCard key={cert.id} glowColor="accent" className="flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <Award className="w-8 h-8 text-accent" />
                <span className="text-xs text-muted-foreground">{cert.year}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{cert.title}</h3>
              <p className="text-sm text-muted-foreground">{cert.issuer}</p>
            </GlowCard>
          ))
        )}
      </motion.div>

      <motion.div variants={fadeUp} className="text-center mt-10">
        <Button asChild variant="outline" className="border-accent/50 text-accent hover:bg-accent/10">
          <Link to="/certificates">
            View All Certificates <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}

export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <FeaturedCertificates />
    </Layout>
  );
}

import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { 
  User, 
  Shield, 
  Target, 
  Code2, 
  Database, 
  Network, 
  Lock, 
  Terminal,
  Server,
  Eye
} from "lucide-react";

const skills = [
  { name: "SIEM", category: "core" },
  { name: "SOC Operations", category: "core" },
  { name: "Log Analysis", category: "core" },
  { name: "Threat Detection", category: "core" },
  { name: "Incident Response", category: "core" },
  { name: "Wazuh", category: "tool" },
  { name: "Elastic/ELK", category: "tool" },
  { name: "Linux", category: "tool" },
  { name: "Networking", category: "tool" },
  { name: "Basic Pentesting", category: "tool" },
  { name: "Python", category: "tool" },
  { name: "Splunk", category: "tool" },
];

const tools = [
  { name: "Wazuh", icon: Shield, description: "SIEM & XDR" },
  { name: "Elastic Stack", icon: Database, description: "Log Management" },
  { name: "Splunk", icon: Eye, description: "SIEM Platform" },
  { name: "Wireshark", icon: Network, description: "Packet Analysis" },
  { name: "Nmap", icon: Target, description: "Network Scanning" },
  { name: "Metasploit", icon: Terminal, description: "Penetration Testing" },
  { name: "Burp Suite", icon: Lock, description: "Web Security" },
  { name: "Linux", icon: Server, description: "System Administration" },
];

const focusAreas = [
  "Building and optimizing SIEM solutions for enterprise environments",
  "Developing automated threat detection and response playbooks",
  "Contributing to open-source security tools and documentation",
  "Learning advanced malware analysis and reverse engineering",
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-50" />
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Profile Image */}
            <motion.div variants={staggerItem} className="order-2 lg:order-1">
              <div className="relative max-w-md mx-auto">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center border border-border">
                    <User className="w-32 h-32 text-muted-foreground/30" />
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={staggerItem} className="order-1 lg:order-2">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-foreground">About </span>
                <span className="gradient-text">Me</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Saya adalah seorang Cybersecurity Enthusiast dengan fokus utama pada Security Operations 
                Center (SOC), Security Information and Event Management (SIEM), dan Blue Team operations.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Dengan pengalaman dalam implementasi dan operasional sistem keamanan, saya membantu 
                organisasi dalam mendeteksi, menganalisis, dan merespons ancaman keamanan siber secara 
                proaktif. Saya percaya bahwa keamanan yang baik dimulai dari pemahaman mendalam tentang 
                infrastruktur dan ancaman yang ada.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Selain bekerja di bidang keamanan, saya juga aktif berkontribusi dalam komunitas 
                cybersecurity dan berbagi pengetahuan melalui blog dan presentasi teknis.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <Section className="bg-card/30">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="Core competencies and technical skills in cybersecurity"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-3"
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={staggerItem}>
              <Tag
                variant={skill.category === "core" ? "primary" : "purple"}
                size="md"
              >
                {skill.name}
              </Tag>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Tools Section */}
      <Section>
        <SectionHeader
          title="Tools & Technologies"
          subtitle="Security tools and platforms I work with regularly"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={staggerItem}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-neon transition-all duration-300 text-center"
            >
              <tool.icon className="w-10 h-10 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-1">{tool.name}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Focus Section */}
      <Section className="bg-card/30">
        <SectionHeader
          title="Current Focus"
          subtitle="What I'm working on and learning right now"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto"
        >
          <ul className="space-y-4">
            {focusAreas.map((area, index) => (
              <motion.li
                key={index}
                variants={staggerItem}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">{area}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Section>
    </Layout>
  );
}

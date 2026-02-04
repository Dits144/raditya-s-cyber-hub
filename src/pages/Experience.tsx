import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Briefcase, Calendar, MapPin, Trophy } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { supabase } from "@/integrations/supabase/client";

export default function Experience() {
  const { data: education, isLoading: loadingEducation } = useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("education")
        .select("*")
        .order("start_year", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: experiences, isLoading: loadingExperience } = useQuery({
    queryKey: ["experience"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-50" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Education & Experience</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              My academic background and professional journey in cybersecurity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <Section>
        <SectionHeader
          title="Education"
          subtitle="Academic background and formal education"
        />

        {loadingEducation ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-40 rounded-xl bg-card animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-6"
          >
            {education?.map((edu) => (
              <motion.div
                key={edu.id}
                variants={staggerItem}
                className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-neon transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {edu.institution}
                        </h3>
                        <p className="text-primary font-medium">{edu.major}</p>
                      </div>
                      <Tag variant="primary" size="sm">
                        {edu.start_year} - {edu.end_year || "Present"}
                      </Tag>
                    </div>
                    {edu.degree && (
                      <p className="text-muted-foreground text-sm mb-3">{edu.degree}</p>
                    )}
                    {edu.description && (
                      <p className="text-muted-foreground">{edu.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Section>

      {/* Experience Section */}
      <Section className="bg-card/30">
        <SectionHeader
          title="Professional Experience"
          subtitle="Work experience and organizational activities"
        />

        {loadingExperience ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-card animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

              {experiences?.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  variants={staggerItem}
                  className="relative pl-16 pb-8 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 w-4 h-4 rounded-full bg-accent border-4 border-background shadow-neon-purple" />

                  <div className="p-6 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-neon-purple transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-accent font-medium">{exp.organization}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Tag variant="purple" size="sm">
                          {exp.is_current ? "Current" : "Past"}
                        </Tag>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.start_date && new Date(exp.start_date).toLocaleDateString("id-ID", { year: "numeric", month: "short" })}
                          {" - "}
                          {exp.is_current ? "Present" : exp.end_date && new Date(exp.end_date).toLocaleDateString("id-ID", { year: "numeric", month: "short" })}
                        </span>
                      </div>
                    </div>

                    {exp.description && (
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                    )}

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-success" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement: string, i: number) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </Section>
    </Layout>
  );
}

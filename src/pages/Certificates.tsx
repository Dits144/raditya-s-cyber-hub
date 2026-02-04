import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search, Award, ExternalLink, Calendar } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { GlowCard } from "@/components/ui/glow-card";
import { Tag } from "@/components/ui/tag";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { supabase } from "@/integrations/supabase/client";

const platforms = ["All", "Coursera", "Cisco", "CompTIA", "Splunk", "AWS", "EC-Council"];
const years = ["All", "2024", "2023", "2022"];

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePlatform, setActivePlatform] = useState("All");
  const [activeYear, setActiveYear] = useState("All");

  const { data: certificates, isLoading } = useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredCertificates = certificates?.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform =
      activePlatform === "All" || cert.platform === activePlatform;

    const matchesYear =
      activeYear === "All" || cert.year?.toString() === activeYear;

    return matchesSearch && matchesPlatform && matchesYear;
  });

  // Group certificates by year for timeline view
  const groupedByYear = filteredCertificates?.reduce((acc, cert) => {
    const year = cert.year || "Unknown";
    if (!acc[year]) acc[year] = [];
    acc[year].push(cert);
    return acc;
  }, {} as Record<string | number, typeof certificates>);

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
              <span className="gradient-text">Certifications</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Professional certifications and completed courses in cybersecurity and related fields
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <Section className="py-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {/* Platform Filter */}
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Button
                  key={platform}
                  variant={activePlatform === platform ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActivePlatform(platform)}
                  className={
                    activePlatform === platform
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }
                >
                  {platform}
                </Button>
              ))}
            </div>

            {/* Year Filter */}
            <div className="flex gap-2">
              {years.map((year) => (
                <Button
                  key={year}
                  variant={activeYear === year ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveYear(year)}
                  className={
                    activeYear === year
                      ? "bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-card animate-pulse" />
            ))}
          </div>
        ) : filteredCertificates?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No certificates found matching your criteria.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCertificates?.map((cert) => (
              <GlowCard key={cert.id} glowColor="accent" className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <Tag variant="purple" size="sm">{cert.platform || cert.issuer}</Tag>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Issued by {cert.issuer}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {cert.date && new Date(cert.date).toLocaleDateString("id-ID", { year: "numeric", month: "short" })}
                  </div>
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-accent text-sm font-medium hover:underline"
                    >
                      Verify <ExternalLink className="ml-1 w-4 h-4" />
                    </a>
                  )}
                </div>
              </GlowCard>
            ))}
          </motion.div>
        )}

        {/* Timeline View */}
        {groupedByYear && Object.keys(groupedByYear).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Timeline</h2>
            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

              {Object.entries(groupedByYear)
                .sort(([a], [b]) => Number(b) - Number(a))
                .map(([year, certs], idx) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative mb-8"
                  >
                    {/* Year marker */}
                    <div className="flex items-center gap-4 mb-4 ml-8 md:ml-0 md:justify-center">
                      <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-primary shadow-neon" />
                      <span className="text-xl font-bold text-primary">{year}</span>
                    </div>

                    {/* Certificates for this year */}
                    <div className="ml-12 md:ml-0 md:grid md:grid-cols-2 md:gap-4">
                      {certs?.map((cert, certIdx) => (
                        <div
                          key={cert.id}
                          className={`p-4 rounded-lg bg-card border border-border mb-4 md:mb-0 ${
                            certIdx % 2 === 0 ? "md:text-right md:mr-8" : "md:ml-8"
                          }`}
                        >
                          <h4 className="font-semibold text-foreground">{cert.title}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </Section>
    </Layout>
  );
}

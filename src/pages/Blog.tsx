import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Tag as TagIcon, BookOpen } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { GlowCard } from "@/components/ui/glow-card";
import { Tag } from "@/components/ui/tag";
import { staggerContainer } from "@/lib/motion";
import { supabase } from "@/integrations/supabase/client";

export default function Blog() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
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
              <span className="gradient-text">Blog & Writeups</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Security insights, CTF writeups, and technical notes from my cybersecurity journey
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-card animate-pulse" />
            ))}
          </div>
        ) : posts?.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex p-4 rounded-full bg-muted mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No posts yet
            </h3>
            <p className="text-muted-foreground">
              Blog posts and writeups will appear here soon. Stay tuned!
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts?.map((post) => (
              <GlowCard key={post.id} glowColor="success" className="flex flex-col">
                {/* Cover Image Placeholder */}
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="aspect-video rounded-lg object-cover mb-4"
                  />
                ) : (
                  <div className="aspect-video rounded-lg bg-muted/50 mb-4 flex items-center justify-center border border-border">
                    <BookOpen className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags?.slice(0, 2).map((tag: string) => (
                    <Tag key={tag} variant="green" size="sm">
                      {tag}
                    </Tag>
                  ))}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {post.published_at && new Date(post.published_at).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" })}
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-success text-sm font-medium hover:underline"
                  >
                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </GlowCard>
            ))}
          </motion.div>
        )}
      </Section>
    </Layout>
  );
}

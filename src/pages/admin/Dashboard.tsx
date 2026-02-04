import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FolderKanban, Award, FileText, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const { data: projectsCount } = useQuery({
    queryKey: ["admin-projects-count"],
    queryFn: async () => {
      const { count } = await supabase.from("projects").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: certsCount } = useQuery({
    queryKey: ["admin-certs-count"],
    queryFn: async () => {
      const { count } = await supabase.from("certificates").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: postsCount } = useQuery({
    queryKey: ["admin-posts-count"],
    queryFn: async () => {
      const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: messagesCount } = useQuery({
    queryKey: ["admin-messages-count"],
    queryFn: async () => {
      const { count } = await supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false);
      return count || 0;
    },
  });

  const stats = [
    { label: "Projects", value: projectsCount, icon: FolderKanban, path: "/admin/projects", color: "primary" },
    { label: "Certificates", value: certsCount, icon: Award, path: "/admin/certificates", color: "accent" },
    { label: "Blog Posts", value: postsCount, icon: FileText, path: "/admin/blog", color: "success" },
    { label: "Unread Messages", value: messagesCount, icon: Mail, path: "/admin/messages", color: "primary" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8"
      >
        {/* Welcome Message */}
        <motion.div variants={staggerItem} className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">
            Manage your portfolio content from this dashboard. Add projects, certificates, and blog posts.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={staggerItem} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              to={stat.path}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-neon transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === "primary" ? "bg-primary/10" : 
                  stat.color === "accent" ? "bg-accent/10" : "bg-success/10"
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.color === "primary" ? "text-primary" : 
                    stat.color === "accent" ? "text-accent" : "text-success"
                  }`} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value ?? "..."}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Link>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={staggerItem}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/admin/projects"
              className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-all flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <FolderKanban className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Add New Project</p>
                <p className="text-sm text-muted-foreground">Create a new portfolio project</p>
              </div>
            </Link>
            <Link
              to="/admin/certificates"
              className="p-4 rounded-lg bg-card border border-border hover:border-accent/30 transition-all flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-accent/10">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">Add Certificate</p>
                <p className="text-sm text-muted-foreground">Add a new certification</p>
              </div>
            </Link>
            <Link
              to="/admin/blog"
              className="p-4 rounded-lg bg-card border border-border hover:border-success/30 transition-all flex items-center gap-3"
            >
              <div className="p-2 rounded-lg bg-success/10">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">Write Blog Post</p>
                <p className="text-sm text-muted-foreground">Create a new article</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: "primary" | "accent" | "success";
}

export function StatsCard({ icon: Icon, value, label, color = "primary" }: StatsCardProps) {
  const colorStyles = {
    primary: {
      icon: "text-primary",
      bg: "bg-primary/10",
      glow: "group-hover:shadow-neon",
    },
    accent: {
      icon: "text-accent",
      bg: "bg-accent/10",
      glow: "group-hover:shadow-neon-purple",
    },
    success: {
      icon: "text-success",
      bg: "bg-success/10",
      glow: "group-hover:shadow-[0_0_20px_hsl(var(--success)/0.3)]",
    },
  };

  const styles = colorStyles[color];

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "group relative p-6 rounded-xl bg-card border border-border",
        "transition-all duration-300 hover:border-primary/30",
        styles.glow
      )}
    >
      <div className={cn(
        "inline-flex p-3 rounded-lg mb-4",
        styles.bg
      )}>
        <Icon className={cn("w-6 h-6", styles.icon)} />
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cardHover, staggerItem } from "@/lib/motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "accent" | "success";
  onClick?: () => void;
  as?: "div" | "article";
}

export function GlowCard({ 
  children, 
  className, 
  glowColor = "primary",
  onClick,
  as = "div"
}: GlowCardProps) {
  const Component = motion[as];
  
  const glowStyles = {
    primary: "hover:shadow-neon hover:border-primary/30",
    accent: "hover:shadow-neon-purple hover:border-accent/30",
    success: "hover:shadow-[0_0_20px_hsl(var(--success)/0.3)] hover:border-success/30",
  };

  return (
    <Component
      variants={staggerItem}
      initial="rest"
      whileHover="hover"
      animate="rest"
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-xl",
        "bg-card border border-border",
        "transition-all duration-300",
        glowStyles[glowColor],
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </Component>
  );
}

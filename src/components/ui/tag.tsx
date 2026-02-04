import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "primary" | "purple" | "green" | "muted";
  size?: "sm" | "md";
  className?: string;
}

export function Tag({ children, variant = "primary", size = "sm", className }: TagProps) {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
    purple: "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20",
    green: "bg-success/10 text-success border-success/20 hover:bg-success/20",
    muted: "bg-muted text-muted-foreground border-border hover:bg-muted/80",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

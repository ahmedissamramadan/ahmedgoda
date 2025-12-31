import { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
  variant?: "default" | "gold" | "outline";
}

const TrustBadge = ({ icon: Icon, text, variant = "default" }: TrustBadgeProps) => {
  const variants = {
    default: "bg-card border border-border text-foreground",
    gold: "bg-accent/10 border border-accent text-accent",
    outline: "bg-transparent border border-primary/30 text-primary",
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${variants[variant]}`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default TrustBadge;

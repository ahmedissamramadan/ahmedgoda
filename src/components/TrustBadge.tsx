import { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  text: string;
  variant?: "default" | "gold" | "outline" | "glass";
}

const TrustBadge = ({ icon: Icon, text, variant = "default" }: TrustBadgeProps) => {
  const variants = {
    default: "bg-card border border-border text-foreground shadow-sm",
    gold: "bg-accent/10 border border-accent/20 text-accent backdrop-blur",
    outline: "bg-transparent border border-primary/20 text-primary",
    glass: "glass text-foreground shadow-sm",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-[13px] font-semibold ${variants[variant]} transition-all hover:scale-[1.02]`}>
      <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${variant==='gold' ? 'bg-accent text-accent-foreground' : 'bg-accent/12 border border-accent/15'}`}>
        <Icon className={`w-3.5 h-3.5 ${variant==='gold' ? 'text-accent-foreground' : 'text-accent'}`} />
      </span>
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
};

export default TrustBadge;

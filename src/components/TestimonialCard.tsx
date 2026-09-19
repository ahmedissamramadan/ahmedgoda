import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  projectType: string;
}

const TestimonialCard = ({ quote, name, location, projectType }: TestimonialCardProps) => {
  return (
    <div className="group relative bg-card border border-border/70 p-6 md:p-7 rounded-[1.4rem] flex flex-col h-full overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
      <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-60" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
          ))}
        </div>
        <span className="w-9 h-9 rounded-full bg-accent/10 border border-accent/15 flex items-center justify-center">
          <Quote className="w-4 h-4 text-accent" />
        </span>
      </div>

      <p className="text-[14px] leading-7 text-foreground/85 font-medium flex-1 text-right">“{quote}”</p>

      <div className="mt-6 pt-5 border-t border-border/60 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full gradient-navy flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
          {name.charAt(2) || name.charAt(0)}
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-foreground leading-none">{name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {location} • {projectType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

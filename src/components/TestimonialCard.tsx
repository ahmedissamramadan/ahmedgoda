import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  projectType: string;
}

const TestimonialCard = ({ quote, name, location, projectType }: TestimonialCardProps) => {
  return (
    <div className="bg-card border border-border p-6 rounded-lg relative">
      <Quote className="absolute top-4 left-4 w-8 h-8 text-accent/30" />
      <p className="text-foreground leading-relaxed mb-6 pr-0 pl-8">{quote}</p>
      <div className="border-t border-border pt-4">
        <p className="font-bold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">
          {location} — {projectType}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;

import { LucideIcon } from "lucide-react";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const ProcessStep = ({ number, title, description, icon: Icon }: ProcessStepProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 gradient-navy rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground">
          {number}
        </div>
      </div>
      <div className="flex-1 pt-2">
        <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default ProcessStep;

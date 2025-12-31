import { MapPin, Maximize, Clock, ArrowLeft } from "lucide-react";

interface ProjectCardProps {
  image: string;
  title: string;
  type: string;
  location: string;
  area: string;
  duration: string;
  scope: string;
  result: string;
}

const ProjectCard = ({
  image,
  title,
  type,
  location,
  area,
  duration,
  scope,
  result,
}: ProjectCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden card-hover group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-semibold">
          {type}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize className="w-4 h-4 text-accent" />
            <span>{area}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <span>{duration}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{scope}</p>
        
        <div className="bg-accent/10 text-accent-foreground text-sm p-3 rounded mb-4">
          <span className="font-semibold">النتيجة: </span>
          {result}
        </div>

        <button className="flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
          <span>تفاصيل وصور قبل/بعد</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

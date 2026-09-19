import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: string;
  index?: number;
}

const ServiceCard = ({ icon: Icon, title, description, index = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6 }}
      className="group relative bg-card rounded-[1.5rem] p-[1.5rem] md:p-7 border border-border/70 overflow-hidden text-right flex flex-col"
      style={{ boxShadow: "0 1px 3px hsl(215 66% 14% / 0.06), 0 8px 24px hsl(215 66% 14% / 0.04)" }}
    >
      {/* subtle gold glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
      </div>
      {/* top hairline */}
      <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative w-[56px] h-[56px] rounded-2xl flex items-center justify-center mb-5 border border-accent/15"
        style={{
          background: "linear-gradient(135deg, hsl(44 85% 94%) 0%, hsl(34 45% 96%) 100%)",
          boxShadow: "0 4px 14px hsl(44 70% 50% / 0.12), inset 0 1px 0 hsl(0 0% 100% / 0.8)"
        }}
      >
        <Icon className="w-[22px] h-[22px] text-accent" strokeWidth={1.7} />
        {/* shine */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />
      </div>

      <h3 className="relative text-[17px] font-bold text-foreground leading-tight mb-2.5">{title}</h3>
      <p className="relative text-[13.5px] leading-6 text-muted-foreground font-medium">{description}</p>

      <div className="relative mt-6 flex items-center gap-2 text-xs font-bold text-accent opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <span>اكتشف التفاصيل</span>
        <span className="w-6 h-px bg-accent/50" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  index?: number;
}

const ProcessStep = ({ number, title, description, icon: Icon, index = 0 }: ProcessStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group relative flex gap-4 md:gap-5 items-start"
    >
      <div className="relative shrink-0">
        <div className="w-[58px] h-[58px] rounded-2xl flex items-center justify-center border border-accent/20 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(215 66% 16%), hsl(215 55% 20%))",
            boxShadow: "0 8px 20px hsl(215 66% 14% / 0.18), 0 1px 0 hsl(0 0% 100% / 0.08) inset"
          }}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={1.6} />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/12 to-transparent opacity-60" />
        </div>
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold border-2 border-background shadow-md"
          style={{ background: "linear-gradient(135deg, hsl(44 85% 58%), hsl(42 78% 46%))", color: "hsl(215 66% 10%)" }}
        >
          {number}
        </div>
      </div>
      <div className="flex-1 pt-1 text-right">
        <h3 className="text-[15px] md:text-[16px] font-bold text-foreground mb-1.5 leading-tight">{title}</h3>
        <p className="text-[13.5px] leading-6 text-muted-foreground font-medium">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProcessStep;

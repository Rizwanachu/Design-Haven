import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-8 rounded-sm bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-[50px] rounded-full transform translate-x-12 -translate-y-12 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-150" />
      
      <div className="w-12 h-12 rounded-lg bg-background border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-white/80 transition-colors">
        {description}
      </p>
    </motion.div>
  );
}

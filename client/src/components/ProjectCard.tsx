import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
}

export function ProjectCard({ title, category, image, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60 z-10 transition-opacity duration-300 group-hover:opacity-40" />
        
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Floating Action Button */}
        <div className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-background hover:border-primary">
          <ArrowUpRight size={20} />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-primary text-xs uppercase tracking-[0.2em] font-medium">{category}</p>
        <h3 className="text-2xl font-display font-semibold text-white group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

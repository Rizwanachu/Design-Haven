import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { useState } from "react";

// Using repeating images as per instructions
const ALL_PROJECTS = [
  { id: 1, title: "Neo-Villa X", category: "Residential", image: "/images/project-villa.png" },
  { id: 2, title: "Vertex Offices", category: "Commercial", image: "/images/project-urban.png" },
  { id: 3, title: "The Void Loft", category: "Interior", image: "/images/project-interior.png" },
  { id: 4, title: "Skyline Penthouse", category: "Residential", image: "/images/project-villa.png" }, // Reused
  { id: 5, title: "Tech Hub Alpha", category: "Commercial", image: "/images/project-urban.png" }, // Reused
  { id: 6, title: "Minimalist Retreat", category: "Concept", image: "/images/project-interior.png" }, // Reused
];

const CATEGORIES = ["All", "Residential", "Commercial", "Interior", "Concept"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-16 bg-secondary/10">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          >
            OUR WORK
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            A curated selection of visionary projects that define the future of living.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full border text-sm uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  : "border-white/10 text-muted-foreground hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} index={idx} {...project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No projects found in this category.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

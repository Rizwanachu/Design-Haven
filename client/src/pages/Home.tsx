import { motion } from "framer-motion";
import { ArrowRight, Box, Cpu, Leaf, Lightbulb, Ruler } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCard } from "@/components/ServiceCard";
import { useContactSubmission } from "@/hooks/use-contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/routes";

// Static Image Placeholders (using Unsplash as stand-ins per instructions if local files missing, but defaulting to described paths)
const HERO_IMAGE = "/images/hero-mansion.png";
const PROJECTS = [
  { id: 1, title: "Neo-Villa X", category: "Residential", image: "/images/project-villa.png" },
  { id: 2, title: "Vertex Offices", category: "Commercial", image: "/images/project-urban.png" },
  { id: 3, title: "The Void Loft", category: "Interior", image: "/images/project-interior.png" },
];

export default function Home() {
  const mutation = useContactSubmission();
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectDetails: "",
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/70 z-10" />
          {/* Fallback Unsplash image if local is missing: Modern dark architecture */}
          {/* <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop" ... /> */}
          <img
            src={HERO_IMAGE}
            alt="Futuristic Architecture"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to Unsplash if local image fails
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop";
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="container relative z-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold tracking-tighter text-white mb-6">
              DESIGNING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 text-glow">
                THE FUTURE
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light tracking-wide">
              We craft architectural experiences that merge luxury, sustainability, and advanced technology.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/portfolio">
                <button className="px-8 py-4 bg-primary text-background font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm">
                  View Our Work
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white transition-all duration-300 rounded-sm">
                  Book Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-primary to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ABOUT / PILLARS */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { title: "Innovation", desc: "Pushing boundaries with parametric design." },
              { title: "Functionality", desc: "Spaces that serve your lifestyle seamlessly." },
              { title: "Sustainability", desc: "Eco-conscious materials and energy efficiency." },
              { title: "Future-Ready", desc: "Smart home integration at the core." }
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border-l border-primary/20 pl-6"
              >
                <h3 className="text-xl font-display font-bold text-white mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-primary text-sm uppercase tracking-widest font-semibold mb-2">Selected Works</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">Our Masterpieces</h2>
            </div>
            <Link href="/portfolio">
              <button className="hidden md:flex items-center gap-2 text-white hover:text-primary transition-colors uppercase text-sm tracking-widest font-medium group">
                View All Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.id} index={idx} {...project} />
            ))}
          </div>
          
          <div className="mt-12 md:hidden text-center">
            <Link href="/portfolio">
              <button className="px-8 py-3 border border-white/20 text-white uppercase tracking-widest text-sm">View All Projects</button>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Comprehensive Design Services</h2>
            <p className="text-muted-foreground">From concept to completion, we handle every detail of your architectural journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              index={0}
              icon={Ruler}
              title="Architectural Design"
              description="Full-scale architectural planning for residential and commercial spaces with a focus on modern aesthetics."
            />
            <ServiceCard 
              index={1}
              icon={Box}
              title="Interior Styling"
              description="Curated interior environments that blend luxury furniture, lighting, and art into a cohesive experience."
            />
            <ServiceCard 
              index={2}
              icon={Cpu}
              title="Smart Home Integration"
              description="Seamlessly embedding IoT and automation technology into the very fabric of your walls."
            />
            <ServiceCard 
              index={3}
              icon={Leaf}
              title="Landscape Architecture"
              description="Designing outdoor spaces that extend your living area into nature with sustainable practices."
            />
            <ServiceCard 
              index={4}
              icon={Lightbulb}
              title="Lighting Design"
              description="Strategic lighting plans that enhance mood, functionality, and architectural features."
            />
            <div className="p-8 rounded-sm bg-primary/5 border border-primary/20 flex flex-col justify-center items-center text-center group hover:bg-primary/10 transition-colors">
              <h3 className="text-xl font-display font-bold text-primary mb-2">Custom Request?</h3>
              <p className="text-muted-foreground text-sm mb-6">We tailor our services to your unique vision.</p>
              <Link href="/contact">
                <button className="text-white underline decoration-primary underline-offset-4 hover:text-primary transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-secondary/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-white mb-16 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-0" />

            {[
              { step: "01", title: "Consultation", desc: "Understanding your vision and site analysis." },
              { step: "02", title: "Concept", desc: "Initial sketches and 3D visualization." },
              { step: "03", title: "Development", desc: "Detailed technical drawings and material selection." },
              { step: "04", title: "Execution", desc: "Construction oversight and final styling." }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto bg-background border border-primary/30 rounded-full flex items-center justify-center text-2xl font-display font-bold text-primary mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="py-24 bg-background" id="contact">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-secondary/20 p-8 md:p-12 rounded-sm border border-white/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-center mb-4">Start Your Project</h2>
            <p className="text-center text-muted-foreground mb-10">Tell us about your vision. We'll handle the rest.</p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Name</label>
                  <input
                    {...form.register("name")}
                    className="w-full bg-background/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <span className="text-red-500 text-xs">{form.formState.errors.name.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                  <input
                    {...form.register("email")}
                    className="w-full bg-background/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <span className="text-red-500 text-xs">{form.formState.errors.email.message}</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Project Details</label>
                <textarea
                  {...form.register("projectDetails")}
                  rows={4}
                  className="w-full bg-background/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Tell us about the property, timeline, and goals..."
                />
                {form.formState.errors.projectDetails && (
                  <span className="text-red-500 text-xs">{form.formState.errors.projectDetails.message}</span>
                )}
              </div>
              
              <button
                disabled={mutation.isPending}
                type="submit"
                className="w-full py-4 bg-primary text-background font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

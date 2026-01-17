import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/routes";
import { useContactSubmission } from "@/hooks/use-contact";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const mutation = useContactSubmission();
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: { name: "", email: "", projectDetails: "" },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

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
            GET IN TOUCH
          </motion.h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ready to bring your vision to life? Let's discuss how we can transform your space.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We are available for consultations worldwide. Our headquarters are designed to inspire, 
                located in the heart of the Innovation District.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Visit Us</h4>
                  <p className="text-muted-foreground text-sm">123 Future Blvd, Innovation District<br />New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email Us</h4>
                  <p className="text-muted-foreground text-sm">hello@aetherarch.com</p>
                  <p className="text-muted-foreground text-sm">projects@aetherarch.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Call Us</h4>
                  <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                  <p className="text-muted-foreground text-sm">Mon-Fri, 9am - 6pm EST</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary/20 p-8 md:p-12 rounded-sm border border-white/10 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-display font-bold text-white mb-8">Send an Inquiry</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Full Name</label>
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
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Email Address</label>
                <input
                  {...form.register("email")}
                  className="w-full bg-background/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
                {form.formState.errors.email && (
                  <span className="text-red-500 text-xs">{form.formState.errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Message / Project Details</label>
                <textarea
                  {...form.register("projectDetails")}
                  rows={5}
                  className="w-full bg-background/50 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
                {form.formState.errors.projectDetails && (
                  <span className="text-red-500 text-xs">{form.formState.errors.projectDetails.message}</span>
                )}
              </div>

              <button
                disabled={mutation.isPending}
                type="submit"
                className="w-full py-4 bg-primary text-background font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
              >
                {mutation.isPending ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

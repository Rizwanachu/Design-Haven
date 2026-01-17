import { Link } from "wouter";
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-display font-bold tracking-widest text-primary text-glow cursor-pointer">
              AETHER<span className="text-white">ARCH</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Pioneering the intersection of luxury, technology, and sustainable living. We design the spaces of tomorrow, today.
            </p>
          </div>

          <div>
            <h4 className="text-white font-display text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Portfolio', 'Services', 'Process', 'Careers'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>123 Future Blvd, Innovation District</li>
              <li>New York, NY 10001</li>
              <li className="text-primary hover:text-white transition-colors cursor-pointer">hello@aetherarch.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display text-lg mb-6">Social</h4>
            <div className="flex space-x-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-background transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AetherArch. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-bold tracking-widest text-primary text-glow cursor-pointer">
          FUTURE<span className="text-white">DWELL</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="relative group cursor-pointer">
                <span className={`text-sm font-medium tracking-wider uppercase transition-colors duration-200 ${location === link.href ? "text-primary" : "text-gray-400 group-hover:text-white"}`}>
                  {link.label}
                </span>
                {location === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  />
                )}
              </div>
            </Link>
          ))}
          <Link href="/contact">
            <button className="px-6 py-2 border border-primary/50 text-primary text-sm font-semibold uppercase tracking-widest hover:bg-primary hover:text-background hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 rounded-sm">
              Book Now
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 py-8 px-6 flex flex-col space-y-6"
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              <div className={`text-lg font-display tracking-widest cursor-pointer ${location === link.href ? "text-primary" : "text-white"}`}>
                {link.label}
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      {/* Animated lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-8xl md:text-[12rem] font-bold text-foreground text-glow leading-none tracking-tighter">
            OWTY
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-[0.2em] mt-2">
            Obixko Tempo
          </p>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase font-light"
        >
          Hiphop · Afrobeat · Culture
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex gap-4 justify-center"
        >
          <a
            href="#music"
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm hover:bg-primary/80 transition-colors"
          >
            Listen Now
          </a>
          <a
            href="#merch"
            className="px-8 py-3 border border-foreground/20 text-foreground font-semibold uppercase tracking-wider text-sm hover:border-primary hover:text-primary transition-colors"
          >
            Merch
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;

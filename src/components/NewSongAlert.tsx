import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Music, ExternalLink } from "lucide-react";

const NewSongAlert = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="relative z-[60] bg-primary text-primary-foreground"
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-foreground/20 flex-shrink-0 animate-pulse">
              <Music className="w-3.5 h-3.5" />
            </span>
            <p className="text-sm font-medium truncate">
              🔥 New single <span className="font-bold">"17"</span> is out now!
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://fanlink.tv/aura2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-foreground text-primary text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity rounded-sm"
            >
              Listen <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setVisible(false)}
              className="p-1 hover:bg-primary-foreground/20 rounded-sm transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewSongAlert;

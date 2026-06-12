import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import coverFela from "@/assets/cover-fela.jpg";
import coverEveryday from "@/assets/cover-everyday.jpg";
import cover430 from "@/assets/cover-430.jpg";
import coverKamikaze from "@/assets/cover-kamikaze.jpg";
import coverJjc from "@/assets/cover-jjc.jpg";
import coverSeh from "@/assets/cover-seh.jpg";
import cover17 from "@/assets/cover-17.jpg";
import coverRoan from "@/assets/cover-roan.jpg";
import StreamingModal from "./StreamingModal";

const tracks = [
  { title: "Request of a Nigga", album: "Single", year: "2026", link: "https://open.spotify.com/album/4SmHJ0gX37z3PuIcKwRGoo?si=CaKKvR6ISmy-0Lv7KDziCw", cover: coverRoan, modal: false },
  { title: "17", album: "Single", year: "2025", link: null, cover: cover17, modal: true },
  { title: "Aura", album: "Single", year: "2025", link: "https://fanlink.tv/aura2", cover: null, modal: false },
  { title: "SEH!", album: "Single", year: "2025", link: "https://fanlink.tv/SEH", cover: coverSeh, modal: false },
  { title: "Fela", album: "Fela", year: "2025", link: "https://open.spotify.com/track/6qLO1UhKMYOrRAPKqiayKl", cover: coverFela, modal: false },
  { title: "Everyday", album: "Everyday", year: "2025", link: "https://open.spotify.com/track/5niKPwKgg5vDDlVuuROfsx", cover: coverEveryday, modal: false },
  { title: "4:30", album: "TENACIOUS", year: "2024", link: "https://open.spotify.com/track/1olyRmfCBshCOYU1PVFXq8", cover: cover430, modal: false },
  { title: "Kamikaze", album: "Single", year: "2024", link: "https://open.spotify.com/track/2bMM11KqSUdiXaGgrg4VXc", cover: coverKamikaze, modal: false },
  { title: "JJC", album: "Single", year: "2024", link: "https://open.spotify.com/track/4ZbnJhmbM3haFaZmuRGOpW", cover: coverJjc, modal: false },
  { title: "Dark Frequency", album: "Single", year: "2023", link: "#", cover: null, modal: false },
  { title: "Omo Naija", album: "Roots Vol. 1", year: "2023", link: "#", cover: null, modal: false },
  { title: "Run It Up", album: "Single", year: "2023", link: "#", cover: null, modal: false },
];

const MusicSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="music" className="py-24 px-4 md:px-8 noise-bg relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-2">Music</h2>
            <div className="w-16 h-1 bg-primary mb-12" />
          </motion.div>

          <div className="space-y-0">
            {tracks.map((track, i) =>
              track.modal ? (
                <motion.button
                  key={track.title}
                  onClick={() => setModalOpen(true)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="w-full group flex items-center justify-between py-4 px-4 border-b border-border hover:bg-secondary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden bg-secondary">
                      {track.cover ? (
                        <img
                          src={track.cover}
                          alt={`${track.title} cover`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5 text-primary" fill="currentColor" />
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-foreground font-semibold text-lg group-hover:text-primary transition-colors font-sans">
                        {track.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{track.album}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground text-sm hidden md:block">{track.year}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </motion.button>
              ) : (
                <motion.a
                  key={track.title}
                  href={track.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-center justify-between py-4 px-4 border-b border-border hover:bg-secondary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden bg-secondary">
                      {track.cover ? (
                        <img
                          src={track.cover}
                          alt={`${track.title} cover`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-5 h-5 text-primary" fill="currentColor" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-lg group-hover:text-primary transition-colors font-sans">
                        {track.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{track.album}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground text-sm hidden md:block">{track.year}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </motion.a>
              )
            )}
          </div>
        </div>
      </section>

      <StreamingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        songTitle="17"
      />
    </>
  );
};

export default MusicSection;

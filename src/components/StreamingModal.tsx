import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface StreamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  songTitle: string;
}

const platforms = [
  {
    name: "Spotify",
    logo: "https://cdn.simpleicons.org/spotify/1DB954",
    bg: "#1DB954",
    link: "https://open.spotify.com/album/0QwWjVyPWv23ZqZSWXpWsb",
  },
  {
    name: "Apple Music",
    logo: "https://cdn.simpleicons.org/applemusic/FA243C",
    bg: "#FA243C",
    link: "https://geo.music.apple.com/album/17-single/6767640370?app=music",
  },
  {
    name: "Audiomack",
    logo: "https://cdn.simpleicons.org/audiomack/FF6600",
    bg: "#FF6600",
    link: "https://audiomack.com/obixkotempo/song/17",
  },
  {
    name: "Boomplay",
    logo: "https://cdn.simpleicons.org/boomplay/FF0000",
    bg: "#FF0000",
    link: "#",
  },
  {
    name: "Deezer",
    logo: "https://cdn.simpleicons.org/deezer/A238FF",
    bg: "#A238FF",
    link: "https://www.deezer.com/album/978659061",
  },
  {
    name: "YouTube Music",
    logo: "https://cdn.simpleicons.org/youtubemusic/FF0000",
    bg: "#FF0000",
    link: "https://music.youtube.com/watch?v=SNwtmfbW-Y0&si=hjHBqtGxalWFOGSY",
  },
];

const StreamingModal = ({ isOpen, onClose, songTitle }: StreamingModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
                <p className="text-white/50 text-xs uppercase tracking-widest font-medium mb-1">
                  Now Available
                </p>
                <h2 className="text-white text-2xl font-bold font-['Oswald'] uppercase">
                  "{songTitle}"
                </h2>
                <p className="text-white/40 text-sm mt-1">
                  Choose your preferred platform
                </p>
              </div>

              {/* Platform List */}
              <div className="p-4 flex flex-col gap-2">
                {platforms.map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5 hover:border-white/20"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: platform.bg + "22" }}
                    >
                      <img
                        src={platform.logo}
                        alt={platform.name}
                        className="w-5 h-5"
                      />
                    </div>
                    <span className="text-white font-medium flex-1">
                      {platform.name}
                    </span>
                    <span className="text-white/30 text-sm group-hover:text-white/60 transition-colors">
                      Listen →
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 pb-5 text-center">
                <p className="text-white/20 text-xs">OWTY</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StreamingModal;

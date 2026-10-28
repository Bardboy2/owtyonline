import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic } from "lucide-react";
import coverGhostMode from "@/assets/cover-ghost-mode.jpg";

const platforms = [
  {
    name: "Spotify",
    logo: "https://cdn.simpleicons.org/spotify/1DB954",
    bg: "#1DB954",
    link: "https://open.spotify.com/album/48HM7WIU1EPgYyIjmmW2Vf",
  },
  {
    name: "Apple Music",
    logo: "https://cdn.simpleicons.org/applemusic/FA243C",
    bg: "#FA243C",
    link: "https://music.apple.com/us/album/ghost-mode-single/6808497748",
  },
  {
    name: "YouTube Music",
    logo: "https://cdn.simpleicons.org/youtubemusic/FF0000",
    bg: "#FF0000",
    link: "https://music.youtube.com/playlist?list=OLAK5uy_lRgvgvI9fiQ4FzXQPWO6o4JjhhPU52jLg",
  },
  {
    name: "Audiomack",
    logo: "https://cdn.simpleicons.org/audiomack/FF6600",
    bg: "#FF6600",
    link: "https://audiomack.com/owtyszn/song/ghost-mode",
  },
  {
    name: "Boomplay",
    logo: "https://cdn.simpleicons.org/boomplay/FF0000",
    bg: "#FF0000",
    link: "https://www.boomplay.com/songs/EQspo80hvkaXxU_9eZnrSxux",
  },
];

const SongGhostMode = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4 py-12">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </motion.button>

      <div className="w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <img
            src={coverGhostMode}
            alt="Ghost Mode cover"
            className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-2xl mb-5"
          />
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">New Single</p>
          <h1 className="text-white text-4xl font-bold font-['Oswald'] uppercase">"Ghost Mode"</h1>
          <p className="text-white/40 text-sm mt-1">OWTY</p>
        </motion.div>

        <div className="flex flex-col gap-2">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.07 }}
              className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5 hover:border-white/20"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: platform.bg + "22" }}
              >
                <img src={platform.logo} alt={platform.name} className="w-5 h-5" />
              </div>
              <span className="text-white font-medium flex-1">{platform.name}</span>
              <span className="text-white/30 text-sm group-hover:text-white/60 transition-colors">
                Listen →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Challenge banner */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate("/ghost-mode-challenge")}
          className="mt-6 w-full flex items-center justify-between gap-3 px-5 py-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/60 rounded-xl transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Mic className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-primary text-xs font-semibold uppercase tracking-widest">Open Challenge</p>
              <p className="text-white text-sm font-semibold">Ghost Mode Challenge — Drop your verse</p>
            </div>
          </div>
          <span className="text-white/30 group-hover:text-white/60 text-sm transition-colors">→</span>
        </motion.button>
      </div>
    </div>
  );
};

export default SongGhostMode;

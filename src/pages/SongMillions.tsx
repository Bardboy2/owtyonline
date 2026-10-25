import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import coverMillions from "@/assets/cover-millions.jpg";

const platforms = [
  {
    name: "Apple Music",
    logo: "https://cdn.simpleicons.org/applemusic/FC3C44",
    bg: "#FC3C44",
    link: "https://music.apple.com/us/album/millions-single/6822003695",
  },
  {
    name: "Spotify",
    logo: "https://cdn.simpleicons.org/spotify/1DB954",
    bg: "#1DB954",
    link: "https://open.spotify.com/track/2uiIDnzkWVeHlySUmYSS3i",
  },
  {
    name: "YouTube Music",
    logo: "https://cdn.simpleicons.org/youtubemusic/FF0000",
    bg: "#FF0000",
    link: "https://music.youtube.com/playlist?list=OLAK5uy_l0BBkp_WdZW2DUY62I_ke84Yr2pGP0iMk",
  },
  {
    name: "Audiomack",
    logo: "https://cdn.simpleicons.org/audiomack/FF6600",
    bg: "#FF6600",
    link: "https://audiomack.com/owtyszn/song/millions",
  },
  {
    name: "Boomplay",
    logo: "https://cdn.simpleicons.org/boomplay/FF0000",
    bg: "#FF0000",
    link: "https://www.boomplay.com/songs/EQvNulhDxMblKGuwNgLxUIL9",
  },
];

const SongMillions = () => {
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
            src={coverMillions}
            alt="Millions cover"
            className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-2xl mb-5"
          />
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">New Single</p>
          <h1 className="text-white text-4xl font-bold font-['Oswald'] uppercase">"Millions"</h1>
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
      </div>
    </div>
  );
};

export default SongMillions;

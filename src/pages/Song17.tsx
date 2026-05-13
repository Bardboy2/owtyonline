import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import cover17 from "@/assets/cover-17.jpg";

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

const Song17 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-4 py-12">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </motion.button>

      <div className="w-full max-w-sm">
        {/* Cover Art */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <img
            src={cover17}
            alt="17 cover"
            className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-2xl mb-5"
          />
          <p className="text-white/40 text-xs uppercase tracking-widest mb-1">New Single</p>
          <h1 className="text-white text-4xl font-bold font-['Oswald'] uppercase">"17"</h1>
          <p className="text-white/40 text-sm mt-1">OWTY</p>
        </motion.div>

        {/* Platform List */}
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

export default Song17;

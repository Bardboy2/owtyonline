import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Youtube } from "lucide-react";

const videos = [
  { id: "MhzO7d1_Swk", date: "Oct 2026" },
  { id: "ENjKCdD5XLU", date: "Oct 2026" },
  { id: "2CAeHxDOHGU", date: "Oct 2026" },
  { id: "LNHfBdSN4dk", date: "Oct 2026" },
  { id: "dWW8xE17t-w", date: "Oct 11, 2026" },
];

const Diary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-12">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm mb-12"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </motion.button>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">Diary</h1>
          <div className="w-16 h-1 bg-primary" />
          <p className="text-white/40 text-sm mt-4 uppercase tracking-widest">Daily life · OWTY</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="relative w-full" style={{ paddingTop: "177.78%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={`OWTY video ${i + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="px-3 py-2">
                <p className="text-white/30 text-xs uppercase tracking-widest">{video.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="https://www.youtube.com/@owtyofficial"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white text-sm font-medium transition-all"
        >
          <Youtube className="w-4 h-4 text-red-500" />
          View full channel
        </motion.a>
      </div>
    </div>
  );
};

export default Diary;

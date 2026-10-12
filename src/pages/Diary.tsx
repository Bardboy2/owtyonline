import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Youtube } from "lucide-react";

const videos = [
  { id: "ENjKCdD5XLU" },
  { id: "2CAeHxDOHGU" },
  { id: "LNHfBdSN4dk" },
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
              className="relative w-full overflow-hidden rounded-xl bg-white/5 border border-white/10"
              style={{ paddingTop: "177.78%" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={`OWTY video ${i + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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

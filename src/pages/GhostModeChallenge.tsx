import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Mic, Share2 } from "lucide-react";
import coverGhostMode from "@/assets/cover-ghost-mode.jpg";

const BEAT_URL = "/ghost-mode-instrumental.mp3";
const PREVIEW_URL = "/ghost-mode-instrumental.mp3";

const steps = [
  { icon: <Download className="w-5 h-5" />, title: "Download the beat", desc: "Grab the Ghost Mode instrumental below — free for this challenge." },
  { icon: <Mic className="w-5 h-5" />, title: "Drop your verse", desc: "Record your verse over the beat. No rules, just bars." },
  { icon: <Share2 className="w-5 h-5" />, title: "Post & tag OWTY", desc: "Upload to TikTok, Instagram or YouTube and tag @owtygram so we can see it." },
];

const GhostModeChallenge = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-12">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/ghost-mode")}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm mb-12"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </motion.button>

      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <img
            src={coverGhostMode}
            alt="Ghost Mode cover"
            className="w-32 h-32 object-cover rounded-2xl mx-auto shadow-2xl mb-6"
          />
          <p className="text-primary text-xs uppercase tracking-widest mb-2 font-semibold">Open Challenge</p>
          <h1 className="text-white text-5xl font-bold font-['Oswald'] uppercase leading-tight">
            Ghost Mode<br />Challenge
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto mt-4" />
          <p className="text-white/40 text-sm mt-5 max-w-sm mx-auto">
            Download the instrumental, record your verse, and post it. The best ones get reposted by OWTY.
          </p>
        </motion.div>

        {/* Audio preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6 p-4 bg-white/5 border border-white/10 rounded-2xl"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Preview the beat</p>
          <audio
            controls
            className="w-full"
            style={{ accentColor: "#e02626" }}
          >
            <source src={PREVIEW_URL} type="audio/mpeg" />
            Your browser does not support audio playback.
          </audio>
        </motion.div>

        {/* Download button */}
        <motion.a
          href={BEAT_URL}
          download="Ghost-Mode-Instrumental-OWTY.mp3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 w-full py-4 bg-primary hover:opacity-90 transition-opacity rounded-xl text-white font-bold uppercase tracking-wider text-sm mb-10"
        >
          <Download className="w-5 h-5" />
          Download Instrumental
        </motion.a>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-3"
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">How to enter</p>
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                {step.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-white/40 text-xs">{step.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <p className="text-white/20 text-xs text-center mt-8">
          Beat produced for the Ghost Mode Challenge · OWTY · 2026
        </p>
      </div>
    </div>
  );
};

export default GhostModeChallenge;

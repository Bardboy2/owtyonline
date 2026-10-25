import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const steps = [
  { n: 1, title: "Watches your channel", desc: "Polls Kick and Twitch every five minutes. The moment a new VOD appears, it starts — no prompting, no uploading." },
  { n: 2, title: "Finds the peaks", desc: "Scans the full audio track for energy spikes — laughter, reactions, crowd noise, drops — to shortlist candidate moments." },
  { n: 3, title: "Scores them with AI", desc: "Pulls a frame from each candidate and asks Claude how viral the moment actually is. Loud isn't the same as good." },
  { n: 4, title: "Cuts and captions", desc: "Trims the top-ranked moments, burns in word-level captions timed to the speech, and adds your channel watermark." },
  { n: 5, title: "Sends them to you", desc: "Finished clips land in Telegram with title, description and score. Approve, reject or rewrite the caption from your phone." },
  { n: 6, title: "Posts automatically", desc: "One tap pushes to YouTube Shorts and TikTok with metadata already written. Nothing publishes without your say-so." },
];

const features = [
  { ico: "⚡", title: "Always on", desc: "Runs 24/7 on a server, not your laptop. Your machine can be closed, asleep or off." },
  { ico: "💬", title: "Approve from your phone", desc: "Review and publish from Telegram. No dashboard to log into, no desktop needed." },
  { ico: "✍️", title: "Captions written for you", desc: "Word-level transcription plus AI-generated titles, descriptions and hashtags per platform." },
  { ico: "🎯", title: "Your branding", desc: "Channel watermark burned into every clip, so reposts still point back to you." },
  { ico: "🔒", title: "Nothing posts itself", desc: "Every clip waits for your approval. The automation stops where your judgement starts." },
  { ico: "🧹", title: "Cleans up after itself", desc: "Source VODs and spent clips are deleted automatically after 48 hours." },
];

const ClipEngine = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setMsg("Sending…");
    try {
      const fd = new FormData();
      fd.append("email", email);
      fd.append("channel", channel);
      const res = await fetch("https://formspree.io/f/xrppeewv", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setEmail("");
        setChannel("");
        setMsg("You're on the list. Talk soon.");
      } else {
        setMsg("Something went wrong — try again?");
      }
    } catch {
      setMsg("Network error — try again?");
    }
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm mb-16"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs text-white/50 border border-white/10 bg-white/5 px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Running live on Kick &amp; Twitch
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Oswald'] uppercase tracking-wide">
            Your stream,<br />
            <span className="text-primary">clipped while you sleep.</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto text-lg mb-8">
            It watches your channel, finds the moments worth clipping, cuts and captions them,
            and posts to YouTube and TikTok. You just tap approve.
          </p>
          <a
            href="#waitlist"
            className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wider text-sm"
          >
            Join the waitlist
          </a>
          <p className="text-white/30 text-sm mt-4">No editing. No scrubbing through a six-hour VOD.</p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold font-['Oswald'] uppercase tracking-wide mb-2">How it works</h2>
            <div className="w-16 h-1 bg-primary" />
            <p className="text-white/40 mt-4">Six stages, start to finish, with you involved exactly once.</p>
          </div>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-5 p-5 bg-white/5 border border-white/10 rounded-xl"
              >
                <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary font-bold text-sm">
                  {step.n}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                  <p className="text-white/40 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scoring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Oswald'] uppercase tracking-wide mb-2">Volume isn't virality</h2>
            <div className="w-16 h-1 bg-primary mb-6" />
            <p className="text-white/40 text-sm mb-3">
              Most auto-clippers just hunt for the loudest thirty seconds. That finds you a lot of shouting and not much worth posting.
            </p>
            <p className="text-white/40 text-sm mb-6">
              This one extracts a frame from every candidate moment and has Claude judge it — what's happening, and would anyone stop scrolling for it.
            </p>
            <ul className="space-y-2">
              {["Every moment scored 0–10 for viral potential", "AI weighted 60%, audio energy 40%", "Clips ranked, so you see the best one first", "Tuned for IRL, Just Chatting and music streams"].map(t => (
                <li key={t} className="flex items-start gap-2 text-white/50 text-sm">
                  <span className="text-primary font-bold mt-0.5">✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-white/40 mb-2"><span>AI scene judgement</span><span className="text-white font-semibold">60%</span></div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: "60%" }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-white/40 mb-2"><span>Audio energy</span><span className="text-white font-semibold">40%</span></div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-orange-500 rounded-full" style={{ width: "40%" }} /></div>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-white/30 text-xs mb-3 uppercase tracking-widest">Example — what the AI returns</p>
              <code className="text-sm text-white/70 font-mono leading-relaxed">
                {"{"}<br />
                &nbsp;&nbsp;"score": 9,<br />
                &nbsp;&nbsp;"description": "Streamer reacts in<br />
                &nbsp;&nbsp;disbelief as the crowd erupts"<br />
                {"}"}
              </code>
            </div>
          </div>
        </motion.div>

        {/* Formats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold font-['Oswald'] uppercase tracking-wide mb-2">Three formats, one pass</h2>
            <div className="w-16 h-1 bg-primary" />
            <p className="text-white/40 mt-4">Every clip is rendered three ways, so you're not re-cutting for each platform.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Landscape", desc: "16:9, full frame — YouTube and archive", shape: "w-28 h-16" },
              { label: "Portrait crop", desc: "9:16, centre-cropped — Shorts, Reels, TikTok", shape: "w-12 h-20" },
              { label: "Portrait letterbox", desc: "9:16 on black — nothing cropped out", shape: "w-12 h-20" },
            ].map((f) => (
              <div key={f.label} className="p-5 bg-white/5 border border-white/10 rounded-xl text-center">
                <div className={`${f.shape} bg-white/10 rounded mx-auto mb-4`} />
                <h3 className="text-white font-semibold text-sm mb-1">{f.label}</h3>
                <p className="text-white/40 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold font-['Oswald'] uppercase tracking-wide mb-2">Built to run unattended</h2>
            <div className="w-16 h-1 bg-primary" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl"
              >
                <div className="text-2xl mb-3">{f.ico}</div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Waitlist */}
        <motion.div
          id="waitlist"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 bg-white/5 border border-white/10 rounded-2xl text-center"
        >
          <h2 className="text-4xl font-bold font-['Oswald'] uppercase tracking-wide mb-3">Want this on your channel?</h2>
          <p className="text-white/40 max-w-md mx-auto mb-8">
            It's running live right now on Kick and Twitch. Leave your email and I'll get in touch when it opens up to other streamers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 px-4 py-3 bg-black text-white border border-white/10 rounded-lg focus:outline-none focus:border-primary placeholder-white/20 text-sm"
            />
            <input
              type="text"
              value={channel}
              onChange={e => setChannel(e.target.value)}
              placeholder="Your channel name"
              className="flex-1 px-4 py-3 bg-black text-white border border-white/10 rounded-lg focus:outline-none focus:border-primary placeholder-white/20 text-sm"
            />
            <button
              type="submit"
              disabled={sending}
              className="bg-primary text-white font-bold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-wider text-sm disabled:opacity-50"
            >
              Join
            </button>
          </form>
          {msg && <p className="text-primary text-sm mt-4">{msg}</p>}
          <p className="text-white/20 text-xs mt-4">No spam. One email when it's ready, nothing else.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ClipEngine;

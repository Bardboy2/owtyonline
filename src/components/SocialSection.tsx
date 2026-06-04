import { motion } from "framer-motion";

const socials = [
  { name: "Instagram", handle: "@owtyszn", url: "https://www.instagram.com/owtyszn", icon: "IG" },
  { name: "X (Twitter)", handle: "@owtyszn", url: "https://www.x.com/owtyszn", icon: "X" },
  { name: "TikTok", handle: "@owtyofficial", url: "https://www.tiktok.com/@owtyofficial", icon: "TT" },
  { name: "YouTube", handle: "@owtyofficial", url: "https://www.youtube.com/@owtyofficial", icon: "YT" },
  { name: "Spotify", handle: "OWTY", url: "https://open.spotify.com/artist/3QS7P0sd61l5nTNAWWNg25?si=FRK49uuDQ6qazmcYzk6jsg", icon: "SP" },
  { name: "Apple Music", handle: "OWTY", url: "https://music.apple.com/us/artist/owty/6772721995", icon: "AM" },
];

const SocialSection = () => {
  return (
    <section id="connect" className="py-24 px-4 md:px-8 noise-bg relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-2">Connect</h2>
          <div className="w-16 h-1 bg-primary mb-12" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group border border-border bg-card/30 p-6 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <span className="text-2xl font-bold text-primary font-sans">{social.icon}</span>
              <h3 className="text-foreground font-semibold mt-3 group-hover:text-primary transition-colors font-sans">
                {social.name}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">{social.handle}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const products = [
  {
    name: "ClipEngine",
    tag: "Stream automation",
    desc: "Watches your Kick and Twitch streams, finds the moments worth clipping, captions them, and posts to YouTube and TikTok. You just approve.",
    href: "/clipengine",
    accent: "#dc2626",
  },
];

const ProductsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="products" className="py-24 px-4 md:px-8 noise-bg relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-2">Products</h2>
          <div className="w-16 h-1 bg-primary mb-12" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {products.map((p, i) => (
            <motion.button
              key={p.name}
              onClick={() => navigate(p.href)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-left p-6 bg-secondary/50 border border-border hover:border-primary/40 rounded-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{p.tag}</span>
                  <h3 className="text-foreground text-2xl font-bold mt-1 group-hover:text-primary transition-colors font-sans">
                    {p.name}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

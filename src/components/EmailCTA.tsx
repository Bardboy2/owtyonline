import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EmailCTA = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    const { error } = await supabase
      .from("email_subscribers")
      .insert({ email: email.trim().toLowerCase() });

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already subscribed! 🎶", description: "You're already on the list." });
        setSubmitted(true);
      } else {
        toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      }
      return;
    }

    setSubmitted(true);
    setEmail("");
    toast({ title: "You're in! 🔥", description: "You'll be the first to know about new drops and updates." });
  };

  return (
    <section className="py-24 px-4 md:px-8 relative noise-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 text-primary text-xs uppercase tracking-widest mb-6">
            <Mail className="w-3 h-3" />
            Free Beats & Exclusives
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Get Free Beats & Unreleased Songs
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Drop your email to get access to free beats, unreleased tracks, and exclusive content before anyone else. No spam — just fire.
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-primary font-semibold uppercase tracking-wider text-sm"
            >
              You're on the list. Stay tuned. 🔥
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                required
                maxLength={255}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-sm hover:bg-primary/80 transition-colors disabled:opacity-50"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default EmailCTA;

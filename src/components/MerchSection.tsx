import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import merchCapImg from "@/assets/merch-cap.jpg";
import shirtWhiteFront from "@/assets/shirt-white-front.jpg";
import shirtWhiteBack from "@/assets/shirt-white-back.jpg";
import shirtBlackFront from "@/assets/shirt-black-front.jpg";
import shirtBlackBack from "@/assets/shirt-black-back.jpg";
import shirtStoneFront from "@/assets/shirt-stone-front.jpg";
import shirtStoneBack from "@/assets/shirt-stone-back.jpg";
import capFront from "@/assets/cap-front.jpg";
import capBack from "@/assets/cap-back.jpg";

const products = [
  {
    id: 1,
    name: "OWTY Cap",
    price: 32,
    image: "🧢",
    photo: null,
    photos: { front: capFront, back: capBack },
    description: "Structured snapback with embroidered OWTY logo",
  },
  {
    id: 2,
    name: "OWTY Bag",
    price: 55,
    image: "🎒",
    photo: null,
    photos: null,
    description: "Heavy-duty canvas tote with woven OWTY patch",
  },
  {
    id: 3,
    name: "OWTY Shirt — White",
    price: 37,
    image: "👕",
    photo: null,
    photos: { front: shirtWhiteFront, back: shirtWhiteBack },
    description: "Oversized heavyweight tee with front & back print",
  },
  {
    id: 4,
    name: "OWTY Shirt — Black",
    price: 37,
    image: "👕",
    photo: null,
    photos: { front: shirtBlackFront, back: shirtBlackBack },
    description: "Oversized heavyweight tee with front & back print",
  },
  {
    id: 5,
    name: "OWTY Shirt — Stonewash Black",
    price: 37,
    image: "👕",
    photo: null,
    photos: { front: shirtStoneFront, back: shirtStoneBack },
    description: "Oversized heavyweight tee with front & back print",
  },
  {
    id: 6,
    name: "OWTY Jeans",
    price: 120,
    image: "👖",
    photo: null,
    photos: null,
    description: "Relaxed fit denim with custom OWTY embroidery",
  },
  {
    id: 7,
    name: "OWTY Hoodie",
    price: 85,
    image: "🧥",
    photo: null,
    photos: null,
    description: "Premium fleece hoodie with puff print logo",
  },
  {
    id: 8,
    name: "OWTY Beanie",
    price: 28,
    image: "🎩",
    photo: null,
    photos: null,
    description: "Ribbed knit beanie with woven label",
  },
];

const MerchSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [flippedId, setFlippedId] = useState<number | null>(null); // mobile tap
  const { addItem } = useCart();

  const handleAddToCart = (product: (typeof products)[number]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      photo: product.photo,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const isFlipped = (id: number) => hoveredId === id || flippedId === id;

  return (
    <section id="merch" className="py-24 px-4 md:px-8 relative noise-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-2">Store</h2>
          <div className="w-16 h-1 bg-primary mb-12" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                if (product.photos) {
                  setFlippedId(flippedId === product.id ? null : product.id);
                }
              }}
              className="group border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50"
            >
              {/* Image area */}
              <div className="relative h-64 flex items-center justify-center bg-secondary/50 overflow-hidden">
                {product.photos ? (
                  <>
                    {/* Front image */}
                    <img
                      src={product.photos.front}
                      alt={`${product.name} front`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                      style={{ opacity: isFlipped(product.id) ? 0 : 1 }}
                    />
                    {/* Back image */}
                    <img
                      src={product.photos.back}
                      alt={`${product.name} back`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                      style={{ opacity: isFlipped(product.id) ? 1 : 0 }}
                    />
                    {/* Front / Back label */}
                    <span className="absolute bottom-2 right-3 text-[10px] uppercase tracking-widest text-white/60 font-medium pointer-events-none select-none">
                      {isFlipped(product.id) ? "Back" : "Front"}
                    </span>
                    {/* Mobile hint */}
                    <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-widest text-white/40 font-medium pointer-events-none select-none md:hidden">
                      Tap to flip
                    </span>
                  </>
                ) : product.photo ? (
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-7xl transition-transform duration-500 group-hover:scale-110">
                    {product.image}
                  </span>
                )}

                {hoveredId === product.id && !product.photos && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-primary/10"
                  />
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-foreground uppercase tracking-wider">
                    {product.name}
                  </h3>
                  <span className="text-primary font-bold text-lg">${product.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs hover:bg-primary/80 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchSection;

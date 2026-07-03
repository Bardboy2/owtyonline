import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "";
// Conversion rate: 1 USD → NGN (update as needed)
const USD_TO_NGN = Number(import.meta.env.VITE_USD_TO_NGN ?? 1600);

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, removeItem, increaseQty, decreaseQty, clearCart, totalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Amount in kobo (NGN × 100)
  const amountKobo = Math.round(totalPrice * USD_TO_NGN * 100);

  const initializePayment = usePaystackPayment({
    publicKey: PAYSTACK_PUBLIC_KEY,
    email,
    amount: amountKobo,
    currency: "NGN",
    label: "OWTY Store",
    metadata: {
      custom_fields: items.map((item) => ({
        display_name: item.name,
        variable_name: item.name.toLowerCase().replace(/\s+/g, "_"),
        value: `x${item.quantity}`,
      })),
    },
  });

  const handleCheckout = () => {
    if (items.length === 0 || loading) return;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    initializePayment({
      onSuccess: () => {
        clearCart();
        setEmail("");
        setLoading(false);
        onOpenChange(false);
        navigate("/checkout/success");
      },
      onClose: () => {
        setLoading(false);
      },
    });
  };

  const ngnTotal = (totalPrice * USD_TO_NGN).toLocaleString("en-NG");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 uppercase tracking-wider">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 text-muted-foreground">
            <ShoppingBag className="w-10 h-10 opacity-30" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 mt-4 pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="w-16 h-16 flex-shrink-0 bg-secondary/50 flex items-center justify-center overflow-hidden rounded">
                    {item.photo ? (
                      <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl">{item.image}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm uppercase tracking-wide truncate">{item.name}</h4>
                    <p className="text-primary font-bold text-sm">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-6 h-6 flex items-center justify-center border border-border hover:border-primary transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-6 h-6 flex items-center justify-center border border-border hover:border-primary transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 mt-4 space-y-3">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <div className="text-right">
                  <span className="text-primary">₦{ngnTotal}</span>
                  <p className="text-xs text-muted-foreground font-normal">(~${totalPrice.toFixed(2)})</p>
                </div>
              </div>

              {/* Email input for Paystack */}
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Email address <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 text-sm bg-background border-2 border-primary/40 rounded focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <Button
                onClick={handleCheckout}
                disabled={loading || !email}
                className="w-full uppercase tracking-wider font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  "Checkout"
                )}
              </Button>
              <button
                onClick={clearCart}
                className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors uppercase tracking-wider"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

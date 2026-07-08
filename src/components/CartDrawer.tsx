import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usePaystackPayment } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY ?? "";
const USD_TO_NGN = Number(import.meta.env.VITE_USD_TO_NGN ?? 1600);

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, removeItem, increaseQty, decreaseQty, clearCart, totalPrice } = useCart();
  const [customer, setCustomer] = useState<CustomerInfo>({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const amountKobo = Math.round(totalPrice * USD_TO_NGN * 100);

  const initializePayment = usePaystackPayment({
    publicKey: PAYSTACK_PUBLIC_KEY,
    email: customer.email,
    amount: amountKobo,
    currency: "NGN",
    label: "OWTY Store",
    metadata: {
      custom_fields: [
        { display_name: "Name", variable_name: "name", value: customer.name },
        { display_name: "Phone", variable_name: "phone", value: customer.phone },
        { display_name: "Delivery Address", variable_name: "address", value: customer.address },
        ...items.map((item) => ({
          display_name: item.name,
          variable_name: item.name.toLowerCase().replace(/\s+/g, "_"),
          value: `x${item.quantity}`,
        })),
      ],
    },
  });

  const field = (key: keyof CustomerInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setCustomer((prev) => ({ ...prev, [key]: e.target.value }));

  const handleCheckout = () => {
    if (items.length === 0 || loading) return;

    const { name, email, phone, address } = customer;

    if (!name.trim()) return toast({ title: "Name required", variant: "destructive" });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast({ title: "Valid email required", variant: "destructive" });
    if (!phone.trim()) return toast({ title: "Phone number required", variant: "destructive" });
    if (!address.trim()) return toast({ title: "Delivery address required", variant: "destructive" });

    setLoading(true);

    initializePayment({
      onSuccess: async (response: any) => {
        await supabase.from("orders").insert({
          name,
          email,
          phone,
          address,
          items: items.map((i) => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
          total_ngn: totalPrice * USD_TO_NGN,
          paystack_reference: response?.reference ?? null,
        });

        clearCart();
        setCustomer({ name: "", email: "", phone: "", address: "" });
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

  const inputClass =
    "w-full px-3 py-2.5 text-sm bg-background border-2 border-primary/40 rounded focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground";

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

              <p className="text-xs text-muted-foreground uppercase tracking-wider">Delivery details</p>

              <div>
                <label className="block text-xs text-muted-foreground mb-1">Full name <span className="text-primary">*</span></label>
                <input type="text" value={customer.name} onChange={field("name")} placeholder="John Doe" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1">Email address <span className="text-primary">*</span></label>
                <input type="email" value={customer.email} onChange={field("email")} placeholder="your@email.com" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1">Phone number <span className="text-primary">*</span></label>
                <input type="tel" value={customer.phone} onChange={field("phone")} placeholder="+234 800 000 0000" className={inputClass} />
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1">Delivery address <span className="text-primary">*</span></label>
                <textarea
                  value={customer.address}
                  onChange={field("address")}
                  placeholder="Street, City, State"
                  rows={2}
                  className={inputClass + " resize-none"}
                />
              </div>

              <Button
                onClick={handleCheckout}
                disabled={loading || !customer.email || !customer.name || !customer.phone || !customer.address}
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

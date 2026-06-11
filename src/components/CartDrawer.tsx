import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, removeItem, increaseQty, decreaseQty, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    toast({
      title: "Checkout coming soon",
      description: "Online checkout isn't set up yet — stay tuned!",
    });
  };

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
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full uppercase tracking-wider font-semibold">
                Checkout
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

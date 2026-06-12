import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CheckoutSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-4 noise-bg">
      <CheckCircle2 className="w-16 h-16 text-primary" />
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-foreground">
        Order Confirmed
      </h1>
      <p className="text-muted-foreground max-w-md">
        Thanks for your order! A confirmation email is on its way. Your gear will be shipped soon.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-3 bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs hover:bg-primary/80 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default CheckoutSuccess;

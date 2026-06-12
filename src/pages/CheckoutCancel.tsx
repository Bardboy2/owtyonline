import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-4 noise-bg">
      <XCircle className="w-16 h-16 text-muted-foreground" />
      <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-foreground">
        Checkout Cancelled
      </h1>
      <p className="text-muted-foreground max-w-md">
        Your order was not completed and your card has not been charged. Your cart is still saved.
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

export default CheckoutCancel;

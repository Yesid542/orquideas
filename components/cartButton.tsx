import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function CartButton({ isOverHero }: { isOverHero: boolean }) {
  const { items, setIsOpenCart } = useCart();
  const itemCount = items.length;

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpenCart(true)}
        variant="ghost"
        size="icon"
        className={`${
          isOverHero
            ? "text-white hover:text-fuchsia-400"
            : "text-muted-foreground hover:text-primary"
        }`}
      >
        <ShoppingBag className="h-5 w-5" />
      </Button>

      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {itemCount}
        </span>
      )}
    </div>
  );
}

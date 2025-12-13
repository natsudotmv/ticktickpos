import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Cart = ({ items, onAdd, onRemove }) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-medium mb-3">Cart</h2>

      <div className="flex-1 space-y-3 text-sm overflow-y-auto">
        {items.length === 0 && (
          <p className="text-muted-foreground">
            No items added
          </p>
        )}

        {items.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>

            <div className="flex gap-2 mt-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRemove(item)}
              >
                −
              </Button>
              <span className="px-2">{item.qty}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAdd(item)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-3" />

      <div className="space-y-2">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <Button
          className="w-full"
          disabled={items.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;

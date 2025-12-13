import { Button } from "@/components/ui/button";

const Cart = () => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="font-medium mb-3">Cart</h2>

      <div className="flex-1 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Item A</span>
          <span>$10.00</span>
        </div>
        <div className="flex justify-between">
          <span>Item B</span>
          <span>$8.00</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>$18.00</span>
        </div>
        <Button className="w-full">Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;

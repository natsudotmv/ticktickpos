import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import TableSelector from "@/components/pos/TableSelector";
import MenuList from "@/components/pos/MenuList";
import Cart from "@/components/pos/Cart";

import { Button } from "@/components/ui/button";

const POSPage = () => {
  const { logout } = useAuth();

  const [selectedTable, setSelectedTable] = useState(null);
  const [cartItems, setCartItems] = useState([]);


  const handleTableSelect = (table) => {
    if(selectedTable && cartItems.length > 0 && table !== selectedTable) {
        const confirm = window.confirm(
            "Switching tables will clear the current cart. Do you want to proceed?"
        );
        if(!confirm) return;
        setCartItems([]);
    }
    setSelectedTable(table);
  };



  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === item.id
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b">
        <h1 className="font-semibold">POS</h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* {!selectedTable && (
            <div className="text-muted-foreground mb-4">
              Select a table to start ordering
            </div>
        )} */}
        {/* Tables */}
        <aside className="w-64 border-r p-4">
          <TableSelector 
            selectedTable={selectedTable}
            onSelect={handleTableSelect}
          />
        </aside>

        {/* Menu */}
        <main className={`flex-1 p-4 overflow-y-auto ${
            !selectedTable && "opacity-50 pointer-events-none"
          }`}
        >
          <MenuList onAdd={addToCart} />
        </main>
        {/* Cart */}
        <aside className="w-80 border-l p-4">
          <Cart
            table={selectedTable}
            items={cartItems}
            onAdd={addToCart}
            onRemove={removeFromCart}
          />
        </aside>
      </div>
    </div>
  );
};

export default POSPage;

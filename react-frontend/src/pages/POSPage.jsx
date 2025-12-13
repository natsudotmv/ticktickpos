import { useAuth } from "@/context/AuthContext";

import TableSelector from "@/components/pos/TableSelector";
import MenuList from "@/components/pos/MenuList";
import Cart from "@/components/pos/Cart";

import {
    Button
} from "@/components/ui/button";

const POSPage = () => {
  const { logout } = useAuth();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-4 border-b">
        <h1 className="text-lg font-semibold">POS Terminal</h1>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Tables */}
        <aside className="w-64 border-r p-4 overflow-y-auto">
          <h2 className="font-medium mb-3">Tables</h2>
          <TableSelector />
        </aside>

        {/* Center: Menu */}
        <main className="flex-1 p-4 overflow-y-auto">
          <MenuList />
        </main>

        {/* Right: Cart */}
        <aside className="w-80 border-l p-4 overflow-y-auto">
          <Cart />
        </aside>
      </div>
    </div>
  );
};

export default POSPage;

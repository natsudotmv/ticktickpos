import { useEffect, useState } from "react";
import http from "@/api/http";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MenuList = ({ onAdd }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await http.get("/menu");
        setMenu(res.data);
      } catch (err) {
        console.error("Failed to load menu", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  return (
    <div className="space-y-6">
      {menu.map((category) => (
        <div key={category.id}>
          <h2 className="text-lg font-semibold mb-3">
            {category.name.toUpperCase()}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.items.map((item) => (
              <Card
                key={item.id}
                className={!item.is_available ? "opacity-50" : ""}
              >
                <CardContent className="p-3 space-y-2">
                  <div className="h-24 bg-muted rounded-md" />

                  <div className="font-medium">{item.name}</div>

                  <div className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </div>

                  <Button
                    size="sm"
                    className="w-full"
                    disabled={!item.is_available}
                    onClick={() => onAdd(item)}
                  >
                    {item.is_available ? "Add" : "Unavailable"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;

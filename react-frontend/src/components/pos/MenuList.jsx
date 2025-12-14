import { useEffect, useState } from "react";
import http from "@/api/http";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Import menu images
import cokeImg from "@/assets/menu-images/coke.jpg";
import fantaImg from "@/assets/menu-images/fanta.webp";
import spriteImg from "@/assets/menu-images/sprite.jpg";
import chickenPizzaImg from "@/assets/menu-images/chicken-pizza.jpeg";
import tandooriPizzaImg from "@/assets/menu-images/tandoori-pizza.webp";
import chiliChickenPizzaImg from "@/assets/menu-images/chili-chicken-pizza.jpeg";
import chickenBurgerImg from "@/assets/menu-images/chicken-burger.webp";
import beefBurgerImg from "@/assets/menu-images/beef-burger.webp";

// Map item names to images
const imageMap = {
  "Coca Cola": cokeImg,
  "Fanta": fantaImg,
  "Sprite": spriteImg,
  "Chiken Musroom Pizza": chickenPizzaImg,
  "Tandoori Pizza": tandooriPizzaImg,
  "Chili Chicken Pizza": chiliChickenPizzaImg,
  "Chicken Burger": chickenBurgerImg,
  "Beef Burger": beefBurgerImg,
};

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
                <CardContent className="p-3 space-y-2 flex flex-col justify-between h-full">
                  <div className="h-24 bg-muted rounded-md overflow-hidden">
                    {imageMap[item.name] && (
                      <img
                        src={imageMap[item.name]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="font-medium">{item.name}</div>

                  <div className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)}
                  </div>

                  <Button
                    size="sm"
                    className="w-full mt-auto"
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

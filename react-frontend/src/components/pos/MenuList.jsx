import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MenuList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-3 space-y-2">
            <div className="h-24 bg-muted rounded-md" />
            <div className="font-medium">Item {i + 1}</div>
            <div className="text-sm text-muted-foreground">
              $10.00
            </div>
            <Button size="sm" className="w-full">
              Add
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MenuList;

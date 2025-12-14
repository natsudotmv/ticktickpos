import { Button } from "@/components/ui/button";
import clsx from "clsx";

const TABLES = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10"];

const TableSelector = ({ selectedTable, onSelect }) => {
  return (
    <div className="space-y-3">
        {!selectedTable && (
                <div className="text-muted-foreground mb-4">
                    Select a table to start the order
                </div>
            )}
        <h2 className="font-medium">Tables</h2>
        <div className="grid grid-cols-2 gap-2">
        {TABLES.map((table) => {
            const isSelected = selectedTable === table;
            return (
            <button className={clsx(
                isSelected && "border rounded-md text-sm bg-primary text-primary-foreground",
                !isSelected && "border rounded-md py-2 text-sm hover:bg-muted")}
                    key={table}
                    variant="outline"
                    onClick={() => onSelect(table)}
            >
            {table}
            </button>
            );
        })}
        </div>
    </div>
  );
};

export default TableSelector;

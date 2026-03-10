import { Package } from "lucide-react";

export default function Inventory() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Package className="w-6 h-6" />
        Inventory
      </h1>
      <p className="text-muted-foreground mt-2">Inventory management coming soon...</p>
    </div>
  );
}

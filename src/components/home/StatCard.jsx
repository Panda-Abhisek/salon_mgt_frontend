import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const StatCard = ({ title, value, onClick }) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "transition-all",
        onClick && "cursor-pointer hover:shadow-md hover:border-primary/40"
      )}
    >
      <CardContent className="p-4 space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;

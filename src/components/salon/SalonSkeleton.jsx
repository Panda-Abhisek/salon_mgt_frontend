import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SalonSkeleton = () => {
  return (
    <Card className="max-w-lg w-full">
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-9 w-32" />
      </CardContent>
    </Card>
  );
};

export default SalonSkeleton;

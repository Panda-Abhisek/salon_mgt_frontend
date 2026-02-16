// src/components/home/HomeSkeleton.jsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const HomeSkeleton = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>

      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
};

export default HomeSkeleton;

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const ForbiddenStateCard = ({ title, description }) => {
  return (
    <div className="p-6">
      <Card className="max-w-lg border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ForbiddenStateCard;

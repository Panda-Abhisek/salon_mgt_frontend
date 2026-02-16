import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const EmptyStateCard = ({ title, description, children }) => {
  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
};

export default EmptyStateCard;

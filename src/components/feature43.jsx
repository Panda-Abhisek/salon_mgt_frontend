import {
  BatteryCharging,
  Calendar,
  DollarSign,
  GitPullRequest,
  IndianRupee,
  Layers,
  RadioTower,
  ShoppingCart,
  SquareKanban,
  UserCircle2,
  Users,
  WandSparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const Feature43 = ({
  title = "Features",

  features = [
    {
      heading: "Appointments",
      description:
        "Online booking and calendar for your team and clients. Let customers book 24/7 and keep everyone in sync.",
      icon: <Calendar className="size-6" />,
    },
    {
      heading: "Staff Management",
      description:
        "Manage your team, schedules, and permissions. Track performance and assign roles effortlessly.",
      icon: <Users className="size-6" />,
    },
    {
      heading: "Revenue & Reports",
      description:
        "Track revenue, tips, and insights per location. Make data-driven decisions to grow your business.",
      icon: <IndianRupee className="size-6" />,
    },
    {
      heading: "Inventory",
      description:
        "Stock levels and low-stock alerts for products. Never run out of essentials again.",
      icon: <ShoppingCart className="size-6" />,
    },
    {
      heading: "Customer History",
      description:
        "Service history and preferences per client. Deliver personalized experiences that keep them coming back.",
      // icon: <Layers className="size-6" />,
      icon: <UserCircle2 className="size-6" />,
    },
    {
      heading: "Efficiency",
      description:
        "Optimized for performance and developer productivity. Lightweight, fast-loading components that help you build faster without compromising on quality.",
      // icon: <BatteryCharging className="size-6" />,
      icon: <BatteryCharging className="size-6" />,
    },
  ],

  buttonText = "More Features",
  buttonUrl = "#",
  className
}) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {title && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-4xl font-medium text-pretty lg:text-5xl">
              {title}
            </h2>
          </div>
        )}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col">
              <div
                className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.heading}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        {buttonUrl && (
          <div className="mt-16 flex justify-center">
            <Button size="lg" asChild>
              <a href={buttonUrl}>{buttonText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { Feature43 };

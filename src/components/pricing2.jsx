"use client";;
import { CircleCheck } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import Example from "./badge-standard-3";

const Pricing2 = ({
  heading = "Pricing",
  description = "Check out our affordable pricing plans",

  plans = [
    {
      id: "free",
      name: "Free",
      description: "For personal use",
      monthlyPrice: "₹0",
      yearlyPrice: "₹0",
      features: [
        { text: "Up to 2 team members" },
        { text: "Basic Inventory" },
        { text: "Community support" },
        { text: "Up to 5 services" },
      ],
      button: {
        text: "Purchase",
        url: "#",
      },
    },
    {
      id: "pro",
      name: "Pro",
      description: "For professionals",
      monthlyPrice: "₹999",
      yearlyPrice: "₹10,999",
      features: [
        { text: "Up to 10 team members" },
        { text: "Advanced Inventory" },
        { text: "Priority support" },
        { text: "Up to 25 services" },
      ],
      button: {
        text: "Purchase",
        url: "#",
      },
    },
    {
      id: "premium",
      name: "Premium",
      description: "For Owners",
      monthlyPrice: "₹2,499",
      yearlyPrice: "₹28,999",
      features: [
        { text: "Unlimited team members" },
        { text: "AI components" },
        { text: "Priority support" },
        { text: "Unlimited storage" },
      ],
      button: {
        text: "Purchase",
        url: "#",
      },
    },
  ],

  className
}) => {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div
          className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-semibold text-pretty lg:text-6xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-xl">{description}</p>
          <div className="flex items-center gap-3 text-lg">
            Monthly
            <Switch checked={isYearly} onCheckedChange={() => setIsYearly(!isYearly)} />
            Yearly
          </div>
          <div className="flex flex-col items-stretch gap-6 md:flex-row">
            {plans.map((plan) => (
              <Card key={plan.id} className="flex w-80 flex-col justify-between text-left">
                <CardHeader>
                  <CardTitle className='flex justify-between'>
                    <p>{plan.name}</p>
                    {plan.id === "pro" && (
                      <Example />
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="flex items-end">
                    <span className="text-4xl font-semibold">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-2xl font-semibold text-muted-foreground">
                      {isYearly ? "/yr" : "/mo"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-6" />
                  {/* {plan.id === "pro" && (
                    // <p className="mb-3 font-semibold">
                    //   Everything in Plus, and:
                    // </p>
                  )} */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CircleCheck className="size-4" />
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <a href={plan.button.url} target="_blank">
                      {plan.button.text}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Pricing2 };

"use client";;
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./theme/ThemeToggle";

const Navbar5 = ({
  className,
  isAuthenticated,
  onAuthClick,
}) => {
  // const features = [
  //   {
  //     title: "Dashboard",
  //     description: "Overview of your activity",
  //     href: "#",
  //   },
  //   {
  //     title: "Analytics",
  //     description: "Track your performance",
  //     href: "#",
  //   },
  //   {
  //     title: "Settings",
  //     description: "Configure your preferences",
  //     href: "#",
  //   },
  //   {
  //     title: "Integrations",
  //     description: "Connect with other tools",
  //     href: "#",
  //   },
  //   {
  //     title: "Storage",
  //     description: "Manage your files",
  //     href: "#",
  //   },
  //   {
  //     title: "Support",
  //     description: "Get help when needed",
  //     href: "#",
  //   },
  // ];

  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        <nav className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
              className="max-h-8"
              alt="Shadcn UI Navbar" />
            <span className="text-lg font-semibold tracking-tighter">
              Salon Manager
            </span>
          </a>
          <NavigationMenu className="hidden lg:block">
            {/* <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70">
                        <div key={feature.title}>
                          <p className="mb-1 font-semibold text-foreground">
                            {feature.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  Products
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList> */}
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />
            {isAuthenticated ? (
              <Button onClick={onAuthClick} variant="outline">
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button onClick={onAuthClick} variant="outline">
                  Log in
                </Button>
                <Button onClick={onAuthClick} variant="ghost">
                  Start for free
                </Button>
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <div className="mt-6 flex flex-col gap-4">
                <Button onClick={onAuthClick} variant="outline">
                  {isAuthenticated ? "Dashboard" : "Log in"}
                </Button>
              </div>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href="#" className="flex items-center gap-2">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                      className="max-h-8"
                      alt="Shadcn UI Navbar" />
                    <span className="text-lg font-semibold tracking-tighter">
                      Salon Mangaer
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar5 };

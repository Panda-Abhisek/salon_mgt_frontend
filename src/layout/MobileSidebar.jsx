import { useEffect, useState } from "react";
import { LogOut, Menu, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { NAV_ITEMS } from "@/config/navigation";
import { useAuth } from "@/auth/AuthContext";

import SidebarItem from "./SidebarItem";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet";

export default function MobileSidebar() {
    const [open, setOpen] = useState(false);
    const { hasAnyRole, logout } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);
    
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* ☰ Hamburger */}
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>

            {/* Drawer */}
            <SheetContent side="left" className="w-64 p-2">
                <div className="px-2 py-3 font-semibold text-sm">
                    Salon Inc.
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                    {NAV_ITEMS.filter((item) =>
                        hasAnyRole(item.roles)
                    ).map((item) => (
                        <SidebarItem
                            key={item.path}
                            item={item}
                            collapsed={false}
                            onClick={() => setOpen(false)}
                        />
                    ))}
                </nav>

                {/* Footer */}
                <div className="border-t mt-2 p-2 space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full flex items-center gap-3 justify-start"
                        onClick={() => {
                            navigate("/me");
                            setOpen(false);
                        }}
                    >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full flex items-center gap-3 justify-start text-destructive"
                        onClick={() => {
                            logout();
                            setOpen(false);
                        }}
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}

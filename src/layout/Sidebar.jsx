import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NAV_ITEMS } from "@/config/navigation";
import { useAuth } from "@/auth/useAuth";

import SidebarItem from "./SidebarItem";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { hasAnyRole, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className={cn(
        "h-screen border-r bg-background flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <span className="font-semibold text-sm">
            Salon Inc.
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed((v) => !v)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {/* {NAV_ITEMS.filter((item) =>
          hasAnyRole(item.roles)
        ).map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
          />
        ))} */}
        {NAV_ITEMS.filter((item) => {
          const hasRoleMatch = hasAnyRole(item.roles);
          const excluded = item.excludeRoles?.some((r) =>
            hasAnyRole([r])
          );
          return hasRoleMatch && !excluded;
        }).map((item) => (
          <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t p-2 space-y-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 justify-start",
            collapsed && "justify-center"
          )}
          onClick={() => navigate("/me")}
        >
          <User className="h-5 w-5" />
          {!collapsed && <span>Profile</span>}
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 justify-start text-destructive",
            collapsed && "justify-center"
          )}
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
}

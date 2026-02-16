import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const SidebarItem = ({ item, collapsed, onClick }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={false}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          "hover:bg-muted",
          isActive
            ? "bg-muted font-medium text-foreground"
            : "text-muted-foreground"
        )
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  );
};

export default SidebarItem;

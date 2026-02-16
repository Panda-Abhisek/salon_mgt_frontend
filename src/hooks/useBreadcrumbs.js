import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/config/navigation";

export function useBreadcrumbs() {
  const { pathname } = useLocation();

  const current = NAV_ITEMS.find(
    (item) => item.path === pathname
  );

  if (!current) return [];

  const crumbs = [];

  if (current.parent) {
    const parent = NAV_ITEMS.find(
      (item) => item.path === current.parent
    );
    if (parent) crumbs.push(parent);
  }

  crumbs.push(current);

  return crumbs;
}

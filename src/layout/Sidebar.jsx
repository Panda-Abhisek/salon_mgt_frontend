// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { NAV_ITEMS } from "@/config/navigation";
// import { useAuth } from "@/auth/useAuth";

// import SidebarItem from "./SidebarItem";

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// import {
//   ChevronLeft,
//   ChevronRight,
//   User,
//   LogOut,
// } from "lucide-react";

// export default function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const { hasAnyRole, logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <aside
//       className={cn(
//         "h-screen border-r bg-background flex flex-col transition-all duration-300",
//         collapsed ? "w-16" : "w-64"
//       )}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b">
//         {!collapsed && (
//           <span className="font-semibold text-sm">
//             Salon Inc.
//           </span>
//         )}
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={() => setCollapsed((v) => !v)}
//         >
//           {collapsed ? <ChevronRight /> : <ChevronLeft />}
//         </Button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-2 space-y-1">
//         {/* {NAV_ITEMS.filter((item) =>
//           hasAnyRole(item.roles)
//         ).map((item) => (
//           <SidebarItem
//             key={item.path}
//             item={item}
//             collapsed={collapsed}
//           />
//         ))} */}
//         {NAV_ITEMS.filter((item) => {
//           const hasRoleMatch = hasAnyRole(item.roles);
//           const excluded = item.excludeRoles?.some((r) =>
//             hasAnyRole([r])
//           );
//           return hasRoleMatch && !excluded;
//         }).map((item) => (
//           <SidebarItem
//             key={item.path}
//             item={item}
//             collapsed={collapsed}
//           />
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="border-t p-2 space-y-1">
//         <Button
//           variant="ghost"
//           className={cn(
//             "w-full flex items-center gap-3 justify-start",
//             collapsed && "justify-center"
//           )}
//           onClick={() => navigate("/me")}
//         >
//           <User className="h-5 w-5" />
//           {!collapsed && <span>Profile</span>}
//         </Button>

//         <Button
//           variant="ghost"
//           className={cn(
//             "w-full flex items-center gap-3 justify-start text-destructive",
//             collapsed && "justify-center"
//           )}
//           onClick={logout}
//         >
//           <LogOut className="h-5 w-5" />
//           {!collapsed && <span>Logout</span>}
//         </Button>
//       </div>
//     </aside>
//   );
// }

import { Outlet, useLocation, Link } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SIDEBAR_NAV } from '@/config/navigation' // Adjust import path
import React from 'react'
import { AppSidebar } from '@/components/app-sidebar'

export function SidebarLayout() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  // Helper to find label from your config, or format the URL string
  const getLabel = (path, isLast) => {
    // 1. Try to find a match in SIDEBAR_NAV across all roles (prefix matching)
    const allNavItems = Object.values(SIDEBAR_NAV).flat()
    
    // First, try exact match
    let match = allNavItems.find(item => {
      if (item.items) {
        return item.items.some(subItem => subItem.to === path)
      }
      return item.to === path
    })
    
    // If no exact match, try to find parent item (for nested routes)
    if (!match) {
      match = allNavItems.find(item => {
        if (item.items) {
          return item.items.some(subItem => path.startsWith(subItem.to))
        }
        return path.startsWith(item.to + '/') || path === item.to
      })
    }
    
    if (match) {
      // If found in nested items, get the specific subitem label
      if (match.items) {
        const subItem = match.items.find(sub => path.startsWith(sub.to))
        if (subItem) return subItem.label
      }
      return match.label
    }

    // 2. Fallback: capitalize the path segment (e.g., "salon-settings" -> "Salon Settings")
    const segment = path.split('/').pop()
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <main className="flex-1 overflow-y-auto bg-muted/20">
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 mt-1 h-4" />
                
                <Breadcrumb>
                  <BreadcrumbList>
                    {/* Root Link (Home/App) */}
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink asChild>
                        <Link to="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>

                    {pathnames.map((value, index) => {
                      const last = index === pathnames.length - 1
                      const to = `/${pathnames.slice(0, index + 1).join('/')}`
                      const label = getLabel(to, last)

                      return (
                        <React.Fragment key={to}>
                          <BreadcrumbSeparator className="hidden md:block" />
                          <BreadcrumbItem>
                            {last ? (
                              <BreadcrumbPage>{label}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink asChild className="hidden md:block">
                                <Link to={to}>{label}</Link>
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                        </React.Fragment>
                      )
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default SidebarLayout
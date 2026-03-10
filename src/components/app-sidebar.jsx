"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
// import { clearCredentials, selectRole, selectUser } from "@/store/slices/authSlice"
import { getSidebarNavForRole } from "@/config/navigation"
import { SidebarThemeToggle } from "./theme/sidebar-theme-toggle"
import { useAuth } from "@/auth/useAuth"

export function AppSidebar({ ...props }) {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const role = user?.roles[0]

  // Get navigation items based on the current user's role
  const roleNavItems = getSidebarNavForRole(role)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Formatting teams for the TeamSwitcher (you can customize this)
  const teams = [
    {
      name: "Salon Manager",
      logo: <GalleryVerticalEndIcon />,
      // plan: role?.replace('_', ' ') || "Member",
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={roleNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarThemeToggle />
        <NavUser user={user} handleLogout={handleLogout}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
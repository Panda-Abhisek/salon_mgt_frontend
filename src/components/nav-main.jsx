import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronDown, ChevronRight } from "lucide-react"

export function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => {
          // Check if this is a collapsible group
          if (item.items) {
            return (
              <CollapsibleGroup key={item.title || index} item={item} location={location} />
            )
          }

          // Regular menu item
          const Icon = item.icon 
          // const isActive = location.pathname === item.to
          const isActive = location.pathname === item.to ? true : false

          return (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.label}
                isActive={isActive}
              >
                <Link to={item.to}>
                  {Icon && <Icon className="size-5" />}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function CollapsibleGroup({ item, location }) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Check if any child is active
  const hasActiveChild = item.items?.some(child => location.pathname === child.to)

  // Auto-expand if child is active
  const isExpanded = isOpen || hasActiveChild

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setIsOpen(!isOpen)}
        tooltip={item.title}
      >
        {item.icon && <item.icon className="size-5" />}
        <span>{item.title}</span>
        {isExpanded ? (
          <ChevronDown className="ml-auto h-4 w-4" />
        ) : (
          <ChevronRight className="ml-auto h-4 w-4" />
        )}
      </SidebarMenuButton>
      {isExpanded && (
        <SidebarMenuSub>
          {item.items.map((subItem) => {
            const SubIcon = subItem.icon
            const isActive = location.pathname === subItem.to
            
            return (
              <SidebarMenuSubItem key={subItem.to}>
                <SidebarMenuSubButton
                  asChild
                  isActive={isActive}
                >
                  <Link to={subItem.to}>
                    {SubIcon && <SubIcon className="size-4" />}
                    <span>{subItem.label}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            )
          })}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  )
}

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme-provider"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"

export function SidebarThemeToggle() {
    const { theme, setTheme } = useTheme()
    const { state } = useSidebar()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch by waiting for mount
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    // Determine if dark mode is active (handles 'system' preference)
    const isDark =
        theme === "dark" ||
        (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div
                    className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent cursor-pointer"
                    onClick={toggleTheme}
                >
                    <div className="relative flex h-4 w-4 items-center justify-center">
                        <Sun className={`h-4 w-4 transition-all ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
                        <Moon className={`absolute h-4 w-4 transition-all ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
                    </div>
                    <span className="ml-2 flex-1 truncate font-medium">
                        {isDark ? "Dark Mode" : "Light Mode"}
                    </span>
                    <div className="ml-auto mr-1" onClick={(e) => e.stopPropagation()}>
                        <Switch
                            id="theme-switch"
                            checked={isDark}
                            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                            aria-label="Toggle theme"
                        />
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
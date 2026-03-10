// import { Button } from '../ui/button';
// import { useTheme } from '../theme-provider';
// import React from 'react';
// import { Moon, MoonIcon, Sun, SunIcon } from 'lucide-react';

// export function ThemeToggle() {
//     const { theme, setTheme } = useTheme();

//     return (
//         <Button
//             className=""
//             variant="ghost"
//             size="sm"
//             onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//         >
//             {theme === "light" ? <MoonIcon /> : <SunIcon />}
//         </Button>
//     );
// }

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "../theme-provider"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {/* Sun icon: Visible in light, rotates out in dark */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          
          {/* Moon icon: Rotates in and becomes visible in dark */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
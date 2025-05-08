"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboardIcon,
  PiIcon as PipeIcon,
  BarChart3Icon,
  UsersIcon,
  FileTextIcon,
  AlertTriangleIcon,
  ClipboardListIcon,
  SettingsIcon,
  MoveRightIcon,
  MoveLeftIcon,
} from "lucide-react"

export default function DashboardNav() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    {
      title: "Tableau de bord",
      href: "/dashboard",
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
    },
    {
      title: "Gestion des projets",
      href: "/wells",
      icon: <PipeIcon className="h-5 w-5" />,
    },
    {
      title: "Opérations journalières",
      href: "/operations",
      icon: <ClipboardListIcon className="h-5 w-5" />,
    },
    {
      title: "Analyses & Reporting",
      href: "/reports",
      icon: <BarChart3Icon className="h-5 w-5" />,
    },
    {
      title: "Alertes & Incidents",
      href: "/alerts",
      icon: <AlertTriangleIcon className="h-5 w-5" />,
    },
    {
      title: "Gestion d'équipe",
      href: "/users",
      icon: <UsersIcon className="h-5 w-5" />,
    },
    {
      title: "Documents & Rapports",
      href: "/documents",
      icon: <FileTextIcon className="h-5 w-5" />,
    },
    {
      title: "Paramètres",
      href: "/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
    },
  ]

  return (
    <aside
      className={cn(
        "bg-white border-r transition-all duration-300 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="py-4 px-2">
        <div className="flex justify-end mb-4 px-2">
          <button onClick={() => setCollapsed(!collapsed)} className="text-gray-500 hover:text-gray-900">
            {collapsed ? <MoveRightIcon className="h-5 w-5" /> : <MoveLeftIcon className="h-5 w-5" />}
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-orange-50 text-[#ED8D31]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                collapsed && "justify-center",
              )}
            >
              {item.icon}
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

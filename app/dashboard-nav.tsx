"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3Icon,
  DropletIcon,
  ClockIcon,
  AlertTriangleIcon,
  MapIcon,
  UsersIcon,
  FileTextIcon,
  Settings2Icon,
  ShieldIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="group flex h-screen w-16 flex-col items-center border-r bg-white pt-4 hover:w-64 transition-all duration-300 ease-in-out">
      <nav className="flex flex-col items-start space-y-1 w-full">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/dashboard" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/dashboard" className="flex items-center">
            <BarChart3Icon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Tableau de bord</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/wells" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/wells" className="flex items-center">
            <DropletIcon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Puits</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/operations" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/operations" className="flex items-center">
            <ClockIcon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Opérations</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/reports" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/reports" className="flex items-center">
            <BarChart3Icon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Analyse et Reporting</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/alerts" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/alerts" className="flex items-center">
            <AlertTriangleIcon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Alertes</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/map" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/map" className="flex items-center">
            <MapIcon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Carte</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/users" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/users" className="flex items-center">
            <UsersIcon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Utilisateurs</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/documents" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/documents" className="flex items-center">
            <FileTextIcon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Documents</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/admin/users" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/admin/users" className="flex items-center">
            <ShieldIcon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Gestion des accès</span>
          </Link>
        </Button>

        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-4 py-2 text-left font-normal",
            pathname === "/settings" ? "bg-gray-100 font-medium" : "font-normal",
          )}
          asChild
        >
          <Link href="/settings" className="flex items-center">
            <Settings2Icon className="mr-3 h-5 w-5 text-gray-500" />
            <span className="hidden group-hover:inline-block">Paramètres</span>
          </Link>
        </Button>
      </nav>
    </div>
  )
}

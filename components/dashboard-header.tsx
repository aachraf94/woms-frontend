"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BellIcon, MenuIcon, UserIcon, SearchIcon } from "lucide-react"

export default function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="mr-2 md:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/sonatrach-logo-vector.svg" alt="Sonatrach Logo" className="h-10" />
            <span className="font-bold text-xl hidden sm:inline">SonatrackEP</span>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-1 mx-4 lg:mx-8 max-w-md">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="Rechercher un puits, un rapport..." className="pl-10 bg-gray-50" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <span className="font-medium">Alerte: Perte de boue - HMD-42</span>
                <span className="text-xs text-gray-500">Il y a 2 heures</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <span className="font-medium">Rapport quotidien disponible - RKZ-17</span>
                <span className="text-xs text-gray-500">Il y a 5 heures</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <span className="font-medium">Dépassement budget - GLTZ-08</span>
                <span className="text-xs text-gray-500">Il y a 1 jour</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-[#F08100]">
                Voir toutes les notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuItem>
                Mohamed Bensalem
                <span className="ml-2 text-xs text-gray-500">Admin</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Paramètres</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/login" className="w-full">
                  Déconnexion
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

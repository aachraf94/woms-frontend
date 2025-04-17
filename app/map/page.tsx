"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { LayersIcon, ZoomInIcon, ZoomOutIcon, MaximizeIcon, FilterIcon, SearchIcon } from "lucide-react"
import InteractiveMap from "@/components/interactive-map"

export default function MapPage() {
  const [filters, setFilters] = useState({
    region: "",
    type: "",
    status: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [selectedField, setSelectedField] = useState(null)
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      region: "",
      type: "",
      status: "",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 bg-gray-50 relative">
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-start">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="bg-white" onClick={() => setShowFilters(!showFilters)}>
                <FilterIcon className="h-4 w-4" />
              </Button>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input placeholder="Rechercher un champ..." className="pl-10 bg-white w-64" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" size="icon" className="bg-white">
                <LayersIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white" onClick={handleZoomIn}>
                <ZoomInIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white" onClick={handleZoomOut}>
                <ZoomOutIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-white" onClick={handleReset}>
                <MaximizeIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filters Card */}
          {showFilters && (
            <Card className="absolute top-16 left-4 z-20 w-80">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Filtres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Région</div>
                  <Select value={filters.region} onValueChange={(value) => handleFilterChange("region", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les régions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les régions</SelectItem>
                      <SelectItem value="centre">Centre</SelectItem>
                      <SelectItem value="est">Est</SelectItem>
                      <SelectItem value="sud">Sud</SelectItem>
                      <SelectItem value="sud-est">Sud-Est</SelectItem>
                      <SelectItem value="sud-ouest">Sud-Ouest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Type</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`cursor-pointer ${filters.type === "pétrole" ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-800 hover:bg-orange-200"}`}
                      onClick={() => handleFilterChange("type", filters.type === "pétrole" ? "" : "pétrole")}
                    >
                      Pétrole
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${filters.type === "gaz" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-800 hover:bg-blue-200"}`}
                      onClick={() => handleFilterChange("type", filters.type === "gaz" ? "" : "gaz")}
                    >
                      Gaz
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Statut</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`cursor-pointer ${filters.status === "en production" ? "bg-green-500 text-white" : "bg-green-100 text-green-800 hover:bg-green-200"}`}
                      onClick={() =>
                        handleFilterChange("status", filters.status === "en production" ? "" : "en production")
                      }
                    >
                      En production
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${filters.status === "en développement" ? "bg-amber-500 text-white" : "bg-amber-100 text-amber-800 hover:bg-amber-200"}`}
                      onClick={() =>
                        handleFilterChange("status", filters.status === "en développement" ? "" : "en développement")
                      }
                    >
                      En développement
                    </Badge>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
                  Réinitialiser les filtres
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Interactive Map */}
          <div
            className="h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out"
            style={{ transform: `scale(${zoom})` }}
          >
            <InteractiveMap filters={filters} onSelectField={setSelectedField} />
          </div>
        </main>
      </div>
    </div>
  )
}

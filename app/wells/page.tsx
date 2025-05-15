"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getWells } from "@/app/actions/well-actions"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { PlusIcon, SearchIcon, EyeIcon, EditIcon, CalendarIcon, MapPinIcon, BarChart3Icon } from "lucide-react"
import type { Well } from "@/lib/models/well"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WellsPage() {
  const [wells, setWells] = useState<Well[]>([
    {
      id: "HMD-42",
      name: "Hassi Messaoud 42",
      type: "development",
      basin: "Hassi Messaoud",
      field: "HMD Central",
      latitude: 31.6738,
      longitude: 5.8898,
      targetDepth: 3500,
      trajectory: "vertical",
      primaryReservoir: "TAGI",
      startDate: "2025-07-01",
      endDate: "2025-08-15",
      budget: 450,
      drillingDays: 45,
      contractor: "ENAFOR",
      status: "in_progress",
      createdAt: "2025-06-15",
      updatedAt: "2025-07-07",
    },
    {
      id: "BRK-23",
      name: "Berkine 23",
      type: "exploration",
      basin: "Berkine",
      field: "Bloc 405a",
      latitude: 29.2456,
      longitude: 7.8921,
      targetDepth: 4200,
      trajectory: "directional",
      primaryReservoir: "Triassique",
      startDate: "2025-08-10",
      endDate: "2025-10-05",
      budget: 620,
      drillingDays: 56,
      contractor: "ENTP",
      status: "planned",
      createdAt: "2025-05-20",
      updatedAt: "2025-06-30",
    },
    {
      id: "RHN-15",
      name: "Rhourde Nouss 15",
      type: "development",
      basin: "Rhourde Nouss",
      field: "RN Nord",
      latitude: 30.1234,
      longitude: 6.789,
      targetDepth: 3100,
      trajectory: "vertical",
      primaryReservoir: "Cambro-Ordovicien",
      startDate: "2025-04-15",
      endDate: "2025-05-30",
      budget: 380,
      drillingDays: 45,
      contractor: "ENAFOR",
      status: "completed",
      createdAt: "2025-03-01",
      updatedAt: "2025-05-30",
    },
    {
      id: "ILZ-08",
      name: "Illizi 08",
      type: "exploration",
      basin: "Illizi",
      field: "Bloc 232",
      latitude: 28.5678,
      longitude: 8.1234,
      targetDepth: 4800,
      trajectory: "directional",
      primaryReservoir: "Trias Argileux",
      startDate: "2025-03-10",
      endDate: "2025-05-20",
      budget: 720,
      drillingDays: 70,
      contractor: "Schlumberger",
      status: "suspended",
      createdAt: "2025-01-15",
      updatedAt: "2025-04-10",
    },
    {
      id: "HMD-39",
      name: "Hassi Messaoud 39",
      type: "development",
      basin: "Hassi Messaoud",
      field: "HMD Sud",
      latitude: 31.5432,
      longitude: 5.9123,
      targetDepth: 3300,
      trajectory: "vertical",
      primaryReservoir: "TAGI",
      startDate: "2025-02-01",
      endDate: "2025-03-15",
      budget: 410,
      drillingDays: 42,
      contractor: "ENAFOR",
      status: "completed",
      createdAt: "2025-01-05",
      updatedAt: "2025-03-15",
    },
    {
      id: "AHN-04",
      name: "Ahnet 04",
      type: "exploration",
      basin: "Ahnet",
      field: "Bloc 337a",
      latitude: 27.8765,
      longitude: 3.4567,
      targetDepth: 5100,
      trajectory: "horizontal",
      primaryReservoir: "Lias",
      startDate: "2025-09-01",
      endDate: "2025-11-15",
      budget: 850,
      drillingDays: 75,
      contractor: "Halliburton",
      status: "planned",
      createdAt: "2025-06-20",
      updatedAt: "2025-07-01",
    },
    {
      id: "TNR-12",
      name: "Tinrhert 12",
      type: "delineation",
      basin: "Tinrhert",
      field: "Bloc 235",
      latitude: 29.3456,
      longitude: 9.1234,
      targetDepth: 3800,
      trajectory: "directional",
      primaryReservoir: "Triassique",
      startDate: "2025-01-15",
      endDate: "2025-03-10",
      budget: 520,
      drillingDays: 55,
      contractor: "ENTP",
      status: "abandoned",
      createdAt: "2024-12-01",
      updatedAt: "2025-03-10",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [basinFilter, setBasinFilter] = useState<string>("all")

  useEffect(() => {
    async function fetchWells() {
      setLoading(true)
      const result = await getWells()
      if (result.success && result.data && result.data.length > 0) {
        setWells(result.data)
      }
      setLoading(false)
    }

    // Commenté pour utiliser les données statiques au lieu de l'appel API
    // fetchWells()
  }, [])

  // Filtrer les projets en fonction des critères
  const filteredWells = wells.filter((well) => {
    // Filtre de recherche
    const matchesSearch =
      well.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      well.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      well.basin.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtre de statut
    const matchesStatus = statusFilter === "all" || well.status === statusFilter

    // Filtre de type
    const matchesType = typeFilter === "all" || well.type === typeFilter

    // Filtre de bassin
    const matchesBasin = basinFilter === "all" || well.basin.toLowerCase() === basinFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType && matchesBasin
  })

  // Obtenir le statut formaté pour l'affichage
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "planned":
        return { text: "Planifié", class: "bg-blue-100 text-blue-800" }
      case "in_progress":
        return { text: "En cours", class: "bg-orange-100 text-orange-800" }
      case "completed":
        return { text: "Terminé", class: "bg-green-100 text-green-800" }
      case "suspended":
        return { text: "Suspendu", class: "bg-amber-100 text-amber-800" }
      case "abandoned":
        return { text: "Abandonné", class: "bg-red-100 text-red-800" }
      default:
        return { text: status, class: "bg-gray-100 text-gray-800" }
    }
  }

  // Obtenir le type formaté pour l'affichage
  const getTypeDisplay = (type: string) => {
    switch (type) {
      case "exploration":
        return "Exploration"
      case "delineation":
        return "Délinéation"
      case "development":
        return "Développement"
      default:
        return type
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Gestion des Projets</h1>
              <p className="text-gray-600">
                Gestion et suivi des projets pétroliers sur l'ensemble du territoire algérien
              </p>
            </div>
            <Link href="/wells/create">
              <Button className="bg-[#ED8D31] hover:bg-orange-700">
                <PlusIcon className="mr-2 h-4 w-4" />
                Nouveau Projet
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative md:col-span-2">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Rechercher par nom, ID ou bassin..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="planned">Planifié</SelectItem>
                    <SelectItem value="in_progress">En cours</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="suspended">Suspendu</SelectItem>
                    <SelectItem value="abandoned">Abandonné</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="exploration">Exploration</SelectItem>
                    <SelectItem value="delineation">Délinéation</SelectItem>
                    <SelectItem value="development">Développement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={basinFilter} onValueChange={setBasinFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bassin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les bassins</SelectItem>
                    <SelectItem value="hassi messaoud">Hassi Messaoud</SelectItem>
                    <SelectItem value="berkine">Berkine</SelectItem>
                    <SelectItem value="illizi">Illizi</SelectItem>
                    <SelectItem value="rhourde nouss">Rhourde Nouss</SelectItem>
                    <SelectItem value="ahnet">Ahnet</SelectItem>
                    <SelectItem value="tinrhert">Tinrhert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                {filteredWells.length} projet{filteredWells.length !== 1 ? "s" : ""} trouvé
                {filteredWells.length !== 1 ? "s" : ""}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#ED8D31] hover:bg-orange-700" : ""}
                >
                  <BarChart3Icon className="h-4 w-4 mr-1" />
                  Liste
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#ED8D31] hover:bg-orange-700" : ""}
                >
                  <div className="grid grid-cols-2 gap-0.5 h-4 w-4 mr-1">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                  Grille
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Liste des projets</h2>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Chargement des projets...</p>
                </div>
              ) : filteredWells.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">Aucun projet trouvé</p>
                  <Link href="/wells/create">
                    <Button className="mt-4 bg-[#ED8D31] hover:bg-orange-700">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Créer un projet
                    </Button>
                  </Link>
                </div>
              ) : viewMode === "list" ? (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom du Projet
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Localisation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Profondeur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredWells.map((well) => {
                      const status = getStatusDisplay(well.status)
                      return (
                        <tr key={well.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{well.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{well.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{well.basin}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{getTypeDisplay(well.type)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{well.targetDepth} m</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge className={status.class}>{status.text}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <Link href={`/wells/${well.id}`}>
                                <Button variant="ghost" size="sm" className="flex items-center">
                                  <EyeIcon className="h-4 w-4 mr-1" />
                                  Voir
                                </Button>
                              </Link>
                              <Link href={`/wells/${well.id}/edit`}>
                                <Button variant="ghost" size="sm" className="flex items-center">
                                  <EditIcon className="h-4 w-4 mr-1" />
                                  Éditer
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {filteredWells.map((well) => {
                    const status = getStatusDisplay(well.status)
                    return (
                      <Card key={well.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg">{well.name}</h3>
                              <Badge className={status.class}>{status.text}</Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">ID: {well.id}</p>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{well.basin}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <div className="h-4 w-4 mr-2 flex items-center justify-center">
                                  <div className="h-3 w-3 rounded-full border border-gray-500"></div>
                                </div>
                                <span>{getTypeDisplay(well.type)}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                                <span>
                                  {new Date(well.startDate).toLocaleDateString()} -{" "}
                                  {new Date(well.endDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="border-t p-3 bg-gray-50 flex justify-between">
                            <Link href={`/wells/${well.id}`}>
                              <Button variant="ghost" size="sm" className="flex items-center">
                                <EyeIcon className="h-4 w-4 mr-1" />
                                Voir
                              </Button>
                            </Link>
                            <Link href={`/wells/${well.id}/edit`}>
                              <Button variant="ghost" size="sm" className="flex items-center">
                                <EditIcon className="h-4 w-4 mr-1" />
                                Éditer
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

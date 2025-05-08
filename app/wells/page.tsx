"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getWells } from "@/app/actions/well-actions"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { PlusIcon, SearchIcon, FilterIcon, EyeIcon, EditIcon, X } from "lucide-react"
import type { Well } from "@/lib/models/well"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function WellsPage() {
  const [wells, setWells] = useState<Well[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: [] as string[],
    type: [] as string[],
    basin: [] as string[],
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  // État temporaire pour les sélections de dropdown
  const [tempSelections, setTempSelections] = useState({
    status: "",
    type: "",
    basin: "",
  })

  useEffect(() => {
    async function fetchWells() {
      setLoading(true)
      const result = await getWells()
      if (result.success) {
        setWells(result.data)
      }
      setLoading(false)
    }

    fetchWells()
  }, [])

  const filteredWells = wells.filter((well) => {
    // Filtre par terme de recherche
    const matchesSearch =
      well.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      well.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      well.basin.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtre par statut
    const matchesStatus = filters.status.length === 0 || filters.status.includes(well.status)

    // Filtre par type
    const matchesType = filters.type.length === 0 || filters.type.includes(well.type)

    // Filtre par bassin
    const matchesBasin = filters.basin.length === 0 || filters.basin.includes(well.basin)

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

  const handleFilterChange = (category: "status" | "type" | "basin", value: string) => {
    if (value === "") return

    setTempSelections((prev) => ({
      ...prev,
      [category]: "",
    }))

    setFilters((prev) => {
      const currentFilters = [...prev[category]]

      // Si la valeur n'est pas déjà présente dans les filtres, l'ajouter
      if (!currentFilters.includes(value)) {
        return {
          ...prev,
          [category]: [...currentFilters, value],
        }
      }

      return prev
    })
  }

  const removeFilter = (category: "status" | "type" | "basin", value: string) => {
    setFilters((prev) => {
      const currentFilters = [...prev[category]]
      const index = currentFilters.indexOf(value)

      if (index !== -1) {
        currentFilters.splice(index, 1)
      }

      return {
        ...prev,
        [category]: currentFilters,
      }
    })
  }

  const clearFilters = () => {
    setFilters({
      status: [],
      type: [],
      basin: [],
    })
    setTempSelections({
      status: "",
      type: "",
      basin: "",
    })
  }

  const getUniqueValues = (array: Well[], key: keyof Well) => {
    return [...new Set(array.map((item) => item[key] as string))]
  }

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

  const applyFilters = () => {
    setIsFilterOpen(false)
  }

  const activeFiltersCount = filters.status.length + filters.type.length + filters.basin.length

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Gestion des Projets</h1>
              <p className="text-gray-600">Gestion et suivi des projets sur l'ensemble du territoire algérien</p>
            </div>
            <Link href="/wells/create">
              <Button className="bg-[#ED8D31] hover:bg-orange-700">
                <PlusIcon className="mr-2 h-4 w-4" />
                Nouveau Projet
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Rechercher par nom ou ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button className="flex-grow flex items-center justify-center" variant="outline">
                      <FilterIcon className="mr-2 h-4 w-4" />
                      Filtres
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-2 bg-orange-500" variant="secondary">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Filtres</h3>
                      {activeFiltersCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                          <X className="h-3 w-3 mr-1" />
                          Effacer tout
                        </Button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Filtres par statut */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Statut</h4>
                        <Select
                          value={tempSelections.status}
                          onValueChange={(value) => handleFilterChange("status", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Statut</SelectLabel>
                              {getUniqueValues(wells, "status").map((status) => (
                                <SelectItem key={`status-select-${status}`} value={status}>
                                  {getStatusDisplay(status).text}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        {filters.status.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {filters.status.map((status) => (
                              <Badge
                                key={`filter-badge-${status}`}
                                variant="outline"
                                className="flex items-center space-x-1"
                              >
                                <span>{getStatusDisplay(status).text}</span>
                                <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("status", status)} />
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Filtres par type */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Type</h4>
                        <Select
                          value={tempSelections.type}
                          onValueChange={(value) => handleFilterChange("type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Type</SelectLabel>
                              {getUniqueValues(wells, "type").map((type) => (
                                <SelectItem key={`type-select-${type}`} value={type}>
                                  {getTypeDisplay(type)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        {filters.type.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {filters.type.map((type) => (
                              <Badge
                                key={`filter-badge-${type}`}
                                variant="outline"
                                className="flex items-center space-x-1"
                              >
                                <span>{getTypeDisplay(type)}</span>
                                <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("type", type)} />
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Filtres par bassin */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Bassin</h4>
                        <Select
                          value={tempSelections.basin}
                          onValueChange={(value) => handleFilterChange("basin", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un bassin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Bassin</SelectLabel>
                              {getUniqueValues(wells, "basin").map((basin) => (
                                <SelectItem key={`basin-select-${basin}`} value={basin}>
                                  {basin}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        {filters.basin.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {filters.basin.map((basin) => (
                              <Badge
                                key={`filter-badge-${basin}`}
                                variant="outline"
                                className="flex items-center space-x-1"
                              >
                                <span>{basin}</span>
                                <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("basin", basin)} />
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button onClick={applyFilters} className="bg-[#ED8D31] hover:bg-orange-700">
                        Appliquer les filtres
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.status.map((status) => (
                <Badge key={`badge-status-${status}`} variant="outline" className="flex items-center gap-1">
                  Statut: {getStatusDisplay(status).text}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("status", status)} />
                </Badge>
              ))}
              {filters.type.map((type) => (
                <Badge key={`badge-type-${type}`} variant="outline" className="flex items-center gap-1">
                  Type: {getTypeDisplay(type)}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("type", type)} />
                </Badge>
              ))}
              {filters.basin.map((basin) => (
                <Badge key={`badge-basin-${basin}`} variant="outline" className="flex items-center gap-1">
                  Bassin: {basin}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("basin", basin)} />
                </Badge>
              ))}
              {activeFiltersCount > 1 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2 text-xs">
                  Effacer tous les filtres
                </Button>
              )}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                Liste des projets
                {filteredWells.length !== wells.length && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({filteredWells.length} sur {wells.length})
                  </span>
                )}
              </h2>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Chargement des projets...</p>
                </div>
              ) : filteredWells.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">
                    {searchTerm || activeFiltersCount > 0
                      ? "Aucun projet ne correspond aux critères de recherche ou aux filtres sélectionnés"
                      : "Aucun projet trouvé"}
                  </p>
                  {searchTerm || activeFiltersCount > 0 ? (
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        clearFilters()
                      }}
                    >
                      Effacer la recherche et les filtres
                    </Button>
                  ) : (
                    <Link href="/wells/create">
                      <Button className="mt-4 bg-[#ED8D31] hover:bg-orange-700">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Créer un projet
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
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
                        <tr key={well.id}>
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
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

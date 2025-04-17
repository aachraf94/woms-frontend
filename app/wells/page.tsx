"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getWells } from "@/app/actions/well-actions"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { PlusIcon, SearchIcon, FilterIcon, EyeIcon, EditIcon } from "lucide-react"
import type { Well } from "@/lib/models/well"

export default function WellsPage() {
  const [wells, setWells] = useState<Well[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

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

  // Filtrer les puits en fonction du terme de recherche
  const filteredWells = wells.filter(
    (well) =>
      well.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      well.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      well.basin.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Gestion des Puits</h1>
              <p className="text-gray-600">Gestion et suivi des puits sur l'ensemble du territoire algérien</p>
            </div>
            <Link href="/wells/create">
              <Button className="bg-[#ED8D31] hover:bg-orange-700">
                <PlusIcon className="mr-2 h-4 w-4" />
                Nouveau Puits
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
                <Button className="flex-grow flex items-center justify-center" variant="outline">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filtres
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Liste des puits</h2>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Chargement des puits...</p>
                </div>
              ) : filteredWells.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-600">Aucun puits trouvé</p>
                  <Link href="/wells/create">
                    <Button className="mt-4 bg-[#ED8D31] hover:bg-orange-700">
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Créer un puits
                    </Button>
                  </Link>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom du Puits
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            {well.type === "exploration"
                              ? "Exploration"
                              : well.type === "delineation"
                                ? "Délinéation"
                                : "Développement"}
                          </td>
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

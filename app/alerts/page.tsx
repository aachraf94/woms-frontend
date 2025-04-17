"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import {
  AlertTriangleIcon,
  SearchIcon,
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
  PlusIcon,
  DownloadIcon,
  RefreshCwIcon,
  EyeIcon,
  FileTextIcon,
} from "lucide-react"

// Données simulées pour les incidents
const incidents = [
  {
    id: "INC-2025-042",
    title: "Perte de boue",
    puits: "HMD-42",
    type: "Technique",
    severite: "Critique",
    statut: "En cours",
    date: "10/07/2025 - 14:30",
    description: 'Perte significative de boue de forage pendant la phase 16"',
    responsable: "Karim Benali",
    impact: "Retard estimé de 24h, coût supplémentaire de 1.2M DA",
  },
  {
    id: "INC-2025-041",
    title: "Dépassement planning",
    puits: "RKZ-17",
    type: "Planning",
    severite: "Modéré",
    statut: "En cours",
    date: "09/07/2025 - 10:15",
    description: "Retard de 48h sur le planning initial de cimentation",
    responsable: "Ahmed Khelil",
    impact: "Retard sur les opérations suivantes, réorganisation nécessaire",
  },
  {
    id: "INC-2025-040",
    title: "Dépassement budget",
    puits: "GLTZ-08",
    type: "Financier",
    severite: "Modéré",
    statut: "En cours",
    date: "08/07/2025 - 16:45",
    description: 'Dépassement budgétaire de 15% sur la phase 26"',
    responsable: "Meriem Boudiaf",
    impact: "Révision du budget global nécessaire",
  },
  {
    id: "INC-2025-039",
    title: "Problème de pompe",
    puits: "HMD-39",
    type: "Équipement",
    severite: "Mineur",
    statut: "Résolu",
    date: "07/07/2025 - 08:20",
    description: "Défaillance de la pompe principale, remplacement effectué",
    responsable: "Salim Hadj",
    impact: "Arrêt des opérations pendant 4h",
  },
  {
    id: "INC-2025-038",
    title: "Incident HSE",
    puits: "BRKN-11",
    type: "HSE",
    severite: "Majeur",
    statut: "Résolu",
    date: "05/07/2025 - 11:30",
    description: "Déversement mineur d'hydrocarbures, confinement réalisé",
    responsable: "Yasmine Alloui",
    impact: "Nettoyage et rapport aux autorités effectués",
  },
  {
    id: "INC-2025-037",
    title: "Problème de tubage",
    puits: "ILZ-05",
    type: "Technique",
    severite: "Critique",
    statut: "Résolu",
    date: "03/07/2025 - 09:45",
    description: 'Défaut détecté sur le tubage 13⅜", remplacement nécessaire',
    responsable: "Omar Fekkar",
    impact: "Retard de 72h, coût supplémentaire de 3.5M DA",
  },
  {
    id: "INC-2025-036",
    title: "Retard livraison",
    puits: "HBK-23",
    type: "Logistique",
    severite: "Mineur",
    statut: "Résolu",
    date: "01/07/2025 - 14:20",
    description: "Retard de livraison des équipements de complétion",
    responsable: "Farid Bensalem",
    impact: "Réorganisation du planning, pas d'impact majeur",
  },
]

// Données pour les graphiques
const incidentsByType = [
  { name: "Technique", value: 12 },
  { name: "HSE", value: 8 },
  { name: "Équipement", value: 7 },
  { name: "Planning", value: 5 },
  { name: "Financier", value: 4 },
  { name: "Logistique", value: 3 },
]

const incidentsByMonth = [
  { name: "Jan", critique: 2, majeur: 3, modere: 5, mineur: 8 },
  { name: "Fév", critique: 1, majeur: 4, modere: 6, mineur: 7 },
  { name: "Mar", critique: 3, majeur: 2, modere: 4, mineur: 6 },
  { name: "Avr", critique: 2, majeur: 3, modere: 7, mineur: 9 },
  { name: "Mai", critique: 1, majeur: 5, modere: 8, mineur: 10 },
  { name: "Juin", critique: 2, majeur: 4, modere: 6, mineur: 8 },
  { name: "Juil", critique: 3, majeur: 2, modere: 5, mineur: 7 },
]

const COLORS = ["#EF4444", "#F59E0B", "#3B82F6", "#10B981", "#6366F1", "#8B5CF6"]

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)

  // Filtrer les incidents en fonction de l'onglet actif
  const filteredIncidents = incidents.filter((incident) => {
    if (activeTab === "all") return true
    if (activeTab === "critical") return incident.severite === "Critique"
    if (activeTab === "ongoing") return incident.statut === "En cours"
    if (activeTab === "resolved") return incident.statut === "Résolu"
    return true
  })

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Alertes & Incidents</h1>
              <p className="text-gray-600">Suivi et gestion des incidents sur les opérations E&P</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Actualiser
              </Button>
              <Button variant="outline" size="sm">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <Button className="bg-[#ED8D31] hover:bg-orange-700" size="sm">
                <PlusIcon className="mr-2 h-4 w-4" />
                Nouvel incident
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input placeholder="Rechercher un incident..." className="pl-10" />
                </div>

                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type d'incident" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="technique">Technique</SelectItem>
                      <SelectItem value="hse">HSE</SelectItem>
                      <SelectItem value="equipement">Équipement</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="financier">Financier</SelectItem>
                      <SelectItem value="logistique">Logistique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sévérité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les sévérités</SelectItem>
                      <SelectItem value="critique">Critique</SelectItem>
                      <SelectItem value="majeur">Majeur</SelectItem>
                      <SelectItem value="modere">Modéré</SelectItem>
                      <SelectItem value="mineur">Mineur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <div className="relative w-full">
                    <CalendarIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input type="date" className="pl-10 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Incidents totaux</div>
                  <div className="text-3xl font-bold">39</div>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <span>-12% vs mois précédent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Incidents en cours</div>
                  <div className="text-3xl font-bold">12</div>
                  <div className="mt-2 flex items-center text-sm text-amber-600">
                    <span>+2 cette semaine</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Incidents critiques</div>
                  <div className="text-3xl font-bold">3</div>
                  <div className="mt-2 flex items-center text-sm text-red-600">
                    <span>Intervention requise</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Temps moyen de résolution</div>
                  <div className="text-3xl font-bold">36h</div>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <span>-8h vs objectif</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                <BellIcon className="h-4 w-4 mr-2" />
                Tous les incidents
              </TabsTrigger>
              <TabsTrigger value="critical">
                <AlertTriangleIcon className="h-4 w-4 mr-2" />
                Incidents critiques
              </TabsTrigger>
              <TabsTrigger value="ongoing">
                <ClockIcon className="h-4 w-4 mr-2" />
                En cours
              </TabsTrigger>
              <TabsTrigger value="resolved">
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Résolus
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Liste des incidents</CardTitle>
                  <CardDescription>
                    {filteredIncidents.length} incidents - Triés par date (plus récents d'abord)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Incident</TableHead>
                        <TableHead>Puits</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Sévérité</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIncidents.map((incident) => (
                        <TableRow key={incident.id}>
                          <TableCell className="font-medium">{incident.id}</TableCell>
                          <TableCell>{incident.title}</TableCell>
                          <TableCell>{incident.puits}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                incident.type === "HSE"
                                  ? "bg-purple-100 text-purple-800"
                                  : incident.type === "Technique"
                                    ? "bg-blue-100 text-blue-800"
                                    : incident.type === "Équipement"
                                      ? "bg-cyan-100 text-cyan-800"
                                      : incident.type === "Planning"
                                        ? "bg-indigo-100 text-indigo-800"
                                        : incident.type === "Financier"
                                          ? "bg-emerald-100 text-emerald-800"
                                          : "bg-gray-100 text-gray-800"
                              }
                            >
                              {incident.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                incident.severite === "Critique"
                                  ? "bg-red-100 text-red-800"
                                  : incident.severite === "Majeur"
                                    ? "bg-orange-100 text-orange-800"
                                    : incident.severite === "Modéré"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-green-100 text-green-800"
                              }
                            >
                              {incident.severite}
                            </Badge>
                          </TableCell>
                          <TableCell>{incident.date}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                incident.statut === "En cours"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }
                            >
                              {incident.statut}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setSelectedIncident(selectedIncident === incident.id ? null : incident.id)
                                }
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <FileTextIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {selectedIncident && (
                <Card className="mt-6">
                  {incidents
                    .filter((incident) => incident.id === selectedIncident)
                    .map((incident) => (
                      <CardContent className="p-6" key={incident.id}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{incident.title}</h3>
                            <p className="text-gray-500">
                              {incident.id} - {incident.date}
                            </p>
                          </div>
                          <Badge
                            className={
                              incident.statut === "En cours"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }
                          >
                            {incident.statut}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Puits concerné</h4>
                            <p className="font-medium">{incident.puits}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Type d'incident</h4>
                            <Badge
                              className={
                                incident.type === "HSE"
                                  ? "bg-purple-100 text-purple-800"
                                  : incident.type === "Technique"
                                    ? "bg-blue-100 text-blue-800"
                                    : incident.type === "Équipement"
                                      ? "bg-cyan-100 text-cyan-800"
                                      : incident.type === "Planning"
                                        ? "bg-indigo-100 text-indigo-800"
                                        : incident.type === "Financier"
                                          ? "bg-emerald-100 text-emerald-800"
                                          : "bg-gray-100 text-gray-800"
                              }
                            >
                              {incident.type}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Sévérité</h4>
                            <Badge
                              className={
                                incident.severite === "Critique"
                                  ? "bg-red-100 text-red-800"
                                  : incident.severite === "Majeur"
                                    ? "bg-orange-100 text-orange-800"
                                    : incident.severite === "Modéré"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-green-100 text-green-800"
                              }
                            >
                              {incident.severite}
                            </Badge>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                          <p className="text-gray-700">{incident.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Responsable</h4>
                            <div className="flex items-center">
                              <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                              <p>{incident.responsable}</p>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Impact</h4>
                            <p className="text-gray-700">{incident.impact}</p>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          {incident.statut === "En cours" ? (
                            <>
                              <Button variant="outline">Mettre à jour</Button>
                              <Button className="bg-green-600 hover:bg-green-700">Marquer comme résolu</Button>
                            </>
                          ) : (
                            <Button variant="outline">Voir le rapport complet</Button>
                          )}
                        </div>
                      </CardContent>
                    ))}
                </Card>
              )}
            </TabsContent>

            <TabsContent value="critical">
              <Card>
                <CardHeader>
                  <CardTitle>Incidents critiques</CardTitle>
                  <CardDescription>Incidents nécessitant une attention immédiate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredIncidents.map((incident) => (
                      <div key={incident.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium flex items-center">
                              <Badge className="bg-red-100 text-red-800 mr-2">Critique</Badge>
                              {incident.title} - {incident.puits}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">{incident.date}</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">{incident.description}</p>
                        <div className="mt-2 text-sm">
                          <span className="text-gray-500">Responsable: </span>
                          <span className="text-gray-700">{incident.responsable}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incidents par type</CardTitle>
                <CardDescription>Répartition des incidents par catégorie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={incidentsByType}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {incidentsByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évolution des incidents</CardTitle>
                <CardDescription>Nombre d'incidents par mois et par sévérité</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    critique: {
                      label: "Critique",
                      color: "hsl(var(--chart-1))",
                    },
                    majeur: {
                      label: "Majeur",
                      color: "hsl(var(--chart-2))",
                    },
                    modere: {
                      label: "Modéré",
                      color: "hsl(var(--chart-3))",
                    },
                    mineur: {
                      label: "Mineur",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incidentsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="critique" fill="var(--color-critique)" />
                      <Bar dataKey="majeur" fill="var(--color-majeur)" />
                      <Bar dataKey="modere" fill="var(--color-modere)" />
                      <Bar dataKey="mineur" fill="var(--color-mineur)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

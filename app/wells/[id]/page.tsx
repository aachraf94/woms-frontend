"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { ArrowLeftIcon, FileIcon, DownloadIcon } from "lucide-react"
import Link from "next/link"
import WellSchematic from "@/components/well-schematic"

// Données simulées pour les graphiques
const drillingData = [
  { date: "01/07", depth: 250, expected: 230 },
  { date: "02/07", depth: 310, expected: 300 },
  { date: "03/07", depth: 380, expected: 370 },
  { date: "04/07", depth: 450, expected: 440 },
  { date: "05/07", depth: 520, expected: 510 },
  { date: "06/07", depth: 590, expected: 580 },
  { date: "07/07", depth: 640, expected: 650 },
]

const mudData = [
  { date: "01/07", density: 1.25, viscosity: 45 },
  { date: "02/07", density: 1.26, viscosity: 46 },
  { date: "03/07", density: 1.27, viscosity: 44 },
  { date: "04/07", density: 1.24, viscosity: 45 },
  { date: "05/07", density: 1.25, viscosity: 47 },
  { date: "06/07", density: 1.26, viscosity: 46 },
  { date: "07/07", density: 1.25, viscosity: 45 },
]

const costData = [
  { date: "01/07", actual: 15, budget: 16 },
  { date: "02/07", actual: 33, budget: 32 },
  { date: "03/07", actual: 45, budget: 48 },
  { date: "04/07", actual: 60, budget: 64 },
  { date: "05/07", actual: 75, budget: 80 },
  { date: "06/07", actual: 90, budget: 96 },
  { date: "07/07", actual: 110, budget: 112 },
]

// Données pour le schéma du puits
const wellPhases = [
  {
    diameter: '26"',
    depth: [0, 150],
    status: "completed" as const,
    casing: '20"',
  },
  {
    diameter: '17½"',
    depth: [150, 450],
    status: "completed" as const,
    casing: '13⅜"',
  },
  {
    diameter: '12¼"',
    depth: [450, 850],
    status: "in_progress" as const,
  },
  {
    diameter: '8½"',
    depth: [850, 3500],
    status: "planned" as const,
  },
]

const reservoirs = [
  { name: "R1", depth: 2800 },
  { name: "R2", depth: 3100 },
  { name: "R3", depth: 3400 },
]

export default function WellDetailsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center mb-6">
            <Link href="/wells" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">HMD-42</h1>
                <Badge className="bg-orange-100 text-orange-800">En cours</Badge>
              </div>
              <p className="text-gray-600">
                Puits de développement - Hassi Messaoud - Dernière mise à jour: aujourd'hui à 09:45
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileIcon className="mr-2 h-4 w-4" />
                Rapport PDF
              </Button>
              <Button variant="outline" size="sm">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Profondeur actuelle</div>
                  <div className="text-3xl font-bold">640 m</div>
                  <div className="mt-2 flex items-center text-sm text-[#ED8D31]">
                    <span>+50m aujourd'hui</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Phase actuelle</div>
                  <div className="font-bold text-xl">12¼"</div>
                  <div className="mt-2">
                    <Progress value={65} className="h-2" />
                    <div className="flex justify-between text-xs mt-1">
                      <span>450m</span>
                      <span>65%</span>
                      <span>850m</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Budget utilisé</div>
                  <div className="text-3xl font-bold">110M DA</div>
                  <div className="mt-2 flex items-center text-sm text-[#ED8D31]">
                    <span>98% du prévu</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Temps</div>
                  <div className="text-3xl font-bold">7 jours</div>
                  <div className="mt-2 flex items-center text-sm text-[#ED8D31]">
                    <span>1 jour d'avance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="schematic">Schéma du puits</TabsTrigger>
              <TabsTrigger value="daily">Suivi journalier</TabsTrigger>
              <TabsTrigger value="technical">Données techniques</TabsTrigger>
              <TabsTrigger value="costs">Coûts</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Progression du forage</CardTitle>
                    <CardDescription>Profondeur atteinte vs planifiée (en mètres)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        depth: {
                          label: "Profondeur réelle (m)",
                          color: "hsl(var(--chart-1))",
                        },
                        expected: {
                          label: "Profondeur prévue (m)",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={drillingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="expected"
                            stroke="var(--color-expected)"
                            fill="var(--color-expected)"
                            fillOpacity={0.2}
                          />
                          <Area
                            type="monotone"
                            dataKey="depth"
                            stroke="var(--color-depth)"
                            fill="var(--color-depth)"
                            fillOpacity={0.4}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Détails du puits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Type de puits</div>
                        <div className="text-sm">Développement</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Localisation</div>
                        <div className="text-sm">Hassi Messaoud</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Coordonnées</div>
                        <div className="text-sm">31.6738°N, 5.8898°E</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Réservoir cible</div>
                        <div className="text-sm">TAGI</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Profondeur cible</div>
                        <div className="text-sm">3500 m</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Durée estimée</div>
                        <div className="text-sm">45 jours</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Prestataire</div>
                        <div className="text-sm">ENAFOR</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Budget</div>
                        <div className="text-sm">450M DA</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500">Équipe</div>
                      <div className="text-sm">
                        <span className="block">Manager: Karim Benali</span>
                        <span className="block">Géologue: Ahmed Khelil</span>
                        <span className="block">Ingénieur: Salim Hadj</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schematic">
              <div className="grid md:grid-cols-2 gap-6">
                <WellSchematic phases={wellPhases} currentDepth={640} targetDepth={3500} reservoirs={reservoirs} />

                <Card>
                  <CardHeader>
                    <CardTitle>Informations sur les phases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Phase</TableHead>
                          <TableHead>Diamètre</TableHead>
                          <TableHead>Profondeur (m)</TableHead>
                          <TableHead>Tubage</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {wellPhases.map((phase, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{phase.diameter}</TableCell>
                            <TableCell>
                              {phase.depth[0]}-{phase.depth[1]}
                            </TableCell>
                            <TableCell>{phase.casing || "-"}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  phase.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : phase.status === "in_progress"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-gray-100 text-gray-800"
                                }
                              >
                                {phase.status === "completed"
                                  ? "Terminé"
                                  : phase.status === "in_progress"
                                    ? "En cours"
                                    : "Planifié"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Réservoirs cibles</h3>
                      <div className="space-y-4">
                        {reservoirs.map((reservoir, index) => (
                          <div key={index} className="flex justify-between items-center border-b pb-2">
                            <div>
                              <div className="font-medium">{reservoir.name}</div>
                              <div className="text-sm text-gray-500">Profondeur: {reservoir.depth}m</div>
                            </div>
                            <Badge
                              className={
                                reservoir.depth <= 640 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }
                            >
                              {reservoir.depth <= 640 ? "Atteint" : "Non atteint"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Les autres TabsContent restent inchangés */}
            <TabsContent value="daily">{/* Contenu existant */}</TabsContent>

            <TabsContent value="technical">{/* Contenu existant */}</TabsContent>

            <TabsContent value="costs">{/* Contenu existant */}</TabsContent>

            <TabsContent value="incidents">{/* Contenu existant */}</TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

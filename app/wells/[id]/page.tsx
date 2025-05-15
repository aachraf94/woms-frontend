"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { ArrowLeftIcon, FileIcon, DownloadIcon, ViewIcon as View3dIcon, LayoutIcon } from "lucide-react"
import Link from "next/link"
import Well3DVisualization from "@/components/well-3d-visualization"

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

// Données pour la visualisation 3D
const wellPhases = [
  {
    number: 1,
    diameter: '26"',
    depth: [0, 150],
    casing: '20"',
    status: "completed" as const,
  },
  {
    number: 2,
    diameter: '17½"',
    depth: [150, 450],
    casing: '13⅜"',
    status: "completed" as const,
  },
  {
    number: 3,
    diameter: '12¼"',
    depth: [450, 850],
    casing: "",
    status: "in_progress" as const,
  },
  {
    number: 4,
    diameter: '8½"',
    depth: [850, 3500],
    casing: "",
    status: "planned" as const,
  },
]

const wellReservoirs = [
  {
    name: "R1",
    depth: 2800,
    status: "not_reached" as const,
  },
  {
    name: "R2",
    depth: 3100,
    status: "not_reached" as const,
  },
  {
    name: "R3",
    depth: 3400,
    status: "not_reached" as const,
  },
]

// État actuel du puits
const currentPhaseIndex = 2 // 0-based index, donc 2 = phase 3 (12¼")
const currentDepth = 640

export default function WellDetailsPage() {
  const [schemaView, setSchemaView] = useState<"2d" | "3d">("2d")

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
                Projet de développement - Hassi Messaoud - Dernière mise à jour: aujourd'hui à 09:45
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
              <TabsTrigger value="daily">Suivi journalier</TabsTrigger>
              <TabsTrigger value="technical">Données techniques</TabsTrigger>
              <TabsTrigger value="costs">Coûts</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Schéma du puits */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>Schéma du puits</CardTitle>
                    <div className="flex border rounded-md overflow-hidden">
                      <Button
                        variant={schemaView === "2d" ? "default" : "ghost"}
                        size="sm"
                        className={schemaView === "2d" ? "bg-[#ED8D31]" : ""}
                        onClick={() => setSchemaView("2d")}
                      >
                        <LayoutIcon className="h-4 w-4 mr-1" />
                        2D
                      </Button>
                      <Button
                        variant={schemaView === "3d" ? "default" : "ghost"}
                        size="sm"
                        className={schemaView === "3d" ? "bg-[#ED8D31]" : ""}
                        onClick={() => setSchemaView("3d")}
                      >
                        <View3dIcon className="h-4 w-4 mr-1" />
                        3D
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {schemaView === "2d" ? (
                      <div className="relative h-[500px] flex items-center justify-center bg-gray-100 overflow-hidden">
                        <div className="w-[200px] h-[450px] relative">
                          {/* Derrick et tête de puits */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                            {/* Derrick */}
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 40 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M20 0L5 35H35L20 0Z" fill="#666" />
                              <rect x="15" y="30" width="10" height="10" fill="#888" />
                            </svg>

                            {/* BOP et équipement de tête de puits */}
                            <div className="w-[50px] h-[50px] flex flex-col items-center">
                              <div className="w-[40px] h-[8px] bg-gray-400"></div>
                              <div className="w-[35px] h-[6px] bg-gray-500 my-1"></div>
                              <div className="w-[40px] h-[8px] bg-gray-400"></div>
                              <div className="w-[35px] h-[6px] bg-gray-500 my-1"></div>
                              <div className="w-[40px] h-[8px] bg-gray-400"></div>
                              <div className="w-[35px] h-[6px] bg-gray-500 my-1"></div>
                            </div>
                          </div>

                          {/* Structure principale du puits */}
                          <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                            {/* Première section - 26" */}
                            <div className="relative w-[140px] h-[80px]">
                              <div className="absolute left-0 w-[15px] h-full bg-green-500"></div>
                              <div className="absolute right-0 w-[15px] h-full bg-green-500"></div>
                              <div className="absolute left-[15px] top-0 w-0 h-0 border-t-[8px] border-r-[8px] border-t-transparent border-r-black"></div>
                              <div className="absolute right-[15px] top-0 w-0 h-0 border-t-[8px] border-l-[8px] border-t-transparent border-l-black"></div>
                            </div>

                            {/* Deuxième section - 17½" */}
                            <div className="relative w-[110px] h-[80px]">
                              <div className="absolute left-0 w-[15px] h-full bg-green-500"></div>
                              <div className="absolute right-0 w-[15px] h-full bg-green-500"></div>
                              <div className="absolute left-[15px] top-0 w-0 h-0 border-t-[8px] border-r-[8px] border-t-transparent border-r-black"></div>
                              <div className="absolute right-[15px] top-0 w-0 h-0 border-t-[8px] border-l-[8px] border-t-transparent border-l-black"></div>
                            </div>

                            {/* Troisième section - 12¼" */}
                            <div className="relative w-[80px] h-[80px]">
                              <div className="absolute left-0 w-[15px] h-full bg-orange-300"></div>
                              <div className="absolute right-0 w-[15px] h-full bg-orange-300"></div>
                              <div className="absolute left-[15px] top-0 w-0 h-0 border-t-[8px] border-r-[8px] border-t-transparent border-r-black"></div>
                              <div className="absolute right-[15px] top-0 w-0 h-0 border-t-[8px] border-l-[8px] border-t-transparent border-l-black"></div>
                              <div className="absolute left-[15px] bottom-0 w-[8px] h-[2px] bg-black"></div>
                              <div className="absolute right-[15px] bottom-0 w-[8px] h-[2px] bg-black"></div>

                              {/* Indicateur de profondeur actuelle */}
                              <div className="absolute left-[-20px] top-[40px] w-[120px] h-[1px] bg-red-500 z-10"></div>
                              <div className="absolute right-[90px] top-[36px] text-[10px] text-red-500 font-medium whitespace-nowrap">
                                640m (actuel)
                              </div>
                            </div>

                            {/* Section inférieure - 8½" avec réservoirs */}
                            <div className="relative w-[60px] h-[160px]">
                              <div className="absolute left-0 w-[2px] h-full bg-black"></div>
                              <div className="absolute right-0 w-[2px] h-full bg-black"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>

                              {/* Réservoir R3 */}
                              <div className="absolute top-[30px] left-[-30px] w-[30px] h-[8px] bg-yellow-300"></div>
                              <div className="absolute top-[30px] right-[-30px] w-[30px] h-[8px] bg-yellow-300"></div>
                              <div className="absolute top-[30px] left-[20px] text-xs">R3</div>

                              {/* Réservoir R2 */}
                              <div className="absolute top-[80px] left-[-30px] w-[30px] h-[8px] bg-yellow-300"></div>
                              <div className="absolute top-[80px] right-[-30px] w-[30px] h-[8px] bg-yellow-300"></div>
                              <div className="absolute top-[80px] left-[20px] text-xs">R2</div>

                              {/* Réservoir R1 */}
                              <div className="absolute top-[130px] left-[-30px] w-[30px] h-[8px] bg-yellow-300"></div>
                              <div className="absolute top-[130px] right-[-30px] w-[30px] h-[8px] bg-yellow-300"></div>
                              <div className="absolute top-[130px] left-[20px] text-xs">R1</div>
                            </div>
                          </div>

                          {/* Étiquettes de phase à gauche */}
                          <div className="absolute left-[20px] top-[100px] text-left text-sm">
                            <div className="mb-[70px]">26"</div>
                            <div className="mb-[70px]">17½"</div>
                            <div className="mb-[70px]">12¼"</div>
                            <div>8½"</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Well3DVisualization currentDepth={640} phases={wellPhases} reservoirs={wellReservoirs} />
                    )}
                  </CardContent>
                </Card>

                {/* Progression du forage */}
                <Card>
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
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations sur les phases */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informations sur les phases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Phase</th>
                            <th className="text-left py-3 px-4 font-medium">Diamètre</th>
                            <th className="text-left py-3 px-4 font-medium">Profondeur (m)</th>
                            <th className="text-left py-3 px-4 font-medium">Tubage</th>
                            <th className="text-left py-3 px-4 font-medium">Statut</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 px-4">1</td>
                            <td className="py-3 px-4">26"</td>
                            <td className="py-3 px-4">0-150</td>
                            <td className="py-3 px-4">20"</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">2</td>
                            <td className="py-3 px-4">17½"</td>
                            <td className="py-3 px-4">150-450</td>
                            <td className="py-3 px-4">13⅜"</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 px-4">3</td>
                            <td className="py-3 px-4">12¼"</td>
                            <td className="py-3 px-4">450-850</td>
                            <td className="py-3 px-4">-</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-orange-100 text-orange-800">En cours</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">4</td>
                            <td className="py-3 px-4">8½"</td>
                            <td className="py-3 px-4">850-3500</td>
                            <td className="py-3 px-4">-</td>
                            <td className="py-3 px-4">
                              <Badge className="bg-gray-100 text-gray-800">Planifié</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {/* Réservoirs cibles */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Réservoirs cibles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border-b pb-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">R1</div>
                              <div className="text-sm text-gray-500">Profondeur: 2800m</div>
                            </div>
                            <Badge className="bg-gray-100 text-gray-800">Non atteint</Badge>
                          </div>
                        </div>

                        <div className="border-b pb-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">R2</div>
                              <div className="text-sm text-gray-500">Profondeur: 3100m</div>
                            </div>
                            <Badge className="bg-gray-100 text-gray-800">Non atteint</Badge>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">R3</div>
                              <div className="text-sm text-gray-500">Profondeur: 3400m</div>
                            </div>
                            <Badge className="bg-gray-100 text-gray-800">Non atteint</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Détails du projet */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Détails du projet</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium text-gray-500">Type de projet</div>
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
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="daily">{/* Contenu inchangé */}</TabsContent>

            <TabsContent value="technical">{/* Contenu inchangé */}</TabsContent>

            <TabsContent value="costs">{/* Contenu inchangé */}</TabsContent>

            <TabsContent value="incidents">{/* Contenu inchangé */}</TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

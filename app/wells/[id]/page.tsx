"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { ArrowLeftIcon, FileIcon, DownloadIcon, ClipboardListIcon } from "lucide-react"
import Link from "next/link"

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

            <TabsContent value="daily">
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Rapports journaliers</CardTitle>
                      <CardDescription>Dernières opérations effectuées sur le projet</CardDescription>
                    </div>
                    <Button>
                      <ClipboardListIcon className="mr-2 h-4 w-4" />
                      Nouveau rapport
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">07/07/2025 - Rapport #007</h3>
                            <p className="text-sm text-gray-500">Soumis par: Salim Hadj - 19:30</p>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">Validé</Badge>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div>
                            <div className="text-sm font-medium">Activités principales:</div>
                            <p className="text-sm">
                              Forage de 590m à 640m dans la formation. Circulation et conditionnement du puits.
                            </p>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Paramètres de forage:</div>
                            <p className="text-sm">RPM: 120, WOB: 15-18klbs, Débit: 2200 l/min, SPP: 2650 psi</p>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Commentaires:</div>
                            <p className="text-sm">Bon avancement sans incidents.</p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">06/07/2025 - Rapport #006</h3>
                            <p className="text-sm text-gray-500">Soumis par: Salim Hadj - 20:15</p>
                          </div>
                          <Badge className="bg-orange-100 text-orange-800">Validé</Badge>
                        </div>
                        <div className="space-y-2 mt-4">
                          <div>
                            <div className="text-sm font-medium">Activités principales:</div>
                            <p className="text-sm">Forage de 520m à 590m. Réalisation d'un short trip.</p>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Paramètres de forage:</div>
                            <p className="text-sm">RPM: 115, WOB: 14-17klbs, Débit: 2150 l/min, SPP: 2600 psi</p>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Commentaires:</div>
                            <p className="text-sm">Légère augmentation du couple observée à 560m.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Suivi des boues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          density: {
                            label: "Densité (sg)",
                            color: "hsl(var(--chart-3))",
                          },
                          viscosity: {
                            label: "Viscosité (s)",
                            color: "hsl(var(--chart-4))",
                          },
                        }}
                        className="h-[200px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={mudData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" orientation="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="density" stroke="var(--color-density)" />
                            <Line yAxisId="right" type="monotone" dataKey="viscosity" stroke="var(--color-viscosity)" />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Activités à venir</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <div className="flex-1">
                          <div className="font-medium">Poursuite du forage 12¼"</div>
                          <div className="text-sm text-gray-500">08/07/2025</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <div className="flex-1">
                          <div className="font-medium">Logging prévu</div>
                          <div className="text-sm text-gray-500">10/07/2025</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <div className="flex-1">
                          <div className="font-medium">Run casing 9⅝"</div>
                          <div className="text-sm text-gray-500">12/07/2025</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="costs">
              <Card>
                <CardHeader>
                  <CardTitle>Suivi des coûts</CardTitle>
                  <CardDescription>Budget vs dépenses réelles (en millions DA)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      actual: {
                        label: "Dépenses réelles (M DA)",
                        color: "hsl(var(--chart-5))",
                      },
                      budget: {
                        label: "Budget planifié (M DA)",
                        color: "hsl(var(--chart-6))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={costData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="budget"
                          stroke="var(--color-budget)"
                          fill="var(--color-budget)"
                          fillOpacity={0.2}
                        />
                        <Area
                          type="monotone"
                          dataKey="actual"
                          stroke="var(--color-actual)"
                          fill="var(--color-actual)"
                          fillOpacity={0.4}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="border rounded-md p-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">Services de forage</div>
                      <div className="text-2xl font-bold">62.5M DA</div>
                      <div className="text-sm text-gray-500 mt-1">56.8% du total</div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">Matériel et équipement</div>
                      <div className="text-2xl font-bold">32.4M DA</div>
                      <div className="text-sm text-gray-500 mt-1">29.5% du total</div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="text-sm font-medium text-gray-500 mb-1">Services support</div>
                      <div className="text-2xl font-bold">15.1M DA</div>
                      <div className="text-sm text-gray-500 mt-1">13.7% du total</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

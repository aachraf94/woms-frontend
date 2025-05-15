"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import {
  DownloadIcon,
  FilterIcon,
  PieChartIcon,
  TrendingUpIcon,
  CalendarIcon,
  FileTextIcon,
  PrinterIcon,
  RefreshCwIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react"

// Données simulées pour les projets
const projets = [
  { id: "HMD-2501", nom: "Hassi Messaoud - Développement Phase 2", bassin: "Hassi Messaoud" },
  { id: "BRK-1842", nom: "Berkine - Exploration Nord", bassin: "Berkine" },
  { id: "ILZ-0723", nom: "Illizi - Délinéation Bloc 3", bassin: "Illizi" },
  { id: "REB-3104", nom: "Rhourde El Baguel - Extension Ouest", bassin: "Hassi Messaoud" },
  { id: "TFT-0512", nom: "Tin Fouye Tabankort - Développement Phase 3", bassin: "Illizi" },
]

// Données simulées pour les graphiques avec phases de forage spécifiques
const performanceData = [
  { phase: 'Phase 12¼"', planifie: 92, reel: 88 },
  { phase: 'Phase 8½"', planifie: 85, reel: 82 },
  { phase: 'Phase 6"', planifie: 78, reel: 75 },
  { phase: 'Phase 17½"', planifie: 90, reel: 87 },
  { phase: 'Phase 13⅜"', planifie: 95, reel: 92 },
]

const coutForageData = [
  { phase: 'Phase 12¼"', planifie: 320, reel: 345, ecart: "+7.8%" },
  { phase: 'Phase 8½"', planifie: 280, reel: 295, ecart: "+5.4%" },
  { phase: 'Phase 6"', planifie: 210, reel: 205, ecart: "-2.4%" },
  { phase: 'Phase 17½"', planifie: 350, reel: 380, ecart: "+8.6%" },
  { phase: 'Phase 13⅜"', planifie: 290, reel: 275, ecart: "-5.2%" },
]

const coutCategorieForage = [
  { categorie: "Trépans", valeur: 32 },
  { categorie: "Fluides de forage", valeur: 28 },
  { categorie: "Location d'équipements", valeur: 20 },
  { categorie: "Personnel spécialisé", valeur: 15 },
  { categorie: "Autres", valeur: 5 },
]

const delaiData = [
  { phase: 'Phase 12¼"', planifie: 12, reel: 14 },
  { phase: 'Phase 8½"', planifie: 10, reel: 11 },
  { phase: 'Phase 6"', planifie: 8, reel: 7 },
  { phase: 'Phase 17½"', planifie: 15, reel: 18 },
  { phase: 'Phase 13⅜"', planifie: 11, reel: 10 },
]

const causesRetardData = [
  { cause: "Problèmes techniques", valeur: 42 },
  { cause: "Conditions géologiques", valeur: 23 },
  { cause: "Logistique équipements", valeur: 18 },
  { cause: "Administratif", valeur: 12 },
  { cause: "Autres", valeur: 5 },
]

const COLORS = ["#F08100", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function ReportsPage() {
  const [projetSelectionne, setProjetSelectionne] = useState<string>("HMD-2501")

  // Trouver le projet sélectionné
  const projetActuel = projets.find((p) => p.id === projetSelectionne) || projets[0]

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Analyses & Reporting</h1>
              <p className="text-gray-600">Visualisez et analysez les données de vos projets de forage</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Actualiser
              </Button>
              <Button variant="outline" size="sm">
                <PrinterIcon className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <Button className="bg-[#F08100] hover:bg-orange-700" size="sm">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <div className="text-sm font-medium">Projet</div>
                  <Select value={projetSelectionne} onValueChange={setProjetSelectionne}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un projet" />
                    </SelectTrigger>
                    <SelectContent>
                      {projets.map((projet) => (
                        <SelectItem key={projet.id} value={projet.id}>
                          {projet.id} - {projet.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Période</div>
                  <div className="flex space-x-2">
                    <div className="relative w-full">
                      <CalendarIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input type="date" className="pl-10 w-full" />
                    </div>
                    <div className="relative w-full">
                      <CalendarIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input type="date" className="pl-10 w-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-end">
                  <Button className="w-full">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold">{projetActuel.nom}</h2>
                <p className="text-gray-600">
                  ID: {projetActuel.id} | Bassin: {projetActuel.bassin}
                </p>
              </div>
              <Badge className="mt-2 md:mt-0 bg-green-100 text-green-800 px-3 py-1">En cours</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Avancement forage</div>
                <div className="text-3xl font-bold">68%</div>
                <div className="mt-2 flex items-center text-sm text-amber-600">
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                  <span>-3% vs planifié</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Budget forage</div>
                <div className="text-3xl font-bold">72%</div>
                <div className="mt-2 flex items-center text-sm text-red-600">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  <span>+5% vs planifié</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Délai restant</div>
                <div className="text-3xl font-bold">43 jours</div>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  <span>Dans les temps</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-gray-500 mb-1">Profondeur atteinte</div>
                <div className="text-3xl font-bold">2,850 m</div>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                  <span>+120m cette semaine</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="performance" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="performance">
                <TrendingUpIcon className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="couts">
                <PieChartIcon className="h-4 w-4 mr-2" />
                Analyse des coûts
              </TabsTrigger>
              <TabsTrigger value="delais">
                <ClockIcon className="h-4 w-4 mr-2" />
                Analyse des délais
              </TabsTrigger>
              <TabsTrigger value="rapports">
                <FileTextIcon className="h-4 w-4 mr-2" />
                Rapports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance de forage du projet {projetActuel.id}</CardTitle>
                  <CardDescription>Efficacité opérationnelle par phase de forage (%)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      planifie: {
                        label: "Planifié (%)",
                        color: "hsl(var(--chart-3))",
                      },
                      reel: {
                        label: "Réel (%)",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                    className="h-[400px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="phase" />
                        <YAxis domain={[70, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="planifie" fill="#F08100" />
                        <Bar dataKey="reel" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Indicateurs de performance par phase de forage</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Phase</TableHead>
                          <TableHead>Vitesse moyenne (m/h)</TableHead>
                          <TableHead>Objectif (m/h)</TableHead>
                          <TableHead>Écart</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Phase 17½"</TableCell>
                          <TableCell>8.2</TableCell>
                          <TableCell>8.5</TableCell>
                          <TableCell className="text-amber-600">-0.3</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-100 text-amber-800">Proche</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 13⅜"</TableCell>
                          <TableCell>7.5</TableCell>
                          <TableCell>7.0</TableCell>
                          <TableCell className="text-green-600">+0.5</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Dépassé</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 12¼"</TableCell>
                          <TableCell>5.8</TableCell>
                          <TableCell>6.5</TableCell>
                          <TableCell className="text-red-600">-0.7</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800">En retard</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 8½"</TableCell>
                          <TableCell>4.2</TableCell>
                          <TableCell>4.0</TableCell>
                          <TableCell className="text-green-600">+0.2</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Dépassé</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 6"</TableCell>
                          <TableCell>3.1</TableCell>
                          <TableCell>3.0</TableCell>
                          <TableCell className="text-green-600">+0.1</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Dépassé</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="couts">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Répartition des coûts de forage du projet {projetActuel.id}</CardTitle>
                    <CardDescription>Ventilation des coûts par catégorie (%)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={coutCategorieForage}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="valeur"
                            nameKey="categorie"
                          >
                            {coutCategorieForage.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analyse des coûts par phase de forage</CardTitle>
                    <CardDescription>Comparaison des coûts planifiés vs réels (M DA)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Phase</TableHead>
                          <TableHead>Coût planifié (M DA)</TableHead>
                          <TableHead>Coût réel (M DA)</TableHead>
                          <TableHead>Écart</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Phase 17½"</TableCell>
                          <TableCell>350</TableCell>
                          <TableCell>380</TableCell>
                          <TableCell className="text-red-600">+8.6%</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800">Dépassement</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 13⅜"</TableCell>
                          <TableCell>290</TableCell>
                          <TableCell>275</TableCell>
                          <TableCell className="text-green-600">-5.2%</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Économie</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 12¼"</TableCell>
                          <TableCell>320</TableCell>
                          <TableCell>345</TableCell>
                          <TableCell className="text-red-600">+7.8%</TableCell>
                          <TableCell>
                            <Badge className="bg-red-100 text-red-800">Dépassement</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 8½"</TableCell>
                          <TableCell>280</TableCell>
                          <TableCell>295</TableCell>
                          <TableCell className="text-red-600">+5.4%</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-100 text-amber-800">Léger dépassement</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 6"</TableCell>
                          <TableCell>210</TableCell>
                          <TableCell>205</TableCell>
                          <TableCell className="text-green-600">-2.4%</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Économie</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Opportunités d'optimisation des coûts de forage</h3>
                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <div className="font-medium">Optimisation des trépans</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Potentiel d'économie: 45M DA - Utilisation de trépans plus durables pour les phases 12¼" et
                            8½"
                          </div>
                        </div>
                        <div className="border rounded-md p-4">
                          <div className="font-medium">Réduction des coûts de fluides de forage</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Potentiel d'économie: 35M DA - Optimisation des formulations et recyclage amélioré
                          </div>
                        </div>
                        <div className="border rounded-md p-4">
                          <div className="font-medium">Amélioration de l'efficacité des équipements</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Potentiel d'économie: 65M DA - Réduction des temps non-productifs et maintenance préventive
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="delais">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Analyse des délais par phase de forage du projet {projetActuel.id}</CardTitle>
                    <CardDescription>Comparaison des délais planifiés vs réels (jours)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        planifie: {
                          label: "Délai planifié (jours)",
                          color: "hsl(var(--chart-1))",
                        },
                        reel: {
                          label: "Délai réel (jours)",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={delaiData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="phase" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="planifie" fill="#F08100" />
                          <Bar dataKey="reel" fill="#0088FE" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Causes des retards</CardTitle>
                    <CardDescription>Répartition des causes de retard (%)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={causesRetardData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="valeur"
                            nameKey="cause"
                          >
                            {causesRetardData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Suivi détaillé des délais par phase de forage</CardTitle>
                    <CardDescription>État d'avancement et écarts par phase</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Phase</TableHead>
                          <TableHead>Date début prévue</TableHead>
                          <TableHead>Date fin prévue</TableHead>
                          <TableHead>Date fin réelle/estimée</TableHead>
                          <TableHead>Écart (jours)</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Phase 17½"</TableCell>
                          <TableCell>15/01/2025</TableCell>
                          <TableCell>30/01/2025</TableCell>
                          <TableCell>02/02/2025</TableCell>
                          <TableCell className="text-red-600">+3</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 13⅜"</TableCell>
                          <TableCell>03/02/2025</TableCell>
                          <TableCell>14/02/2025</TableCell>
                          <TableCell>13/02/2025</TableCell>
                          <TableCell className="text-green-600">-1</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 12¼"</TableCell>
                          <TableCell>15/02/2025</TableCell>
                          <TableCell>27/02/2025</TableCell>
                          <TableCell>03/03/2025</TableCell>
                          <TableCell className="text-red-600">+4</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 8½"</TableCell>
                          <TableCell>04/03/2025</TableCell>
                          <TableCell>14/03/2025</TableCell>
                          <TableCell>15/03/2025</TableCell>
                          <TableCell className="text-red-600">+1</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Phase 6"</TableCell>
                          <TableCell>16/03/2025</TableCell>
                          <TableCell>24/03/2025</TableCell>
                          <TableCell>23/03/2025</TableCell>
                          <TableCell className="text-green-600">-1</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800">En cours</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rapports">
              <Card>
                <CardHeader>
                  <CardTitle>Rapports de forage pour {projetActuel.id}</CardTitle>
                  <CardDescription>Accédez aux rapports détaillés sur les opérations de forage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Rapport journalier de forage - 23/03/2025</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Suivi détaillé des opérations de forage, paramètres et incidents
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileTextIcon className="h-4 w-4 mr-2" />
                          Consulter
                        </Button>
                        <Button variant="outline" size="sm">
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Rapport de fin de phase - Phase 8½"</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Analyse complète de la phase de forage, performances et recommandations
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileTextIcon className="h-4 w-4 mr-2" />
                          Consulter
                        </Button>
                        <Button variant="outline" size="sm">
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Rapport d'analyse des fluides de forage - Mars 2025</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Analyse des propriétés des fluides, performances et ajustements
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileTextIcon className="h-4 w-4 mr-2" />
                          Consulter
                        </Button>
                        <Button variant="outline" size="sm">
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Rapport d'analyse des trépans - Phase 12¼"</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Évaluation des performances des trépans et recommandations
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileTextIcon className="h-4 w-4 mr-2" />
                          Consulter
                        </Button>
                        <Button variant="outline" size="sm">
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Rapport géologique - Formations traversées</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Analyse des formations géologiques et implications pour le forage
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileTextIcon className="h-4 w-4 mr-2" />
                          Consulter
                        </Button>
                        <Button variant="outline" size="sm">
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Télécharger
                        </Button>
                      </div>
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

"use client"

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
} from "lucide-react"

// Données simulées pour les graphiques
const productionData = [
  { mois: "Jan", petrole: 1200 },
  { mois: "Fév", petrole: 1350 },
  { mois: "Mar", petrole: 1460 },
  { mois: "Avr", petrole: 1250 },
  { mois: "Mai", petrole: 1550 },
  { mois: "Juin", petrole: 1650 },
]

const performanceData = [
  { champ: "Hassi Messaoud", efficacite: 92, objectif: 95 },
  { champ: "Hassi R'Mel", efficacite: 88, objectif: 90 },
  { champ: "Berkine", efficacite: 95, objectif: 92 },
  { champ: "Rhourde El Baguel", efficacite: 85, objectif: 88 },
  { champ: "Tin Fouye Tabankort", efficacite: 91, objectif: 90 },
]

const coutData = [
  { categorie: "Forage", valeur: 42 },
  { categorie: "Équipement", valeur: 28 },
  { categorie: "Personnel", valeur: 15 },
  { categorie: "Maintenance", valeur: 10 },
  { categorie: "Logistique", valeur: 5 },
]

const COLORS = ["#F08100", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

// Données pour les délais
const delaisData = [
  { mois: "Jan", planifie: 45, reel: 48, retard: 3 },
  { mois: "Fév", planifie: 42, reel: 44, retard: 2 },
  { mois: "Mar", planifie: 38, reel: 37, retard: -1 },
  { mois: "Avr", planifie: 40, reel: 43, retard: 3 },
  { mois: "Mai", planifie: 44, reel: 42, retard: -2 },
  { mois: "Juin", planifie: 41, reel: 45, retard: 4 },
  { mois: "Juil", planifie: 39, reel: 38, retard: -1 },
]

const projetsDelaisData = [
  { nom: "HMD-42", avancement: 85, retard: -2, statut: "Avance" },
  { nom: "RKZ-17", avancement: 65, retard: 3, statut: "Retard" },
  { nom: "GLTZ-08", avancement: 42, retard: 5, statut: "Retard" },
  { nom: "BRKN-11", avancement: 78, retard: 0, statut: "Dans les temps" },
  { nom: "ILZ-05", avancement: 92, retard: -1, statut: "Avance" },
]

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Analyses & Reporting</h1>
              <p className="text-gray-600">Visualisez et analysez les données de vos opérations E&P</p>
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

                <div className="space-y-2">
                  <div className="text-sm font-medium">Région</div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les régions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les régions</SelectItem>
                      <SelectItem value="hassi-messaoud">Hassi Messaoud</SelectItem>
                      <SelectItem value="hassi-rmel">Hassi R'Mel</SelectItem>
                      <SelectItem value="berkine">Berkine</SelectItem>
                      <SelectItem value="illizi">Illizi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Type de puits</div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="exploration">Exploration</SelectItem>
                      <SelectItem value="delineation">Délinéation</SelectItem>
                      <SelectItem value="development">Développement</SelectItem>
                    </SelectContent>
                  </Select>
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

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Coût opérationnel</div>
                  <div className="text-3xl font-bold">8.4 $/bbl</div>
                  <div className="mt-2 flex items-center text-sm text-red-600">
                    <TrendingUpIcon className="h-4 w-4 mr-1" />
                    <span>+0.3$ vs objectif</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Délai moyen de réalisation</div>
                  <div className="text-3xl font-bold">42.4 jours</div>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <TrendingUpIcon className="h-4 w-4 mr-1" />
                    <span>-2.6 jours vs objectif</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">Projets dans les délais</div>
                  <div className="text-3xl font-bold">78%</div>
                  <div className="mt-2 flex items-center text-sm text-amber-600">
                    <TrendingUpIcon className="h-4 w-4 mr-1" />
                    <span>-2% vs objectif</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="couts" className="mb-6">
            <TabsList className="mb-4">
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

            <TabsContent value="delais">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Respect des délais</CardTitle>
                    <CardDescription>Comparaison entre délais planifiés et réels (jours)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        planifie: {
                          label: "Délai planifié (jours)",
                          color: "hsl(210, 100%, 56%)",
                        },
                        reel: {
                          label: "Délai réel (jours)",
                          color: "hsl(30, 100%, 56%)",
                        },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={delaisData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mois" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="planifie" fill="var(--color-planifie)" />
                          <Bar dataKey="reel" fill="var(--color-reel)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Statut des projets en cours</CardTitle>
                    <CardDescription>Avancement et respect des délais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {projetsDelaisData.map((projet, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{projet.nom}</span>
                            <Badge
                              className={
                                projet.statut === "Avance"
                                  ? "bg-green-100 text-green-800"
                                  : projet.statut === "Retard"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {projet.statut}
                            </Badge>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className={
                                projet.statut === "Avance"
                                  ? "h-2 bg-green-600 rounded-full"
                                  : projet.statut === "Retard"
                                    ? "h-2 bg-red-600 rounded-full"
                                    : "h-2 bg-blue-600 rounded-full"
                              }
                              style={{ width: `${projet.avancement}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Avancement: {projet.avancement}%</span>
                            <span>
                              {projet.retard === 0
                                ? "Dans les temps"
                                : projet.retard > 0
                                  ? `Retard: ${projet.retard} jours`
                                  : `Avance: ${Math.abs(projet.retard)} jours`}
                            </span>
                          </div>
                        </div>
                      ))}

                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Délai moyen de réalisation</span>
                          <Badge className="bg-[#ED8D31] text-white">42.4 jours</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Moyenne des délais réels pour les projets terminés au cours des 6 derniers mois
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="couts">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Répartition des coûts opérationnels</CardTitle>
                    <CardDescription>Ventilation des coûts par catégorie (%)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={coutData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="valeur"
                            nameKey="categorie"
                          >
                            {coutData.map((entry, index) => (
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
                    <CardTitle>Analyse des coûts</CardTitle>
                    <CardDescription>Détails des coûts opérationnels par catégorie</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Catégorie</TableHead>
                          <TableHead>Coût (M DA)</TableHead>
                          <TableHead>% du total</TableHead>
                          <TableHead>Variation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Forage</TableCell>
                          <TableCell>1,260</TableCell>
                          <TableCell>42%</TableCell>
                          <TableCell className="text-amber-600">+3.2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Équipement</TableCell>
                          <TableCell>840</TableCell>
                          <TableCell>28%</TableCell>
                          <TableCell className="text-green-600">-1.5%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Personnel</TableCell>
                          <TableCell>450</TableCell>
                          <TableCell>15%</TableCell>
                          <TableCell className="text-green-600">-0.8%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Maintenance</TableCell>
                          <TableCell>300</TableCell>
                          <TableCell>10%</TableCell>
                          <TableCell className="text-red-600">+4.2%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Logistique</TableCell>
                          <TableCell>150</TableCell>
                          <TableCell>5%</TableCell>
                          <TableCell className="text-amber-600">+2.1%</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Opportunités d'optimisation des coûts</h3>
                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <div className="font-medium">Optimisation des opérations de forage</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Potentiel d'économie: 85M DA - Réduction du temps non-productif et amélioration de
                            l'efficacité des équipements
                          </div>
                        </div>
                        <div className="border rounded-md p-4">
                          <div className="font-medium">Renégociation des contrats de services</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Potentiel d'économie: 65M DA - Consolidation des fournisseurs et amélioration des conditions
                            contractuelles
                          </div>
                        </div>
                        <div className="border rounded-md p-4">
                          <div className="font-medium">Programme de maintenance prédictive</div>
                          <div className="text-sm text-gray-500 mt-1">
                            Potentiel d'économie: 45M DA - Réduction des pannes et optimisation des cycles de
                            maintenance
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rapports">
              <Card>
                <CardHeader>
                  <CardTitle>Rapports disponibles</CardTitle>
                  <CardDescription>Accédez aux rapports détaillés sur les opérations E&P</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">Rapport trimestriel des coûts - Q2 2025</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Analyse détaillée des coûts opérationnels et d'investissement
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
                        <div className="font-medium">Rapport d'analyse des délais - Q2 2025</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Analyse détaillée des délais de réalisation et des écarts par rapport aux plannings
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
                        <div className="font-medium">Rapport d'optimisation des coûts - Juin 2025</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Recommandations pour l'optimisation des coûts opérationnels
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
                        <div className="font-medium">Rapport de performance des délais - Juin 2025</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Analyse des facteurs impactant les délais et recommandations d'amélioration
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

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Rapports programmés</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom du rapport</TableHead>
                          <TableHead>Fréquence</TableHead>
                          <TableHead>Prochain envoi</TableHead>
                          <TableHead>Destinataires</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Rapport quotidien de production</TableCell>
                          <TableCell>Quotidien</TableCell>
                          <TableCell>11/07/2025 - 06:00</TableCell>
                          <TableCell>Direction Production, Équipes terrain</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Modifier
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Rapport hebdomadaire des opérations</TableCell>
                          <TableCell>Hebdomadaire</TableCell>
                          <TableCell>14/07/2025 - 08:00</TableCell>
                          <TableCell>Direction Générale, Managers</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Modifier
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Tableau de bord KPI</TableCell>
                          <TableCell>Mensuel</TableCell>
                          <TableCell>01/08/2025 - 09:00</TableCell>
                          <TableCell>Comité de direction</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Modifier
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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

"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line,
} from "recharts"
import { Clock, CheckCircle } from "lucide-react"

// Données simulées pour les graphiques
const efficaciteData = [
  { champ: "Hassi Messaoud", efficacite: 92, objectif: 90 },
  { champ: "Hassi R'Mel", efficacite: 88, objectif: 90 },
  { champ: "Berkine", efficacite: 95, objectif: 90 },
  { champ: "Illizi", efficacite: 85, objectif: 90 },
  { champ: "Rhourde Nouss", efficacite: 91, objectif: 90 },
]

const forageData = [
  { mois: "Jan", reussite: 85, echec: 15 },
  { mois: "Fév", reussite: 88, echec: 12 },
  { mois: "Mar", reussite: 90, echec: 10 },
  { mois: "Avr", reussite: 87, echec: 13 },
  { mois: "Mai", reussite: 92, echec: 8 },
  { mois: "Juin", reussite: 94, echec: 6 },
  { mois: "Juil", reussite: 91, echec: 9 },
]

// Données pour les coûts par catégorie d'opération
const coutsCategoriesData = [
  { name: "Forage", value: 35 },
  { name: "Complétion", value: 20 },
  { name: "Maintenance", value: 18 },
  { name: "Tests & Diagraphie", value: 15 },
  { name: "Logistique", value: 12 },
]

// Données pour les coûts par phase de forage
const coutsPhaseForageData = [
  { name: 'Phase 17½"', value: 28, budget: 30, ecart: -2 },
  { name: 'Phase 12¼"', value: 35, budget: 32, ecart: 3 },
  { name: 'Phase 8½"', value: 25, budget: 26, ecart: -1 },
  { name: 'Phase 6"', value: 12, budget: 12, ecart: 0 },
]

// Données pour les coûts par mètre foré
const coutParMetreData = [
  { puits: "HMD-42", phase17: 0.85, phase12: 0.92, phase8: 1.05, phase6: 1.25 },
  { puits: "BRK-18", phase17: 0.82, phase12: 0.88, phase8: 1.02, phase6: 1.2 },
  { puits: "ILZ-05", phase17: 0.9, phase12: 0.95, phase8: 1.1, phase6: 1.3 },
  { puits: "HRM-23", phase17: 0.88, phase12: 0.94, phase8: 1.08, phase6: 1.28 },
  { puits: "RND-11", phase17: 0.86, phase12: 0.93, phase8: 1.06, phase6: 1.26 },
]

// Données pour l'évolution des coûts de forage dans le temps
const evolutionCoutsForageData = [
  { mois: "Jan", cout: 32.5 },
  { mois: "Fév", cout: 33.2 },
  { mois: "Mar", cout: 31.8 },
  { mois: "Avr", cout: 32.0 },
  { mois: "Mai", cout: 30.5 },
  { mois: "Juin", cout: 29.8 },
  { mois: "Juil", cout: 28.5 },
]

// Données pour les indicateurs de performance de forage
const performanceForageData = [
  { indicateur: "Vitesse moyenne (m/h)", valeur: 12.5, objectif: 12.0, ecart: "+0.5" },
  { indicateur: "Temps non-productif (%)", valeur: 15.2, objectif: 12.0, ecart: "+3.2" },
  { indicateur: "Coût par mètre (k DA/m)", valeur: 95.3, objectif: 100.0, ecart: "-4.7" },
  { indicateur: "Consommation de boue (m³/m)", valeur: 0.28, objectif: 0.3, ecart: "-0.02" },
  { indicateur: "Durée moyenne par puits (jours)", valeur: 18.5, objectif: 20.0, ecart: "-1.5" },
]

const performanceEquipeData = [
  { name: "Équipe A", performance: 92, fill: "#FF8042" },
  { name: "Équipe B", performance: 88, fill: "#FFBB28" },
  { name: "Équipe C", performance: 95, fill: "#00C49F" },
  { name: "Équipe D", performance: 90, fill: "#0088FE" },
  { name: "Équipe E", performance: 87, fill: "#8884d8" },
]

// Données pour les délais planifiés vs réels
const delaisProjetsData = [
  { projet: "HMD-42", planifie: 45, reel: 48, ecart: 3 },
  { projet: "BRK-18", planifie: 38, reel: 35, ecart: -3 },
  { projet: "ILZ-05", planifie: 42, reel: 46, ecart: 4 },
  { projet: "HRM-23", planifie: 40, reel: 39, ecart: -1 },
  { projet: "RND-11", planifie: 36, reel: 42, ecart: 6 },
]

// Données pour les causes de retard
const causesRetardData = [
  { name: "Problèmes techniques", value: 35 },
  { name: "Conditions météo", value: 20 },
  { name: "Logistique", value: 18 },
  { name: "Attente d'approbation", value: 15 },
  { name: "Autres", value: 12 },
]

// Données pour le respect des délais par équipe
const respectDelaisEquipeData = [
  { equipe: "Équipe A", respecte: 85, retard: 15 },
  { equipe: "Équipe B", respecte: 78, retard: 22 },
  { equipe: "Équipe C", respecte: 92, retard: 8 },
  { equipe: "Équipe D", respecte: 80, retard: 20 },
  { equipe: "Équipe E", respecte: 75, retard: 25 },
]

// Données pour l'évolution des délais dans le temps
const evolutionDelaisData = [
  { mois: "Jan", delaiMoyen: 42, objectif: 40 },
  { mois: "Fév", delaiMoyen: 43, objectif: 40 },
  { mois: "Mar", delaiMoyen: 41, objectif: 40 },
  { mois: "Avr", delaiMoyen: 40, objectif: 40 },
  { mois: "Mai", delaiMoyen: 38, objectif: 40 },
  { mois: "Juin", delaiMoyen: 37, objectif: 40 },
  { mois: "Juil", delaiMoyen: 36, objectif: 40 },
]

// Données pour les indicateurs de performance liés aux délais
const performanceDelaisData = [
  { indicateur: "Temps moyen de forage (jours)", valeur: 18.5, objectif: 20.0, ecart: "-1.5" },
  { indicateur: "Temps d'attente entre phases (heures)", valeur: 24.2, objectif: 20.0, ecart: "+4.2" },
  { indicateur: "Délai de mobilisation (jours)", valeur: 3.8, objectif: 4.0, ecart: "-0.2" },
  { indicateur: "Temps de réponse aux incidents (heures)", valeur: 2.5, objectif: 3.0, ecart: "-0.5" },
  { indicateur: "Taux de respect du planning (%)", valeur: 82.5, objectif: 85.0, ecart: "-2.5" },
]

// Données pour le suivi des jalons de projet
const jalonsProjetData = [
  { jalon: "Préparation du site", planifie: "01/07", reel: "02/07", statut: "Retard", ecart: 1 },
  { jalon: "Installation du derrick", planifie: "05/07", reel: "04/07", statut: "Avance", ecart: -1 },
  { jalon: 'Phase 17½"', planifie: "10/07", reel: "12/07", statut: "Retard", ecart: 2 },
  { jalon: 'Phase 12¼"', planifie: "18/07", reel: "19/07", statut: "Retard", ecart: 1 },
  { jalon: 'Phase 8½"', planifie: "25/07", reel: "24/07", statut: "Avance", ecart: -1 },
  { jalon: "Complétion", planifie: "30/07", reel: "02/08", statut: "Retard", ecart: 3 },
]

const COLORS = ["#ED8D31", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function DashboardKpiCharts() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="couts" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="couts">Coûts</TabsTrigger>
          <TabsTrigger value="delais">Délais</TabsTrigger>
          <TabsTrigger value="efficacite">Efficacité</TabsTrigger>
          <TabsTrigger value="forage">Forage</TabsTrigger>
        </TabsList>

        <TabsContent value="couts">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des coûts par catégorie</CardTitle>
                <CardDescription>Vue d'ensemble des coûts opérationnels (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={coutsCategoriesData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {coutsCategoriesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coûts par phase de forage</CardTitle>
                <CardDescription>Répartition des coûts de forage par phase (M DA)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Coût réel (M DA)",
                      color: "hsl(30, 100%, 56%)",
                    },
                    budget: {
                      label: "Budget (M DA)",
                      color: "hsl(210, 100%, 56%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={coutsPhaseForageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="value" fill="#ED8D31" />
                      <Bar dataKey="budget" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coût par mètre foré</CardTitle>
                <CardDescription>Comparaison par puits et par phase (M DA/m)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    phase17: {
                      label: 'Phase 17½"',
                      color: "hsl(30, 100%, 56%)",
                    },
                    phase12: {
                      label: 'Phase 12¼"',
                      color: "hsl(210, 100%, 56%)",
                    },
                    phase8: {
                      label: 'Phase 8½"',
                      color: "hsl(150, 100%, 40%)",
                    },
                    phase6: {
                      label: 'Phase 6"',
                      color: "hsl(270, 100%, 60%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={coutParMetreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="puits" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="phase17" fill="#ED8D31" />
                      <Bar dataKey="phase12" fill="#0088FE" />
                      <Bar dataKey="phase8" fill="#00C49F" />
                      <Bar dataKey="phase6" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évolution des coûts de forage</CardTitle>
                <CardDescription>Tendance sur les 7 derniers mois (M DA)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    cout: {
                      label: "Coût total (M DA)",
                      color: "hsl(30, 100%, 56%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evolutionCoutsForageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis domain={[25, 35]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="cout" stroke="#ED8D31" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Indicateurs de performance de forage</CardTitle>
                <CardDescription>Comparaison avec les objectifs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performanceForageData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.indicateur}</span>
                        <div className="flex items-center text-sm">
                          <Badge
                            className={
                              item.ecart.startsWith("+") && item.indicateur !== "Temps non-productif (%)"
                                ? "bg-green-100 text-green-800"
                                : item.ecart.startsWith("-") && item.indicateur !== "Temps non-productif (%)"
                                  ? "bg-amber-100 text-amber-800"
                                  : item.ecart.startsWith("+") && item.indicateur === "Temps non-productif (%)"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                            }
                          >
                            {item.valeur}
                          </Badge>
                          <span
                            className={`ml-2 ${
                              item.ecart.startsWith("+") && item.indicateur !== "Temps non-productif (%)"
                                ? "text-green-600"
                                : item.ecart.startsWith("-") && item.indicateur !== "Temps non-productif (%)"
                                  ? "text-amber-600"
                                  : item.ecart.startsWith("+") && item.indicateur === "Temps non-productif (%)"
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                          >
                            {item.ecart}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            item.ecart.startsWith("+") && item.indicateur !== "Temps non-productif (%)"
                              ? "bg-green-600"
                              : item.ecart.startsWith("-") && item.indicateur !== "Temps non-productif (%)"
                                ? "bg-amber-500"
                                : item.ecart.startsWith("+") && item.indicateur === "Temps non-productif (%)"
                                  ? "bg-red-600"
                                  : "bg-green-600"
                          }`}
                          style={{
                            width: `${
                              item.indicateur === "Temps non-productif (%)"
                                ? (item.objectif / item.valeur) * 100
                                : (item.valeur / item.objectif) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Objectif: {item.objectif}</span>
                        <span>Écart: {item.ecart}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delais">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Délais planifiés vs réels</CardTitle>
                <CardDescription>Comparaison par projet (jours)</CardDescription>
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
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={delaisProjetsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="projet" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="planifie" fill="#0088FE" />
                      <Bar dataKey="reel" fill="#ED8D31" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Causes de retard</CardTitle>
                <CardDescription>Répartition des causes de retard (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={causesRetardData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {causesRetardData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Respect des délais par équipe</CardTitle>
                <CardDescription>Performance des équipes (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    respecte: {
                      label: "Délais respectés (%)",
                      color: "hsl(150, 100%, 40%)",
                    },
                    retard: {
                      label: "Retards (%)",
                      color: "hsl(0, 100%, 60%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={respectDelaisEquipeData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="equipe" type="category" width={80} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="respecte" stackId="a" fill="#00C49F" />
                      <Bar dataKey="retard" stackId="a" fill="#FF5252" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Évolution des délais</CardTitle>
                <CardDescription>Tendance sur les 7 derniers mois (jours)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    delaiMoyen: {
                      label: "Délai moyen (jours)",
                      color: "hsl(30, 100%, 56%)",
                    },
                    objectif: {
                      label: "Objectif (jours)",
                      color: "hsl(210, 100%, 56%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evolutionDelaisData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis domain={[30, 45]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="delaiMoyen" stroke="#ED8D31" strokeWidth={2} />
                      <Line type="monotone" dataKey="objectif" stroke="#0088FE" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Suivi des jalons du projet HMD-42</CardTitle>
                <CardDescription>Comparaison des dates planifiées vs réelles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Jalon</th>
                        <th className="text-center py-3 px-4">Date planifiée</th>
                        <th className="text-center py-3 px-4">Date réelle</th>
                        <th className="text-center py-3 px-4">Statut</th>
                        <th className="text-center py-3 px-4">Écart (jours)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jalonsProjetData.map((jalon, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="py-3 px-4">{jalon.jalon}</td>
                          <td className="text-center py-3 px-4">{jalon.planifie}</td>
                          <td className="text-center py-3 px-4">{jalon.reel}</td>
                          <td className="text-center py-3 px-4">
                            <div className="flex items-center justify-center">
                              {jalon.statut === "Retard" ? (
                                <span className="flex items-center text-red-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  Retard
                                </span>
                              ) : (
                                <span className="flex items-center text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Avance
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="text-center py-3 px-4">
                            <span
                              className={
                                jalon.ecart > 0 ? "text-red-600" : jalon.ecart < 0 ? "text-green-600" : "text-gray-600"
                              }
                            >
                              {jalon.ecart > 0 ? "+" + jalon.ecart : jalon.ecart}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Indicateurs de performance liés aux délais</CardTitle>
                <CardDescription>Comparaison avec les objectifs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performanceDelaisData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.indicateur}</span>
                        <div className="flex items-center text-sm">
                          <Badge
                            className={
                              item.ecart.startsWith("-") && item.indicateur !== "Temps d'attente entre phases (heures)"
                                ? "bg-green-100 text-green-800"
                                : item.ecart.startsWith("+") &&
                                    item.indicateur !== "Temps d'attente entre phases (heures)"
                                  ? "bg-amber-100 text-amber-800"
                                  : item.ecart.startsWith("+") &&
                                      item.indicateur === "Temps d'attente entre phases (heures)"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                            }
                          >
                            {item.valeur}
                          </Badge>
                          <span
                            className={`ml-2 ${
                              item.ecart.startsWith("-") && item.indicateur !== "Temps d'attente entre phases (heures)"
                                ? "text-green-600"
                                : item.ecart.startsWith("+") &&
                                    item.indicateur !== "Temps d'attente entre phases (heures)"
                                  ? "text-amber-600"
                                  : item.ecart.startsWith("+") &&
                                      item.indicateur === "Temps d'attente entre phases (heures)"
                                    ? "text-red-600"
                                    : "text-green-600"
                            }`}
                          >
                            {item.ecart}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            item.ecart.startsWith("-") && item.indicateur !== "Temps d'attente entre phases (heures)"
                              ? "bg-green-600"
                              : item.ecart.startsWith("+") &&
                                  item.indicateur !== "Temps d'attente entre phases (heures)"
                                ? "bg-amber-500"
                                : item.ecart.startsWith("+") &&
                                    item.indicateur === "Temps d'attente entre phases (heures)"
                                  ? "bg-red-600"
                                  : "bg-green-600"
                          }`}
                          style={{
                            width: `${
                              item.indicateur === "Temps d'attente entre phases (heures)" ||
                              item.indicateur === "Délai de mobilisation (jours)" ||
                              item.indicateur === "Temps de réponse aux incidents (heures)"
                                ? (item.objectif / item.valeur) * 100
                                : (item.valeur / item.objectif) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Objectif: {item.objectif}</span>
                        <span>Écart: {item.ecart}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="efficacite">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Efficacité opérationnelle par champ</CardTitle>
                <CardDescription>Performance par rapport aux objectifs (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    efficacite: {
                      label: "Efficacité (%)",
                      color: "hsl(30, 100%, 56%)",
                    },
                    objectif: {
                      label: "Objectif (%)",
                      color: "hsl(210, 100%, 56%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={efficaciteData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="champ" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="efficacite" fill="#ED8D31" />
                      <Bar dataKey="objectif" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicateurs d'efficacité clés</CardTitle>
                <CardDescription>Performance des indicateurs critiques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Taux de disponibilité des équipements</span>
                      <Badge className="bg-green-100 text-green-800">94.2%</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "94.2%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Objectif: 95%</span>
                      <span>Écart: -0.8%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Temps moyen entre pannes (jours)</span>
                      <Badge className="bg-green-100 text-green-800">42 jours</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "110%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Objectif: 38 jours</span>
                      <span>Écart: +4 jours</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Taux de récupération</span>
                      <Badge className="bg-amber-100 text-amber-800">36.5%</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ width: "96%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Objectif: 38%</span>
                      <span>Écart: -1.5%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Conformité réglementaire</span>
                      <Badge className="bg-green-100 text-green-800">98.5%</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "103.7%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Objectif: 95%</span>
                      <span>Écart: +3.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forage">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Taux de succès des forages</CardTitle>
                <CardDescription>Évolution mensuelle des résultats de forage (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    reussite: {
                      label: "Réussite (%)",
                      color: "hsl(150, 100%, 40%)",
                    },
                    echec: {
                      label: "Échec (%)",
                      color: "hsl(0, 100%, 60%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area type="monotone" dataKey="reussite" stackId="1" stroke="#00C49F" fill="#00C49F" />
                      <Area type="monotone" dataKey="echec" stackId="1" stroke="#FF5252" fill="#FF5252" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance des équipes de forage</CardTitle>
                <CardDescription>Évaluation comparative des équipes (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="20%"
                      outerRadius="80%"
                      barSize={20}
                      data={performanceEquipeData}
                    >
                      <RadialBar
                        minAngle={15}
                        label={{ position: "insideStart", fill: "#fff" }}
                        background
                        clockWise
                        dataKey="performance"
                      />
                      <Legend
                        iconSize={10}
                        layout="vertical"
                        verticalAlign="middle"
                        wrapperStyle={{
                          top: "50%",
                          right: 0,
                          transform: "translate(0, -50%)",
                          lineHeight: "24px",
                        }}
                      />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

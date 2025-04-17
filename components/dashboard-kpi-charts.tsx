"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
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
} from "recharts"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

// Données simulées pour les graphiques
const productionData = [
  { date: "01/07", petrole: 1580, gaz: 2450 },
  { date: "02/07", petrole: 1620, gaz: 2480 },
  { date: "03/07", petrole: 1590, gaz: 2520 },
  { date: "04/07", petrole: 1650, gaz: 2490 },
  { date: "05/07", petrole: 1680, gaz: 2510 },
  { date: "06/07", petrole: 1710, gaz: 2550 },
  { date: "07/07", petrole: 1740, gaz: 2580 },
]

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

const coutData = [
  { name: "Équipement", value: 42 },
  { name: "Personnel", value: 28 },
  { name: "Services", value: 15 },
  { name: "Logistique", value: 10 },
  { name: "Autres", value: 5 },
]

const incidentsData = [
  { mois: "Jan", hse: 5, technique: 8, logistique: 3 },
  { mois: "Fév", hse: 4, technique: 7, logistique: 2 },
  { mois: "Mar", hse: 3, technique: 6, logistique: 4 },
  { mois: "Avr", hse: 2, technique: 5, logistique: 3 },
  { mois: "Mai", hse: 3, technique: 4, logistique: 2 },
  { mois: "Juin", hse: 2, technique: 3, logistique: 1 },
  { mois: "Juil", hse: 1, technique: 2, logistique: 1 },
]

const performanceEquipeData = [
  { name: "Équipe A", performance: 92, fill: "#FF8042" },
  { name: "Équipe B", performance: 88, fill: "#FFBB28" },
  { name: "Équipe C", performance: 95, fill: "#00C49F" },
  { name: "Équipe D", performance: 90, fill: "#0088FE" },
  { name: "Équipe E", performance: 87, fill: "#8884d8" },
]

const COLORS = ["#ED8D31", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function DashboardKpiCharts() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="production" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="efficacite">Efficacité</TabsTrigger>
          <TabsTrigger value="forage">Forage</TabsTrigger>
          <TabsTrigger value="couts">Coûts</TabsTrigger>
          <TabsTrigger value="hse">HSE</TabsTrigger>
        </TabsList>

        <TabsContent value="production">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Production journalière</CardTitle>
                <CardDescription>Évolution sur les 7 derniers jours (kb/j et Mm³/j)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    petrole: {
                      label: "Pétrole (kb/j)",
                      color: "hsl(30, 100%, 56%)",
                    },
                    gaz: {
                      label: "Gaz (Mm³/j)",
                      color: "hsl(210, 100%, 56%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" orientation="left" domain={[1500, 1800]} />
                      <YAxis yAxisId="right" orientation="right" domain={[2400, 2600]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="petrole"
                        stroke="#ED8D31"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line yAxisId="right" type="monotone" dataKey="gaz" stroke="#0088FE" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendances de production</CardTitle>
                <CardDescription>Analyse comparative par rapport au mois précédent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Production pétrole</span>
                        <div className="flex items-center text-green-600 text-sm">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          <span>+3.2%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-[#ED8D31] rounded-full" style={{ width: "92%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>1580 kb/j</span>
                        <span>1740 kb/j</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Production gaz</span>
                        <div className="flex items-center text-green-600 text-sm">
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                          <span>+2.1%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-[#0088FE] rounded-full" style={{ width: "88%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>2450 Mm³/j</span>
                        <span>2580 Mm³/j</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-[#ED8D31]">+10.1%</div>
                      <div className="text-sm text-gray-500">Production totale vs objectif</div>
                    </div>
                    <div className="w-full h-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Pétrole", value: 65 },
                              { name: "Gaz", value: 35 },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill="#ED8D31" />
                            <Cell fill="#0088FE" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
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

        <TabsContent value="couts">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition des coûts opérationnels</CardTitle>
                <CardDescription>Ventilation par catégorie (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={coutData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {coutData.map((entry, index) => (
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
                <CardTitle>Évolution des coûts</CardTitle>
                <CardDescription>Tendance sur les 6 derniers mois (M DA)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Coût par baril ($/bbl)</span>
                      <div className="flex items-center text-green-600 text-sm">
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                        <span>-0.5</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mois précédent: 8.9</span>
                      <span>Actuel: 8.4</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Coût de forage (M DA/m)</span>
                      <div className="flex items-center text-red-600 text-sm">
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        <span>+0.2</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-red-600 rounded-full" style={{ width: "105%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mois précédent: 0.45</span>
                      <span>Actuel: 0.47</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Coûts logistiques (M DA)</span>
                      <div className="flex items-center text-green-600 text-sm">
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                        <span>-12.5</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mois précédent: 162.5</span>
                      <span>Actuel: 150.0</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Opportunités d'optimisation</span>
                      <Badge className="bg-[#ED8D31] text-white">195M DA</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Potentiel d'économies identifié dans les opérations de forage et la logistique
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hse">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incidents HSE</CardTitle>
                <CardDescription>Évolution mensuelle par type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    hse: {
                      label: "Incidents HSE",
                      color: "hsl(0, 100%, 60%)",
                    },
                    technique: {
                      label: "Incidents techniques",
                      color: "hsl(30, 100%, 56%)",
                    },
                    logistique: {
                      label: "Incidents logistiques",
                      color: "hsl(210, 100%, 56%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incidentsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="hse" stackId="a" fill="#FF5252" />
                      <Bar dataKey="technique" stackId="a" fill="#ED8D31" />
                      <Bar dataKey="logistique" stackId="a" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicateurs de sécurité</CardTitle>
                <CardDescription>Performance des indicateurs HSE clés</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Taux d'incidents (par million d'heures)</span>
                      <Badge className="bg-amber-100 text-amber-800">0.8</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ width: "160%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Objectif: 0.5</span>
                      <span>Écart: +0.3</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Jours sans accident</span>
                      <Badge className="bg-green-100 text-green-800">45 jours</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Objectif: 50 jours</span>
                      <span>Écart: -5 jours</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Conformité aux procédures HSE</span>
                      <Badge className="bg-green-100 text-green-800">97.5%</Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "97.5%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Objectif: 95%</span>
                      <span>Écart: +2.5%</span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Incidents à traiter</span>
                      <Badge className="bg-red-100 text-red-800">3 critiques</Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Perte de boue - HMD-42</span>
                        <span className="text-amber-600">En cours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dépassement budget - GLTZ-08</span>
                        <span className="text-amber-600">En cours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Problème de tubage - ILZ-05</span>
                        <span className="text-green-600">Résolu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

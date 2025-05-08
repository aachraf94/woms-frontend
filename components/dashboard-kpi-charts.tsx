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
import { ArrowUpIcon, ArrowDownIcon, ClockIcon, CheckCircleIcon, AlertTriangleIcon } from "lucide-react"

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

// Nouvelles données pour les coûts des opérations spécifiques
const coutOperationsData = [
  { name: "Forage", value: 45 },
  { name: "Diagraphie", value: 18 },
  { name: "Cimentation", value: 15 },
  { name: "Tests de puits", value: 12 },
  { name: "Maintenance", value: 10 },
]

// Données d'évolution des coûts par opération
const coutEvolutionData = [
  { mois: "Jan", forage: 450, diagraphie: 180, cimentation: 150, tests: 120, maintenance: 100 },
  { mois: "Fév", forage: 460, diagraphie: 175, cimentation: 155, tests: 125, maintenance: 95 },
  { mois: "Mar", forage: 455, diagraphie: 185, cimentation: 145, tests: 130, maintenance: 105 },
  { mois: "Avr", forage: 470, diagraphie: 190, cimentation: 160, tests: 125, maintenance: 110 },
  { mois: "Mai", forage: 465, diagraphie: 180, cimentation: 155, tests: 135, maintenance: 100 },
  { mois: "Juin", forage: 480, diagraphie: 195, cimentation: 165, tests: 140, maintenance: 115 },
]

const performanceEquipeData = [
  { name: "Équipe A", performance: 92, fill: "#FF8042" },
  { name: "Équipe B", performance: 88, fill: "#FFBB28" },
  { name: "Équipe C", performance: 95, fill: "#00C49F" },
  { name: "Équipe D", performance: 90, fill: "#0088FE" },
  { name: "Équipe E", performance: 87, fill: "#8884d8" },
]

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

// Nouvelles données pour les indicateurs de délais
const completionRateData = [
  { mois: "Jan", taux: 78 },
  { mois: "Fév", taux: 82 },
  { mois: "Mar", taux: 85 },
  { mois: "Avr", taux: 80 },
  { mois: "Mai", taux: 88 },
  { mois: "Juin", taux: 92 },
  { mois: "Juil", taux: 90 },
]

const projetsEnCoursData = [
  { nom: "HMD-42", avancement: 85, delaiPrevu: "15/07", statut: "Avance", retard: -2 },
  { nom: "RKZ-17", avancement: 65, delaiPrevu: "22/07", statut: "Retard", retard: 3 },
  { nom: "GLTZ-08", avancement: 42, delaiPrevu: "30/07", statut: "Retard", retard: 5 },
  { nom: "BRKN-11", avancement: 78, delaiPrevu: "18/07", statut: "Dans les temps", retard: 0 },
  { nom: "ILZ-05", avancement: 92, delaiPrevu: "12/07", statut: "Avance", retard: -1 },
]

// Données pour les coûts par mètre foré
const coutMetreData = [
  { projet: "HMD-42", cout: 4200, objectif: 4000 },
  { projet: "RKZ-17", cout: 4500, objectif: 4200 },
  { projet: "GLTZ-08", cout: 3900, objectif: 4100 },
  { projet: "BRKN-11", cout: 4300, objectif: 4200 },
  { projet: "ILZ-05", cout: 4100, objectif: 4000 },
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
                <CardTitle>Répartition des coûts par opération</CardTitle>
                <CardDescription>Ventilation des coûts opérationnels (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={coutOperationsData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {coutOperationsData.map((entry, index) => (
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
                <CardTitle>Évolution des coûts par opération</CardTitle>
                <CardDescription>Tendance sur les 6 derniers mois (M DA)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    forage: {
                      label: "Forage",
                      color: "hsl(30, 100%, 56%)",
                    },
                    diagraphie: {
                      label: "Diagraphie",
                      color: "hsl(210, 100%, 56%)",
                    },
                    cimentation: {
                      label: "Cimentation",
                      color: "hsl(150, 100%, 40%)",
                    },
                    tests: {
                      label: "Tests de puits",
                      color: "hsl(45, 100%, 56%)",
                    },
                    maintenance: {
                      label: "Maintenance",
                      color: "hsl(0, 100%, 60%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={coutEvolutionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="forage" stroke="var(--color-forage)" strokeWidth={2} />
                      <Line type="monotone" dataKey="diagraphie" stroke="var(--color-diagraphie)" />
                      <Line type="monotone" dataKey="cimentation" stroke="var(--color-cimentation)" />
                      <Line type="monotone" dataKey="tests" stroke="var(--color-tests)" />
                      <Line type="monotone" dataKey="maintenance" stroke="var(--color-maintenance)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Coût par mètre foré</CardTitle>
                <CardDescription>Comparaison avec les objectifs (DA/m)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    cout: {
                      label: "Coût réel (DA/m)",
                      color: "hsl(30, 100%, 56%)",
                    },
                    objectif: {
                      label: "Objectif (DA/m)",
                      color: "hsl(210, 100%, 56%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={coutMetreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="projet" />
                      <YAxis domain={[3500, 4600]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="cout" fill="var(--color-cout)" />
                      <Bar dataKey="objectif" fill="var(--color-objectif)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indicateurs de coûts par opération</CardTitle>
                <CardDescription>Variation par rapport au mois précédent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Forage (M DA/jour)</span>
                      <div className="flex items-center text-red-600 text-sm">
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        <span>+0.3</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-red-600 rounded-full" style={{ width: "103%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mois précédent: 9.7</span>
                      <span>Actuel: 10.0</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Diagraphie (M DA/opération)</span>
                      <div className="flex items-center text-green-600 text-sm">
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                        <span>-0.5</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mois précédent: 8.5</span>
                      <span>Actuel: 8.0</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Cimentation (M DA/opération)</span>
                      <div className="flex items-center text-amber-600 text-sm">
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        <span>+0.1</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-amber-500 rounded-full" style={{ width: "101%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mois précédent: 7.2</span>
                      <span>Actuel: 7.3</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Tests de puits (M DA/test)</span>
                      <div className="flex items-center text-green-600 text-sm">
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                        <span>-0.3</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: "96%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mois précédent: 6.8</span>
                      <span>Actuel: 6.5</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Maintenance pompes (M DA/intervention)</span>
                      <div className="flex items-center text-red-600 text-sm">
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                        <span>+0.4</span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-red-600 rounded-full" style={{ width: "108%" }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Mois précédent: 5.2</span>
                      <span>Actuel: 5.6</span>
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
                <CardTitle>Taux de projets terminés dans les délais</CardTitle>
                <CardDescription>Pourcentage mensuel des projets complétés à temps</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    taux: {
                      label: "Taux de complétion à temps (%)",
                      color: "hsl(30, 100%, 56%)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={completionRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mois" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="taux"
                        stroke="var(--color-taux)"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projets en cours</CardTitle>
                <CardDescription>Avancement et respect des délais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {projetsEnCoursData.map((projet, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">{projet.nom}</span>
                          <span className="text-xs text-gray-500 ml-2">Échéance: {projet.delaiPrevu}</span>
                        </div>
                        <Badge
                          className={
                            projet.statut === "Avance"
                              ? "bg-green-100 text-green-800"
                              : projet.statut === "Retard"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {projet.statut === "Avance" ? (
                            <>
                              <CheckCircleIcon className="h-3 w-3 mr-1" /> {Math.abs(projet.retard)} j d'avance
                            </>
                          ) : projet.statut === "Retard" ? (
                            <>
                              <AlertTriangleIcon className="h-3 w-3 mr-1" /> {projet.retard} j de retard
                            </>
                          ) : (
                            <>
                              <ClockIcon className="h-3 w-3 mr-1" /> Dans les temps
                            </>
                          )}
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
                      <Bar dataKey="efficacite" fill="var(--color-efficacite)" />
                      <Bar dataKey="objectif" fill="var(--color-objectif)" />
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
                      <Area
                        type="monotone"
                        dataKey="reussite"
                        stackId="1"
                        stroke="var(--color-reussite)"
                        fill="var(--color-reussite)"
                      />
                      <Area
                        type="monotone"
                        dataKey="echec"
                        stackId="1"
                        stroke="var(--color-echec)"
                        fill="var(--color-echec)"
                      />
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

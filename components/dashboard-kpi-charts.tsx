"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Données pour les graphiques
const delayData = [
  { mois: "Jan", planifie: 45, reel: 48 },
  { mois: "Fév", planifie: 52, reel: 51 },
  { mois: "Mar", planifie: 49, reel: 52 },
  { mois: "Avr", planifie: 47, reel: 45 },
  { mois: "Mai", planifie: 53, reel: 56 },
  { mois: "Juin", planifie: 50, reel: 48 },
]

const costData = [
  { mois: "Jan", budget: 1200000, reel: 1250000 },
  { mois: "Fév", budget: 980000, reel: 960000 },
  { mois: "Mar", budget: 1100000, reel: 1180000 },
  { mois: "Avr", budget: 1300000, reel: 1250000 },
  { mois: "Mai", budget: 1150000, reel: 1140000 },
  { mois: "Juin", budget: 1250000, reel: 1290000 },
]

const efficiencyData = [
  { mois: "Jan", valeur: 78 },
  { mois: "Fév", valeur: 82 },
  { mois: "Mar", valeur: 85 },
  { mois: "Avr", valeur: 79 },
  { mois: "Mai", valeur: 88 },
  { mois: "Juin", valeur: 91 },
]

const drillingData = [
  { mois: "Jan", metrage: 450 },
  { mois: "Fév", metrage: 520 },
  { mois: "Mar", metrage: 480 },
  { mois: "Avr", metrage: 510 },
  { mois: "Mai", metrage: 540 },
  { mois: "Juin", metrage: 570 },
]

const projectsInProgress = [
  { id: 1, name: "HMD-42", progress: 75, status: "En avance", leadLag: "+3 jours" },
  { id: 2, name: "RKZ-17", progress: 45, status: "Dans les délais", leadLag: "0 jour" },
  { id: 3, name: "GLTZ-08", progress: 30, status: "En retard", leadLag: "-5 jours" },
  { id: 4, name: "HBK-23", progress: 60, status: "Dans les délais", leadLag: "+1 jour" },
]

export default function DashboardKpiCharts() {
  const [activeTab, setActiveTab] = useState("couts")

  return (
    <Tabs defaultValue="couts" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="couts">Coûts</TabsTrigger>
        <TabsTrigger value="delais">Délais</TabsTrigger>
        <TabsTrigger value="efficacite">Efficacité</TabsTrigger>
        <TabsTrigger value="forage">Forage</TabsTrigger>
      </TabsList>

      {/* Onglet Coûts */}
      <TabsContent value="couts" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Budget vs Réel</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                    <Bar dataKey="reel" fill="#ED8D31" name="Réel" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Coût par mètre foré</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={costData.map((item, index) => ({
                      mois: item.mois,
                      cout: Math.round(item.reel / drillingData[index].metrage),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cout" stroke="#ED8D31" name="Coût/m" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Variance budgétaire</div>
              <div className="space-y-4">
                {costData.map((item, index) => {
                  const variance = ((item.reel - item.budget) / item.budget) * 100
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{item.mois}</span>
                        <span className={variance > 0 ? "text-red-500" : "text-green-500"}>
                          {variance > 0 ? "+" : ""}
                          {variance.toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={Math.abs(variance) * 5}
                        className={variance > 0 ? "bg-red-100" : "bg-green-100"}
                      />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Onglet Délais */}
      <TabsContent value="delais" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Délais planifiés vs réels</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={delayData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="planifie" fill="#8884d8" name="Planifié (jours)" />
                    <Bar dataKey="reel" fill="#ED8D31" name="Réel (jours)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Projets en cours</div>
              <div className="space-y-4">
                {projectsInProgress.map((project) => (
                  <div key={project.id} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{project.name}</span>
                      <span
                        className={
                          project.status === "En avance"
                            ? "text-green-500"
                            : project.status === "En retard"
                              ? "text-red-500"
                              : "text-blue-500"
                        }
                      >
                        {project.leadLag}
                      </span>
                    </div>
                    <Progress
                      value={project.progress}
                      className={
                        project.status === "En avance"
                          ? "bg-green-100"
                          : project.status === "En retard"
                            ? "bg-red-100"
                            : "bg-blue-100"
                      }
                    />
                    <div className="text-xs text-gray-500">
                      {project.progress}% - {project.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col justify-between h-full">
              <div className="text-xl font-bold mb-2">Délai moyen de réalisation</div>
              <div className="text-center py-4">
                <div className="text-5xl font-bold text-[#ED8D31]">47</div>
                <div className="text-sm text-gray-500 mt-2">jours par projet</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-sm font-medium">Tendance</div>
                <div className="flex items-center mt-1">
                  <span className="text-green-500 font-medium">-3.2%</span>
                  <span className="text-gray-500 ml-2">par rapport au trimestre précédent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Onglet Efficacité */}
      <TabsContent value="efficacite" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Efficacité opérationnelle</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="valeur" stroke="#ED8D31" name="Efficacité (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Temps productif vs non-productif</div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Temps productif</span>
                    <span>76%</span>
                  </div>
                  <Progress value={76} className="bg-green-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Temps d'attente</span>
                    <span>14%</span>
                  </div>
                  <Progress value={14} className="bg-amber-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Temps d'arrêt</span>
                    <span>10%</span>
                  </div>
                  <Progress value={10} className="bg-red-100" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Taux de réussite des opérations</div>
              <div className="space-y-4 mt-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Forage</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="bg-blue-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Complétion</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} className="bg-blue-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Tests</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="bg-blue-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Cimentation</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="bg-blue-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Onglet Forage */}
      <TabsContent value="forage" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Métrage foré par mois</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={drillingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="metrage" fill="#ED8D31" name="Mètres forés" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Vitesse moyenne de forage</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={drillingData.map((item, index) => ({
                      mois: item.mois,
                      vitesse: Math.round(item.metrage / delayData[index].reel),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="vitesse" stroke="#ED8D31" name="Mètres/jour" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-xl font-bold mb-2">Répartition par type de forage</div>
              <div className="space-y-4 mt-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Développement</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="bg-orange-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Exploration</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="bg-blue-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Délinéation</span>
                    <span>10%</span>
                  </div>
                  <Progress value={10} className="bg-green-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

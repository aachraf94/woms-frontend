"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import DashboardKpiCharts from "@/components/dashboard-kpi-charts"
import { LayoutDashboardIcon, BarChart3Icon, ArrowRightIcon } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
            <p className="text-gray-600">Bienvenue sur le système de gestion des opérations E&P d'Algérie</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            {[
              {
                title: "Puits Actifs",
                value: "24",
                change: "+2 cette semaine",
                icon: <LayoutDashboardIcon className="h-8 w-8 text-[#ED8D31] opacity-70" />,
              },
              {
                title: "Avancement Global",
                value: "72%",
                change: "Par rapport au planning",
                icon: <BarChart3Icon className="h-8 w-8 text-[#ED8D31] opacity-70" />,
              },
              {
                title: "Incidents",
                value: "3",
                change: "Intervention requise",
                icon: <BarChart3Icon className="h-8 w-8 text-[#ED8D31] opacity-70" />,
              },
            ].map((card, index) => (
              <Card key={index} className="overflow-hidden border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-500 mb-1">{card.title}</div>
                      <div className="text-3xl font-bold">{card.value}</div>
                      {card.change && (
                        <div className="mt-2 flex items-center text-sm text-[#ED8D31]">
                          <span>{card.change}</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">{card.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Nouveaux KPIs avec graphiques */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Indicateurs de performance clés</h2>
              <Button variant="outline" size="sm">
                Voir tous les rapports <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <DashboardKpiCharts />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Puits récents</h2>
                <div className="space-y-4">
                  {[
                    {
                      name: "HMD-42",
                      location: "Hassi Messaoud",
                      type: "Développement",
                      phase: 'Phase 12¼"',
                      status: "En cours",
                    },
                    {
                      name: "RKZ-17",
                      location: "Rhourde El Khrouf",
                      type: "Exploration",
                      phase: 'Phase 16"',
                      status: "En cours",
                    },
                    {
                      name: "GLTZ-08",
                      location: "Guellala",
                      type: "Délinéation",
                      phase: 'Phase 26"',
                      status: "En retard",
                    },
                    {
                      name: "HBK-23",
                      location: "Hassi Berkine",
                      type: "Développement",
                      phase: "Terminé",
                      status: "Complété",
                    },
                  ].map((well, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                    >
                      <div>
                        <div className="font-medium">
                          {well.name} ({well.location})
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {well.type} - {well.phase}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          well.status === "En cours"
                            ? "bg-orange-100 text-orange-800"
                            : well.status === "En retard"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {well.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Activités à venir</h2>
                <div className="space-y-4">
                  {[
                    { activity: "Logging - HMD-42", date: "12/07/2025", team: "Équipe Schlumberger" },
                    { activity: "Test de puits - RKZ-17", date: "15/07/2025", team: "Équipe Weatherford" },
                    { activity: "Cimentation - GLTZ-08", date: "18/07/2025", team: "Équipe Halliburton" },
                    { activity: "Démarrage forage - ILZ-05", date: "22/07/2025", team: "Bloc Illizi" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                    >
                      <div>
                        <div className="font-medium">{activity.activity}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {activity.date} - {activity.team}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-sm text-gray-500 hover:text-gray-700">
                        Détails
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

import Link from "next/link"
import {
  LayoutDashboardIcon,
  PiIcon as PipeIcon,
  ClipboardListIcon,
  BarChart3Icon,
  MapIcon,
  AlertTriangleIcon,
  UsersIcon,
  FileTextIcon,
  SettingsIcon,
  BellIcon,
  UserIcon,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="font-bold text-xl">SonatrackEP</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <BellIcon className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <UserIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-white border-r w-64 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
          <div className="py-4 px-2">
            <nav className="space-y-1">
              {[
                { title: "Tableau de bord", href: "/dashboard", icon: <LayoutDashboardIcon className="h-5 w-5" /> },
                { title: "Gestion des puits", href: "/wells", icon: <PipeIcon className="h-5 w-5" /> },
                {
                  title: "Opérations journalières",
                  href: "/operations",
                  icon: <ClipboardListIcon className="h-5 w-5" />,
                },
                { title: "Analyses & Reporting", href: "/reports", icon: <BarChart3Icon className="h-5 w-5" /> },
                { title: "Carte interactive", href: "/map", icon: <MapIcon className="h-5 w-5" /> },
                { title: "Alertes & Incidents", href: "/alerts", icon: <AlertTriangleIcon className="h-5 w-5" /> },
                { title: "Gestion d'équipe", href: "/users", icon: <UsersIcon className="h-5 w-5" /> },
                { title: "Documents & Rapports", href: "/documents", icon: <FileTextIcon className="h-5 w-5" /> },
                { title: "Paramètres", href: "/settings", icon: <SettingsIcon className="h-5 w-5" /> },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    item.href === "/dashboard"
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
            <p className="text-gray-600">Bienvenue sur le système de gestion des opérations E&P d'Algérie</p>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-6">
            {[
              { title: "Puits Actifs", value: "24", change: "+2 cette semaine" },
              { title: "Avancement Global", value: "72%", change: "" },
              { title: "Budget", value: "87.4M DA", change: "98% du prévu" },
              { title: "Incidents", value: "3", change: "Intervention requise" },
            ].map((card, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-500 mb-1">{card.title}</div>
                  <div className="text-3xl font-bold">{card.value}</div>
                  {card.change && (
                    <div className="mt-2 flex items-center text-sm text-orange-600">
                      <span>{card.change}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
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
                  <div key={index} className="flex items-center justify-between">
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
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Activités à venir</h2>
              <div className="space-y-4">
                {[
                  { activity: "Logging - HMD-42", date: "12/07/2025", team: "Équipe Schlumberger" },
                  { activity: "Test de puits - RKZ-17", date: "15/07/2025", team: "Équipe Weatherford" },
                  { activity: "Cimentation - GLTZ-08", date: "18/07/2025", team: "Équipe Halliburton" },
                  { activity: "Démarrage forage - ILZ-05", date: "22/07/2025", team: "Bloc Illizi" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{activity.activity}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {activity.date} - {activity.team}
                      </div>
                    </div>
                    <button className="text-sm text-gray-500 hover:text-gray-700">Détails</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

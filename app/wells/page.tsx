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
  PlusIcon,
  SearchIcon,
  FilterIcon,
} from "lucide-react"

export default function WellsPage() {
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
                    item.href === "/wells"
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Gestion des Puits</h1>
              <p className="text-gray-600">Gestion et suivi des puits sur l'ensemble du territoire algérien</p>
            </div>
            <Link href="/wells/create">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md flex items-center">
                <PlusIcon className="mr-2 h-4 w-4" />
                Nouveau Puits
              </button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  placeholder="Rechercher par nom ou ID..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex space-x-2">
                <button className="flex-grow flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filtres
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Puits en cours d'opération</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom du Puits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Localisation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phase
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      name: "HMD-42",
                      location: "Hassi Messaoud",
                      type: "Développement",
                      phase: '12¼"',
                      progress: 65,
                      status: "En cours",
                    },
                    {
                      name: "RKZ-17",
                      location: "Rhourde El Khrouf",
                      type: "Exploration",
                      phase: '16"',
                      progress: 45,
                      status: "En cours",
                    },
                    {
                      name: "GLTZ-08",
                      location: "Guellala",
                      type: "Délinéation",
                      phase: '26"',
                      progress: 25,
                      status: "En retard",
                    },
                    {
                      name: "BRKN-11",
                      location: "Berkine",
                      type: "Développement",
                      phase: '8½"',
                      progress: 85,
                      status: "En cours",
                    },
                  ].map((well, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{well.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{well.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{well.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{well.phase}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            well.status === "En cours" ? "bg-orange-100 text-orange-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {well.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-x-2">
                          <button className="text-gray-600 hover:text-gray-900">Voir</button>
                          <button className="text-gray-600 hover:text-gray-900">Éditer</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

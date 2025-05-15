"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import ProjectsMap from "@/components/projects-map"
import {
  PlusIcon,
  SearchIcon,
  ListIcon,
  GridIcon,
  LayoutIcon,
  ArrowUpRightIcon,
  MoreHorizontalIcon,
  CalendarIcon,
  UsersIcon,
  ClockIcon,
  MapPinIcon,
  BarChart3Icon,
  FileTextIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ChevronRightIcon,
  StarIcon,
  BookmarkIcon,
  DownloadIcon,
  ShareIcon,
  PencilIcon,
  MapIcon,
  AlertTriangleIcon,
  DollarSignIcon,
  TimerIcon,
} from "lucide-react"

// Données simulées pour les projets avec les nouvelles spécifications
const projects = [
  {
    id: "PRJ001",
    name: "Forage HMD-42",
    status: "En cours",
    progress: 65,
    startDate: "15/01/2025",
    endDate: "30/09/2025",
    budget: "45,000,000 DZD",
    location: "Hassi Messaoud",
    manager: "Ahmed Benali",
    managerAvatar: "/abstract-geometric-ab.png",
    team: 12,
    priority: "Élevée",
    description:
      "Forage d'exploration dans la zone nord du champ de Hassi Messaoud avec l'installation d'un nouveau puits.",
    lastUpdate: "14/05/2025",
    tasks: { completed: 28, total: 45 },
    risks: 3,
    documents: 17,
    category: "Exploration-Wildcat",
    phase: "Exécution",
    currentPhase: '12¼"',
    phaseDepth: "1250m",
    costStatus: "warning", // warning, success, danger
    costVariance: "+8.5%",
    delayStatus: "success", // warning, success, danger
    delayVariance: "-2 jours",
    phaseCost: "12,500,000 DZD",
    phaseDelay: "18 jours",
  },
  {
    id: "PRJ002",
    name: "Forage REB-15",
    status: "En cours",
    progress: 42,
    startDate: "03/03/2025",
    endDate: "15/12/2025",
    budget: "32,500,000 DZD",
    location: "Rhourde El Baguel",
    manager: "Meriem Hadj",
    managerAvatar: "/stylized-mh.png",
    team: 8,
    priority: "Moyenne",
    description: "Forage de délinéation pour confirmer l'extension du réservoir dans la zone est de Rhourde El Baguel.",
    lastUpdate: "12/05/2025",
    tasks: { completed: 19, total: 38 },
    risks: 2,
    documents: 23,
    category: "Exploration-Délinéation",
    phase: "Exécution",
    currentPhase: '17½"',
    phaseDepth: "850m",
    costStatus: "danger", // warning, success, danger
    costVariance: "+15.2%",
    delayStatus: "danger", // warning, success, danger
    delayVariance: "+8 jours",
    phaseCost: "8,200,000 DZD",
    phaseDelay: "12 jours",
  },
  {
    id: "PRJ003",
    name: "Forage BRK-08",
    status: "Planifié",
    progress: 0,
    startDate: "01/06/2025",
    endDate: "30/08/2025",
    budget: "18,750,000 DZD",
    location: "Berkine",
    manager: "Karim Boudiaf",
    managerAvatar: "/keyboard-close-up.png",
    team: 6,
    priority: "Moyenne",
    description: "Forage d'exploration pour identifier de nouvelles réserves potentielles dans le bassin de Berkine.",
    lastUpdate: "10/05/2025",
    tasks: { completed: 0, total: 24 },
    risks: 1,
    documents: 8,
    category: "Exploration-Wildcat",
    phase: "Planification",
    currentPhase: "Préparation",
    phaseDepth: "0m",
    costStatus: "success", // warning, success, danger
    costVariance: "0%",
    delayStatus: "success", // warning, success, danger
    delayVariance: "0 jours",
    phaseCost: "2,500,000 DZD",
    phaseDelay: "15 jours",
  },
  {
    id: "PRJ004",
    name: "Forage TFT-22",
    status: "En cours",
    progress: 78,
    startDate: "10/12/2024",
    endDate: "20/06/2025",
    budget: "27,300,000 DZD",
    location: "Tin Fouye Tabankort",
    manager: "Yasmine Alloui",
    managerAvatar: "/abstract-ya.png",
    team: 10,
    priority: "Élevée",
    description: "Forage de délinéation pour confirmer les réserves de gaz naturel dans la zone nord de TFT.",
    lastUpdate: "15/05/2025",
    tasks: { completed: 34, total: 42 },
    risks: 2,
    documents: 29,
    category: "Délinéation",
    phase: "Exécution",
    currentPhase: '8½"',
    phaseDepth: "2850m",
    costStatus: "success", // warning, success, danger
    costVariance: "-3.5%",
    delayStatus: "success", // warning, success, danger
    delayVariance: "-5 jours",
    phaseCost: "9,800,000 DZD",
    phaseDelay: "22 jours",
  },
  {
    id: "PRJ005",
    name: "Forage ILZ-04",
    status: "Terminé",
    progress: 100,
    startDate: "05/02/2025",
    endDate: "25/04/2025",
    budget: "12,800,000 DZD",
    location: "Illizi",
    manager: "Omar Fekkar",
    managerAvatar: "/abstract-intertwined-forms.png",
    team: 7,
    priority: "Haute",
    description: "Forage de délinéation pour confirmer les limites du réservoir dans la région d'Illizi.",
    lastUpdate: "25/04/2025",
    tasks: { completed: 31, total: 31 },
    risks: 0,
    documents: 15,
    category: "Délinéation",
    phase: "Clôture",
    currentPhase: "Complété",
    phaseDepth: "3200m",
    costStatus: "warning", // warning, success, danger
    costVariance: "+5.8%",
    delayStatus: "success", // warning, success, danger
    delayVariance: "+1 jour",
    phaseCost: "12,800,000 DZD",
    phaseDelay: "45 jours",
  },
  {
    id: "PRJ006",
    name: "Forage HRM-12",
    status: "En cours",
    progress: 35,
    startDate: "20/03/2025",
    endDate: "10/07/2025",
    budget: "8,500,000 DZD",
    location: "Hassi R'Mel",
    manager: "Salima Khelil",
    managerAvatar: "/abstract-geometric-sk.png",
    team: 5,
    priority: "Moyenne",
    description: "Forage d'exploration pour évaluer le potentiel gazier dans une nouvelle zone de Hassi R'Mel.",
    lastUpdate: "13/05/2025",
    tasks: { completed: 12, total: 28 },
    risks: 1,
    documents: 20,
    category: "Exploration-Wildcat",
    phase: "Exécution",
    currentPhase: '17½"',
    phaseDepth: "780m",
    costStatus: "success", // warning, success, danger
    costVariance: "-1.2%",
    delayStatus: "warning", // warning, success, danger
    delayVariance: "+3 jours",
    phaseCost: "3,200,000 DZD",
    phaseDelay: "10 jours",
  },
  {
    id: "PRJ007",
    name: "Forage SKD-05",
    status: "Planifié",
    progress: 0,
    startDate: "15/07/2025",
    endDate: "30/01/2026",
    budget: "38,200,000 DZD",
    location: "Skikda",
    manager: "Farid Bensalem",
    managerAvatar: "/abstract-fb-design.png",
    team: 9,
    priority: "Élevée",
    description: "Forage d'exploration pour évaluer le potentiel offshore dans la région de Skikda.",
    lastUpdate: "08/05/2025",
    tasks: { completed: 0, total: 36 },
    risks: 4,
    documents: 12,
    category: "Exploration-Wildcat",
    phase: "Planification",
    currentPhase: "Préparation",
    phaseDepth: "0m",
    costStatus: "success", // warning, success, danger
    costVariance: "0%",
    delayStatus: "success", // warning, success, danger
    delayVariance: "0 jours",
    phaseCost: "3,500,000 DZD",
    phaseDelay: "20 jours",
  },
  {
    id: "PRJ008",
    name: "Forage ARZ-10",
    status: "En cours",
    progress: 22,
    startDate: "01/04/2025",
    endDate: "15/10/2025",
    budget: "15,600,000 DZD",
    location: "Arzew",
    manager: "Ahmed Benali",
    managerAvatar: "/abstract-geometric-ab.png",
    team: 6,
    priority: "Moyenne",
    description: "Forage de délinéation pour confirmer l'extension du réservoir dans la zone ouest d'Arzew.",
    lastUpdate: "11/05/2025",
    tasks: { completed: 8, total: 32 },
    risks: 2,
    documents: 14,
    category: "Exploration-Délinéation",
    phase: "Exécution",
    currentPhase: '26"',
    phaseDepth: "320m",
    costStatus: "warning", // warning, success, danger
    costVariance: "+4.8%",
    delayStatus: "danger", // warning, success, danger
    delayVariance: "+6 jours",
    phaseCost: "4,200,000 DZD",
    phaseDelay: "8 jours",
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid" | "card" | "map">("list")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")

  // Filtrer les projets en fonction des critères de recherche et de filtrage
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || project.status.toLowerCase() === selectedStatus.toLowerCase()
    const matchesCategory =
      selectedCategory === "all" || project.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesPriority =
      selectedPriority === "all" || project.priority.toLowerCase() === selectedPriority.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority
  })

  // Obtenir les catégories uniques pour le filtre
  const uniqueCategories = ["Exploration-Wildcat", "Exploration-Délinéation", "Délinéation"]

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Gestion des Projets de Forage</h1>
              <p className="text-gray-600">Suivi et gestion des projets d'exploration et de délinéation</p>
            </div>
            <Button className="bg-[#ED8D31] hover:bg-orange-700">
              <PlusIcon className="mr-2 h-4 w-4" />
              Nouveau projet
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="md:col-span-2 relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Rechercher un projet..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="en cours">En cours</SelectItem>
                      <SelectItem value="planifié">Planifié</SelectItem>
                      <SelectItem value="terminé">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      {uniqueCategories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les priorités</SelectItem>
                      <SelectItem value="élevée">Élevée</SelectItem>
                      <SelectItem value="moyenne">Moyenne</SelectItem>
                      <SelectItem value="basse">Basse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  {filteredProjects.length} projet{filteredProjects.length !== 1 ? "s" : ""} trouvé
                  {filteredProjects.length !== 1 ? "s" : ""}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-[#ED8D31] hover:bg-orange-700" : ""}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-[#ED8D31] hover:bg-orange-700" : ""}
                  >
                    <GridIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "card" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("card")}
                    className={viewMode === "card" ? "bg-[#ED8D31] hover:bg-orange-700" : ""}
                  >
                    <LayoutIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("map")}
                    className={viewMode === "map" ? "bg-[#ED8D31] hover:bg-orange-700" : ""}
                  >
                    <MapIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {viewMode === "list" && (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Projet</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Phase Actuelle</TableHead>
                      <TableHead>Progression</TableHead>
                      <TableHead>Coûts</TableHead>
                      <TableHead>Délais</TableHead>
                      <TableHead>Responsable</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.name}</div>
                            <div className="text-sm text-gray-500">{project.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gray-100 text-gray-800">{project.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{project.currentPhase}</div>
                          <div className="text-sm text-gray-500">Profondeur: {project.phaseDepth}</div>
                        </TableCell>
                        <TableCell>
                          <div className="w-full">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{project.progress}%</span>
                              <span>
                                {project.tasks.completed}/{project.tasks.total} tâches
                              </span>
                            </div>
                            <Progress
                              value={project.progress}
                              className={
                                project.progress < 30
                                  ? "text-red-600"
                                  : project.progress < 70
                                    ? "text-amber-600"
                                    : "text-green-600"
                              }
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {project.costStatus === "danger" ? (
                              <AlertCircleIcon className="h-4 w-4 text-red-500 mr-2" />
                            ) : project.costStatus === "warning" ? (
                              <AlertTriangleIcon className="h-4 w-4 text-amber-500 mr-2" />
                            ) : (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                            )}
                            <div>
                              <div className="font-medium">{project.phaseCost}</div>
                              <div
                                className={`text-xs ${
                                  project.costStatus === "danger"
                                    ? "text-red-500"
                                    : project.costStatus === "warning"
                                      ? "text-amber-500"
                                      : "text-green-500"
                                }`}
                              >
                                {project.costVariance}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {project.delayStatus === "danger" ? (
                              <AlertCircleIcon className="h-4 w-4 text-red-500 mr-2" />
                            ) : project.delayStatus === "warning" ? (
                              <AlertTriangleIcon className="h-4 w-4 text-amber-500 mr-2" />
                            ) : (
                              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                            )}
                            <div>
                              <div className="font-medium">{project.phaseDelay}</div>
                              <div
                                className={`text-xs ${
                                  project.delayStatus === "danger"
                                    ? "text-red-500"
                                    : project.delayStatus === "warning"
                                      ? "text-amber-500"
                                      : "text-green-500"
                                }`}
                              >
                                {project.delayVariance}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={project.managerAvatar || "/placeholder.svg"} alt={project.manager} />
                              <AvatarFallback>{project.manager.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{project.manager}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <ArrowUpRightIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge
                        className={
                          project.status === "En cours"
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "Terminé"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                        }
                      >
                        {project.status}
                      </Badge>
                      <Badge className="bg-gray-100 text-gray-800">{project.category}</Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{project.progress}% complété</span>
                          <span>
                            {project.tasks.completed}/{project.tasks.total}
                          </span>
                        </div>
                        <Progress
                          value={project.progress}
                          className={
                            project.progress < 30
                              ? "text-red-600"
                              : project.progress < 70
                                ? "text-amber-600"
                                : "text-green-600"
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{project.startDate}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium mb-1">Phase Actuelle</div>
                          <div className="flex items-center">
                            <Badge className="bg-blue-100 text-blue-800">{project.currentPhase}</Badge>
                            <span className="text-xs ml-2">{project.phaseDepth}</span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-sm font-medium mb-1">Responsable</div>
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={project.managerAvatar || "/placeholder.svg"} alt={project.manager} />
                              <AvatarFallback>{project.manager.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">{project.manager}</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <DollarSignIcon
                            className={`h-5 w-5 mr-2 ${
                              project.costStatus === "danger"
                                ? "text-red-500"
                                : project.costStatus === "warning"
                                  ? "text-amber-500"
                                  : "text-green-500"
                            }`}
                          />
                          <div>
                            <div className="text-sm font-medium">Coûts</div>
                            <div className="text-xs">
                              {project.phaseCost} ({project.costVariance})
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <TimerIcon
                            className={`h-5 w-5 mr-2 ${
                              project.delayStatus === "danger"
                                ? "text-red-500"
                                : project.delayStatus === "warning"
                                  ? "text-amber-500"
                                  : "text-green-500"
                            }`}
                          />
                          <div>
                            <div className="text-sm font-medium">Délais</div>
                            <div className="text-xs">
                              {project.phaseDelay} ({project.delayVariance})
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-gray-50 py-2">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <FileTextIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <BarChart3Icon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <UsersIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      Détails
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {viewMode === "card" && (
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-3/4 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{project.name}</h3>
                          <div className="flex items-center mt-1">
                            <Badge className="mr-2 bg-gray-100 text-gray-800">{project.id}</Badge>
                            <Badge
                              className={
                                project.status === "En cours"
                                  ? "bg-blue-100 text-blue-800 mr-2"
                                  : project.status === "Terminé"
                                    ? "bg-green-100 text-green-800 mr-2"
                                    : "bg-amber-100 text-amber-800 mr-2"
                              }
                            >
                              {project.status}
                            </Badge>
                            <Badge className="bg-gray-100 text-gray-800">{project.category}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <StarIcon className="h-4 w-4 text-gray-400" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <BookmarkIcon className="h-4 w-4 text-gray-400" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{project.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Phase Actuelle</div>
                          <div className="font-medium">{project.currentPhase}</div>
                          <div className="text-xs text-gray-500">Profondeur: {project.phaseDepth}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Localisation</div>
                          <div className="font-medium">{project.location}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Budget Total</div>
                          <div className="font-medium">{project.budget}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Priorité</div>
                          <div className="font-medium">{project.priority}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Début</div>
                            <div className="font-medium">{project.startDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Fin</div>
                            <div className="font-medium">{project.endDate}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Dernière mise à jour</div>
                            <div className="font-medium">{project.lastUpdate}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={project.managerAvatar || "/placeholder.svg"} alt={project.manager} />
                            <AvatarFallback>{project.manager.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{project.manager}</div>
                            <div className="text-xs text-gray-500">Chef de projet</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <UsersIcon className="h-5 w-5 mr-2 text-gray-400" />
                          <div>
                            <div className="font-medium">{project.team} membres</div>
                            <div className="text-xs text-gray-500">Équipe du projet</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/4 bg-gray-50 p-6 flex flex-col justify-between">
                      <div>
                        <div className="mb-4">
                          <div className="text-sm font-medium mb-2">Progression</div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-2xl font-bold">{project.progress}%</span>
                            <span className="text-sm text-gray-500">
                              {project.tasks.completed}/{project.tasks.total} tâches
                            </span>
                          </div>
                          <Progress
                            value={project.progress}
                            className={
                              project.progress < 30
                                ? "text-red-600"
                                : project.progress < 70
                                  ? "text-amber-600"
                                  : "text-green-600"
                            }
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="p-3 rounded-lg bg-white shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <DollarSignIcon
                                  className={`h-5 w-5 mr-2 ${
                                    project.costStatus === "danger"
                                      ? "text-red-500"
                                      : project.costStatus === "warning"
                                        ? "text-amber-500"
                                        : "text-green-500"
                                  }`}
                                />
                                <span className="font-medium">Coûts</span>
                              </div>
                              <Badge
                                className={
                                  project.costStatus === "danger"
                                    ? "bg-red-100 text-red-800"
                                    : project.costStatus === "warning"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {project.costVariance}
                              </Badge>
                            </div>
                            <div className="text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Phase actuelle:</span>
                                <span className="font-medium">{project.phaseCost}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-white shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <TimerIcon
                                  className={`h-5 w-5 mr-2 ${
                                    project.delayStatus === "danger"
                                      ? "text-red-500"
                                      : project.delayStatus === "warning"
                                        ? "text-amber-500"
                                        : "text-green-500"
                                  }`}
                                />
                                <span className="font-medium">Délais</span>
                              </div>
                              <Badge
                                className={
                                  project.delayStatus === "danger"
                                    ? "bg-red-100 text-red-800"
                                    : project.delayStatus === "warning"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {project.delayVariance}
                              </Badge>
                            </div>
                            <div className="text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Phase actuelle:</span>
                                <span className="font-medium">{project.phaseDelay}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <Button className="w-full bg-[#ED8D31] hover:bg-orange-700">
                          <ArrowUpRightIcon className="mr-2 h-4 w-4" />
                          Voir le projet
                        </Button>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="icon">
                            <ShareIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {viewMode === "map" && (
            <Card>
              <CardContent className="p-4">
                <ProjectsMap projects={filteredProjects} />
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

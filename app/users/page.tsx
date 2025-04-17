"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import {
  UsersIcon,
  SearchIcon,
  FilterIcon,
  UserPlusIcon,
  CalendarIcon,
  ClipboardListIcon,
  UserIcon,
  BriefcaseIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  EyeIcon,
  EditIcon,
  DownloadIcon,
  RefreshCwIcon,
  ClockIcon,
} from "lucide-react"

// Données simulées pour les équipes
const teams = [
  {
    id: "team-a",
    name: "Équipe A",
    leader: "Karim Benali",
    members: 8,
    specialization: "Forage",
    currentProject: "HMD-42",
    status: "En mission",
    performance: 92,
  },
  {
    id: "team-b",
    name: "Équipe B",
    leader: "Meriem Boudiaf",
    members: 6,
    specialization: "Complétion",
    currentProject: "RKZ-17",
    status: "En mission",
    performance: 88,
  },
  {
    id: "team-c",
    name: "Équipe C",
    leader: "Ahmed Khelil",
    members: 7,
    specialization: "Logging",
    currentProject: "GLTZ-08",
    status: "En mission",
    performance: 95,
  },
  {
    id: "team-d",
    name: "Équipe D",
    leader: "Yasmine Alloui",
    members: 5,
    specialization: "Cimentation",
    currentProject: "BRKN-11",
    status: "En mission",
    performance: 90,
  },
  {
    id: "team-e",
    name: "Équipe E",
    leader: "Omar Fekkar",
    members: 6,
    specialization: "Test de puits",
    currentProject: "Aucun",
    status: "Disponible",
    performance: 87,
  },
  {
    id: "team-f",
    name: "Équipe F",
    leader: "Salim Hadj",
    members: 8,
    specialization: "Forage",
    currentProject: "Aucun",
    status: "En formation",
    performance: 82,
  },
]

// Données simulées pour les membres d'équipe
const teamMembers = [
  {
    id: "emp-001",
    name: "Karim Benali",
    role: "Chef d'équipe",
    team: "Équipe A",
    specialization: "Ingénieur forage",
    experience: "15 ans",
    status: "En mission",
    location: "Hassi Messaoud",
    email: "k.benali@sonatrach.dz",
    phone: "+213 555 123 456",
    avatar: "/avatars/karim.jpg",
  },
  {
    id: "emp-002",
    name: "Meriem Boudiaf",
    role: "Chef d'équipe",
    team: "Équipe B",
    specialization: "Ingénieur complétion",
    experience: "12 ans",
    status: "En mission",
    location: "Rhourde El Khrouf",
    email: "m.boudiaf@sonatrach.dz",
    phone: "+213 555 234 567",
    avatar: "/avatars/meriem.jpg",
  },
  {
    id: "emp-003",
    name: "Ahmed Khelil",
    role: "Chef d'équipe",
    team: "Équipe C",
    specialization: "Géologue",
    experience: "10 ans",
    status: "En mission",
    location: "Guellala",
    email: "a.khelil@sonatrach.dz",
    phone: "+213 555 345 678",
    avatar: "/avatars/ahmed.jpg",
  },
  {
    id: "emp-004",
    name: "Yasmine Alloui",
    role: "Chef d'équipe",
    team: "Équipe D",
    specialization: "Ingénieur cimentation",
    experience: "8 ans",
    status: "En mission",
    location: "Berkine",
    email: "y.alloui@sonatrach.dz",
    phone: "+213 555 456 789",
    avatar: "/avatars/yasmine.jpg",
  },
  {
    id: "emp-005",
    name: "Omar Fekkar",
    role: "Chef d'équipe",
    team: "Équipe E",
    specialization: "Ingénieur test",
    experience: "9 ans",
    status: "Disponible",
    location: "Hassi Messaoud",
    email: "o.fekkar@sonatrach.dz",
    phone: "+213 555 567 890",
    avatar: "/avatars/omar.jpg",
  },
  {
    id: "emp-006",
    name: "Salim Hadj",
    role: "Chef d'équipe",
    team: "Équipe F",
    specialization: "Ingénieur forage",
    experience: "7 ans",
    status: "En formation",
    location: "Alger",
    email: "s.hadj@sonatrach.dz",
    phone: "+213 555 678 901",
    avatar: "/avatars/salim.jpg",
  },
  {
    id: "emp-007",
    name: "Naima Benziane",
    role: "Géologue",
    team: "Équipe A",
    specialization: "Géologie de réservoir",
    experience: "6 ans",
    status: "En mission",
    location: "Hassi Messaoud",
    email: "n.benziane@sonatrach.dz",
    phone: "+213 555 789 012",
    avatar: "/avatars/naima.jpg",
  },
  {
    id: "emp-008",
    name: "Farid Bensalem",
    role: "Ingénieur forage",
    team: "Équipe A",
    specialization: "Forage directionnel",
    experience: "5 ans",
    status: "En mission",
    location: "Hassi Messaoud",
    email: "f.bensalem@sonatrach.dz",
    phone: "+213 555 890 123",
    avatar: "/avatars/farid.jpg",
  },
  {
    id: "emp-009",
    name: "Amina Daoudi",
    role: "HSE",
    team: "Équipe B",
    specialization: "Sécurité",
    experience: "4 ans",
    status: "En mission",
    location: "Rhourde El Khrouf",
    email: "a.daoudi@sonatrach.dz",
    phone: "+213 555 901 234",
    avatar: "/avatars/amina.jpg",
  },
  {
    id: "emp-010",
    name: "Youcef Hamidi",
    role: "Technicien",
    team: "Équipe C",
    specialization: "Logging",
    experience: "8 ans",
    status: "En mission",
    location: "Guellala",
    email: "y.hamidi@sonatrach.dz",
    phone: "+213 555 012 345",
    avatar: "/avatars/youcef.jpg",
  },
]

// Données pour les graphiques
const teamPerformance = [
  { name: "Équipe A", performance: 92 },
  { name: "Équipe B", performance: 88 },
  { name: "Équipe C", performance: 95 },
  { name: "Équipe D", performance: 90 },
  { name: "Équipe E", performance: 87 },
  { name: "Équipe F", performance: 82 },
]

const teamSpecialization = [
  { name: "Forage", value: 14 },
  { name: "Complétion", value: 6 },
  { name: "Logging", value: 7 },
  { name: "Cimentation", value: 5 },
  { name: "Test de puits", value: 6 },
  { name: "HSE", value: 4 },
]

const COLORS = ["#ED8D31", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"]

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("teams")
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  // Filtrer les équipes en fonction de la recherche
  const [searchTeam, setSearchTeam] = useState("")
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTeam.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchTeam.toLowerCase()) ||
      team.specialization.toLowerCase().includes(searchTeam.toLowerCase()),
  )

  // Filtrer les membres en fonction de la recherche
  const [searchMember, setSearchMember] = useState("")
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchMember.toLowerCase()) ||
      member.role.toLowerCase().includes(searchMember.toLowerCase()) ||
      member.team.toLowerCase().includes(searchMember.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchMember.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Gestion d'Équipe</h1>
              <p className="text-gray-600">Gestion des équipes et du personnel sur les opérations E&P</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Actualiser
              </Button>
              <Button variant="outline" size="sm">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Exporter
              </Button>
              <Button className="bg-[#ED8D31] hover:bg-orange-700" size="sm">
                <UserPlusIcon className="mr-2 h-4 w-4" />
                Ajouter un membre
              </Button>
            </div>
          </div>

          <Tabs defaultValue="teams" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="teams">
                <UsersIcon className="h-4 w-4 mr-2" />
                Équipes
              </TabsTrigger>
              <TabsTrigger value="members">
                <UserIcon className="h-4 w-4 mr-2" />
                Membres
              </TabsTrigger>
              <TabsTrigger value="planning">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Planning
              </TabsTrigger>
              <TabsTrigger value="performance">
                <ClipboardListIcon className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="teams">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="relative">
                      <SearchIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        placeholder="Rechercher une équipe..."
                        className="pl-10"
                        value={searchTeam}
                        onChange={(e) => setSearchTeam(e.target.value)}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Spécialisation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les spécialisations</SelectItem>
                          <SelectItem value="forage">Forage</SelectItem>
                          <SelectItem value="completion">Complétion</SelectItem>
                          <SelectItem value="logging">Logging</SelectItem>
                          <SelectItem value="cimentation">Cimentation</SelectItem>
                          <SelectItem value="test">Test de puits</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les statuts</SelectItem>
                          <SelectItem value="mission">En mission</SelectItem>
                          <SelectItem value="disponible">Disponible</SelectItem>
                          <SelectItem value="formation">En formation</SelectItem>
                          <SelectItem value="conge">En congé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
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
                      <div className="text-sm font-medium text-gray-500 mb-1">Équipes actives</div>
                      <div className="text-3xl font-bold">6</div>
                      <div className="mt-2 flex items-center text-sm text-green-600">
                        <span>4 en mission</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-500 mb-1">Personnel total</div>
                      <div className="text-3xl font-bold">42</div>
                      <div className="mt-2 flex items-center text-sm text-amber-600">
                        <span>6 chefs d'équipe</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-500 mb-1">Performance moyenne</div>
                      <div className="text-3xl font-bold">89%</div>
                      <div className="mt-2 flex items-center text-sm text-green-600">
                        <span>+2% vs trimestre précédent</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Liste des équipes</CardTitle>
                  <CardDescription>{filteredTeams.length} équipes - Triées par performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Équipe</TableHead>
                        <TableHead>Chef d'équipe</TableHead>
                        <TableHead>Membres</TableHead>
                        <TableHead>Spécialisation</TableHead>
                        <TableHead>Projet actuel</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTeams.map((team) => (
                        <TableRow key={team.id}>
                          <TableCell className="font-medium">{team.name}</TableCell>
                          <TableCell>{team.leader}</TableCell>
                          <TableCell>{team.members}</TableCell>
                          <TableCell>{team.specialization}</TableCell>
                          <TableCell>
                            {team.currentProject !== "Aucun" ? (
                              <Badge className="bg-blue-100 text-blue-800">{team.currentProject}</Badge>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                team.status === "En mission"
                                  ? "bg-green-100 text-green-800"
                                  : team.status === "Disponible"
                                    ? "bg-blue-100 text-blue-800"
                                    : team.status === "En formation"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            >
                              {team.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className={`h-2.5 rounded-full ${
                                    team.performance >= 90
                                      ? "bg-green-600"
                                      : team.performance >= 80
                                        ? "bg-amber-500"
                                        : "bg-red-600"
                                  }`}
                                  style={{ width: `${team.performance}%` }}
                                ></div>
                              </div>
                              <span className="text-xs">{team.performance}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <EditIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {selectedTeam && (
                <Card className="mt-6">
                  {teams
                    .filter((team) => team.id === selectedTeam)
                    .map((team) => (
                      <CardContent className="p-6" key={team.id}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{team.name}</h3>
                            <p className="text-gray-500">
                              Spécialisation: {team.specialization} | Chef d'équipe: {team.leader}
                            </p>
                          </div>
                          <Badge
                            className={
                              team.status === "En mission"
                                ? "bg-green-100 text-green-800"
                                : team.status === "Disponible"
                                  ? "bg-blue-100 text-blue-800"
                                  : team.status === "En formation"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                            }
                          >
                            {team.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          <div>
                            <h4 className="text-lg font-medium mb-3">Membres de l'équipe</h4>
                            <div className="space-y-3">
                              {teamMembers
                                .filter((member) => member.team === team.name)
                                .map((member) => (
                                  <div key={member.id} className="flex items-center p-3 border rounded-md">
                                    <Avatar className="h-10 w-10 mr-3">
                                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">{member.name}</p>
                                      <p className="text-sm text-gray-500">{member.role}</p>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-medium mb-3">Informations</h4>
                            <div className="space-y-3">
                              <div className="p-3 border rounded-md">
                                <p className="text-sm font-medium text-gray-500">Projet actuel</p>
                                <p className="font-medium">
                                  {team.currentProject !== "Aucun" ? team.currentProject : "Aucun projet assigné"}
                                </p>
                              </div>
                              <div className="p-3 border rounded-md">
                                <p className="text-sm font-medium text-gray-500">Performance</p>
                                <div className="flex items-center mt-1">
                                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                    <div
                                      className={`h-2.5 rounded-full ${
                                        team.performance >= 90
                                          ? "bg-green-600"
                                          : team.performance >= 80
                                            ? "bg-amber-500"
                                            : "bg-red-600"
                                      }`}
                                      style={{ width: `${team.performance}%` }}
                                    ></div>
                                  </div>
                                  <span>{team.performance}%</span>
                                </div>
                              </div>
                              <div className="p-3 border rounded-md">
                                <p className="text-sm font-medium text-gray-500">Localisation actuelle</p>
                                <div className="flex items-center mt-1">
                                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                                  <p>
                                    {team.currentProject !== "Aucun"
                                      ? team.currentProject.split("-")[0]
                                      : "Hassi Messaoud (Base)"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline">Modifier l'équipe</Button>
                          <Button className="bg-[#ED8D31] hover:bg-orange-700">Assigner à un projet</Button>
                        </div>
                      </CardContent>
                    ))}
                </Card>
              )}
            </TabsContent>

            <TabsContent value="members">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="relative">
                      <SearchIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        placeholder="Rechercher un membre..."
                        className="pl-10"
                        value={searchMember}
                        onChange={(e) => setSearchMember(e.target.value)}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Équipe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les équipes</SelectItem>
                          <SelectItem value="team-a">Équipe A</SelectItem>
                          <SelectItem value="team-b">Équipe B</SelectItem>
                          <SelectItem value="team-c">Équipe C</SelectItem>
                          <SelectItem value="team-d">Équipe D</SelectItem>
                          <SelectItem value="team-e">Équipe E</SelectItem>
                          <SelectItem value="team-f">Équipe F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les rôles</SelectItem>
                          <SelectItem value="chef">Chef d'équipe</SelectItem>
                          <SelectItem value="ingenieur">Ingénieur</SelectItem>
                          <SelectItem value="geologue">Géologue</SelectItem>
                          <SelectItem value="technicien">Technicien</SelectItem>
                          <SelectItem value="hse">HSE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les statuts</SelectItem>
                          <SelectItem value="mission">En mission</SelectItem>
                          <SelectItem value="disponible">Disponible</SelectItem>
                          <SelectItem value="formation">En formation</SelectItem>
                          <SelectItem value="conge">En congé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-lg">{member.name}</h3>
                              <p className="text-gray-500">{member.role}</p>
                            </div>
                          </div>
                          <Badge
                            className={
                              member.status === "En mission"
                                ? "bg-green-100 text-green-800"
                                : member.status === "Disponible"
                                  ? "bg-blue-100 text-blue-800"
                                  : member.status === "En formation"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                            }
                          >
                            {member.status}
                          </Badge>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <UsersIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <p className="text-sm">{member.team}</p>
                          </div>
                          <div className="flex items-center">
                            <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <p className="text-sm">{member.specialization}</p>
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <p className="text-sm">{member.location}</p>
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <p className="text-sm">Expérience: {member.experience}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                          >
                            <EyeIcon className="h-4 w-4 mr-2" />
                            Profil
                          </Button>
                          <Button variant="outline" size="sm">
                            <EditIcon className="h-4 w-4 mr-2" />
                            Modifier
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedMember && (
                <Card className="mt-6">
                  {teamMembers
                    .filter((member) => member.id === selectedMember)
                    .map((member) => (
                      <CardContent className="p-6" key={member.id}>
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center">
                            <Avatar className="h-16 w-16 mr-4">
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-2xl font-bold">{member.name}</h3>
                              <p className="text-gray-500">
                                {member.role} | {member.team}
                              </p>
                            </div>
                          </div>
                          <Badge
                            className={
                              member.status === "En mission"
                                ? "bg-green-100 text-green-800"
                                : member.status === "Disponible"
                                  ? "bg-blue-100 text-blue-800"
                                  : member.status === "En formation"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                            }
                          >
                            {member.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                          <div>
                            <h4 className="text-lg font-medium mb-3">Informations professionnelles</h4>
                            <div className="space-y-3">
                              <div className="p-3 border rounded-md">
                                <p className="text-sm font-medium text-gray-500">Spécialisation</p>
                                <p className="font-medium">{member.specialization}</p>
                              </div>
                              <div className="p-3 border rounded-md">
                                <p className="text-sm font-medium text-gray-500">Expérience</p>
                                <p className="font-medium">{member.experience}</p>
                              </div>
                              <div className="p-3 border rounded-md">
                                <p className="text-sm font-medium text-gray-500">Localisation actuelle</p>
                                <div className="flex items-center mt-1">
                                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                                  <p>{member.location}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-medium mb-3">Coordonnées</h4>
                            <div className="space-y-3">
                              <div className="p-3 border rounded-md">
                                <p className="text-sm font-medium text-gray-500">Email</p>
                                <div className="flex items-center mt-1">
                                  <MailIcon className="h-4 w-4 mr-2 text-gray-500" />
                                  <p>{member.email}</p>
                                </div>
                              </div>
                              <div className="p-3 border rounded-md">
                                <p className="text-sm font-medium text-gray-500">Téléphone</p>
                                <div className="flex items-center mt-1">
                                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                                  <p>{member.phone}</p>
                                </div>
                              </div>
                              <div className="p-3 border rounded-md">
                                <p className="text-sm font-medium text-gray-500">Identifiant</p>
                                <p className="font-medium">{member.id}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-lg font-medium mb-3">Historique des affectations</h4>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Projet</TableHead>
                                <TableHead>Période</TableHead>
                                <TableHead>Rôle</TableHead>
                                <TableHead>Performance</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">HMD-42</TableCell>
                                <TableCell>01/07/2025 - Présent</TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">BRKN-11</TableCell>
                                <TableCell>15/05/2025 - 30/06/2025</TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-100 text-green-800">Bon</Badge>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">RKZ-17</TableCell>
                                <TableCell>01/03/2025 - 14/05/2025</TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>
                                  <Badge className="bg-amber-100 text-amber-800">Moyen</Badge>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                          <Button variant="outline">Modifier le profil</Button>
                          <Button className="bg-[#ED8D31] hover:bg-orange-700">Assigner à une équipe</Button>
                        </div>
                      </CardContent>
                    ))}
                </Card>
              )}
            </TabsContent>

            <TabsContent value="planning">
              <Card>
                <CardHeader>
                  <CardTitle>Planning des équipes</CardTitle>
                  <CardDescription>Calendrier des affectations et rotations d'équipes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Juillet 2025</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          Mois précédent
                        </Button>
                        <Button variant="outline" size="sm">
                          Mois suivant
                          <CalendarIcon className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md overflow-hidden">
                      <div className="grid grid-cols-7 bg-gray-100">
                        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                          <div key={day} className="p-2 text-center font-medium border-b">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 auto-rows-fr">
                        {/* Semaine 1 */}
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">26</div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">27</div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">28</div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">29</div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">30</div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">1</div>
                          <div className="bg-blue-100 text-blue-800 p-1 rounded text-xs mb-1">Équipe A - HMD-42</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">2</div>
                        </div>

                        {/* Semaine 2 */}
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">3</div>
                          <div className="bg-green-100 text-green-800 p-1 rounded text-xs mb-1">Équipe B - RKZ-17</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">4</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">5</div>
                          <div className="bg-amber-100 text-amber-800 p-1 rounded text-xs mb-1">Équipe C - GLTZ-08</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">6</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">7</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">8</div>
                          <div className="bg-purple-100 text-purple-800 p-1 rounded text-xs mb-1">
                            Équipe D - BRKN-11
                          </div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">9</div>
                        </div>

                        {/* Semaine 3 */}
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">10</div>
                          <div className="bg-orange-100 text-orange-800 p-1 rounded text-xs mb-1">
                            Formation - Équipe F
                          </div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">11</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">12</div>
                          <div className="bg-blue-100 text-blue-800 p-1 rounded text-xs mb-1">Rotation - Équipe A</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">13</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">14</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">15</div>
                          <div className="bg-green-100 text-green-800 p-1 rounded text-xs mb-1">
                            Rotation - Équipe B
                          </div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">16</div>
                        </div>

                        {/* Semaine 4 */}
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">17</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">18</div>
                          <div className="bg-amber-100 text-amber-800 p-1 rounded text-xs mb-1">
                            Rotation - Équipe C
                          </div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">19</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">20</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">21</div>
                          <div className="bg-purple-100 text-purple-800 p-1 rounded text-xs mb-1">
                            Rotation - Équipe D
                          </div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">22</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">23</div>
                        </div>

                        {/* Semaine 5 */}
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">24</div>
                          <div className="bg-indigo-100 text-indigo-800 p-1 rounded text-xs mb-1">
                            Déploiement - Équipe E
                          </div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">25</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">26</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">27</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">28</div>
                          <div className="bg-orange-100 text-orange-800 p-1 rounded text-xs mb-1">
                            Fin formation - Équipe F
                          </div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">29</div>
                        </div>
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">30</div>
                        </div>

                        {/* Semaine 6 (début) */}
                        <div className="p-2 border min-h-24">
                          <div className="text-right mb-1">31</div>
                        </div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">1</div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">2</div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">3</div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">4</div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">5</div>
                        <div className="p-2 border min-h-24 bg-gray-50 text-gray-400">6</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Prochaines rotations d'équipes</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Équipe</TableHead>
                          <TableHead>Type d'opération</TableHead>
                          <TableHead>Date de début</TableHead>
                          <TableHead>Date de fin</TableHead>
                          <TableHead>Puits</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Équipe A</TableCell>
                          <TableCell>Rotation</TableCell>
                          <TableCell>12/07/2025</TableCell>
                          <TableCell>26/07/2025</TableCell>
                          <TableCell>HMD-42</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Équipe B</TableCell>
                          <TableCell>Rotation</TableCell>
                          <TableCell>15/07/2025</TableCell>
                          <TableCell>29/07/2025</TableCell>
                          <TableCell>RKZ-17</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Équipe C</TableCell>
                          <TableCell>Rotation</TableCell>
                          <TableCell>18/07/2025</TableCell>
                          <TableCell>01/08/2025</TableCell>
                          <TableCell>GLTZ-08</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Équipe D</TableCell>
                          <TableCell>Rotation</TableCell>
                          <TableCell>21/07/2025</TableCell>
                          <TableCell>04/08/2025</TableCell>
                          <TableCell>BRKN-11</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Équipe E</TableCell>
                          <TableCell>Déploiement</TableCell>
                          <TableCell>24/07/2025</TableCell>
                          <TableCell>07/08/2025</TableCell>
                          <TableCell>ILZ-05</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance des équipes</CardTitle>
                    <CardDescription>Évaluation des performances par équipe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        performance: {
                          label: "Performance (%)",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={teamPerformance}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="performance" fill="#ED8D31" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Répartition par spécialisation</CardTitle>
                    <CardDescription>Distribution du personnel par domaine d'expertise</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={teamSpecialization}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {teamSpecialization.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Indicateurs de performance clés</CardTitle>
                  <CardDescription>Évaluation détaillée des performances par équipe</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Équipe</TableHead>
                        <TableHead>Efficacité opérationnelle</TableHead>
                        <TableHead>Respect des délais</TableHead>
                        <TableHead>Sécurité (HSE)</TableHead>
                        <TableHead>Qualité du travail</TableHead>
                        <TableHead>Performance globale</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Équipe A</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "94%" }}></div>
                            </div>
                            <span className="text-xs">94%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "90%" }}></div>
                            </div>
                            <span className="text-xs">90%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "95%" }}></div>
                            </div>
                            <span className="text-xs">95%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "89%" }}></div>
                            </div>
                            <span className="text-xs">89%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">92%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Équipe B</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "87%" }}></div>
                            </div>
                            <span className="text-xs">87%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "85%" }}></div>
                            </div>
                            <span className="text-xs">85%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "92%" }}></div>
                            </div>
                            <span className="text-xs">92%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "88%" }}></div>
                            </div>
                            <span className="text-xs">88%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">88%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Équipe C</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "96%" }}></div>
                            </div>
                            <span className="text-xs">96%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "94%" }}></div>
                            </div>
                            <span className="text-xs">94%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "97%" }}></div>
                            </div>
                            <span className="text-xs">97%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "93%" }}></div>
                            </div>
                            <span className="text-xs">93%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">95%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Équipe D</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "91%" }}></div>
                            </div>
                            <span className="text-xs">91%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "87%" }}></div>
                            </div>
                            <span className="text-xs">87%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "93%" }}></div>
                            </div>
                            <span className="text-xs">93%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "90%" }}></div>
                            </div>
                            <span className="text-xs">90%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">90%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Équipe E</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "86%" }}></div>
                            </div>
                            <span className="text-xs">86%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "85%" }}></div>
                            </div>
                            <span className="text-xs">85%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-green-600" style={{ width: "92%" }}></div>
                            </div>
                            <span className="text-xs">92%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "85%" }}></div>
                            </div>
                            <span className="text-xs">85%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">87%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Équipe F</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "80%" }}></div>
                            </div>
                            <span className="text-xs">80%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "82%" }}></div>
                            </div>
                            <span className="text-xs">82%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "85%" }}></div>
                            </div>
                            <span className="text-xs">85%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div className="h-2.5 rounded-full bg-amber-500" style={{ width: "81%" }}></div>
                            </div>
                            <span className="text-xs">81%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">82%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Recommandations d'amélioration</h3>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="font-medium">Équipe B - Amélioration du respect des délais</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Mettre en place un système de suivi plus rigoureux des étapes clés du projet pour améliorer le
                          respect des délais.
                        </div>
                      </div>
                      <div className="border rounded-md p-4">
                        <div className="font-medium">Équipe E - Formation technique supplémentaire</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Organiser des sessions de formation technique pour améliorer l'efficacité opérationnelle et la
                          qualité du travail.
                        </div>
                      </div>
                      <div className="border rounded-md p-4">
                        <div className="font-medium">Équipe F - Programme de mentorat</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Mettre en place un programme de mentorat avec des membres expérimentés de l'Équipe A ou C pour
                          améliorer les performances globales.
                        </div>
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

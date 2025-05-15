"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import {
  SearchIcon,
  UserPlusIcon,
  UserIcon,
  ShieldIcon,
  KeyIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  LockIcon,
  UnlockIcon,
  UserCogIcon,
  UsersIcon,
  HistoryIcon,
  BellIcon,
  FilterIcon,
} from "lucide-react"

// Données simulées pour les utilisateurs
const users = [
  {
    id: 1,
    name: "Ahmed Benali",
    email: "ahmed.benali@sonatrach.dz",
    role: "Administrateur",
    department: "IT",
    lastLogin: "15/05/2025 08:45",
    status: "Actif",
    avatar: "/abstract-geometric-ab.png",
  },
  {
    id: 2,
    name: "Meriem Hadj",
    email: "meriem.hadj@sonatrach.dz",
    role: "Superviseur",
    department: "Opérations",
    lastLogin: "14/05/2025 16:22",
    status: "Actif",
    avatar: "/stylized-mh.png",
  },
  {
    id: 3,
    name: "Karim Boudiaf",
    email: "karim.boudiaf@sonatrach.dz",
    role: "Ingénieur",
    department: "Forage",
    lastLogin: "13/05/2025 10:15",
    status: "Actif",
    avatar: "/keyboard-close-up.png",
  },
  {
    id: 4,
    name: "Yasmine Alloui",
    email: "yasmine.alloui@sonatrach.dz",
    role: "Analyste",
    department: "Finance",
    lastLogin: "12/05/2025 14:30",
    status: "Inactif",
    avatar: "/abstract-ya.png",
  },
  {
    id: 5,
    name: "Omar Fekkar",
    email: "omar.fekkar@sonatrach.dz",
    role: "Technicien",
    department: "Maintenance",
    lastLogin: "11/05/2025 09:10",
    status: "Actif",
    avatar: "/abstract-intertwined-forms.png",
  },
  {
    id: 6,
    name: "Salima Khelil",
    email: "salima.khelil@sonatrach.dz",
    role: "Gestionnaire",
    department: "RH",
    lastLogin: "10/05/2025 11:45",
    status: "Actif",
    avatar: "/abstract-geometric-sk.png",
  },
  {
    id: 7,
    name: "Farid Bensalem",
    email: "farid.bensalem@sonatrach.dz",
    role: "Directeur",
    department: "Direction",
    lastLogin: "09/05/2025 08:30",
    status: "Actif",
    avatar: "/abstract-fb-design.png",
  },
]

// Données simulées pour les rôles
const roles = [
  {
    id: 1,
    name: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités du système",
    userCount: 3,
    permissions: {
      dashboard: { view: true, edit: true },
      wells: { view: true, edit: true, create: true, delete: true },
      operations: { view: true, edit: true, create: true, delete: true },
      reports: { view: true, edit: true, create: true, export: true },
      alerts: { view: true, manage: true, create: true },
      map: { view: true, edit: true },
      users: { view: true, edit: true, create: true, delete: true },
      documents: { view: true, edit: true, create: true, delete: true, approve: true },
      settings: { view: true, edit: true },
    },
  },
  {
    id: 2,
    name: "Superviseur",
    description: "Accès à la plupart des fonctionnalités avec des restrictions sur la suppression",
    userCount: 5,
    permissions: {
      dashboard: { view: true, edit: false },
      wells: { view: true, edit: true, create: true, delete: false },
      operations: { view: true, edit: true, create: true, delete: false },
      reports: { view: true, edit: true, create: true, export: true },
      alerts: { view: true, manage: true, create: true },
      map: { view: true, edit: false },
      users: { view: true, edit: false, create: false, delete: false },
      documents: { view: true, edit: true, create: true, delete: false, approve: true },
      settings: { view: false, edit: false },
    },
  },
  {
    id: 3,
    name: "Ingénieur",
    description: "Accès aux données techniques et opérationnelles",
    userCount: 12,
    permissions: {
      dashboard: { view: true, edit: false },
      wells: { view: true, edit: true, create: true, delete: false },
      operations: { view: true, edit: true, create: true, delete: false },
      reports: { view: true, edit: true, create: true, export: true },
      alerts: { view: true, manage: false, create: true },
      map: { view: true, edit: false },
      users: { view: false, edit: false, create: false, delete: false },
      documents: { view: true, edit: true, create: true, delete: false, approve: false },
      settings: { view: false, edit: false },
    },
  },
  {
    id: 4,
    name: "Analyste",
    description: "Accès en lecture seule avec capacité d'exportation de rapports",
    userCount: 8,
    permissions: {
      dashboard: { view: true, edit: false },
      wells: { view: true, edit: false, create: false, delete: false },
      operations: { view: true, edit: false, create: false, delete: false },
      reports: { view: true, edit: false, create: true, export: true },
      alerts: { view: true, manage: false, create: false },
      map: { view: true, edit: false },
      users: { view: false, edit: false, create: false, delete: false },
      documents: { view: true, edit: false, create: false, delete: false, approve: false },
      settings: { view: false, edit: false },
    },
  },
  {
    id: 5,
    name: "Technicien",
    description: "Accès limité aux opérations et aux alertes",
    userCount: 15,
    permissions: {
      dashboard: { view: true, edit: false },
      wells: { view: true, edit: false, create: false, delete: false },
      operations: { view: true, edit: true, create: false, delete: false },
      reports: { view: false, edit: false, create: false, export: false },
      alerts: { view: true, manage: true, create: true },
      map: { view: true, edit: false },
      users: { view: false, edit: false, create: false, delete: false },
      documents: { view: true, edit: false, create: false, delete: false, approve: false },
      settings: { view: false, edit: false },
    },
  },
]

// Données simulées pour l'historique des accès
const accessLogs = [
  {
    id: 1,
    user: "Ahmed Benali",
    action: "Connexion",
    timestamp: "15/05/2025 08:45:22",
    ipAddress: "192.168.1.45",
    status: "Succès",
    details: "Connexion depuis navigateur Chrome sur Windows",
  },
  {
    id: 2,
    user: "Meriem Hadj",
    action: "Connexion",
    timestamp: "14/05/2025 16:22:10",
    ipAddress: "192.168.1.78",
    status: "Succès",
    details: "Connexion depuis navigateur Firefox sur MacOS",
  },
  {
    id: 3,
    user: "Inconnu",
    action: "Tentative de connexion",
    timestamp: "14/05/2025 14:15:33",
    ipAddress: "45.67.89.123",
    status: "Échec",
    details: "Tentative avec identifiant incorrect (3 essais)",
  },
  {
    id: 4,
    user: "Karim Boudiaf",
    action: "Déconnexion",
    timestamp: "13/05/2025 17:30:45",
    ipAddress: "192.168.1.92",
    status: "Succès",
    details: "Déconnexion manuelle",
  },
  {
    id: 5,
    user: "Yasmine Alloui",
    action: "Réinitialisation mot de passe",
    timestamp: "13/05/2025 11:20:18",
    ipAddress: "192.168.1.56",
    status: "Succès",
    details: "Réinitialisation via email",
  },
  {
    id: 6,
    user: "Système",
    action: "Verrouillage de compte",
    timestamp: "12/05/2025 09:45:12",
    ipAddress: "192.168.1.1",
    status: "Alerte",
    details: "Compte 'farid.bensalem' verrouillé après 5 tentatives échouées",
  },
  {
    id: 7,
    user: "Ahmed Benali",
    action: "Modification de rôle",
    timestamp: "11/05/2025 14:22:56",
    ipAddress: "192.168.1.45",
    status: "Succès",
    details: "Modification du rôle de 'Omar Fekkar' de 'Ingénieur' à 'Technicien'",
  },
]

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [selectedRole, setSelectedRole] = useState<number | null>(null)

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Gestion des Utilisateurs et des Rôles</h1>
              <p className="text-gray-600">Administration des accès et des permissions système</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#ED8D31] hover:bg-orange-700">
                    <UserPlusIcon className="mr-2 h-4 w-4" />
                    Nouvel utilisateur
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
                    <DialogDescription>
                      Créez un compte utilisateur et attribuez les permissions appropriées.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nom complet
                      </Label>
                      <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" type="email" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Rôle
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Sélectionner un rôle" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.name}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="department" className="text-right">
                        Département
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Sélectionner un département" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="operations">Opérations</SelectItem>
                          <SelectItem value="forage">Forage</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="rh">RH</SelectItem>
                          <SelectItem value="direction">Direction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Mot de passe
                      </Label>
                      <Input id="password" type="password" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="confirm-password" className="text-right">
                        Confirmer
                      </Label>
                      <Input id="confirm-password" type="password" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="text-right">
                        <Label>Statut</Label>
                      </div>
                      <div className="flex items-center space-x-2 col-span-3">
                        <Switch id="user-status" defaultChecked />
                        <Label htmlFor="user-status">Compte actif</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Annuler</Button>
                    <Button className="bg-[#ED8D31] hover:bg-orange-700">Créer l'utilisateur</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les rôles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name.toLowerCase()}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les départements</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="operations">Opérations</SelectItem>
                      <SelectItem value="forage">Forage</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="rh">RH</SelectItem>
                      <SelectItem value="direction">Direction</SelectItem>
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
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="users" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="users">
                <UserIcon className="h-4 w-4 mr-2" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="roles">
                <ShieldIcon className="h-4 w-4 mr-2" />
                Rôles et permissions
              </TabsTrigger>
              <TabsTrigger value="access-logs">
                <HistoryIcon className="h-4 w-4 mr-2" />
                Historique des accès
              </TabsTrigger>
              <TabsTrigger value="security">
                <LockIcon className="h-4 w-4 mr-2" />
                Paramètres de sécurité
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Liste des utilisateurs</CardTitle>
                  <CardDescription>
                    {filteredUsers.length} utilisateurs - Triés par nom (ordre alphabétique)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Département</TableHead>
                        <TableHead>Dernière connexion</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <img
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                className="h-8 w-8 rounded-full mr-2"
                              />
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.status === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <EditIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                {user.status === "Actif" ? (
                                  <LockIcon className="h-4 w-4 text-amber-500" />
                                ) : (
                                  <UnlockIcon className="h-4 w-4 text-green-500" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {selectedUser && (
                <Card className="mt-6">
                  {users
                    .filter((user) => user.id === selectedUser)
                    .map((user) => (
                      <CardContent className="p-6" key={user.id}>
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="h-16 w-16 rounded-full mr-4"
                            />
                            <div>
                              <h3 className="text-xl font-bold">{user.name}</h3>
                              <p className="text-gray-500">{user.email}</p>
                              <div className="flex items-center mt-1">
                                <Badge
                                  className={
                                    user.status === "Actif"
                                      ? "bg-green-100 text-green-800 mr-2"
                                      : "bg-gray-100 text-gray-800 mr-2"
                                  }
                                >
                                  {user.status}
                                </Badge>
                                <span className="text-sm text-gray-500">Dernière connexion: {user.lastLogin}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <EditIcon className="mr-2 h-4 w-4" />
                              Modifier
                            </Button>
                            <Button variant="outline" size="sm" className="text-amber-500 border-amber-500">
                              <KeyIcon className="mr-2 h-4 w-4" />
                              Réinitialiser mot de passe
                            </Button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-medium mb-2">Informations de base</h4>
                            <Card>
                              <CardContent className="p-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Nom complet</span>
                                    <span>{user.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Email</span>
                                    <span>{user.email}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Département</span>
                                    <span>{user.department}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Statut du compte</span>
                                    <Badge
                                      className={
                                        user.status === "Actif"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-gray-100 text-gray-800"
                                      }
                                    >
                                      {user.status}
                                    </Badge>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Permissions et accès</h4>
                            <Card>
                              <CardContent className="p-4">
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Rôle</span>
                                    <Badge className="bg-blue-100 text-blue-800">{user.role}</Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Dernière connexion</span>
                                    <span>{user.lastLogin}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Authentification à deux facteurs</span>
                                    <Badge className="bg-amber-100 text-amber-800">Non activée</Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Expiration du mot de passe</span>
                                    <span>30/06/2025</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-medium mb-2">Historique récent</h4>
                          <Card>
                            <CardContent className="p-4">
                              <div className="space-y-4">
                                <div className="flex items-start">
                                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <UserIcon className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Connexion réussie</p>
                                    <p className="text-sm text-gray-500">
                                      15/05/2025 08:45 - IP: 192.168.1.45 - Chrome sur Windows
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <div className="bg-green-100 p-2 rounded-full mr-3">
                                    <KeyIcon className="h-4 w-4 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Mot de passe modifié</p>
                                    <p className="text-sm text-gray-500">
                                      10/05/2025 14:22 - IP: 192.168.1.45 - Firefox sur Windows
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                                    <UserCogIcon className="h-4 w-4 text-amber-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Rôle modifié</p>
                                    <p className="text-sm text-gray-500">
                                      05/05/2025 09:15 - Modifié par: Admin Système
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" className="text-red-500 border-red-500">
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Supprimer le compte
                          </Button>
                          <Button variant="outline">Annuler</Button>
                          <Button className="bg-[#ED8D31] hover:bg-orange-700">Enregistrer les modifications</Button>
                        </div>
                      </CardContent>
                    ))}
                </Card>
              )}
            </TabsContent>

            <TabsContent value="roles">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {roles.map((role) => (
                  <Card
                    key={role.id}
                    className={`hover:shadow-md transition-shadow ${
                      selectedRole === role.id ? "border-[#ED8D31] shadow-md" : ""
                    }`}
                    onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{role.name}</h3>
                          <p className="text-gray-500 text-sm">{role.description}</p>
                          <div className="mt-2 flex items-center">
                            <UsersIcon className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-sm text-gray-500">{role.userCount} utilisateurs</span>
                          </div>
                        </div>
                        <ShieldIcon
                          className={`h-8 w-8 ${
                            role.name === "Administrateur"
                              ? "text-red-400"
                              : role.name === "Superviseur"
                                ? "text-amber-400"
                                : role.name === "Ingénieur"
                                  ? "text-blue-400"
                                  : role.name === "Analyste"
                                    ? "text-green-400"
                                    : "text-gray-400"
                          }`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedRole && (
                <Card className="mb-6">
                  {roles
                    .filter((role) => role.id === selectedRole)
                    .map((role) => (
                      <CardContent className="p-6" key={role.id}>
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h3 className="text-xl font-bold">{role.name}</h3>
                            <p className="text-gray-500">{role.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <EditIcon className="mr-2 h-4 w-4" />
                              Modifier
                            </Button>
                            <Button className="bg-[#ED8D31] hover:bg-orange-700" size="sm">
                              <UserPlusIcon className="mr-2 h-4 w-4" />
                              Assigner à un utilisateur
                            </Button>
                          </div>
                        </div>

                        <h4 className="font-medium mb-4">Permissions par module</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Module</TableHead>
                              <TableHead>Visualiser</TableHead>
                              <TableHead>Créer</TableHead>
                              <TableHead>Modifier</TableHead>
                              <TableHead>Supprimer</TableHead>
                              <TableHead>Autres permissions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Tableau de bord</TableCell>
                              <TableCell>
                                {role.permissions.dashboard.view ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>
                                {role.permissions.dashboard.edit ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>-</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Puits</TableCell>
                              <TableCell>
                                {role.permissions.wells.view ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.wells.create ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.wells.edit ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.wells.delete ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>-</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Opérations</TableCell>
                              <TableCell>
                                {role.permissions.operations.view ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.operations.create ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.operations.edit ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.operations.delete ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>-</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Rapports</TableCell>
                              <TableCell>
                                {role.permissions.reports.view ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.reports.create ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.reports.edit ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>{role.permissions.reports.export ? "Exporter" : "-"}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Documents</TableCell>
                              <TableCell>
                                {role.permissions.documents.view ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.documents.create ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.documents.edit ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.documents.delete ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>{role.permissions.documents.approve ? "Approuver" : "-"}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Utilisateurs</TableCell>
                              <TableCell>
                                {role.permissions.users.view ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.users.create ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.users.edit ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>
                                {role.permissions.users.delete ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <XCircleIcon className="h-5 w-5 text-red-500" />
                                )}
                              </TableCell>
                              <TableCell>-</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>

                        <h4 className="font-medium mt-6 mb-4">Utilisateurs avec ce rôle</h4>
                        <div className="flex flex-wrap gap-2">
                          {users
                            .filter((user) => user.role === role.name)
                            .map((user) => (
                              <div key={user.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                                <img
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.name}
                                  className="h-6 w-6 rounded-full mr-2"
                                />
                                <span className="text-sm">{user.name}</span>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    ))}
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Créer un nouveau rôle</CardTitle>
                  <CardDescription>Définissez un nouveau rôle avec des permissions personnalisées</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="role-name">Nom du rôle</Label>
                          <Input id="role-name" placeholder="Ex: Gestionnaire de projet" />
                        </div>
                        <div>
                          <Label htmlFor="role-description">Description</Label>
                          <Input id="role-description" placeholder="Ex: Gestion des projets et des équipes" />
                        </div>
                        <div>
                          <Label>Basé sur un rôle existant</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un rôle" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Aucun (partir de zéro)</SelectItem>
                              {roles.map((role) => (
                                <SelectItem key={role.id} value={role.name.toLowerCase()}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">Modules accessibles</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="dashboard" />
                          <Label htmlFor="dashboard">Tableau de bord</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="wells" />
                          <Label htmlFor="wells">Puits</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="operations" />
                          <Label htmlFor="operations">Opérations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="reports" />
                          <Label htmlFor="reports">Rapports</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="alerts" />
                          <Label htmlFor="alerts">Alertes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="documents" />
                          <Label htmlFor="documents">Documents</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="users" />
                          <Label htmlFor="users">Utilisateurs</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button variant="outline" className="mr-2">
                      Annuler
                    </Button>
                    <Button className="bg-[#ED8D31] hover:bg-orange-700">Créer le rôle</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="access-logs">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Historique des accès</CardTitle>
                  <CardDescription>Journal des connexions et des actions sur les comptes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <FilterIcon className="mr-2 h-4 w-4" />
                        Filtrer
                      </Button>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Type d'action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les actions</SelectItem>
                          <SelectItem value="login">Connexion</SelectItem>
                          <SelectItem value="logout">Déconnexion</SelectItem>
                          <SelectItem value="password">Mot de passe</SelectItem>
                          <SelectItem value="role">Modification de rôle</SelectItem>
                          <SelectItem value="lock">Verrouillage de compte</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les statuts</SelectItem>
                          <SelectItem value="success">Succès</SelectItem>
                          <SelectItem value="failure">Échec</SelectItem>
                          <SelectItem value="alert">Alerte</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">Période:</div>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Aujourd'hui</SelectItem>
                          <SelectItem value="week">7 derniers jours</SelectItem>
                          <SelectItem value="month">30 derniers jours</SelectItem>
                          <SelectItem value="custom">Personnalisé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Date et heure</TableHead>
                        <TableHead>Adresse IP</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Détails</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accessLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.user}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                log.action === "Connexion"
                                  ? "bg-green-100 text-green-800"
                                  : log.action === "Déconnexion"
                                    ? "bg-blue-100 text-blue-800"
                                    : log.action === "Tentative de connexion"
                                      ? "bg-amber-100 text-amber-800"
                                      : log.action === "Réinitialisation mot de passe"
                                        ? "bg-purple-100 text-purple-800"
                                        : log.action === "Verrouillage de compte"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-gray-100 text-gray-800"
                              }
                            >
                              {log.action}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                log.status === "Succès"
                                  ? "bg-green-100 text-green-800"
                                  : log.status === "Échec"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                              }
                            >
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tentatives de connexion échouées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">12</div>
                    <p className="text-sm text-gray-500 mb-4">Dernières 24 heures</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>IP: 45.67.89.123</span>
                        <Badge className="bg-red-100 text-red-800">5 tentatives</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>IP: 78.90.12.345</span>
                        <Badge className="bg-red-100 text-red-800">3 tentatives</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>IP: 112.34.56.789</span>
                        <Badge className="bg-amber-100 text-amber-800">2 tentatives</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Comptes verrouillés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">2</div>
                    <p className="text-sm text-gray-500 mb-4">Actuellement verrouillés</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>farid.bensalem@sonatrach.dz</span>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <UnlockIcon className="h-3 w-3 mr-1" />
                          Débloquer
                        </Button>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>mohamed.ali@sonatrach.dz</span>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <UnlockIcon className="h-3 w-3 mr-1" />
                          Débloquer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Alertes de sécurité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">4</div>
                    <p className="text-sm text-gray-500 mb-4">Alertes actives</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <AlertTriangleIcon className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Connexions multiples depuis des emplacements différents</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <AlertTriangleIcon className="h-4 w-4 text-red-500 mr-2" />
                        <span>Tentative d'accès à des ressources restreintes</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <BellIcon className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Mots de passe expirés: 3 utilisateurs</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Politique de mot de passe</CardTitle>
                    <CardDescription>Configuration des exigences de mot de passe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Longueur minimale</Label>
                          <p className="text-sm text-gray-500">Nombre minimum de caractères requis</p>
                        </div>
                        <Select defaultValue="10">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                            <SelectItem value="14">14</SelectItem>
                            <SelectItem value="16">16</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Complexité requise</Label>
                          <p className="text-sm text-gray-500">Types de caractères obligatoires</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="letters" defaultChecked />
                            <Label htmlFor="letters" className="text-sm">
                              Lettres (a-z, A-Z)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="numbers" defaultChecked />
                            <Label htmlFor="numbers" className="text-sm">
                              Chiffres (0-9)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="special" defaultChecked />
                            <Label htmlFor="special" className="text-sm">
                              Caractères spéciaux (!@#$%)
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Expiration du mot de passe</Label>
                          <p className="text-sm text-gray-500">Fréquence de changement obligatoire du mot de passe</p>
                        </div>
                        <Select defaultValue="90">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 jours</SelectItem>
                            <SelectItem value="60">60 jours</SelectItem>
                            <SelectItem value="90">90 jours</SelectItem>
                            <SelectItem value="180">180 jours</SelectItem>
                            <SelectItem value="never">Jamais</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Historique des mots de passe</Label>
                          <p className="text-sm text-gray-500">
                            Nombre de mots de passe précédents ne pouvant être réutilisés
                          </p>
                        </div>
                        <Select defaultValue="5">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="0">Aucun</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Verrouillage du compte</Label>
                          <p className="text-sm text-gray-500">Nombre de tentatives échouées avant verrouillage</p>
                        </div>
                        <Select defaultValue="5">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="0">Désactivé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Authentification et sessions</CardTitle>
                    <CardDescription>Configuration des paramètres de connexion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Authentification à deux facteurs (2FA)</Label>
                          <p className="text-sm text-gray-500">Exiger une vérification supplémentaire</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="2fa-required" />
                          <Label htmlFor="2fa-required">Obligatoire</Label>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Méthode 2FA</Label>
                          <p className="text-sm text-gray-500">Type de vérification secondaire</p>
                        </div>
                        <Select defaultValue="app">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="app">Application d'authentification</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="all">Toutes les méthodes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Durée de session</Label>
                          <p className="text-sm text-gray-500">Temps avant déconnexion automatique par inactivité</p>
                        </div>
                        <Select defaultValue="30">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 heure</SelectItem>
                            <SelectItem value="120">2 heures</SelectItem>
                            <SelectItem value="480">8 heures</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Sessions simultanées</Label>
                          <p className="text-sm text-gray-500">
                            Nombre maximum de connexions simultanées par utilisateur
                          </p>
                        </div>
                        <Select defaultValue="1">
                          <SelectTrigger className="w-[100px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="unlimited">Illimité</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Restriction d'adresse IP</Label>
                          <p className="text-sm text-gray-500">Limiter l'accès à certaines adresses IP</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="ip-restriction" />
                          <Label htmlFor="ip-restriction">Activé</Label>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Journalisation des connexions</Label>
                          <p className="text-sm text-gray-500">Enregistrer toutes les tentatives de connexion</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="login-logging" defaultChecked />
                          <Label htmlFor="login-logging">Activé</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Alertes et notifications</CardTitle>
                    <CardDescription>Configuration des alertes de sécurité</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Label>Alertes administrateur</Label>
                          <p className="text-sm text-gray-500">Événements nécessitant une notification</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="alert-failed-login" defaultChecked />
                            <Label htmlFor="alert-failed-login" className="text-sm">
                              Tentatives de connexion échouées
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="alert-account-lock" defaultChecked />
                            <Label htmlFor="alert-account-lock" className="text-sm">
                              Verrouillage de compte
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="alert-password-reset" defaultChecked />
                            <Label htmlFor="alert-password-reset" className="text-sm">
                              Réinitialisation de mot de passe
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="alert-role-change" defaultChecked />
                            <Label htmlFor="alert-role-change" className="text-sm">
                              Modification de rôle
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="alert-new-device" defaultChecked />
                            <Label htmlFor="alert-new-device" className="text-sm">
                              Connexion depuis un nouvel appareil
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Méthode de notification</Label>
                          <p className="text-sm text-gray-500">Comment envoyer les alertes</p>
                        </div>
                        <Select defaultValue="email">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="both">Email et SMS</SelectItem>
                            <SelectItem value="system">Notifications système uniquement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Destinataires des alertes</Label>
                          <p className="text-sm text-gray-500">Qui reçoit les notifications</p>
                        </div>
                        <Select defaultValue="admin">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Administrateurs uniquement</SelectItem>
                            <SelectItem value="security">Équipe de sécurité</SelectItem>
                            <SelectItem value="all">Tous les superviseurs</SelectItem>
                            <SelectItem value="custom">Liste personnalisée</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sauvegarde et audit</CardTitle>
                    <CardDescription>Configuration des sauvegardes et des audits de sécurité</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Audit des modifications</Label>
                          <p className="text-sm text-gray-500">
                            Enregistrer toutes les modifications apportées aux utilisateurs et aux rôles
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="audit-changes" defaultChecked />
                          <Label htmlFor="audit-changes">Activé</Label>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Période de conservation des journaux</Label>
                          <p className="text-sm text-gray-500">Durée de conservation des journaux d'audit</p>
                        </div>
                        <Select defaultValue="365">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="90">90 jours</SelectItem>
                            <SelectItem value="180">180 jours</SelectItem>
                            <SelectItem value="365">1 an</SelectItem>
                            <SelectItem value="730">2 ans</SelectItem>
                            <SelectItem value="1825">5 ans</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Exportation des journaux</Label>
                          <p className="text-sm text-gray-500">Format d'exportation des journaux d'audit</p>
                        </div>
                        <Select defaultValue="csv">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="excel">Excel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <Label>Sauvegarde automatique</Label>
                          <p className="text-sm text-gray-500">
                            Fréquence des sauvegardes automatiques des données utilisateur
                          </p>
                        </div>
                        <Select defaultValue="daily">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Horaire</SelectItem>
                            <SelectItem value="daily">Quotidienne</SelectItem>
                            <SelectItem value="weekly">Hebdomadaire</SelectItem>
                            <SelectItem value="monthly">Mensuelle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button variant="outline" className="mr-2">
                        Annuler
                      </Button>
                      <Button className="bg-[#ED8D31] hover:bg-orange-700">Enregistrer les paramètres</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

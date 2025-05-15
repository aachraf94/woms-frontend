"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import {
  SearchIcon,
  FileTextIcon,
  FileIcon,
  FolderIcon,
  DownloadIcon,
  UploadIcon,
  PlusIcon,
  EyeIcon,
  Share2Icon,
  MoreHorizontalIcon,
  CalendarIcon,
  UserIcon,
} from "lucide-react"

// Données simulées pour les documents
const documents = [
  {
    id: "DOC-2025-042",
    title: "Rapport journalier - HMD-42",
    type: "Rapport",
    category: "Opérations",
    date: "10/07/2025",
    author: "Karim Benali",
    size: "2.4 MB",
    status: "Validé",
  },
  {
    id: "DOC-2025-041",
    title: "Analyse de boue - RKZ-17",
    type: "Analyse",
    category: "Technique",
    date: "09/07/2025",
    author: "Ahmed Khelil",
    size: "3.8 MB",
    status: "En revue",
  },
  {
    id: "DOC-2025-040",
    title: "Rapport d'incident - GLTZ-08",
    type: "Incident",
    category: "HSE",
    date: "08/07/2025",
    author: "Meriem Boudiaf",
    size: "1.7 MB",
    status: "Validé",
  },
  {
    id: "DOC-2025-039",
    title: "Programme de forage - ILZ-05",
    type: "Programme",
    category: "Planification",
    date: "07/07/2025",
    author: "Omar Fekkar",
    size: "5.2 MB",
    status: "Validé",
  },
  {
    id: "DOC-2025-038",
    title: "Rapport mensuel - Juin 2025",
    type: "Rapport",
    category: "Management",
    date: "05/07/2025",
    author: "Yasmine Alloui",
    size: "8.1 MB",
    status: "Validé",
  },
  {
    id: "DOC-2025-037",
    title: "Analyse de performance - Équipe A",
    type: "Analyse",
    category: "RH",
    date: "03/07/2025",
    author: "Salim Hadj",
    size: "3.5 MB",
    status: "En revue",
  },
  {
    id: "DOC-2025-036",
    title: "Rapport financier - Q2 2025",
    type: "Rapport",
    category: "Finance",
    date: "01/07/2025",
    author: "Farid Bensalem",
    size: "4.2 MB",
    status: "Validé",
  },
]

// Données pour les dossiers
const folders = [
  { id: 1, name: "Rapports journaliers", count: 45 },
  { id: 2, name: "Rapports mensuels", count: 12 },
  { id: 3, name: "Analyses techniques", count: 28 },
  { id: 4, name: "Incidents HSE", count: 17 },
  { id: 5, name: "Programmes de forage", count: 23 },
  { id: 6, name: "Documents administratifs", count: 34 },
]

// Données pour les modèles
const templates = [
  { id: 1, name: "Rapport journalier", category: "Opérations", downloads: 245 },
  { id: 2, name: "Rapport d'incident", category: "HSE", downloads: 187 },
  { id: 3, name: "Programme de forage", category: "Planification", downloads: 156 },
  { id: 4, name: "Analyse de boue", category: "Technique", downloads: 132 },
  { id: 5, name: "Rapport mensuel", category: "Management", downloads: 98 },
]

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)

  // Filtrer les documents en fonction du terme de recherche
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Documents & Rapports</h1>
              <p className="text-gray-600">Gestion centralisée des documents et rapports techniques</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <UploadIcon className="mr-2 h-4 w-4" />
                Importer
              </Button>
              <Button className="bg-[#ED8D31] hover:bg-orange-700" size="sm">
                <PlusIcon className="mr-2 h-4 w-4" />
                Nouveau document
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Rechercher un document..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type de document" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="rapport">Rapport</SelectItem>
                      <SelectItem value="analyse">Analyse</SelectItem>
                      <SelectItem value="programme">Programme</SelectItem>
                      <SelectItem value="incident">Incident</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      <SelectItem value="operations">Opérations</SelectItem>
                      <SelectItem value="technique">Technique</SelectItem>
                      <SelectItem value="hse">HSE</SelectItem>
                      <SelectItem value="planification">Planification</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="rh">RH</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <div className="relative w-full">
                    <CalendarIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <Input type="date" className="pl-10 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="documents" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="documents">
                <FileIcon className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="folders">
                <FolderIcon className="h-4 w-4 mr-2" />
                Dossiers
              </TabsTrigger>
              <TabsTrigger value="templates">
                <FileTextIcon className="h-4 w-4 mr-2" />
                Modèles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documents">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Liste des documents</CardTitle>
                  <CardDescription>
                    {filteredDocuments.length} documents - Triés par date (plus récents d'abord)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Auteur</TableHead>
                        <TableHead>Taille</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.id}</TableCell>
                          <TableCell>{doc.title}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                doc.type === "Rapport"
                                  ? "bg-blue-100 text-blue-800"
                                  : doc.type === "Analyse"
                                    ? "bg-purple-100 text-purple-800"
                                    : doc.type === "Programme"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-amber-100 text-amber-800"
                              }
                            >
                              {doc.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{doc.category}</TableCell>
                          <TableCell>{doc.date}</TableCell>
                          <TableCell>{doc.author}</TableCell>
                          <TableCell>{doc.size}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                doc.status === "Validé" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                              }
                            >
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSelectedDocument(selectedDocument === doc.id ? null : doc.id)}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <DownloadIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2Icon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {selectedDocument && (
                <Card className="mt-6">
                  {documents
                    .filter((doc) => doc.id === selectedDocument)
                    .map((doc) => (
                      <CardContent className="p-6" key={doc.id}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{doc.title}</h3>
                            <p className="text-gray-500">
                              {doc.id} - {doc.date}
                            </p>
                          </div>
                          <Badge
                            className={
                              doc.status === "Validé" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                            }
                          >
                            {doc.status}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Type de document</h4>
                            <Badge
                              className={
                                doc.type === "Rapport"
                                  ? "bg-blue-100 text-blue-800"
                                  : doc.type === "Analyse"
                                    ? "bg-purple-100 text-purple-800"
                                    : doc.type === "Programme"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-amber-100 text-amber-800"
                              }
                            >
                              {doc.type}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Catégorie</h4>
                            <p>{doc.category}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Taille</h4>
                            <p>{doc.size}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Auteur</h4>
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <p>{doc.author}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-1">Aperçu du document</h4>
                          <div className="border rounded-md p-4 bg-gray-50 h-64 flex items-center justify-center">
                            <div className="text-center">
                              <FileTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-500">Aperçu du document {doc.id}</p>
                              <p className="text-sm text-gray-400 mt-2">
                                Cliquez sur le bouton ci-dessous pour ouvrir le document
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline">
                            <DownloadIcon className="mr-2 h-4 w-4" />
                            Télécharger
                          </Button>
                          <Button className="bg-[#ED8D31] hover:bg-orange-700">
                            <EyeIcon className="mr-2 h-4 w-4" />
                            Ouvrir le document
                          </Button>
                        </div>
                      </CardContent>
                    ))}
                </Card>
              )}
            </TabsContent>

            <TabsContent value="folders">
              <div className="grid md:grid-cols-3 gap-6">
                {folders.map((folder) => (
                  <Card key={folder.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <FolderIcon className="h-10 w-10 text-[#ED8D31] mr-4" />
                          <div>
                            <h3 className="font-bold text-lg">{folder.name}</h3>
                            <p className="text-gray-500 text-sm">{folder.count} documents</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Ouvrir
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>Modèles de documents</CardTitle>
                  <CardDescription>Modèles standardisés pour la création de nouveaux documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom du modèle</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Téléchargements</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {templates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">{template.name}</TableCell>
                          <TableCell>{template.category}</TableCell>
                          <TableCell>{template.downloads}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <EyeIcon className="mr-2 h-4 w-4" />
                                Aperçu
                              </Button>
                              <Button variant="outline" size="sm">
                                <DownloadIcon className="mr-2 h-4 w-4" />
                                Télécharger
                              </Button>
                              <Button className="bg-[#ED8D31] hover:bg-orange-700" size="sm">
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Utiliser
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

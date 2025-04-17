import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import {
  ArrowLeftIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  FileTextIcon,
  MessageSquareIcon,
  ImageIcon,
  PaperclipIcon,
} from "lucide-react"
import Link from "next/link"

// Données simulées pour un incident spécifique
const incident = {
  id: "INC-2025-042",
  title: "Perte de boue",
  puits: "HMD-42",
  type: "Technique",
  severite: "Critique",
  statut: "En cours",
  date: "10/07/2025 - 14:30",
  description:
    "Perte significative de boue de forage pendant la phase 16\" sur le puits HMD-42. L'équipe de forage a détecté une perte soudaine de circulation de boue à une profondeur de 2450m. Les mesures initiales de colmatage n'ont pas été efficaces et une intervention spécialisée est en cours.",
  responsable: "Karim Benali",
  equipe: "Équipe A - ENAFOR",
  impact: "Retard estimé de 24h, coût supplémentaire de 1.2M DA",
  actions: [
    {
      date: "10/07/2025 - 14:45",
      action: "Arrêt des opérations de forage",
      responsable: "Chef de puits",
    },
    {
      date: "10/07/2025 - 15:10",
      action: "Tentative de colmatage avec LCM",
      responsable: "Ingénieur boue",
    },
    {
      date: "10/07/2025 - 16:30",
      action: "Appel à l'équipe d'intervention spécialisée",
      responsable: "Superviseur",
    },
    {
      date: "10/07/2025 - 18:15",
      action: "Arrivée de l'équipe d'intervention",
      responsable: "Équipe Schlumberger",
    },
  ],
  commentaires: [
    {
      auteur: "Karim Benali",
      date: "10/07/2025 - 15:00",
      texte: "Perte de circulation estimée à 15m³/h. Préparation du matériel de colmatage en cours.",
    },
    {
      auteur: "Ahmed Khelil",
      date: "10/07/2025 - 16:45",
      texte:
        "Après analyse, la zone de perte semble être une fracture naturelle. Recommandation d'utiliser un ciment spécial pour le colmatage.",
    },
    {
      auteur: "Meriem Boudiaf",
      date: "10/07/2025 - 17:30",
      texte: "Impact financier initial estimé. Prévoir une révision du budget de l'opération.",
    },
  ],
}

export default function IncidentDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center mb-6">
            <Link href="/alerts" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{incident.title}</h1>
                <Badge
                  className={
                    incident.severite === "Critique"
                      ? "bg-red-100 text-red-800"
                      : incident.severite === "Majeur"
                        ? "bg-orange-100 text-orange-800"
                        : incident.severite === "Modéré"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                  }
                >
                  {incident.severite}
                </Badge>
                <Badge
                  className={
                    incident.statut === "En cours" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                  }
                >
                  {incident.statut}
                </Badge>
              </div>
              <p className="text-gray-600">
                {incident.id} - Signalé le {incident.date}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileTextIcon className="mr-2 h-4 w-4" />
                Rapport PDF
              </Button>
              {incident.statut === "En cours" ? (
                <Button className="bg-green-600 hover:bg-green-700" size="sm">
                  <CheckCircleIcon className="mr-2 h-4 w-4" />
                  Marquer comme résolu
                </Button>
              ) : (
                <Button className="bg-[#ED8D31] hover:bg-orange-700" size="sm">
                  <AlertTriangleIcon className="mr-2 h-4 w-4" />
                  Réouvrir
                </Button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Détails de l'incident</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                    <p className="text-gray-700">{incident.description}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Puits concerné</h3>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{incident.puits}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Responsable</h3>
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{incident.responsable}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Équipe</h3>
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <p>{incident.equipe}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Impact</h3>
                    <p className="text-gray-700">{incident.impact}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-base font-medium mb-2">Chronologie des actions</h3>
                    <div className="space-y-3">
                      {incident.actions.map((action, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-4 w-4 rounded-full bg-blue-500 mt-1 mr-3"></div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{action.action}</p>
                              <span className="text-xs text-gray-500 ml-2">({action.date})</span>
                            </div>
                            <p className="text-sm text-gray-600">Responsable: {action.responsable}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations complémentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Type d'incident</h3>
                    <Badge
                      className={
                        incident.type === "HSE"
                          ? "bg-purple-100 text-purple-800"
                          : incident.type === "Technique"
                            ? "bg-blue-100 text-blue-800"
                            : incident.type === "Équipement"
                              ? "bg-cyan-100 text-cyan-800"
                              : incident.type === "Planning"
                                ? "bg-indigo-100 text-indigo-800"
                                : incident.type === "Financier"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-gray-100 text-gray-800"
                      }
                    >
                      {incident.type}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Durée de l'incident</h3>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <p>En cours depuis 5h30</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Documents associés</h3>
                    <div className="space-y-2">
                      <div className="flex items-center p-2 border rounded-md">
                        <FileTextIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">Rapport initial.pdf</span>
                      </div>
                      <div className="flex items-center p-2 border rounded-md">
                        <ImageIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">Photo_zone_perte.jpg</span>
                      </div>
                      <div className="flex items-center p-2 border rounded-md">
                        <PaperclipIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">Procédure_colmatage.docx</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Incidents similaires</h3>
                    <div className="space-y-2">
                      <div className="text-sm p-2 border rounded-md">
                        <p className="font-medium">INC-2025-028</p>
                        <p className="text-xs text-gray-500">Perte de boue - BRKN-11 - 15/06/2025</p>
                      </div>
                      <div className="text-sm p-2 border rounded-md">
                        <p className="font-medium">INC-2024-156</p>
                        <p className="text-xs text-gray-500">Perte de boue - HMD-39 - 22/12/2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="comments" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="comments">
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                Commentaires
              </TabsTrigger>
              <TabsTrigger value="history">
                <ClockIcon className="h-4 w-4 mr-2" />
                Historique
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments">
              <Card>
                <CardHeader>
                  <CardTitle>Commentaires et mises à jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incident.commentaires.map((comment, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                              <UserIcon className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">{comment.auteur}</p>
                              <p className="text-xs text-gray-500">{comment.date}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{comment.texte}</p>
                      </div>
                    ))}

                    <div className="mt-4">
                      <textarea
                        className="w-full p-3 border rounded-md"
                        rows={3}
                        placeholder="Ajouter un commentaire..."
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <Button className="bg-[#ED8D31] hover:bg-orange-700">Ajouter</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des modifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Détails</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>10/07/2025 - 18:30</TableCell>
                        <TableCell>Karim Benali</TableCell>
                        <TableCell>Mise à jour du statut</TableCell>
                        <TableCell>Changement de "Nouveau" à "En cours"</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>10/07/2025 - 17:45</TableCell>
                        <TableCell>Meriem Boudiaf</TableCell>
                        <TableCell>Ajout d'impact</TableCell>
                        <TableCell>Ajout des détails sur l'impact financier</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>10/07/2025 - 16:50</TableCell>
                        <TableCell>Ahmed Khelil</TableCell>
                        <TableCell>Ajout de commentaire</TableCell>
                        <TableCell>Analyse technique de la zone de perte</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>10/07/2025 - 15:15</TableCell>
                        <TableCell>Karim Benali</TableCell>
                        <TableCell>Ajout d'action</TableCell>
                        <TableCell>Tentative de colmatage avec LCM</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>10/07/2025 - 14:30</TableCell>
                        <TableCell>Karim Benali</TableCell>
                        <TableCell>Création de l'incident</TableCell>
                        <TableCell>Incident initial signalé</TableCell>
                      </TableRow>
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

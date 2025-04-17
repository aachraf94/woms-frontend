import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import {
  ArrowLeftIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  BriefcaseIcon,
  ClockIcon,
  CalendarIcon,
  FileTextIcon,
  BookOpenIcon,
  AwardIcon,
  ShieldIcon,
} from "lucide-react"
import Link from "next/link"

// Données simulées pour un membre d'équipe spécifique
const member = {
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
  dateEmbauche: "12/03/2010",
  education: "Ingénieur en génie pétrolier - Université de Boumerdès",
  certifications: ["Certification IWCF niveau 4", "HSE niveau avancé", "Gestion de projet"],
  competences: [
    { nom: "Forage directionnel", niveau: 95 },
    { nom: "Gestion d'équipe", niveau: 90 },
    { nom: "Analyse de risques", niveau: 85 },
    { nom: "Résolution de problèmes", niveau: 92 },
    { nom: "Logiciels spécialisés", niveau: 88 },
  ],
  projetsRecents: [
    {
      nom: "HMD-42",
      role: "Chef d'équipe",
      periode: "01/07/2025 - Présent",
      description: "Supervision des opérations de forage",
    },
    {
      nom: "BRKN-11",
      role: "Chef d'équipe",
      periode: "15/05/2025 - 30/06/2025",
      description: "Supervision des opérations de forage et gestion des problèmes techniques",
    },
    {
      nom: "RKZ-17",
      role: "Chef d'équipe",
      periode: "01/03/2025 - 14/05/2025",
      description: "Supervision des opérations de forage et coordination avec les équipes de service",
    },
  ],
  evaluations: [
    {
      periode: "Q1 2025",
      performance: 92,
      commentaire: "Excellente gestion d'équipe et résolution efficace des problèmes techniques.",
    },
    {
      periode: "Q4 2024",
      performance: 90,
      commentaire: "Très bonne performance, a démontré un leadership fort dans des situations difficiles.",
    },
    {
      periode: "Q3 2024",
      performance: 88,
      commentaire: "Bonne performance globale, quelques points à améliorer dans la documentation des opérations.",
    },
  ],
}

export default function MemberDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center mb-6">
            <Link href="/users" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
              <p className="text-gray-600">
                {member.role} | {member.team} | ID: {member.id}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileTextIcon className="mr-2 h-4 w-4" />
                Exporter profil
              </Button>
              <Button className="bg-[#ED8D31] hover:bg-orange-700" size="sm">
                <UserIcon className="mr-2 h-4 w-4" />
                Modifier profil
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{member.name}</h2>
                  <p className="text-gray-500">{member.role}</p>
                  <Badge
                    className={
                      member.status === "En mission"
                        ? "bg-green-100 text-green-800 mt-2"
                        : member.status === "Disponible"
                          ? "bg-blue-100 text-blue-800 mt-2"
                          : member.status === "En formation"
                            ? "bg-amber-100 text-amber-800 mt-2"
                            : "bg-gray-100 text-gray-800 mt-2"
                    }
                  >
                    {member.status}
                  </Badge>

                  <div className="w-full mt-6 space-y-3">
                    <div className="flex items-center">
                      <BriefcaseIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-sm">{member.specialization}</p>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-sm">Expérience: {member.experience}</p>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-sm">{member.location}</p>
                    </div>
                    <div className="flex items-center">
                      <MailIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-sm">{member.email}</p>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-sm">{member.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                      <p className="text-sm">Date d'embauche: {member.dateEmbauche}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Compétences et expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {member.competences.map((competence, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{competence.nom}</span>
                        <span className="text-sm text-gray-500">{competence.niveau}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full bg-[#ED8D31]"
                          style={{ width: `${competence.niveau}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Formation et certifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <BookOpenIcon className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Éducation</p>
                        <p className="text-sm text-gray-600">{member.education}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AwardIcon className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Certifications</p>
                        <ul className="text-sm text-gray-600 list-disc list-inside ml-1">
                          {member.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="projects" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="projects">
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                Projets
              </TabsTrigger>
              <TabsTrigger value="performance">
                <AwardIcon className="h-4 w-4 mr-2" />
                Évaluations
              </TabsTrigger>
              <TabsTrigger value="security">
                <ShieldIcon className="h-4 w-4 mr-2" />
                Sécurité et accès
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des projets</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Projet</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Période</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {member.projetsRecents.map((projet, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{projet.nom}</TableCell>
                          <TableCell>{projet.role}</TableCell>
                          <TableCell>{projet.periode}</TableCell>
                          <TableCell>{projet.description}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Projets à venir</h3>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-gray-500">Aucun projet futur planifié pour le moment.</p>
                      <Button className="mt-2 bg-[#ED8D31] hover:bg-orange-700">Planifier un nouveau projet</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Évaluations de performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {member.evaluations.map((evaluation, index) => (
                      <div key={index} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">Évaluation - {evaluation.periode}</h3>
                            <p className="text-sm text-gray-500">Performance globale: {evaluation.performance}%</p>
                          </div>
                          <Badge
                            className={
                              evaluation.performance >= 90
                                ? "bg-green-100 text-green-800"
                                : evaluation.performance >= 80
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {evaluation.performance >= 90
                              ? "Excellent"
                              : evaluation.performance >= 80
                                ? "Bon"
                                : "À améliorer"}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                          <div
                            className={`h-2.5 rounded-full ${
                              evaluation.performance >= 90
                                ? "bg-green-600"
                                : evaluation.performance >= 80
                                  ? "bg-amber-500"
                                  : "bg-red-600"
                            }`}
                            style={{ width: `${evaluation.performance}%` }}
                          ></div>
                        </div>
                        <p className="text-sm">{evaluation.commentaire}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Objectifs actuels</h3>
                    <div className="space-y-3">
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Amélioration de la documentation des opérations</span>
                          <span className="text-sm text-gray-500">70% complété</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div className="h-2.5 rounded-full bg-blue-600" style={{ width: "70%" }}></div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Mettre en place un système de documentation plus rigoureux pour les opérations de forage.
                        </p>
                      </div>
                      <div className="border rounded-md p-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Formation de l'équipe sur les nouvelles technologies</span>
                          <span className="text-sm text-gray-500">40% complété</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div className="h-2.5 rounded-full bg-blue-600" style={{ width: "40%" }}></div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Former les membres de l'équipe sur les nouvelles technologies de forage directionnel.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Sécurité et accès</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Niveau d'accès</h3>
                      <div className="border rounded-md p-4">
                        <div className="flex items-center">
                          <ShieldIcon className="h-5 w-5 mr-2 text-green-600" />
                          <div>
                            <p className="font-medium">Niveau 3 - Chef d'équipe</p>
                            <p className="text-sm text-gray-600">
                              Accès complet aux données des projets, rapports et gestion d'équipe
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Zones autorisées</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Zone</TableHead>
                            <TableHead>Type d'accès</TableHead>
                            <TableHead>Validité</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Hassi Messaoud - Zone principale</TableCell>
                            <TableCell>Complet</TableCell>
                            <TableCell>Permanent</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Berkine - Zone d'opérations</TableCell>
                            <TableCell>Complet</TableCell>
                            <TableCell>Permanent</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Rhourde El Khrouf - Zone d'opérations</TableCell>
                            <TableCell>Complet</TableCell>
                            <TableCell>Permanent</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Alger - Siège administratif</TableCell>
                            <TableCell>Limité</TableCell>
                            <TableCell>Sur demande</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Certifications de sécurité</h3>
                      <div className="space-y-3">
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Formation HSE niveau avancé</p>
                              <p className="text-sm text-gray-600">Certification #HSE-2023-456</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Valide</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Expiration: 15/04/2026</p>
                        </div>
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">Certification IWCF niveau 4</p>
                              <p className="text-sm text-gray-600">Certification #IWCF-2024-789</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Valide</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Expiration: 22/09/2026</p>
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

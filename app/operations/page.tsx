import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { PlusIcon, SearchIcon, CalendarIcon, ClipboardCheckIcon, FileTextIcon, EyeIcon, EditIcon } from "lucide-react"

export default function OperationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Opérations Journalières</h1>
              <p className="text-gray-600">Suivi et gestion des opérations quotidiennes sur les puits</p>
            </div>
            <Button className="bg-[#ED8D31] hover:bg-orange-700">
              <PlusIcon className="mr-2 h-4 w-4" />
              Nouvelle Opération
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input placeholder="Rechercher une opération..." className="pl-10" />
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

                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type d'opération" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forage">Forage</SelectItem>
                      <SelectItem value="cimentation">Cimentation</SelectItem>
                      <SelectItem value="logging">Logging</SelectItem>
                      <SelectItem value="test">Test de puits</SelectItem>
                      <SelectItem value="completion">Complétion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-cours">En cours</SelectItem>
                      <SelectItem value="planifiee">Planifiée</SelectItem>
                      <SelectItem value="terminee">Terminée</SelectItem>
                      <SelectItem value="retardee">Retardée</SelectItem>
                      <SelectItem value="annulee">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="today" className="mb-6">
            <TabsList className="mb-4">
              <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
              <TabsTrigger value="week">Cette semaine</TabsTrigger>
              <TabsTrigger value="month">Ce mois</TabsTrigger>
              <TabsTrigger value="all">Toutes les opérations</TabsTrigger>
            </TabsList>

            <TabsContent value="today">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Opérations du jour - 10/07/2025</CardTitle>
                  <CardDescription>8 opérations en cours sur 5 puits différents</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Puits</TableHead>
                        <TableHead>Type d'opération</TableHead>
                        <TableHead>Équipe</TableHead>
                        <TableHead>Début</TableHead>
                        <TableHead>Fin prévue</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">HMD-42</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                            Forage - Phase 12¼"
                          </div>
                        </TableCell>
                        <TableCell>ENAFOR - Équipe A</TableCell>
                        <TableCell>08:00</TableCell>
                        <TableCell>20:00</TableCell>
                        <TableCell>
                          <Badge className="bg-orange-100 text-orange-800">En cours</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <EditIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ClipboardCheckIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">RKZ-17</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                            Logging - Diagraphie
                          </div>
                        </TableCell>
                        <TableCell>Schlumberger</TableCell>
                        <TableCell>10:30</TableCell>
                        <TableCell>16:00</TableCell>
                        <TableCell>
                          <Badge className="bg-orange-100 text-orange-800">En cours</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <EditIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ClipboardCheckIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">GLTZ-08</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            Cimentation
                          </div>
                        </TableCell>
                        <TableCell>Halliburton</TableCell>
                        <TableCell>07:00</TableCell>
                        <TableCell>14:00</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">Retardée</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <EditIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ClipboardCheckIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">BRKN-11</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                            Test de puits
                          </div>
                        </TableCell>
                        <TableCell>Weatherford</TableCell>
                        <TableCell>09:00</TableCell>
                        <TableCell>18:00</TableCell>
                        <TableCell>
                          <Badge className="bg-orange-100 text-orange-800">En cours</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <EditIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ClipboardCheckIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">HMD-39</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                            Maintenance - Pompe
                          </div>
                        </TableCell>
                        <TableCell>Maintenance interne</TableCell>
                        <TableCell>08:00</TableCell>
                        <TableCell>12:00</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-800">Terminée</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <FileTextIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="week">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Opérations de la semaine (07/07 - 13/07/2025)</CardTitle>
                  <CardDescription>32 opérations planifiées sur 12 puits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Lundi 07/07/2025</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Puits</TableHead>
                            <TableHead>Type d'opération</TableHead>
                            <TableHead>Équipe</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">HMD-42</TableCell>
                            <TableCell>Forage - Phase 12¼"</TableCell>
                            <TableCell>ENAFOR - Équipe A</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-800">Terminée</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">GLTZ-08</TableCell>
                            <TableCell>Préparation cimentation</TableCell>
                            <TableCell>Halliburton</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-800">Terminée</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Mardi 08/07/2025</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Puits</TableHead>
                            <TableHead>Type d'opération</TableHead>
                            <TableHead>Équipe</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">HMD-42</TableCell>
                            <TableCell>Forage - Phase 12¼"</TableCell>
                            <TableCell>ENAFOR - Équipe A</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-800">Terminée</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">RKZ-17</TableCell>
                            <TableCell>Préparation logging</TableCell>
                            <TableCell>Schlumberger</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-800">Terminée</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Mercredi 09/07/2025</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Puits</TableHead>
                            <TableHead>Type d'opération</TableHead>
                            <TableHead>Équipe</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">HMD-42</TableCell>
                            <TableCell>Forage - Phase 12¼"</TableCell>
                            <TableCell>ENAFOR - Équipe A</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-800">Terminée</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">BRKN-11</TableCell>
                            <TableCell>Préparation test</TableCell>
                            <TableCell>Weatherford</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-800">Terminée</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Jeudi 10/07/2025 (Aujourd'hui)</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Puits</TableHead>
                            <TableHead>Type d'opération</TableHead>
                            <TableHead>Équipe</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">HMD-42</TableCell>
                            <TableCell>Forage - Phase 12¼"</TableCell>
                            <TableCell>ENAFOR - Équipe A</TableCell>
                            <TableCell>
                              <Badge className="bg-orange-100 text-orange-800">En cours</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">RKZ-17</TableCell>
                            <TableCell>Logging - Diagraphie</TableCell>
                            <TableCell>Schlumberger</TableCell>
                            <TableCell>
                              <Badge className="bg-orange-100 text-orange-800">En cours</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Vendredi 11/07/2025</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Puits</TableHead>
                            <TableHead>Type d'opération</TableHead>
                            <TableHead>Équipe</TableHead>
                            <TableHead>Statut</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">HMD-42</TableCell>
                            <TableCell>Forage - Phase 12¼"</TableCell>
                            <TableCell>ENAFOR - Équipe A</TableCell>
                            <TableCell>
                              <Badge className="bg-gray-100 text-gray-800">Planifiée</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">ILZ-05</TableCell>
                            <TableCell>Préparation forage</TableCell>
                            <TableCell>ENTP</TableCell>
                            <TableCell>
                              <Badge className="bg-gray-100 text-gray-800">Planifiée</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rapports à soumettre</CardTitle>
                <CardDescription>Rapports journaliers en attente de soumission</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">Rapport journalier - HMD-42</div>
                      <div className="text-sm text-gray-500">Forage - Phase 12¼" - 09/07/2025</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Remplir
                    </Button>
                  </div>

                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">Rapport journalier - RKZ-17</div>
                      <div className="text-sm text-gray-500">Préparation logging - 09/07/2025</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Remplir
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Rapport journalier - BRKN-11</div>
                      <div className="text-sm text-gray-500">Préparation test - 09/07/2025</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Remplir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prochaines opérations</CardTitle>
                <CardDescription>Opérations planifiées pour les prochains jours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">Démarrage forage - ILZ-05</div>
                      <div className="text-sm text-gray-500">11/07/2025 - ENTP</div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Dans 1 jour</Badge>
                  </div>

                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">Run casing 9⅝" - HMD-42</div>
                      <div className="text-sm text-gray-500">12/07/2025 - ENAFOR</div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Dans 2 jours</Badge>
                  </div>

                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="font-medium">Cimentation - RKZ-17</div>
                      <div className="text-sm text-gray-500">13/07/2025 - Halliburton</div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Dans 3 jours</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Perforation - HBK-23</div>
                      <div className="text-sm text-gray-500">15/07/2025 - Schlumberger</div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Dans 5 jours</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

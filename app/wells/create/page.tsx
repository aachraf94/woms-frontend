"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { MapPinIcon, SaveIcon, XIcon, ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

export default function CreateWellPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simuler la création
    setTimeout(() => {
      router.push("/wells")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <DashboardNav />

        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center mb-6">
            <Link href="/wells" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Création d'un Nouveau Puits</h1>
              <p className="text-gray-600">Renseignez les informations du nouveau puits à forer</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="technical">Informations techniques</TabsTrigger>
                <TabsTrigger value="planning">Planning & Budget</TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="well-name">Nom du puits *</Label>
                        <Input id="well-name" placeholder="ex: HMD-45" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="well-type">Type de puits *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="exploration">Exploration</SelectItem>
                            <SelectItem value="delineation">Délinéation</SelectItem>
                            <SelectItem value="development">Développement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Localisation *</Label>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="basin" className="text-sm text-gray-500">
                            Bassin
                          </Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hassi-messaoud">Hassi Messaoud</SelectItem>
                              <SelectItem value="berkine">Berkine</SelectItem>
                              <SelectItem value="illizi">Illizi</SelectItem>
                              <SelectItem value="rhourde-nouss">Rhourde Nouss</SelectItem>
                              <SelectItem value="ahnet">Ahnet</SelectItem>
                              <SelectItem value="tinrhert">Tinrhert</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="bloc" className="text-sm text-gray-500">
                            Bloc/Périmètre
                          </Label>
                          <Input id="bloc" placeholder="ex: 405a" />
                        </div>

                        <div>
                          <Label htmlFor="field" className="text-sm text-gray-500">
                            Champ
                          </Label>
                          <Input id="field" placeholder="ex: HMD" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Coordonnées *</Label>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="latitude" className="text-sm text-gray-500">
                            Latitude (Nord)
                          </Label>
                          <Input id="latitude" placeholder="ex: 31.6738" required />
                        </div>

                        <div>
                          <Label htmlFor="longitude" className="text-sm text-gray-500">
                            Longitude (Est)
                          </Label>
                          <Input id="longitude" placeholder="ex: 5.8898" required />
                        </div>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm" type="button">
                          <MapPinIcon className="mr-2 h-4 w-4" />
                          Sélectionner sur la carte
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Description du puits et de ses objectifs"
                        className="h-24"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical">
                <Card>
                  <CardHeader>
                    <CardTitle>Détails techniques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="target-depth">Profondeur cible (m) *</Label>
                        <Input id="target-depth" type="number" placeholder="ex: 3500" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="well-trajectory">Trajectoire du puits *</Label>
                        <RadioGroup defaultValue="vertical">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="vertical" id="vertical" />
                            <Label htmlFor="vertical">Vertical</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="directional" id="directional" />
                            <Label htmlFor="directional">Directionnel</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="horizontal" id="horizontal" />
                            <Label htmlFor="horizontal">Horizontal</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Réservoirs cibles *</Label>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="reservoir1" className="text-sm text-gray-500">
                            Réservoir principal
                          </Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cambro-ordovicien">Cambro-Ordovicien</SelectItem>
                              <SelectItem value="triassique">Triassique</SelectItem>
                              <SelectItem value="trias-argileux">Trias Argileux</SelectItem>
                              <SelectItem value="tagi">TAGI</SelectItem>
                              <SelectItem value="lias">Lias</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="reservoir2" className="text-sm text-gray-500">
                            Réservoir secondaire
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cambro-ordovicien">Cambro-Ordovicien</SelectItem>
                              <SelectItem value="triassique">Triassique</SelectItem>
                              <SelectItem value="trias-argileux">Trias Argileux</SelectItem>
                              <SelectItem value="tagi">TAGI</SelectItem>
                              <SelectItem value="lias">Lias</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="reservoir3" className="text-sm text-gray-500">
                            Réservoir tertiaire
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cambro-ordovicien">Cambro-Ordovicien</SelectItem>
                              <SelectItem value="triassique">Triassique</SelectItem>
                              <SelectItem value="trias-argileux">Trias Argileux</SelectItem>
                              <SelectItem value="tagi">TAGI</SelectItem>
                              <SelectItem value="lias">Lias</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Programme de forage</Label>
                      <div className="border rounded-md">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="py-2 px-4 text-left text-sm font-medium">Phase</th>
                              <th className="py-2 px-4 text-left text-sm font-medium">Diamètre</th>
                              <th className="py-2 px-4 text-left text-sm font-medium">Profondeur (m)</th>
                              <th className="py-2 px-4 text-left text-sm font-medium">Tubage</th>
                              <th className="py-2 px-4 text-left text-sm font-medium"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2 px-4">Phase 1</td>
                              <td className="py-2 px-4">
                                <Select>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Diamètre" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="36">36"</SelectItem>
                                    <SelectItem value="26">26"</SelectItem>
                                    <SelectItem value="17.5">17½"</SelectItem>
                                    <SelectItem value="16">16"</SelectItem>
                                    <SelectItem value="12.25">12¼"</SelectItem>
                                    <SelectItem value="8.5">8½"</SelectItem>
                                    <SelectItem value="6">6"</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-2 px-4">
                                <Input placeholder="Profondeur" className="h-8" />
                              </td>
                              <td className="py-2 px-4">
                                <Select>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="30">30"</SelectItem>
                                    <SelectItem value="20">20"</SelectItem>
                                    <SelectItem value="13-3-8">13⅜"</SelectItem>
                                    <SelectItem value="9-5-8">9⅝"</SelectItem>
                                    <SelectItem value="7">7"</SelectItem>
                                    <SelectItem value="liner">Liner</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="py-2 px-4">
                                <Button variant="ghost" size="icon" type="button">
                                  <XIcon className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="p-2 flex justify-end">
                          <Button variant="outline" size="sm" type="button">
                            Ajouter une phase
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="planning">
                <Card>
                  <CardHeader>
                    <CardTitle>Planning et budget</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Date de début prévue *</Label>
                        <Input id="start-date" type="date" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="end-date">Date de fin prévue *</Label>
                        <Input id="end-date" type="date" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget total estimé (MDA) *</Label>
                        <Input id="budget" type="number" placeholder="ex: 450" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="drilling-days">Jours de forage estimés *</Label>
                        <Input id="drilling-days" type="number" placeholder="ex: 45" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contractor">Prestataire de forage</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un prestataire" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enafor">ENAFOR</SelectItem>
                          <SelectItem value="entp">ENTP</SelectItem>
                          <SelectItem value="sino-algeria">Sino-Algeria Petroleum</SelectItem>
                          <SelectItem value="schlumberger">Schlumberger</SelectItem>
                          <SelectItem value="halliburton">Halliburton</SelectItem>
                          <SelectItem value="baker-hughes">Baker Hughes</SelectItem>
                          <SelectItem value="weatherford">Weatherford</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="team">Équipe responsable</Label>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="manager" className="text-sm text-gray-500">
                            Manager
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manager1">Karim Benali</SelectItem>
                              <SelectItem value="manager2">Meriem Boudiaf</SelectItem>
                              <SelectItem value="manager3">Youcef Hamidi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="geologist" className="text-sm text-gray-500">
                            Géologue
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="geo1">Ahmed Khelil</SelectItem>
                              <SelectItem value="geo2">Naima Benziane</SelectItem>
                              <SelectItem value="geo3">Omar Fekkar</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="engineer" className="text-sm text-gray-500">
                            Ingénieur forage
                          </Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eng1">Salim Hadj</SelectItem>
                              <SelectItem value="eng2">Yasmine Alloui</SelectItem>
                              <SelectItem value="eng3">Farid Bensalem</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" onClick={() => router.push("/wells")}>
                Annuler
              </Button>
              <Button className="bg-[#ED8D31] hover:bg-orange-700" type="submit" disabled={loading}>
                {loading ? (
                  "Création en cours..."
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Créer le puits
                  </>
                )}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

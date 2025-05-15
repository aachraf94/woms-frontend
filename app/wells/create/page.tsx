"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createWell } from "@/app/actions/well-actions"
import { parseDrillingPhasesCSV, parseBudgetCSV } from "@/lib/utils/csv-parser"
import DashboardHeader from "@/components/dashboard-header"
import DashboardNav from "@/components/dashboard-nav"
import { MapPinIcon, SaveIcon, XIcon, ArrowLeftIcon, UploadIcon, PlusIcon } from "lucide-react"
import Link from "next/link"

export default function CreateWellPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formState, setFormState] = useState({
    wellType: "",
    basin: "",
    trajectory: "vertical",
    primaryReservoir: "",
    contractor: "",
  })

  // Références pour les inputs de fichier
  const phasesFileInputRef = useRef<HTMLInputElement>(null)
  const budgetFileInputRef = useRef<HTMLInputElement>(null)

  // État pour les phases de forage
  const [drillingPhases, setDrillingPhases] = useState([
    {
      number: 1,
      diameter: "",
      depth: 0,
      casing: "",
      duration: 0,
    },
  ])

  // État pour les opérations budgétaires
  const [budgetOperations, setBudgetOperations] = useState([
    {
      operation: "",
      cost: 0,
      duration: 0,
    },
  ])

  const handleSelectChange = (field: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleRadioChange = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      trajectory: value,
    }))
  }

  // Fonction pour ajouter une nouvelle phase de forage
  const addDrillingPhase = () => {
    setDrillingPhases((prev) => [
      ...prev,
      {
        number: prev.length + 1,
        diameter: "",
        depth: 0,
        casing: "",
        duration: 0,
      },
    ])
  }

  // Fonction pour supprimer une phase de forage
  const removeDrillingPhase = (index: number) => {
    setDrillingPhases((prev) => prev.filter((_, i) => i !== index))
  }

  // Fonction pour mettre à jour une phase de forage
  const updateDrillingPhase = (index: number, field: string, value: any) => {
    setDrillingPhases((prev) => prev.map((phase, i) => (i === index ? { ...phase, [field]: value } : phase)))
  }

  // Fonction pour ajouter une nouvelle opération budgétaire
  const addBudgetOperation = () => {
    setBudgetOperations((prev) => [
      ...prev,
      {
        operation: "",
        cost: 0,
        duration: 0,
      },
    ])
  }

  // Fonction pour supprimer une opération budgétaire
  const removeBudgetOperation = (index: number) => {
    setBudgetOperations((prev) => prev.filter((_, i) => i !== index))
  }

  // Fonction pour mettre à jour une opération budgétaire
  const updateBudgetOperation = (index: number, field: string, value: any) => {
    setBudgetOperations((prev) => prev.map((op, i) => (i === index ? { ...op, [field]: value } : op)))
  }

  // Fonction pour importer les phases de forage depuis un fichier CSV
  const handlePhasesImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const result = await parseDrillingPhasesCSV(file)

      if (result.success && result.phases) {
        setDrillingPhases(result.phases)
        toast({
          title: "Import réussi",
          description: `${result.phases.length} phases importées avec succès.`,
          variant: "default",
        })
      } else {
        toast({
          title: "Erreur d'importation",
          description: result.error || "Erreur lors de l'importation du fichier.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'importation du fichier.",
        variant: "destructive",
      })
    }

    // Réinitialiser l'input file pour permettre de réimporter le même fichier
    if (phasesFileInputRef.current) {
      phasesFileInputRef.current.value = ""
    }
  }

  // Fonction pour importer les coûts prévisionnels depuis un fichier CSV
  const handleBudgetImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const result = await parseBudgetCSV(file)

      if (result.success) {
        // Mettre à jour les champs du formulaire avec les données importées
        const budgetInput = document.getElementById("budget") as HTMLInputElement
        const drillingDaysInput = document.getElementById("drilling-days") as HTMLInputElement

        if (budgetInput) budgetInput.value = result.budget.toString()
        if (drillingDaysInput) drillingDaysInput.value = result.drillingDays.toString()

        // Mettre à jour le tableau des opérations budgétaires
        setBudgetOperations(result.details)

        toast({
          title: "Import réussi",
          description: `Budget et détails des opérations importés avec succès.`,
          variant: "default",
        })
      } else {
        toast({
          title: "Erreur d'importation",
          description: result.error || "Erreur lors de l'importation du fichier.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'importation du fichier.",
        variant: "destructive",
      })
    }

    // Réinitialiser l'input file pour permettre de réimporter le même fichier
    if (budgetFileInputRef.current) {
      budgetFileInputRef.current.value = ""
    }
  }

  // Calculer le budget total à partir des opérations
  const calculateTotalBudget = () => {
    return budgetOperations.reduce((total, op) => total + op.cost, 0)
  }

  // Calculer la durée totale à partir des opérations
  const calculateTotalDuration = () => {
    return budgetOperations.reduce((total, op) => total + op.duration, 0)
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)

    try {
      // Validation des champs obligatoires
      const wellName = formData.get("well-name") as string
      const wellType = formData.get("well-type") as string
      const basin = formData.get("basin") as string
      const latitude = formData.get("latitude") as string
      const longitude = formData.get("longitude") as string
      const targetDepth = formData.get("target-depth") as string
      const startDate = formData.get("start-date") as string
      const endDate = formData.get("end-date") as string
      const budget = formData.get("budget") as string
      const drillingDays = formData.get("drilling-days") as string

      // Vérification des champs obligatoires
      if (
        !wellName ||
        !wellType ||
        !basin ||
        !latitude ||
        !longitude ||
        !targetDepth ||
        !startDate ||
        !endDate ||
        !budget ||
        !drillingDays
      ) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez remplir tous les champs obligatoires",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Validation des dates
      const start = new Date(startDate)
      const end = new Date(endDate)
      if (end <= start) {
        toast({
          title: "Erreur de validation",
          description: "La date de fin doit être postérieure à la date de début",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Validation des valeurs numériques
      if (isNaN(Number.parseFloat(targetDepth)) || Number.parseFloat(targetDepth) <= 0) {
        toast({
          title: "Erreur de validation",
          description: "La profondeur cible doit être un nombre positif",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      if (isNaN(Number.parseFloat(budget)) || Number.parseFloat(budget) <= 0) {
        toast({
          title: "Erreur de validation",
          description: "Le budget doit être un nombre positif",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      if (isNaN(Number.parseFloat(drillingDays)) || Number.parseFloat(drillingDays) <= 0) {
        toast({
          title: "Erreur de validation",
          description: "Le nombre de jours de forage doit être un nombre positif",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Ajouter les phases de forage au formData
      drillingPhases.forEach((phase, index) => {
        if (!phase.diameter || phase.depth <= 0 || !phase.casing) {
          toast({
            title: "Erreur de validation",
            description: `Veuillez compléter toutes les informations pour la phase ${index + 1}`,
            variant: "destructive",
          })
          setLoading(false)
          return
        }

        formData.append(`phase${index + 1}-diameter`, phase.diameter)
        formData.append(`phase${index + 1}-depth`, phase.depth.toString())
        formData.append(`phase${index + 1}-casing`, phase.casing)
        formData.append(`phase${index + 1}-duration`, phase.duration.toString())
      })

      // Ajouter les opérations budgétaires au formData
      let totalBudget = 0
      let totalDuration = 0

      budgetOperations.forEach((op, index) => {
        if (!op.operation || op.cost <= 0) {
          toast({
            title: "Erreur de validation",
            description: `Veuillez compléter toutes les informations pour l'opération ${index + 1}`,
            variant: "destructive",
          })
          setLoading(false)
          return
        }

        formData.append(`operation${index + 1}-name`, op.operation)
        formData.append(`operation${index + 1}-cost`, op.cost.toString())
        formData.append(`operation${index + 1}-duration`, op.duration.toString())

        totalBudget += op.cost
        totalDuration += op.duration
      })

      // Mettre à jour le budget total et la durée totale si des opérations sont définies
      if (budgetOperations.length > 0) {
        formData.set("budget", totalBudget.toString())
        formData.set("drilling-days", totalDuration.toString())
      }

      // Générer un ID de projet basé sur le bassin et le champ
      const field = (formData.get("field") as string) || ""
      const basinPrefix = basin.substring(0, 3).toUpperCase()
      const fieldPrefix = field ? field.substring(0, 2).toUpperCase() : "XX"
      const randomNum = Math.floor(Math.random() * 100)
        .toString()
        .padStart(2, "0")
      const projectId = `${basinPrefix}-${fieldPrefix}${randomNum}`

      // Ajouter l'ID généré au formData
      formData.append("project-id", projectId)

      // Simuler un délai réseau pour l'appel API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Créer un nouvel objet projet à partir des données du formulaire
      const newProject = {
        id: projectId,
        name: wellName,
        type: wellType,
        basin: basin,
        field: field,
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
        description: (formData.get("description") as string) || "",
        targetDepth: Number.parseFloat(targetDepth),
        trajectory: (formData.get("trajectory") as string) || "vertical",
        primaryReservoir: (formData.get("reservoir1") as string) || "",
        secondaryReservoir: (formData.get("reservoir2") as string) || "",
        tertiaryReservoir: (formData.get("reservoir3") as string) || "",
        startDate: startDate,
        endDate: endDate,
        budget: Number.parseFloat(budget),
        drillingDays: Number.parseFloat(drillingDays),
        contractor: (formData.get("contractor") as string) || "",
        status: "planned",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        team: {
          manager: (formData.get("manager") as string) || "",
          geologist: (formData.get("geologist") as string) || "",
          engineer: (formData.get("engineer") as string) || "",
        },
        drillingProgram: {
          phases: drillingPhases.map((phase) => ({
            number: phase.number,
            diameter: phase.diameter,
            depth: phase.depth,
            casing: phase.casing,
            duration: phase.duration,
          })),
        },
        budgetDetails: {
          operations: budgetOperations.map((op) => ({
            name: op.operation,
            cost: op.cost,
            duration: op.duration,
          })),
        },
      }

      // Appel au service de création de projet (simulé ici)
      const result = await createWell(formData)

      if (result.success) {
        // Afficher un message de succès
        toast({
          title: "Projet créé avec succès",
          description: `Le projet ${projectId} a été créé avec succès`,
          variant: "default",
        })

        // Redirection vers la liste des projets après un court délai
        setTimeout(() => {
          router.push("/wells")
        }, 1500)
      } else {
        // Afficher un message d'erreur
        toast({
          title: "Erreur",
          description: result.message || "Une erreur est survenue lors de la création du projet",
          variant: "destructive",
        })
        setLoading(false)
      }
    } catch (error) {
      console.error("Erreur lors de la création du projet:", error)
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue lors de la création du projet",
        variant: "destructive",
      })
      setLoading(false)
    }
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
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Création d'un Nouveau Projet</h1>
              <p className="text-gray-600">Renseignez les informations du nouveau projet pétrolier</p>
            </div>
          </div>

          <form action={handleSubmit}>
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
                        <Label htmlFor="well-name">Nom du projet *</Label>
                        <Input id="well-name" name="well-name" placeholder="ex: Hassi Messaoud 45" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="well-type">Type de projet *</Label>
                        <Select
                          name="well-type"
                          value={formState.wellType}
                          onValueChange={(value) => handleSelectChange("wellType", value)}
                          required
                        >
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
                          <Select
                            name="basin"
                            value={formState.basin}
                            onValueChange={(value) => handleSelectChange("basin", value)}
                            required
                          >
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
                          <Input id="bloc" name="bloc" placeholder="ex: 405a" />
                        </div>

                        <div>
                          <Label htmlFor="field" className="text-sm text-gray-500">
                            Champ
                          </Label>
                          <Input id="field" name="field" placeholder="ex: HMD" />
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
                          <Input id="latitude" name="latitude" placeholder="ex: 31.6738" required />
                        </div>

                        <div>
                          <Label htmlFor="longitude" className="text-sm text-gray-500">
                            Longitude (Est)
                          </Label>
                          <Input id="longitude" name="longitude" placeholder="ex: 5.8898" required />
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
                        name="description"
                        placeholder="Description du projet et de ses objectifs"
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
                        <Input id="target-depth" name="target-depth" type="number" placeholder="ex: 3500" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="well-trajectory">Trajectoire du forage *</Label>
                        <RadioGroup
                          defaultValue="vertical"
                          value={formState.trajectory}
                          onValueChange={handleRadioChange}
                          name="trajectory"
                        >
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
                          <Select
                            name="reservoir1"
                            value={formState.primaryReservoir}
                            onValueChange={(value) => handleSelectChange("primaryReservoir", value)}
                            required
                          >
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
                          <Select name="reservoir2">
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
                          <Select name="reservoir3">
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
                      <div className="flex justify-between items-center">
                        <Label>Programme de forage</Label>
                        <div className="flex gap-2">
                          {/* Bouton d'importation pour les phases prévisionnelles */}
                          <input
                            type="file"
                            ref={phasesFileInputRef}
                            onChange={handlePhasesImport}
                            accept=".csv"
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => phasesFileInputRef.current?.click()}
                          >
                            <UploadIcon className="mr-2 h-4 w-4" />
                            Importer CSV
                          </Button>
                        </div>
                      </div>
                      <div className="border rounded-md">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="py-2 px-4 text-left text-sm font-medium">Phase</th>
                              <th className="py-2 px-4 text-left text-sm font-medium">Diamètre</th>
                              <th className="py-2 px-4 text-left text-sm font-medium">Profondeur (m)</th>
                              <th className="py-2 px-4 text-left text-sm font-medium">Tubage</th>
                              <th className="py-2 px-4 text-left text-sm font-medium">Durée (jours)</th>
                              <th className="py-2 px-4 text-left text-sm font-medium"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {drillingPhases.map((phase, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-2 px-4">Phase {phase.number}</td>
                                <td className="py-2 px-4">
                                  <Select
                                    value={phase.diameter}
                                    onValueChange={(value) => updateDrillingPhase(index, "diameter", value)}
                                  >
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
                                  <Input
                                    value={phase.depth || ""}
                                    onChange={(e) =>
                                      updateDrillingPhase(index, "depth", Number.parseFloat(e.target.value) || 0)
                                    }
                                    placeholder="Profondeur"
                                    className="h-8"
                                    type="number"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Select
                                    value={phase.casing}
                                    onValueChange={(value) => updateDrillingPhase(index, "casing", value)}
                                  >
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
                                  <Input
                                    value={phase.duration || ""}
                                    onChange={(e) =>
                                      updateDrillingPhase(index, "duration", Number.parseFloat(e.target.value) || 0)
                                    }
                                    placeholder="Durée"
                                    className="h-8"
                                    type="number"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={() => removeDrillingPhase(index)}
                                    disabled={drillingPhases.length === 1}
                                  >
                                    <XIcon className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="p-2 flex justify-end">
                          <Button variant="outline" size="sm" type="button" onClick={addDrillingPhase}>
                            <PlusIcon className="mr-2 h-4 w-4" />
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
                    <div className="flex justify-end mb-2">
                      {/* Bouton d'importation pour les coûts prévisionnels */}
                      <input
                        type="file"
                        ref={budgetFileInputRef}
                        onChange={handleBudgetImport}
                        accept=".csv"
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => budgetFileInputRef.current?.click()}
                      >
                        <UploadIcon className="mr-2 h-4 w-4" />
                        Importer CSV
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Date de début prévue *</Label>
                        <Input id="start-date" name="start-date" type="date" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="end-date">Date de fin prévue *</Label>
                        <Input id="end-date" name="end-date" type="date" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget total estimé (MDA) *</Label>
                        <Input
                          id="budget"
                          name="budget"
                          type="number"
                          placeholder="ex: 450"
                          required
                          value={budgetOperations.length > 0 ? calculateTotalBudget() : undefined}
                          readOnly={budgetOperations.length > 0}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="drilling-days">Jours de forage estimés *</Label>
                        <Input
                          id="drilling-days"
                          name="drilling-days"
                          type="number"
                          placeholder="ex: 45"
                          required
                          value={budgetOperations.length > 0 ? calculateTotalDuration() : undefined}
                          readOnly={budgetOperations.length > 0}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contractor">Prestataire de forage</Label>
                      <Select
                        name="contractor"
                        value={formState.contractor}
                        onValueChange={(value) => handleSelectChange("contractor", value)}
                      >
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

                    {/* Tableau des coûts prévisionnels par opération */}
                    <div className="space-y-2">
                      <Label>Coûts prévisionnels par opération</Label>
                      <div className="border rounded-md">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="py-2 px-4 text-left text-sm font-medium">Opération</th>
                              <th className="py-2 px-4 text-left text-sm font-medium">Coût (MDA)</th>
                              <th className="py-2 px-4 text-left text-sm font-medium">Durée (jours)</th>
                              <th className="py-2 px-4 text-left text-sm font-medium"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {budgetOperations.map((op, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-2 px-4">
                                  <Input
                                    value={op.operation}
                                    onChange={(e) => updateBudgetOperation(index, "operation", e.target.value)}
                                    placeholder="Nom de l'opération"
                                    className="h-8"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Input
                                    value={op.cost || ""}
                                    onChange={(e) =>
                                      updateBudgetOperation(index, "cost", Number.parseFloat(e.target.value) || 0)
                                    }
                                    placeholder="Coût"
                                    className="h-8"
                                    type="number"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Input
                                    value={op.duration || ""}
                                    onChange={(e) =>
                                      updateBudgetOperation(index, "duration", Number.parseFloat(e.target.value) || 0)
                                    }
                                    placeholder="Durée"
                                    className="h-8"
                                    type="number"
                                  />
                                </td>
                                <td className="py-2 px-4">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={() => removeBudgetOperation(index)}
                                  >
                                    <XIcon className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                            {budgetOperations.length === 0 && (
                              <tr>
                                <td colSpan={4} className="py-4 text-center text-gray-500">
                                  Aucune opération définie. Importez un fichier CSV ou ajoutez manuellement des
                                  opérations.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <div className="p-2 flex justify-end">
                          <Button variant="outline" size="sm" type="button" onClick={addBudgetOperation}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Ajouter une opération
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="team">Équipe responsable</Label>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <Label htmlFor="manager" className="text-sm text-gray-500">
                            Manager
                          </Label>
                          <Select name="manager">
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
                          <Select name="geologist">
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
                          <Select name="engineer">
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
                    Créer le projet
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

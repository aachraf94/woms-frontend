"use server"

import { revalidatePath } from "next/cache"
import { WellService } from "@/lib/services/well-service"
import { validateWellData } from "@/lib/validation"

export type WellFormData = {
  name: string
  type: string
  basin: string
  bloc: string
  field: string
  latitude: string
  longitude: string
  description: string
  targetDepth: string
  trajectory: string
  primaryReservoir: string
  secondaryReservoir: string
  tertiaryReservoir: string
  startDate: string
  endDate: string
  budget: string
  drillingDays: string
  contractor: string
  manager: string
  geologist: string
  engineer: string
}

export async function createWell(formData: FormData) {
  try {
    // Extraire les données du formulaire
    const wellData: Partial<WellFormData> = {
      name: formData.get("well-name") as string,
      type: formData.get("well-type") as string,
      basin: formData.get("basin") as string,
      bloc: formData.get("bloc") as string,
      field: formData.get("field") as string,
      latitude: formData.get("latitude") as string,
      longitude: formData.get("longitude") as string,
      description: formData.get("description") as string,
      targetDepth: formData.get("target-depth") as string,
      trajectory: formData.get("trajectory") as string,
      primaryReservoir: formData.get("reservoir1") as string,
      secondaryReservoir: formData.get("reservoir2") as string,
      tertiaryReservoir: formData.get("reservoir3") as string,
      startDate: formData.get("start-date") as string,
      endDate: formData.get("end-date") as string,
      budget: formData.get("budget") as string,
      drillingDays: formData.get("drilling-days") as string,
      contractor: formData.get("contractor") as string,
      manager: formData.get("manager") as string,
      geologist: formData.get("geologist") as string,
      engineer: formData.get("engineer") as string,
    }

    // Validation des données
    const validation = validateWellData(wellData)
    if (!validation.isValid) {
      return {
        success: false,
        message: "Validation échouée",
        errors: validation.errors,
      }
    }

    // Collecter les phases de forage
    const drillingPhases = []
    let phaseIndex = 1

    while (formData.has(`phase${phaseIndex}-diameter`)) {
      drillingPhases.push({
        number: phaseIndex,
        diameter: formData.get(`phase${phaseIndex}-diameter`) as string,
        depth: Number.parseFloat(formData.get(`phase${phaseIndex}-depth`) as string) || 0,
        casing: formData.get(`phase${phaseIndex}-casing`) as string,
        duration: Number.parseFloat(formData.get(`phase${phaseIndex}-duration`) as string) || 0,
      })
      phaseIndex++
    }

    // Collecter les opérations budgétaires
    const budgetOperations = []
    let operationIndex = 1

    while (formData.has(`operation${operationIndex}-name`)) {
      budgetOperations.push({
        name: formData.get(`operation${operationIndex}-name`) as string,
        cost: Number.parseFloat(formData.get(`operation${operationIndex}-cost`) as string) || 0,
        duration: Number.parseFloat(formData.get(`operation${operationIndex}-duration`) as string) || 0,
      })
      operationIndex++
    }

    // Préparer les données pour le service
    const wellInput = {
      name: wellData.name!,
      type: wellData.type as "exploration" | "delineation" | "development",
      basin: wellData.basin!,
      bloc: wellData.bloc,
      field: wellData.field,
      latitude: Number.parseFloat(wellData.latitude!),
      longitude: Number.parseFloat(wellData.longitude!),
      description: wellData.description,
      targetDepth: Number.parseFloat(wellData.targetDepth!),
      trajectory: wellData.trajectory as "vertical" | "directional" | "horizontal",
      primaryReservoir: wellData.primaryReservoir!,
      secondaryReservoir: wellData.secondaryReservoir,
      tertiaryReservoir: wellData.tertiaryReservoir,
      startDate: wellData.startDate!,
      endDate: wellData.endDate!,
      budget: Number.parseFloat(wellData.budget!),
      drillingDays: Number.parseInt(wellData.drillingDays!),
      team: {
        manager: wellData.manager,
        geologist: wellData.geologist,
        engineer: wellData.engineer,
      },
      contractor: wellData.contractor,
      drillingProgram: {
        phases: drillingPhases,
      },
      budgetDetails: {
        operations: budgetOperations,
      },
    }

    // Créer le puits via le service
    const newWell = await WellService.createWell(wellInput)

    // Révalidation du chemin pour mettre à jour les données affichées
    revalidatePath("/wells")

    return {
      success: true,
      message: `Puits ${newWell.id} créé avec succès`,
      data: newWell,
    }
  } catch (error) {
    console.error("Erreur lors de la création du puits:", error)
    return {
      success: false,
      message: "Une erreur est survenue lors de la création du puits",
    }
  }
}

export async function getWells() {
  try {
    const wells = await WellService.getAllWells()
    return { success: true, data: wells }
  } catch (error) {
    console.error("Erreur lors de la récupération des puits:", error)
    return { success: false, message: "Erreur lors de la récupération des puits" }
  }
}

export async function getWellById(id: string) {
  try {
    const well = await WellService.getWellById(id)
    if (!well) {
      return { success: false, message: "Puits non trouvé" }
    }
    return { success: true, data: well }
  } catch (error) {
    console.error(`Erreur lors de la récupération du puits ${id}:`, error)
    return { success: false, message: "Erreur lors de la récupération du puits" }
  }
}

import { type Well, type WellFormInput, generateWellId } from "../models/well"

// Simuler une base de données en mémoire
let wells: Well[] = []

export const WellService = {
  // Créer un nouveau puits
  createWell: async (wellData: WellFormInput): Promise<Well> => {
    // Générer un ID unique
    const id = generateWellId(wellData.basin, wellData.field || "")

    // Créer le nouveau puits
    const newWell: Well = {
      ...wellData,
      id,
      status: "planned",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      latitude: Number.parseFloat(wellData.latitude as unknown as string),
      longitude: Number.parseFloat(wellData.longitude as unknown as string),
      targetDepth: Number.parseFloat(wellData.targetDepth as unknown as string),
      budget: Number.parseFloat(wellData.budget as unknown as string),
      drillingDays: Number.parseFloat(wellData.drillingDays as unknown as string),
      team: {
        manager: wellData.team?.manager,
        geologist: wellData.team?.geologist,
        engineer: wellData.team?.engineer,
      },
    }

    // Ajouter à notre "base de données"
    wells.push(newWell)

    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 500))

    return newWell
  },

  // Récupérer tous les puits
  getAllWells: async (): Promise<Well[]> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return wells
  },

  // Récupérer un puits par son ID
  getWellById: async (id: string): Promise<Well | null> => {
    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 200))

    const well = wells.find((w) => w.id === id)
    return well || null
  },

  // Mettre à jour un puits
  updateWell: async (id: string, wellData: Partial<WellFormInput>): Promise<Well | null> => {
    // Trouver l'index du puits
    const index = wells.findIndex((w) => w.id === id)
    if (index === -1) return null

    // Mettre à jour le puits
    wells[index] = {
      ...wells[index],
      ...wellData,
      updatedAt: new Date().toISOString(),
    }

    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 400))

    return wells[index]
  },

  // Supprimer un puits
  deleteWell: async (id: string): Promise<boolean> => {
    const initialLength = wells.length
    wells = wells.filter((w) => w.id !== id)

    // Simuler un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 300))

    return wells.length < initialLength
  },
}

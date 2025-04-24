import { type Well, type WellFormInput, generateWellId } from "../models/well"

// Données initiales de puits pour remplir la liste
let wells: Well[] = [
  {
    id: "HMD-42",
    name: "HMD-42",
    type: "development",
    basin: "hassi-messaoud",
    bloc: "405a",
    field: "HMD",
    latitude: 31.6738,
    longitude: 5.8898,
    description: "Puits de développement dans la zone centrale du champ de Hassi Messaoud",
    targetDepth: 3500,
    trajectory: "vertical",
    primaryReservoir: "TAGI",
    secondaryReservoir: "Cambro-Ordovicien",
    startDate: "2025-07-01",
    endDate: "2025-08-15",
    budget: 450,
    drillingDays: 45,
    contractor: "ENAFOR",
    team: {
      manager: "Karim Benali",
      geologist: "Ahmed Khelil",
      engineer: "Salim Hadj",
    },
    drillingProgram: {
      phases: [
        {
          number: 1,
          diameter: "26",
          depth: 150,
          casing: "20",
          duration: 3,
        },
        {
          number: 2,
          diameter: "17.5",
          depth: 450,
          casing: "13-3-8",
          duration: 5,
        },
        {
          number: 3,
          diameter: "12.25",
          depth: 850,
          casing: "9-5-8",
          duration: 7,
        },
        {
          number: 4,
          diameter: "8.5",
          depth: 3500,
          casing: "7",
          duration: 30,
        },
      ],
    },
    budgetDetails: {
      operations: [
        {
          name: "Services de forage",
          cost: 250,
          duration: 45,
        },
        {
          name: "Matériel et équipement",
          cost: 130,
          duration: 0,
        },
        {
          name: "Services support",
          cost: 70,
          duration: 0,
        },
      ],
    },
    status: "in_progress",
    createdAt: "2025-06-15T10:30:00Z",
    updatedAt: "2025-07-07T09:45:00Z",
  },
  {
    id: "RKZ-17",
    name: "RKZ-17",
    type: "development",
    basin: "rhourde-el-khrouf",
    bloc: "401c",
    field: "RKZ",
    latitude: 30.9876,
    longitude: 6.1234,
    description: "Puits de développement dans le champ de Rhourde El Khrouf",
    targetDepth: 2800,
    trajectory: "directional",
    primaryReservoir: "Triassique",
    startDate: "2025-06-15",
    endDate: "2025-07-30",
    budget: 380,
    drillingDays: 35,
    contractor: "ENTP",
    team: {
      manager: "Meriem Boudiaf",
      geologist: "Naima Benziane",
      engineer: "Farid Bensalem",
    },
    status: "in_progress",
    createdAt: "2025-05-20T08:15:00Z",
    updatedAt: "2025-07-07T11:30:00Z",
  },
  {
    id: "GLTZ-08",
    name: "GLTZ-08",
    type: "delineation",
    basin: "guellala",
    bloc: "403b",
    field: "GLTZ",
    latitude: 31.2345,
    longitude: 5.6789,
    description: "Puits de délinéation pour évaluer l'extension du réservoir",
    targetDepth: 3200,
    trajectory: "vertical",
    primaryReservoir: "Lias",
    startDate: "2025-06-20",
    endDate: "2025-08-05",
    budget: 420,
    drillingDays: 40,
    contractor: "ENAFOR",
    status: "in_progress",
    createdAt: "2025-05-25T14:20:00Z",
    updatedAt: "2025-07-07T08:45:00Z",
  },
  {
    id: "BRKN-11",
    name: "BRKN-11",
    type: "exploration",
    basin: "berkine",
    bloc: "404a",
    field: "BRKN",
    latitude: 30.5678,
    longitude: 7.1234,
    description: "Puits d'exploration dans le bassin de Berkine",
    targetDepth: 4100,
    trajectory: "vertical",
    primaryReservoir: "TAGI",
    secondaryReservoir: "Triassique",
    startDate: "2025-06-10",
    endDate: "2025-08-20",
    budget: 520,
    drillingDays: 55,
    contractor: "Schlumberger",
    status: "in_progress",
    createdAt: "2025-05-15T09:30:00Z",
    updatedAt: "2025-07-07T10:15:00Z",
  },
  {
    id: "ILZ-05",
    name: "ILZ-05",
    type: "exploration",
    basin: "illizi",
    bloc: "402d",
    field: "ILZ",
    latitude: 29.8765,
    longitude: 8.2345,
    description: "Puits d'exploration dans le bassin d'Illizi",
    targetDepth: 3800,
    trajectory: "directional",
    primaryReservoir: "Cambro-Ordovicien",
    startDate: "2025-07-11",
    endDate: "2025-09-15",
    budget: 490,
    drillingDays: 50,
    contractor: "ENTP",
    status: "planned",
    createdAt: "2025-06-01T11:45:00Z",
    updatedAt: "2025-07-05T16:30:00Z",
  },
  {
    id: "HBK-23",
    name: "HBK-23",
    type: "development",
    basin: "hassi-berkine",
    bloc: "406b",
    field: "HBK",
    latitude: 30.3456,
    longitude: 6.789,
    description: "Puits de développement dans le champ de Hassi Berkine",
    targetDepth: 2600,
    trajectory: "horizontal",
    primaryReservoir: "TAGI",
    startDate: "2025-05-10",
    endDate: "2025-06-25",
    budget: 360,
    drillingDays: 32,
    contractor: "ENAFOR",
    status: "completed",
    createdAt: "2025-04-15T13:20:00Z",
    updatedAt: "2025-06-25T17:45:00Z",
  },
]

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

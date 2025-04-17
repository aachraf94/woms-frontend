export interface Well {
  id: string
  name: string
  type: "exploration" | "delineation" | "development"
  basin: string
  bloc?: string
  field?: string
  latitude: number
  longitude: number
  description?: string
  targetDepth: number
  trajectory: "vertical" | "directional" | "horizontal"
  primaryReservoir: string
  secondaryReservoir?: string
  tertiaryReservoir?: string
  startDate: string
  endDate: string
  budget: number
  drillingDays: number
  contractor?: string
  team?: {
    manager?: string
    geologist?: string
    engineer?: string
  }
  drillingProgram?: {
    phases: {
      number: number
      diameter: string
      depth: number
      casing: string
      duration: number
    }[]
  }
  budgetDetails?: {
    operations: {
      name: string
      cost: number
      duration: number
    }[]
  }
  status: "planned" | "in_progress" | "completed" | "suspended" | "abandoned"
  createdAt: string
  updatedAt: string
}

export type WellFormInput = Omit<Well, "id" | "status" | "createdAt" | "updatedAt">

export function generateWellId(basin: string, field: string): string {
  // Générer un ID basé sur le bassin et le champ
  const basinPrefix = basin.substring(0, 3).toUpperCase()
  const fieldPrefix = field ? field.substring(0, 2).toUpperCase() : "XX"
  const randomNum = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0")

  return `${basinPrefix}-${fieldPrefix}${randomNum}`
}

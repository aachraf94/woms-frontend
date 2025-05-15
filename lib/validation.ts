export function validateWellData(data: Record<string, any>) {
  const errors: Record<string, string> = {}

  // Validation du nom du projet
  if (!data.name) {
    errors.name = "Le nom du projet est requis"
  } else if (data.name.length < 3) {
    errors.name = "Le nom du projet doit contenir au moins 3 caractères"
  }

  // Validation du type de projet
  if (!data.type) {
    errors.type = "Le type de projet est requis"
  }

  // Validation du bassin
  if (!data.basin) {
    errors.basin = "Le bassin est requis"
  }

  // Validation des coordonnées
  if (!data.latitude) {
    errors.latitude = "La latitude est requise"
  } else if (isNaN(Number.parseFloat(data.latitude))) {
    errors.latitude = "La latitude doit être un nombre valide"
  }

  if (!data.longitude) {
    errors.longitude = "La longitude est requise"
  } else if (isNaN(Number.parseFloat(data.longitude))) {
    errors.longitude = "La longitude doit être un nombre valide"
  }

  // Validation de la profondeur cible
  if (!data.targetDepth) {
    errors.targetDepth = "La profondeur cible est requise"
  } else if (isNaN(Number.parseFloat(data.targetDepth)) || Number.parseFloat(data.targetDepth) <= 0) {
    errors.targetDepth = "La profondeur cible doit être un nombre positif"
  }

  // Validation des dates
  if (!data.startDate) {
    errors.startDate = "La date de début est requise"
  }

  if (!data.endDate) {
    errors.endDate = "La date de fin est requise"
  } else if (data.startDate && data.endDate && new Date(data.endDate) <= new Date(data.startDate)) {
    errors.endDate = "La date de fin doit être postérieure à la date de début"
  }

  // Validation du budget
  if (!data.budget) {
    errors.budget = "Le budget est requis"
  } else if (isNaN(Number.parseFloat(data.budget)) || Number.parseFloat(data.budget) <= 0) {
    errors.budget = "Le budget doit être un nombre positif"
  }

  // Validation des jours de forage
  if (!data.drillingDays) {
    errors.drillingDays = "Le nombre de jours de forage est requis"
  } else if (isNaN(Number.parseInt(data.drillingDays)) || Number.parseInt(data.drillingDays) <= 0) {
    errors.drillingDays = "Le nombre de jours de forage doit être un nombre entier positif"
  }

  // Validation du réservoir principal
  if (!data.primaryReservoir) {
    errors.primaryReservoir = "Le réservoir principal est requis"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

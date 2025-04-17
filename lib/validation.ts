export function validateWellData(data: Record<string, any>) {
  const errors: Record<string, string> = {}

  // Validation du nom du puits
  if (!data.name) {
    errors.name = "Le nom du puits est requis"
  } else if (data.name.length < 3) {
    errors.name = "Le nom du puits doit contenir au moins 3 caractères"
  }

  // Validation du type de puits
  if (!data.type) {
    errors.type = "Le type de puits est requis"
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

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Utilitaire pour analyser les fichiers CSV
 */

export async function parseCSV(file: File): Promise<string[][]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string
        const lines = csvData.split("\n")
        const result: string[][] = []

        for (let i = 0; i < lines.length; i++) {
          // Ignorer les lignes vides
          if (lines[i].trim() === "") continue

          // Gestion des valeurs entre guillemets et des virgules dans les valeurs
          const row: string[] = []
          let insideQuotes = false
          let currentValue = ""

          for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j]

            if (char === '"' && (j === 0 || lines[i][j - 1] !== "\\")) {
              insideQuotes = !insideQuotes
            } else if (char === "," && !insideQuotes) {
              row.push(currentValue.trim())
              currentValue = ""
            } else if (char === ";" && !insideQuotes) {
              // Support pour les CSV avec séparateur point-virgule
              row.push(currentValue.trim())
              currentValue = ""
            } else {
              currentValue += char
            }
          }

          // Ajouter la dernière valeur
          if (currentValue.trim()) {
            row.push(currentValue.trim())
          }

          result.push(row)
        }

        resolve(result)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsText(file)
  })
}

/**
 * Analyse le fichier CSV des phases prévisionnelles et retourne les données structurées
 */
export async function parseDrillingPhasesCSV(file: File) {
  try {
    const csvData = await parseCSV(file)

    // Ignorer la ligne d'en-tête
    const dataRows = csvData.slice(1)

    const phases = dataRows.map((row, index) => {
      // Adapter selon la structure réelle du CSV
      return {
        number: index + 1,
        diameter: row[0] || "", // Diamètre
        depth: Number.parseFloat(row[1]) || 0, // Profondeur
        casing: row[2] || "", // Tubage
        duration: Number.parseFloat(row[3]) || 0, // Durée en jours
      }
    })

    return {
      success: true,
      phases,
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse du fichier des phases:", error)
    return {
      success: false,
      error: "Erreur lors de l'analyse du fichier. Vérifiez le format.",
    }
  }
}

/**
 * Analyse le fichier CSV des coûts prévisionnels et retourne les données structurées
 */
export async function parseBudgetCSV(file: File) {
  try {
    const csvData = await parseCSV(file)

    // Ignorer la ligne d'en-tête
    const dataRows = csvData.slice(1)

    // Extraire les détails des opérations
    const details = dataRows.map((row) => {
      return {
        operation: row[0] || "", // Nom de l'opération
        cost: Number.parseFloat(row[1]) || 0, // Coût
        duration: Number.parseFloat(row[2]) || 0, // Durée
      }
    })

    // Calculer le budget total et la durée totale
    const totalBudget = details.reduce((sum, item) => sum + item.cost, 0)
    const totalDuration = details.reduce((sum, item) => sum + item.duration, 0)

    return {
      success: true,
      budget: totalBudget,
      drillingDays: totalDuration,
      details,
    }
  } catch (error) {
    console.error("Erreur lors de l'analyse du fichier des coûts:", error)
    return {
      success: false,
      error: "Erreur lors de l'analyse du fichier. Vérifiez le format.",
    }
  }
}

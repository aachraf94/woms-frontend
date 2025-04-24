"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WellPhase {
  diameter: string
  depth: [number, number]
  status: "completed" | "in_progress" | "planned"
  casing?: string
}

interface WellSchematicProps {
  phases: WellPhase[]
  currentDepth: number
  targetDepth: number
  reservoirs?: Array<{
    name: string
    depth: number
  }>
}

export default function WellSchematic({ phases, currentDepth, targetDepth, reservoirs = [] }: WellSchematicProps) {
  // Calculer la hauteur totale du schéma
  const totalHeight = 500 // hauteur en pixels
  const depthScale = totalHeight / targetDepth

  // Déterminer la phase actuelle
  const currentPhase = phases.find((phase) => currentDepth >= phase.depth[0] && currentDepth <= phase.depth[1])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schéma du puits</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="relative" style={{ height: `${totalHeight}px`, width: "300px" }}>
          {/* Tour de forage */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0L0 20H40L20 0Z" fill="#555" />
              <rect x="15" y="20" width="10" height="40" fill="#555" />
              <rect x="10" y="25" width="20" height="5" fill="#777" />
              <rect x="10" y="35" width="20" height="5" fill="#777" />
              <rect x="10" y="45" width="20" height="5" fill="#777" />
            </svg>
          </div>

          {/* Trou principal */}
          <div
            className="absolute top-60 left-1/2 transform -translate-x-1/2 w-2 bg-gray-800"
            style={{ height: `${totalHeight - 60}px` }}
          ></div>

          {/* Phases de forage */}
          {phases.map((phase, index) => {
            const top = 60 + phase.depth[0] * depthScale
            const height = (phase.depth[1] - phase.depth[0]) * depthScale
            const width = Number.parseInt(phase.diameter) * 2

            // Déterminer la couleur en fonction du statut
            let color = "bg-gray-300" // planned
            if (phase.status === "completed") color = "bg-green-500"
            else if (phase.status === "in_progress") color = "bg-orange-500"

            return (
              <div
                key={index}
                className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center"
                style={{ top: `${top}px`, height: `${height}px` }}
              >
                {/* Diamètre du trou */}
                <div className={`h-full ${color} opacity-20`} style={{ width: `${width}px` }}></div>

                {/* Tubage si présent */}
                {phase.casing && (
                  <div className="absolute h-full flex">
                    <div className="h-full bg-green-500 w-1"></div>
                    <div className="h-full w-[calc(100%-2px)]"></div>
                    <div className="h-full bg-green-500 w-1"></div>
                  </div>
                )}

                {/* Étiquette de phase */}
                <div className="absolute -left-24 top-1/2 transform -translate-y-1/2 flex items-center">
                  <span className="text-sm font-medium whitespace-nowrap">{phase.diameter}</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" className="ml-1">
                    <path d="M0 10H15M15 10L10 5M15 10L10 15" stroke="black" strokeWidth="2" />
                  </svg>
                </div>

                {/* Indicateur de profondeur */}
                <div className="absolute -right-24 top-0 transform -translate-y-1/2">
                  <span className="text-xs">{phase.depth[0]}m</span>
                </div>
                <div className="absolute -right-24 bottom-0 transform translate-y-1/2">
                  <span className="text-xs">{phase.depth[1]}m</span>
                </div>
              </div>
            )
          })}

          {/* Profondeur actuelle */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-20 border-t-2 border-red-500"
            style={{ top: `${60 + currentDepth * depthScale}px` }}
          >
            <div className="absolute -right-24 transform -translate-y-1/2 flex items-center">
              <span className="text-xs font-bold text-red-500">{currentDepth}m (actuel)</span>
            </div>
          </div>

          {/* Réservoirs */}
          {reservoirs.map((reservoir, index) => {
            const top = 60 + reservoir.depth * depthScale

            return (
              <div key={index} className="absolute left-1/2 transform -translate-x-1/2" style={{ top: `${top}px` }}>
                <div className="flex items-center">
                  <div className="w-20 h-4 bg-yellow-300 -ml-20"></div>
                  <div className="w-20 h-4 bg-yellow-300 ml-1"></div>
                </div>
                <div className="absolute left-24 top-0 transform -translate-y-1/2">
                  <span className="text-xs font-medium">{reservoir.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>

      <div className="px-6 pb-4">
        <div className="flex flex-col space-y-2">
          <div className="text-sm font-medium">État d'avancement:</div>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span className="text-xs">Complété</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
              <span className="text-xs">En cours</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
              <span className="text-xs">Planifié</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

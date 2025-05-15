"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, ArrowUpRightIcon, DollarSignIcon, TimerIcon } from "lucide-react"

// Coordonnées approximatives des emplacements en Algérie (pour la démonstration)
const locationCoordinates: Record<string, { x: number; y: number }> = {
  "Hassi Messaoud": { x: 58, y: 60 },
  "Rhourde El Baguel": { x: 62, y: 55 },
  Berkine: { x: 70, y: 58 },
  "Tin Fouye Tabankort": { x: 52, y: 40 },
  Illizi: { x: 75, y: 50 },
  "Hassi R'Mel": { x: 40, y: 45 },
  Skikda: { x: 30, y: 15 },
  Arzew: { x: 15, y: 20 },
}

interface Project {
  id: string
  name: string
  status: string
  progress: number
  startDate: string
  endDate: string
  budget: string
  location: string
  manager: string
  managerAvatar: string
  team: number
  priority: string
  description: string
  lastUpdate: string
  tasks: { completed: number; total: number }
  risks: number
  documents: number
  category: string
  phase: string
  currentPhase: string
  phaseDepth: string
  costStatus: string
  costVariance: string
  delayStatus: string
  delayVariance: string
  phaseCost: string
  phaseDelay: string
}

interface ProjectsMapProps {
  projects: Project[]
}

export default function ProjectsMap({ projects }: ProjectsMapProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="relative w-full h-[calc(100vh-280px)] min-h-[600px] bg-gray-50 rounded-lg overflow-hidden border">
      <div className="absolute inset-0 bg-white">
        {/* Carte simplifiée de l'Algérie */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))" }}
        >
          {/* Fond de carte simplifié de l'Algérie */}
          <path
            d="M5,20 C10,15 20,10 30,10 C40,10 50,15 60,20 C70,25 80,30 90,25 C95,22 98,15 95,10 L95,90 L5,90 L5,20 Z"
            fill="#f0f0f0"
            stroke="#d0d0d0"
            strokeWidth="0.5"
          />

          {/* Mer Méditerranée */}
          <rect x="0" y="0" width="100" height="10" fill="#e6f7ff" />

          {/* Frontières approximatives */}
          <path
            d="M5,20 C10,15 20,10 30,10 M60,20 C70,25 80,30 90,25"
            fill="none"
            stroke="#d0d0d0"
            strokeWidth="0.3"
            strokeDasharray="1,1"
          />

          {/* Quelques villes principales (points de repère) */}
          <circle cx="15" cy="20" r="0.7" fill="#a0a0a0" />
          <text x="16" y="20" fontSize="2" fill="#a0a0a0">
            Oran
          </text>

          <circle cx="30" cy="15" r="0.7" fill="#a0a0a0" />
          <text x="31" y="15" fontSize="2" fill="#a0a0a0">
            Alger
          </text>

          <circle cx="40" cy="45" r="0.7" fill="#a0a0a0" />
          <text x="41" y="45" fontSize="2" fill="#a0a0a0">
            Hassi R'Mel
          </text>

          <circle cx="58" cy="60" r="0.7" fill="#a0a0a0" />
          <text x="59" y="60" fontSize="2" fill="#a0a0a0">
            Hassi Messaoud
          </text>

          {/* Marqueurs des projets */}
          {projects.map((project) => {
            const location = locationCoordinates[project.location] || { x: 50, y: 50 }
            const statusColor =
              project.status === "En cours" ? "#3b82f6" : project.status === "Terminé" ? "#10b981" : "#f59e0b"

            return (
              <g key={project.id} onClick={() => setSelectedProject(project)} style={{ cursor: "pointer" }}>
                <circle
                  cx={location.x}
                  cy={location.y}
                  r={project.budget.split(" ")[0].replace(/,/g, "") / 1000000}
                  fill={statusColor}
                  opacity="0.2"
                />
                <circle cx={location.x} cy={location.y} r="1.5" fill={statusColor} stroke="white" strokeWidth="0.5" />
                <text x={location.x + 2} y={location.y} fontSize="2" fill="#333" fontWeight="bold">
                  {project.name.length > 20 ? project.name.substring(0, 20) + "..." : project.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Légende */}
      <div className="absolute top-4 left-4 bg-white p-3 rounded-md shadow-sm border">
        <h4 className="text-sm font-medium mb-2">Légende</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs">En cours</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-xs">Planifié</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs">Terminé</span>
          </div>
          <div className="flex items-center mt-2">
            <div className="w-6 h-3 border-t border-dashed border-gray-400 mr-2"></div>
            <span className="text-xs">Taille = Budget</span>
          </div>
        </div>
      </div>

      {/* Détails du projet sélectionné */}
      {selectedProject && (
        <div className="absolute bottom-4 right-4 w-80">
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold">{selectedProject.name}</h3>
                  <div className="flex items-center mt-1">
                    <Badge
                      className={
                        selectedProject.status === "En cours"
                          ? "bg-blue-100 text-blue-800 mr-2"
                          : selectedProject.status === "Terminé"
                            ? "bg-green-100 text-green-800 mr-2"
                            : "bg-amber-100 text-amber-800 mr-2"
                      }
                    >
                      {selectedProject.status}
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800">{selectedProject.category}</Badge>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>{selectedProject.progress}% complété</span>
                  <span>
                    {selectedProject.tasks.completed}/{selectedProject.tasks.total}
                  </span>
                </div>
                <Progress
                  value={selectedProject.progress}
                  className={
                    selectedProject.progress < 30
                      ? "text-red-600"
                      : selectedProject.progress < 70
                        ? "text-amber-600"
                        : "text-green-600"
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1 text-gray-400" />
                  <span>{selectedProject.startDate}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-3 w-3 mr-1 text-gray-400" />
                  <span>{selectedProject.location}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs font-medium mb-1">Phase Actuelle</div>
                <div className="flex items-center">
                  <Badge className="bg-blue-100 text-blue-800">{selectedProject.currentPhase}</Badge>
                  <span className="text-xs ml-2">{selectedProject.phaseDepth}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center">
                  <DollarSignIcon
                    className={`h-3 w-3 mr-1 ${
                      selectedProject.costStatus === "danger"
                        ? "text-red-500"
                        : selectedProject.costStatus === "warning"
                          ? "text-amber-500"
                          : "text-green-500"
                    }`}
                  />
                  <div>
                    <div className="text-xs">Coûts: {selectedProject.phaseCost}</div>
                    <div className="text-xs font-medium">{selectedProject.costVariance}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <TimerIcon
                    className={`h-3 w-3 mr-1 ${
                      selectedProject.delayStatus === "danger"
                        ? "text-red-500"
                        : selectedProject.delayStatus === "warning"
                          ? "text-amber-500"
                          : "text-green-500"
                    }`}
                  />
                  <div>
                    <div className="text-xs">Délais: {selectedProject.phaseDelay}</div>
                    <div className="text-xs font-medium">{selectedProject.delayVariance}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-3">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage
                    src={selectedProject.managerAvatar || "/placeholder.svg"}
                    alt={selectedProject.manager}
                  />
                  <AvatarFallback>{selectedProject.manager.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xs font-medium">{selectedProject.manager}</div>
                  <div className="text-xs text-gray-500">Chef de projet</div>
                </div>
              </div>

              <Button
                className="w-full bg-[#ED8D31] hover:bg-orange-700 text-xs h-8"
                onClick={() => console.log(`Naviguer vers le projet ${selectedProject.id}`)}
              >
                <ArrowUpRightIcon className="mr-1 h-3 w-3" />
                Voir le projet
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

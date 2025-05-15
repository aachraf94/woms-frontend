"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Maximize2Icon, Minimize2Icon, InfoIcon } from "lucide-react"

// Types pour les phases de forage
interface DrillPhase {
  number: number
  diameter: string
  depth: [number, number]
  casing: string
  status: "completed" | "in_progress" | "planned"
}

// Types pour les réservoirs
interface Reservoir {
  name: string
  depth: number
  status: "reached" | "not_reached"
}

interface Well3DVisualizationProps {
  currentDepth: number
  phases: DrillPhase[]
  reservoirs: Reservoir[]
}

// Composant pour une phase de forage
function DrillPipe({ phase, maxDepth, currentDepth }: { phase: DrillPhase; maxDepth: number; currentDepth: number }) {
  // Convertir le diamètre de string (ex: "12¼") en nombre pour l'échelle
  const getDiameterValue = (diameterStr: string) => {
    const numericPart = Number.parseFloat(diameterStr.replace(/[^\d.]/g, ""))
    return numericPart / 30 // Échelle pour la visualisation
  }

  // Calculer la hauteur du tuyau en fonction de la profondeur
  const getHeight = (depth: [number, number]) => {
    return ((depth[1] - depth[0]) / maxDepth) * 10
  }

  // Calculer la position Y (profondeur) du tuyau
  const getPosition = (depth: [number, number]) => {
    return -((depth[0] + (depth[1] - depth[0]) / 2) / maxDepth) * 10
  }

  // Déterminer la couleur en fonction du statut
  const getColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981" // vert
      case "in_progress":
        return "#f59e0b" // orange
      case "planned":
        return "#9ca3af" // gris
      default:
        return "#9ca3af"
    }
  }

  // Déterminer l'opacité en fonction du statut
  const getOpacity = (status: string) => {
    switch (status) {
      case "completed":
        return 0.9
      case "in_progress":
        return 0.8
      case "planned":
        return 0.5
      default:
        return 0.5
    }
  }

  // Calculer la position de la profondeur actuelle
  const currentDepthPosition = -(currentDepth / maxDepth) * 10
  const isCurrentDepthInPhase = currentDepth >= phase.depth[0] && currentDepth <= phase.depth[1]

  return (
    <group>
      {/* Tuyau principal */}
      <mesh position={[0, getPosition(phase.depth), 0]}>
        <cylinderGeometry
          args={[getDiameterValue(phase.diameter), getDiameterValue(phase.diameter), getHeight(phase.depth), 32]}
        />
        <meshStandardMaterial
          color={getColor(phase.status)}
          transparent
          opacity={getOpacity(phase.status)}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Indicateur de profondeur actuelle */}
      {isCurrentDepthInPhase && (
        <mesh position={[0, currentDepthPosition, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[getDiameterValue(phase.diameter) + 0.05, getDiameterValue(phase.diameter) + 0.1, 32]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
      )}

      {/* Étiquette de phase */}
      <Html position={[getDiameterValue(phase.diameter) + 0.3, getPosition(phase.depth), 0]} center distanceFactor={15}>
        <div className="bg-white/90 p-1 rounded shadow-sm text-xs border border-gray-200 whitespace-nowrap">
          <div className="font-medium">{phase.diameter}</div>
          <div>
            {phase.depth[0]}-{phase.depth[1]}m
          </div>
        </div>
      </Html>
    </group>
  )
}

// Composant pour un réservoir
function Reservoir({ reservoir, maxDepth }: { reservoir: Reservoir; maxDepth: number }) {
  const position = -(reservoir.depth / maxDepth) * 10

  return (
    <group position={[0, position, 0]}>
      {/* Représentation du réservoir */}
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[3, 0.3, 0.3]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>

      {/* Étiquette du réservoir */}
      <Html position={[3, 0, 0]} center distanceFactor={15}>
        <div className="bg-white/90 p-1 rounded shadow-sm text-xs border border-gray-200">
          <div className="font-medium">{reservoir.name}</div>
          <div>{reservoir.depth}m</div>
        </div>
      </Html>
    </group>
  )
}

// Composant pour la tête de puits
function WellHead() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
        <meshStandardMaterial color="#4b5563" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
        <meshStandardMaterial color="#4b5563" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  )
}

// Composant pour les marqueurs de profondeur
function DepthMarkers({ maxDepth }: { maxDepth: number }) {
  const markers = []
  const step = Math.ceil(maxDepth / 5 / 500) * 500 // Arrondir à 500m près

  for (let depth = 0; depth <= maxDepth; depth += step) {
    const position = -(depth / maxDepth) * 10
    markers.push(
      <group key={depth} position={[0, position, 0]}>
        <mesh position={[-0.5, 0, 0]}>
          <boxGeometry args={[0.5, 0.02, 0.02]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
        <Html position={[-1, 0, 0]} center distanceFactor={15}>
          <div className="text-xs text-gray-600">{depth}m</div>
        </Html>
      </group>,
    )
  }

  return <>{markers}</>
}

// Composant principal pour la scène 3D
function Well3DScene({ currentDepth, phases, reservoirs }: Well3DVisualizationProps) {
  const controlsRef = useRef<any>(null)
  const { camera } = useThree()

  // Trouver la profondeur maximale
  const maxDepth = Math.max(...phases.map((phase) => phase.depth[1]), ...reservoirs.map((reservoir) => reservoir.depth))

  // Réinitialiser la caméra
  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  // Ajuster la caméra au chargement
  useEffect(() => {
    camera.position.set(5, -5, 10)
    camera.lookAt(0, -5, 0)
  }, [camera])

  return (
    <>
      {/* Contrôles de la caméra */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        minDistance={2}
        maxDistance={20}
      />

      {/* Éclairage */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      {/* Environnement */}
      <Environment preset="studio" />

      {/* Axe vertical (puits) */}
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 10, 16]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      {/* Tête de puits */}
      <WellHead />

      {/* Phases de forage */}
      {phases.map((phase, index) => (
        <DrillPipe key={index} phase={phase} maxDepth={maxDepth} currentDepth={currentDepth} />
      ))}

      {/* Réservoirs */}
      {reservoirs.map((reservoir, index) => (
        <Reservoir key={index} reservoir={reservoir} maxDepth={maxDepth} />
      ))}

      {/* Marqueurs de profondeur */}
      <DepthMarkers maxDepth={maxDepth} />

      {/* Légende */}
      <Html position={[-4, 1, 0]} distanceFactor={15}>
        <div className="bg-white/90 p-2 rounded shadow-sm text-xs border border-gray-200">
          <div className="font-medium mb-1">État d'avancement:</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Complété</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>En cours</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span>Planifié</span>
            </div>
          </div>
        </div>
      </Html>

      {/* Profondeur actuelle */}
      <Html position={[4, 1, 0]} distanceFactor={15}>
        <div className="bg-white/90 p-2 rounded shadow-sm text-xs border border-gray-200">
          <div className="font-medium">Profondeur actuelle:</div>
          <div className="text-lg font-bold text-red-500">{currentDepth}m</div>
        </div>
      </Html>
    </>
  )
}

// Composant principal exporté
export default function Well3DVisualization({ currentDepth, phases, reservoirs }: Well3DVisualizationProps) {
  const [fullscreen, setFullscreen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Gérer le mode plein écran
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Erreur: ${err.message}`)
      })
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  // Écouter les changements de plein écran
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-[500px] bg-gray-50 rounded-lg overflow-hidden">
      {/* Contrôles */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button variant="outline" size="sm" className="bg-white" onClick={() => setShowInfo(!showInfo)}>
          <InfoIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="bg-white" onClick={toggleFullscreen}>
          {fullscreen ? <Minimize2Icon className="h-4 w-4" /> : <Maximize2Icon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Popup d'aide */}
      {showInfo && (
        <Card className="absolute top-14 right-4 z-10 p-3 w-64 text-xs">
          <h4 className="font-medium mb-2">Comment utiliser la vue 3D</h4>
          <ul className="space-y-1 list-disc pl-4">
            <li>Cliquez et faites glisser pour faire pivoter</li>
            <li>Utilisez la molette pour zoomer/dézoomer</li>
            <li>Cliquez droit et faites glisser pour déplacer</li>
            <li>Double-cliquez pour centrer sur un point</li>
          </ul>
          <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => setShowInfo(false)}>
            Fermer
          </Button>
        </Card>
      )}

      {/* Canvas Three.js */}
      <Canvas>
        <Well3DScene currentDepth={currentDepth} phases={phases} reservoirs={reservoirs} />
      </Canvas>
    </div>
  )
}

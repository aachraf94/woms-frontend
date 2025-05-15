"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Define oil field data
const oilFields = [
  {
    id: "hassi-messaoud",
    name: "Hassi Messaoud",
    position: { x: 400, y: 300 },
    description: "Le plus grand champ pétrolier d'Algérie",
    wells: 42,
    production: "350,000 barils/jour",
    status: "En production",
    type: "Pétrole",
    region: "Centre",
  },
  {
    id: "hassi-rmel",
    name: "Hassi R'Mel",
    position: { x: 350, y: 250 },
    description: "Principal champ gazier d'Algérie",
    wells: 38,
    production: "2,7 milliards m³/jour",
    status: "En production",
    type: "Gaz",
    region: "Centre",
  },
  {
    id: "berkine",
    name: "Berkine",
    position: { x: 480, y: 320 },
    description: "Bassin pétrolier majeur",
    wells: 29,
    production: "150,000 barils/jour",
    status: "En production",
    type: "Pétrole",
    region: "Est",
  },
  {
    id: "illizi",
    name: "Illizi",
    position: { x: 520, y: 350 },
    description: "Bassin sédimentaire riche en hydrocarbures",
    wells: 15,
    production: "80,000 barils/jour",
    status: "En production",
    type: "Pétrole",
    region: "Sud-Est",
  },
  {
    id: "rhourde-nouss",
    name: "Rhourde Nouss",
    position: { x: 430, y: 340 },
    description: "Champ gazier important",
    wells: 22,
    production: "1,2 milliards m³/jour",
    status: "En production",
    type: "Gaz",
    region: "Sud",
  },
  {
    id: "tin-fouye-tabankort",
    name: "Tin Fouye Tabankort",
    position: { x: 500, y: 380 },
    description: "Champ de gaz et condensats",
    wells: 18,
    production: "0,8 milliards m³/jour",
    status: "En production",
    type: "Gaz",
    region: "Sud-Est",
  },
  {
    id: "ahnet",
    name: "Ahnet",
    position: { x: 300, y: 380 },
    description: "Bassin gazier en développement",
    wells: 8,
    production: "0,4 milliards m³/jour",
    status: "En développement",
    type: "Gaz",
    region: "Sud-Ouest",
  },
]

// Define region data
const regions = [
  { id: "nord", name: "Nord", color: "#A5D6A7" },
  { id: "centre", name: "Centre", color: "#81C784" },
  { id: "sud", name: "Sud", color: "#66BB6A" },
  { id: "est", name: "Est", color: "#4CAF50" },
  { id: "ouest", name: "Ouest", color: "#43A047" },
  { id: "sud-est", name: "Sud-Est", color: "#388E3C" },
  { id: "sud-ouest", name: "Sud-Ouest", color: "#2E7D32" },
]

interface InteractiveMapProps {
  onSelectField?: (field: any) => void
  filters?: {
    region?: string
    type?: string
    status?: string
  }
}

export default function InteractiveMap({ onSelectField, filters = {} }: InteractiveMapProps) {
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [hoveredField, setHoveredField] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // Filter oil fields based on filters
  const filteredOilFields = oilFields.filter((field) => {
    if (filters.region && field.region.toLowerCase() !== filters.region.toLowerCase()) return false
    if (filters.type && field.type.toLowerCase() !== filters.type.toLowerCase()) return false
    if (filters.status && field.status.toLowerCase() !== filters.status.toLowerCase()) return false
    return true
  })

  useEffect(() => {
    // Set map as loaded after a short delay to ensure SVG is rendered
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleFieldClick = (field: any) => {
    setSelectedField(field.id)
    if (onSelectField) {
      onSelectField(field)
    }
  }

  // Function to get color based on field type
  const getFieldColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "pétrole":
        return "#ED8D31"
      case "gaz":
        return "#3B82F6"
      default:
        return "#6B7280"
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* SVG Map */}
      <div className="relative w-full h-[calc(100vh-8rem)] overflow-hidden bg-[#eaeae3]">
        <svg ref={svgRef} className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
          {/* Import the Algeria map SVG */}
          <use href="/algeria-map.svg#Algeria" />

          {/* Add oil field markers */}
          {mapLoaded &&
            filteredOilFields.map((field) => (
              <g
                key={field.id}
                transform={`translate(${field.position.x}, ${field.position.y})`}
                onClick={() => handleFieldClick(field)}
                onMouseEnter={() => setHoveredField(field.id)}
                onMouseLeave={() => setHoveredField(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  r={selectedField === field.id ? 12 : hoveredField === field.id ? 10 : 8}
                  fill={getFieldColor(field.type)}
                  stroke="#fff"
                  strokeWidth="2"
                  opacity={selectedField === field.id || hoveredField === field.id ? 1 : 0.8}
                  className="transition-all duration-200"
                />
                <text
                  x="15"
                  y="5"
                  fill="#000"
                  fontSize="12"
                  fontWeight={selectedField === field.id ? "bold" : "normal"}
                  className="pointer-events-none"
                >
                  {field.name}
                </text>
              </g>
            ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md">
          <h4 className="text-sm font-semibold mb-2">Légende</h4>
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 rounded-full bg-[#ED8D31] mr-2"></div>
            <span className="text-xs">Champ pétrolier</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#3B82F6] mr-2"></div>
            <span className="text-xs">Champ gazier</span>
          </div>
        </div>
      </div>

      {/* Field details card */}
      {selectedField && (
        <Card className="absolute top-4 right-4 w-80 shadow-lg">
          <CardContent className="p-4">
            {oilFields
              .filter((f) => f.id === selectedField)
              .map((field) => (
                <div key={field.id}>
                  <h3 className="text-lg font-bold mb-1">{field.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{field.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <Badge
                        className={
                          field.type === "Pétrole" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {field.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Statut</p>
                      <Badge className="bg-green-100 text-green-800">{field.status}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Puits</p>
                      <p className="font-medium">{field.wells}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Production</p>
                      <p className="font-medium">{field.production}</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => setSelectedField(null)}>
                    Fermer
                  </Button>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

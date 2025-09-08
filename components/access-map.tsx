"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mic, Plus, Trash2 } from "lucide-react"

// Define types for our data structures
interface MarkerData {
  name: string
  lat: number
  lng: number
  facilities: string[]
}

export default function AccessMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<MarkerData[]>([])
  const [markerLayers, setMarkerLayers] = useState<any[]>([])
  const [addMarkerMode, setAddMarkerMode] = useState(false)
  const [tempCoords, setTempCoords] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [placeName, setPlaceName] = useState("")
  const [customFacilities, setCustomFacilities] = useState("")
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [status, setStatus] = useState("Ready")
  const [isListening, setIsListening] = useState(false)

  const facilityOptions = ["♿ Wheelchair Accessible", "🟡 Has Braille", "🛗 Lift Available", "❌ Not Accessible"]

  const defaultDataset: MarkerData[] = [
    { name: "VIT Chennai Main Gate", lat: 12.8406, lng: 80.1531, facilities: ["♿ Wheelchair Accessible"] },
    { name: "VIT Chennai Library", lat: 12.844, lng: 80.152, facilities: ["🛗 Lift Available", "🟡 Has Braille"] },
    { name: "VIT Admin Block", lat: 12.8425, lng: 80.1545, facilities: ["🟡 Has Braille", "♿ Wheelchair Accessible"] },
    { name: "VIT Hostel Gate", lat: 12.845, lng: 80.151, facilities: ["❌ Not Accessible"] },
  ]

  // Initialize map and load data
  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current || mapInstanceRef.current) return

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      // Load CSS
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet/dist/leaflet.css"
      document.head.appendChild(link)

      const geocoderLink = document.createElement("link")
      geocoderLink.rel = "stylesheet"
      geocoderLink.href = "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"
      document.head.appendChild(geocoderLink)

      // Load JS
      const L = await import("leaflet")

      // Fix for default marker icons
      delete (L as any).Icon.Default.prototype._getIconUrl
      ;(L as any).Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      })

      // Initialize map
      const mapInstance = L.map(mapRef.current!).setView([12.8406, 80.1531], 15)
      mapInstanceRef.current = mapInstance

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(mapInstance)

      // Load geocoder
      const geocoderScript = document.createElement("script")
      geocoderScript.src = "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"
      geocoderScript.onload = () => {
        const geocoderControl = (L as any).Control.geocoder({ defaultMarkGeocode: false }).addTo(mapInstance)

        geocoderControl.on("markgeocode", (e: any) => {
          const g = e.geocode
          const name = g.name || "Search result"
          const lat = g.center.lat
          const lng = g.center.lng

          const found = markers.find((m) => m.name && m.name.toLowerCase().includes(name.toLowerCase()))
          if (found) {
            mapInstance.setView([found.lat, found.lng], 17)
            setStatus(`Found dataset place: ${found.name}`)
            return
          }

          const newMarker = { name, lat, lng, facilities: [] }
          addMarkerToMap(newMarker, mapInstance, L)
          mapInstance.setView([lat, lng], 16)
          setStatus(`Added marker: ${name} (no facilities info)`)
        })
      }
      document.head.appendChild(geocoderScript)

      // Handle map clicks
      mapInstance.on("click", (e: any) => {
        if (!addMarkerMode) return
        setTempCoords(e.latlng)
        setShowModal(true)
      })

      setMap(mapInstance)

      // Load initial markers
      const savedMarkers = localStorage.getItem("markers")
      let initialMarkers = defaultDataset

      if (savedMarkers) {
        try {
          const parsed = JSON.parse(savedMarkers)
          if (Array.isArray(parsed) && parsed.length > 0) {
            initialMarkers = parsed.map((m: any) => ({
              name: m.name || m.rating || "Place",
              lat: Number.parseFloat(m.lat) || Number.parseFloat(m.latitude) || 0,
              lng: Number.parseFloat(m.lng) || Number.parseFloat(m.longitude) || 0,
              facilities: Array.isArray(m.facilities) ? m.facilities : m.facilities ? [m.facilities] : [],
            }))
          }
        } catch (e) {
          console.warn("Failed to parse saved markers, using defaults")
        }
      }

      setMarkers(initialMarkers)
      localStorage.setItem("markers", JSON.stringify(initialMarkers))

      // Add initial markers to map
      initialMarkers.forEach((marker) => {
        addMarkerToMap(marker, mapInstance, L)
      })
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const addMarkerToMap = (markerData: MarkerData, mapInstance: any, L: any) => {
    const popupHtml = `<b>${markerData.name}</b><br>${markerData.facilities.length ? markerData.facilities.join("<br>") : "No facilities info"}`

    const hasWheelchair = markerData.facilities.includes("♿ Wheelchair Accessible")

    const accessibleIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3719/3719941.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -25],
    })

    const defaultIcon = L.icon({
      iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    })

    const markerIcon = hasWheelchair ? accessibleIcon : defaultIcon
    const layer = L.marker([markerData.lat, markerData.lng], { icon: markerIcon })
      .addTo(mapInstance)
      .bindPopup(popupHtml)

    layer.on("popupopen", () => {
      const text = `${markerData.name}. ${markerData.facilities.length ? "Facilities: " + markerData.facilities.join(", ") : "No accessibility information available."}`
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-IN"
      window.speechSynthesis.speak(utterance)
    })

    setMarkerLayers((prev) => [...prev, layer])
  }

  const handleAddPlace = () => {
    setAddMarkerMode(true)
    setStatus("Click on the map to choose location for the new place...")
  }

  const handleSavePlace = () => {
    if (!placeName.trim()) {
      alert("Please enter a name for the place.")
      return
    }

    const facilitiesArray = customFacilities
      ? customFacilities
          .split(",")
          .map((f) => f.trim())
          .filter((f) => f)
      : []

    const combinedFacilities = [...selectedFacilities, ...facilitiesArray]

    const newMarker: MarkerData = {
      name: placeName,
      lat: tempCoords.lat,
      lng: tempCoords.lng,
      facilities: combinedFacilities,
    }

    const updatedMarkers = [...markers, newMarker]
    setMarkers(updatedMarkers)
    localStorage.setItem("markers", JSON.stringify(updatedMarkers))

    if (map) {
      const L = (window as any).L
      addMarkerToMap(newMarker, map, L)
    }

    // Reset form
    setShowModal(false)
    setAddMarkerMode(false)
    setTempCoords(null)
    setPlaceName("")
    setCustomFacilities("")
    setSelectedFacilities([])
    setStatus(`Added: ${placeName}`)
  }

  const handleClearAll = () => {
    if (!confirm("Clear all markers?")) return

    markerLayers.forEach((layer) => {
      if (map) map.removeLayer(layer)
    })

    setMarkerLayers([])
    setMarkers([])
    localStorage.removeItem("markers")
    setStatus("All markers cleared")
  }

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Speech recognition not supported. Use Chrome.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-IN"
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
      setStatus("Listening...")
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (e: any) => {
      setStatus("Voice error: " + e.error)
      setIsListening(false)
    }

    recognition.onresult = (ev: any) => {
      const spoken = ev.results[0][0].transcript
      setStatus(`Heard: "${spoken}". Searching...`)

      const datasetFound = markers.find((m) => m.name && m.name.toLowerCase().includes(spoken.toLowerCase()))

      if (datasetFound && map) {
        map.setView([datasetFound.lat, datasetFound.lng], 17)
        setStatus(`Found in dataset: ${datasetFound.name}`)
        return
      }

      // Search using Nominatim
      const url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURIComponent(spoken)
      fetch(url)
        .then((r) => r.json())
        .then((results) => {
          if (!results || results.length === 0) {
            setStatus("No results found")
            const utterance = new SpeechSynthesisUtterance("No accessibility information available for " + spoken)
            window.speechSynthesis.speak(utterance)
            return
          }

          const p = results[0]
          const lat = Number.parseFloat(p.lat)
          const lng = Number.parseFloat(p.lon)

          if (map) {
            map.setView([lat, lng], 16)
            const newMarker = { name: spoken, lat, lng, facilities: [] }
            const updatedMarkers = [...markers, newMarker]
            setMarkers(updatedMarkers)
            localStorage.setItem("markers", JSON.stringify(updatedMarkers))

            const L = (window as any).L
            addMarkerToMap(newMarker, map, L)
          }

          setStatus("Located: " + (p.display_name || spoken) + " (no facilities info)")
          const utterance = new SpeechSynthesisUtterance("No accessibility information available for " + spoken)
          window.speechSynthesis.speak(utterance)
        })
        .catch((err) => {
          console.error(err)
          setStatus("Geocoding failed")
        })
    }

    try {
      recognition.start()
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Controls */}
      <div className="sticky top-0 z-[1000] flex flex-wrap items-center gap-2 p-3 bg-white border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          {facilityOptions.map((facility) => (
            <Label key={facility} className="flex items-center gap-1 text-sm cursor-pointer">
              <Checkbox
                checked={selectedFacilities.includes(facility)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFacilities([...selectedFacilities, facility])
                  } else {
                    setSelectedFacilities(selectedFacilities.filter((f) => f !== facility))
                  }
                }}
              />
              {facility}
            </Label>
          ))}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleAddPlace} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-1" />
            Add Place
          </Button>
          <Button onClick={handleClearAll} variant="destructive">
            <Trash2 className="w-4 h-4 mr-1" />
            Clear All
          </Button>
          <Button
            onClick={handleVoiceSearch}
            className={`w-10 h-10 rounded-full p-0 ${isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
            title="Voice search"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>

        <span className="text-sm text-gray-600 min-w-[200px]">{status}</span>
      </div>

      {/* Map */}
      <div ref={mapRef} className="flex-1" />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[2000]">
          <div className="bg-white p-4 rounded-lg w-80 max-w-[90vw] shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Add place details</h3>

            <Label className="block mb-2">
              Place name
              <Input
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
                placeholder="Enter place name"
                className="mt-1"
              />
            </Label>

            <div className="text-xs text-gray-500 mb-2">
              <strong>Selected:</strong>
              <br />
              {selectedFacilities.length ? selectedFacilities.join(", ") : "None selected"}
            </div>

            <Label className="block mb-4">
              Other facilities (optional, separated by commas)
              <Input
                value={customFacilities}
                onChange={(e) => setCustomFacilities(e.target.value)}
                placeholder="e.g., Guide dog friendly, Ramp"
                className="mt-1"
              />
            </Label>

            <div className="flex gap-2 justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false)
                  setAddMarkerMode(false)
                  setTempCoords(null)
                  setStatus("Add cancelled")
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSavePlace}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

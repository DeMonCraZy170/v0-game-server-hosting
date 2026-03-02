"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { 
  ChevronRight, 
  ChevronDown, 
  MapPin, 
  Server, 
  Cpu, 
  HardDrive,
  Wifi,
  MemoryStick,
  Key,
  Droplets,
} from "lucide-react"
import { Footer } from "./footer"

// Hardware node data
const hardwareNodes = [
  {
    location: "Beauharnois, Canada",
    flag: "ca",
    region: "Norteamerica",
    nodes: [
      {
        name: "Enterprise Beauharnois",
        nodeType: "Game Hosting",
        badge: "Hardware Propio",
        waterCooled: false,
        specs: {
          cpu: "AMD Ryzen 7 9800X3D",
          cpuDetails: "8c/16t - 4.7/5.2 GHz",
          ram: "DDR5 @ 5600 MHz",
          ramAmount: "64 GB",
          storage: "2x960GB NVMe SSD",
          storageType: "Soft RAID",
          bandwidth: "1 Gbit",
        },
      },
    ],
  },
  {
    location: "Miami, Florida",
    flag: "us",
    region: "Norteamerica",
    comingSoon: true,
    nodes: [
      {
        name: "Enterprise Miami",
        nodeType: "Game Hosting",
        badge: "Hardware Propio",
        waterCooled: false,
        specs: {
          cpu: "AMD Ryzen 9 7950X3D",
          cpuDetails: "16c/32t - 4.2/5.7 GHz",
          ram: "DDR5 @ 5200 MHz",
          ramAmount: "128 GB",
          storage: "2x1TB NVMe SSD",
          storageType: "Soft RAID",
          bandwidth: "10 Gbit",
        },
      },
    ],
  },
  {
    location: "Dallas, Texas",
    flag: "us",
    region: "Norteamerica",
    comingSoon: true,
    nodes: [
      {
        name: "Enterprise Dallas",
        nodeType: "Game Hosting",
        badge: "Hardware Propio",
        waterCooled: false,
        specs: {
          cpu: "AMD Ryzen 9 7900X",
          cpuDetails: "12c/24t - 4.7/5.6 GHz",
          ram: "DDR5 @ 5200 MHz",
          ramAmount: "64 GB",
          storage: "2x960GB NVMe SSD",
          storageType: "Soft RAID",
          bandwidth: "10 Gbit",
        },
      },
    ],
  },
]

const flagEmoji: Record<string, string> = {
  ca: "🇨🇦",
  us: "🇺🇸",
  br: "🇧🇷",
  de: "🇩🇪",
  fr: "🇫🇷",
  uk: "🇬🇧",
  au: "🇦🇺",
  sg: "🇸🇬",
}

export function HardwareLocationsContent() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false)
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)

  // Filter nodes based on selection
  const filteredLocations = hardwareNodes.filter(loc => {
    if (selectedLocation === "all") return true
    return loc.location === selectedLocation
  })

  return (
    <main className="min-h-screen text-foreground">
      {/* Hero Section with background */}
      <section className="relative pb-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hardware-locations-bg.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Dark overlay - similar to SparkedHost */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.7) 0%, rgba(13,13,13,0.85) 60%, rgba(13,13,13,1) 100%)" }} />
        </div>
      
        {/* Hero Content - pt-32 accounts for fixed navbar */}
        <div className="relative z-10 pt-32 lg:pt-36">
          <div className="mx-auto max-w-6xl px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Hardware y Ubicaciones</span>
            </nav>

          {/* Title */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="text-foreground">Hardware </span>
              <span className="text-primary">&</span>
              <br />
              <span className="text-primary">Ubicaciones</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Selecciona tu ubicacion preferida y conoce todo nuestro hardware disponible de ultima generacion.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-6 pb-8">
            {/* Location Filter */}
            <div className="relative min-w-[240px] z-[60]">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Ubicacion</span>
              </div>
              <button
                onClick={() => {
                  setLocationDropdownOpen(!locationDropdownOpen)
                  setTypeDropdownOpen(false)
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all"
                style={{ 
                  background: "rgba(255,255,255,0.05)", 
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span>{selectedLocation === "all" ? "Ver todas" : selectedLocation}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${locationDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {/* Location Dropdown */}
              <div 
                className={`absolute top-full left-0 right-0 mt-2 rounded-xl z-[100] transition-all duration-200 ease-out ${
                  locationDropdownOpen 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                style={{ 
                  background: "#1a1a1f", 
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
                }}
              >
                <div className="max-h-[280px] overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedLocation("all")
                      setLocationDropdownOpen(false)
                    }}
                    className="w-full px-4 py-3 text-sm text-left transition-all hover:bg-white/5"
                    style={{ color: selectedLocation === "all" ? "#f5a623" : "rgba(255,255,255,0.7)" }}
                  >
                    Ver todas
                  </button>
                  {hardwareNodes.map(loc => (
                    <button
                      key={loc.location}
                      onClick={() => {
                        setSelectedLocation(loc.location)
                        setLocationDropdownOpen(false)
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-left transition-all hover:bg-white/5"
                      style={{ color: selectedLocation === loc.location ? "#f5a623" : "rgba(255,255,255,0.7)" }}
                    >
                      <span className="flex items-center gap-2">
                        <span>{flagEmoji[loc.flag]}</span>
                        <span>{loc.location}</span>
                      </span>
                      {loc.comingSoon && (
                        <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                          Proximamente
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hardware Type Filter */}
            <div className="relative min-w-[240px] z-[50]">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Server className="w-4 h-4" />
                <span className="font-medium">Tipo de Hardware</span>
              </div>
              <button
                onClick={() => {
                  setTypeDropdownOpen(!typeDropdownOpen)
                  setLocationDropdownOpen(false)
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all"
                style={{ 
                  background: "rgba(255,255,255,0.05)", 
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span>{selectedType === "all" ? "Ver todos" : selectedType}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${typeDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {/* Hardware Type Dropdown */}
              <div 
                className={`absolute top-full left-0 right-0 mt-2 rounded-xl z-[100] transition-all duration-200 ease-out ${
                  typeDropdownOpen 
                    ? "opacity-100 translate-y-0 pointer-events-auto" 
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
                style={{ 
                  background: "#1a1a1f", 
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.7)",
                }}
              >
                <div className="max-h-[280px] overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedType("all")
                      setTypeDropdownOpen(false)
                    }}
                    className="w-full px-4 py-3 text-sm text-left transition-all hover:bg-white/5"
                    style={{ color: selectedType === "all" ? "#f5a623" : "rgba(255,255,255,0.7)" }}
                  >
                    Ver todos
                  </button>
                  {["Game Hosting", "VPS Hosting", "Bot Hosting"].map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type)
                        setTypeDropdownOpen(false)
                      }}
                      className="w-full px-4 py-3 text-sm text-left transition-all hover:bg-white/5"
                      style={{ color: selectedType === type ? "#f5a623" : "rgba(255,255,255,0.7)" }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Hardware Nodes by Location */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          {filteredLocations.map(location => (
            <div key={location.location} className="mb-16 last:mb-0">
              {/* Location Header */}
              <div className="flex items-center justify-center gap-3 mb-10">
                <span className="text-3xl">{flagEmoji[location.flag]}</span>
                <h2 
                  className="text-2xl md:text-3xl font-bold uppercase tracking-wide"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {location.location}
                </h2>
                {location.comingSoon && (
                  <span 
                    className="text-xs font-bold px-3 py-1 rounded-full uppercase"
                    style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623" }}
                  >
                    Proximamente
                  </span>
                )}
              </div>

              {/* Hardware Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {location.nodes.map((node, idx) => (
                  <div 
                    key={idx}
                    className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${location.comingSoon ? "opacity-60" : ""}`}
                    style={{ 
                      background: "#1a1a1f", 
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* Card Header */}
                    <div 
                      className="p-5 flex items-start gap-4"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {/* Server Icon */}
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "rgba(245,166,35,0.15)" }}
                      >
                        <Server className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">
                          Tipo de Nodo: <span className="text-foreground">{node.nodeType}</span>
                        </p>
                        <h3 className="text-lg font-bold text-foreground truncate" style={{ fontFamily: "var(--font-heading)" }}>
                          {node.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span 
                            className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded"
                            style={{ background: "rgba(245,166,35,0.12)", color: "#f5a623" }}
                          >
                            <Key className="w-3 h-3" />
                            {node.badge}
                          </span>
                          {node.waterCooled && (
                            <span 
                              className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded"
                              style={{ background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}
                            >
                              <Droplets className="w-3 h-3" />
                              Water Cooled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className="p-5 grid grid-cols-2 gap-4">
                      {/* CPU */}
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          <Cpu className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">CPU</p>
                          <p className="text-xs font-medium text-foreground leading-tight">{node.specs.cpu}</p>
                          <p className="text-[10px] text-muted-foreground">{node.specs.cpuDetails}</p>
                        </div>
                      </div>

                      {/* RAM */}
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          <MemoryStick className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">RAM</p>
                          <p className="text-xs font-medium text-foreground leading-tight">{node.specs.ram}</p>
                          <p className="text-[10px] text-muted-foreground">{node.specs.ramAmount}</p>
                        </div>
                      </div>

                      {/* Storage */}
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          <HardDrive className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">STORAGE</p>
                          <p className="text-xs font-medium text-foreground leading-tight">{node.specs.storage}</p>
                          <p className="text-[10px] text-muted-foreground">{node.specs.storageType}</p>
                        </div>
                      </div>

                      {/* Bandwidth */}
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          <Wifi className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">BANDWIDTH</p>
                          <p className="text-xs font-medium text-foreground leading-tight">{node.specs.bandwidth}</p>
                          <p className="text-[10px] text-muted-foreground">Multi-blend</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(245,166,35,0.08) 0%, transparent 50%)" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Listo para comenzar?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Elige el plan perfecto para tu servidor y empieza a jugar en minutos con nuestro hardware de ultima generacion.
          </p>
          <Link
            href="/game-server-hosting"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)",
              color: "#0d0d0d",
              boxShadow: "0 4px 20px rgba(245,166,35,0.3)",
            }}
          >
            Ver Planes de Hosting
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

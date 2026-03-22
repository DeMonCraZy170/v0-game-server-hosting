"use client"

import Image from "next/image"
import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ExternalLink,
  Server,
  Globe,
  Shield,
  Star,
  Zap,
  CheckCircle2,
  MessageCircle,
  Cpu,
  HardDrive,
  Users,
  ShieldCheck,
  Clock,
  Layers,
  MapPin,
  Sparkles,
} from "lucide-react"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"
import { Footer } from "@/components/footer"
import type { GameDetail } from "@/lib/game-data"
import { hardwareSpecs } from "@/lib/game-data"

/* ─── DDoS features ─── */

const ddosFeatures = [
  {
    icon: Star,
    title: "Deteccion Activa",
    description: "Monitoreamos activamente tu servidor para detectar actividad maliciosa y ataques.",
  },
  {
    icon: CheckCircle2,
    title: "Proveedores Premium",
    description: "Estamos asociados con los mejores proveedores de proteccion DDoS disponibles.",
  },
  {
    icon: Shield,
    title: "Capacidad a Escala Terabit",
    description: "Nuestra red de proteccion asegura que podemos defender tu servidor de las amenazas mas grandes.",
  },
  {
    icon: Zap,
    title: "Mitigacion en 1 Segundo",
    description: "Nuestra red comienza a mitigar ataques casi al instante tan pronto como se detectan.",
  },
]

/* ─── Locations ─── */

interface LocationWithPing {
  name: string
  flag: string
  active: boolean
  ping?: number // ms
  signal: "excellent" | "good" | "moderate"
}

const regions: { region: string; locations: LocationWithPing[] }[] = [
  {
    region: "Norte America",
    locations: [
      { name: "OVH Beauharnois, Canada", flag: "CA", active: true, ping: 35, signal: "excellent" },
      { name: "Miami, Florida", flag: "US", active: false, ping: 45, signal: "excellent" },
      { name: "Dallas, Texas", flag: "US", active: false, ping: 62, signal: "excellent" },
      { name: "Los Angeles, California", flag: "US", active: false, ping: 78, signal: "good" },
    ],
  },
  {
    region: "Latinoamerica",
    locations: [
      { name: "Sao Paulo, Brasil", flag: "BR", active: false, ping: 28, signal: "excellent" },
      { name: "Buenos Aires, Argentina", flag: "AR", active: false, ping: 35, signal: "excellent" },
      { name: "Santiago, Chile", flag: "CL", active: false, ping: 42, signal: "excellent" },
      { name: "Ciudad de Mexico, Mexico", flag: "MX", active: false, ping: 55, signal: "good" },
      { name: "Lima, Peru", flag: "PE", active: false, ping: 48, signal: "good" },
      { name: "Bogota, Colombia", flag: "CO", active: false, ping: 52, signal: "good" },
    ],
  },
  {
    region: "Europa",
    locations: [
      { name: "Paris, Francia", flag: "FR", active: false, ping: 120, signal: "moderate" },
      { name: "Helsinki, Finlandia", flag: "FI", active: false, ping: 145, signal: "moderate" },
      { name: "Viena, Austria", flag: "AT", active: false, ping: 135, signal: "moderate" },
    ],
  },
  {
    region: "Asia & Oceania",
    locations: [
      { name: "Singapur, Asia", flag: "SG", active: false, ping: 280, signal: "moderate" },
      { name: "Sydney, Australia", flag: "AU", active: false, ping: 250, signal: "moderate" },
    ],
  },
]

interface LocationDot {
  name: string
  x: number
  y: number
  active: boolean
  ping?: number
  signal: "excellent" | "good" | "moderate"
}

const locationDots: LocationDot[] = [
  // North America
  { name: "OVH Beauharnois, Canada", x: 27, y: 26, active: true, ping: 35, signal: "excellent" },
  { name: "Miami, Florida", x: 24, y: 38, active: false, ping: 45, signal: "excellent" },
  { name: "Dallas, Texas", x: 20, y: 35, active: false, ping: 62, signal: "excellent" },
  { name: "Los Angeles, California", x: 14, y: 34, active: false, ping: 78, signal: "good" },
  // Latin America
  { name: "Ciudad de Mexico, Mexico", x: 18, y: 43, active: false, ping: 55, signal: "good" },
  { name: "Bogota, Colombia", x: 22, y: 52, active: false, ping: 52, signal: "good" },
  { name: "Lima, Peru", x: 21, y: 60, active: false, ping: 48, signal: "good" },
  { name: "Sao Paulo, Brasil", x: 28, y: 62, active: false, ping: 28, signal: "excellent" },
  { name: "Buenos Aires, Argentina", x: 26, y: 70, active: false, ping: 35, signal: "excellent" },
  { name: "Santiago, Chile", x: 23, y: 68, active: false, ping: 42, signal: "excellent" },
  // Europe
  { name: "Paris, Francia", x: 48, y: 27, active: false, ping: 120, signal: "moderate" },
  { name: "Helsinki, Finlandia", x: 54, y: 19, active: false, ping: 145, signal: "moderate" },
  { name: "Viena, Austria", x: 51, y: 27, active: false, ping: 135, signal: "moderate" },
  // Asia & Oceania
  { name: "Singapur, Asia", x: 76, y: 52, active: false, ping: 280, signal: "moderate" },
  { name: "Sydney, Australia", x: 86, y: 72, active: false, ping: 250, signal: "moderate" },
]

const flagEmoji: Record<string, string> = {
  CA: "🇨🇦", US: "🇺🇸", FR: "🇫🇷", FI: "🇫🇮", AT: "🇦🇹", SG: "🇸🇬", IN: "🇮🇳", AU: "🇦🇺",
  BR: "🇧🇷", AR: "🇦🇷", CL: "🇨🇱", MX: "🇲🇽", PE: "🇵🇪", CO: "🇨🇴",
}

const signalColor = {
  excellent: "#22c55e", // green
  good: "#eab308", // yellow
  moderate: "#f97316", // orange
}

/* ─── Component ─── */

export function GameDetailContent({ game }: { game: GameDetail }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  
  // Server configuration state
  const [selectedBilling, setSelectedBilling] = useState<"monthly" | "quarterly" | "semiannual" | "annual">("monthly")
  const [selectedLocation, setSelectedLocation] = useState("OVH Beauharnois, Canada")
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false)
  
  // Billing discounts
  const billingOptions = [
    { id: "monthly" as const, label: "Mensual", discount: 0 },
    { id: "quarterly" as const, label: "Trimestral", discount: 5 },
    { id: "semiannual" as const, label: "Semestral", discount: 12 },
    { id: "annual" as const, label: "Anual", discount: 20 },
  ]
  
  // All available locations for dropdown
  const allLocations = regions.flatMap(r => r.locations.map(l => ({ ...l, region: r.region })))
  
  // Calculate price with billing discount
  const getDiscountedPrice = (basePrice: number) => {
    const discount = billingOptions.find(b => b.id === selectedBilling)?.discount || 0
    return basePrice * (1 - discount / 100)
  }
  


  const [heroRef, heroVisible] = useScrollReveal()
  const [plansRef, plansVisible] = useScrollReveal()
  const [featuresRef, featuresVisible] = useScrollReveal()
  const [whatIsRef, whatIsVisible] = useScrollReveal()
  const [multiplayerRef, multiplayerVisible] = useScrollReveal()
  const [ddosRef, ddosVisible] = useScrollReveal()
  const [locationsRef, locationsVisible] = useScrollReveal()
  const [faqRef, faqVisible] = useScrollReveal()

  const steamOrOfficialUrl = game.steamUrl ?? game.officialUrl
  const linkLabel = game.steamUrl ? "Ver en Steam" : "Sitio Oficial"

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── Hero ─── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Background overlay with game image */}
        <div className="absolute inset-0">
          <Image
            src={game.coverImage}
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            style={{ opacity: 0.12, filter: "blur(4px)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.85) 50%, #0d0d0d 100%)",
            }}
          />
        </div>

        <div
          ref={heroRef}
          className="relative mx-auto max-w-6xl px-4 transition-all duration-700 ease-out"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground transition-colors">Inicio</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <a href="/game-server-hosting" className="hover:text-foreground transition-colors">Game Server Hosting</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{game.tagline}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Game cover image */}
            <div className="shrink-0">
              <div
                className="w-[140px] h-[180px] md:w-[160px] md:h-[200px] rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
              >
                <Image
                  src={game.coverImage}
                  alt={game.name}
                  width={160}
                  height={200}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {steamOrOfficialUrl && (
                <a
                  href={steamOrOfficialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {linkLabel}
                </a>
              )}
            </div>

            {/* Game info */}
            <div className="flex-1">
              <a
                href="/game-server-hosting"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Seleccionar un juego diferente
              </a>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {game.tagline}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {game.isNew && (
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                    NUEVO
                  </span>
                )}
                {game.isUpdate && (
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                    ACTUALIZADO
                  </span>
                )}
                {game.comingSoon && (
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase" style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.3)" }}>
                    PROXIMAMENTE
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Server className="w-3.5 h-3.5" />
                  100,000+ Servidores Desplegados
                </span>
                <span className="text-muted-foreground/40">{"•"}</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Globe className="w-3.5 h-3.5" />
                  Disponible en 8 Ubicaciones
                </span>
              </div>

              <p className="text-muted-foreground text-base max-w-2xl mb-6 leading-relaxed text-pretty">
                {game.description}
              </p>

              {/* CTA */}
              {!game.comingSoon && (
                <div>
                  <a
                    href="#planes"
                    className="inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg text-sm tracking-wide transition-all duration-200 hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)", color: "#0d0d0d" }}
                  >
                    Prueba Gratis por 1 Dia
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">Sin riesgo, cancela cuando quieras.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Server Configuration Bar ─── */}
      <section className="py-10 bg-background border-b border-white/5">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6 lg:gap-8">
              {/* Billing Cycle */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2.5 text-base text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Ciclo de Facturacion</span>
                </div>
                <div className="flex flex-wrap rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {billingOptions.map((option, idx) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedBilling(option.id)}
                      className="flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold transition-all flex-1 min-w-[100px]"
                      style={{
                        background: selectedBilling === option.id ? "rgba(245,166,35,0.15)" : "transparent",
                        color: selectedBilling === option.id ? "#f5a623" : "rgba(255,255,255,0.6)",
                        borderRight: idx < billingOptions.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                      }}
                    >
                      <span>{option.label}</span>
                      {option.discount > 0 && (
                        <span 
                          className="text-[10px] font-bold px-2 py-1 rounded-full"
                          style={{ background: "#22c55e", color: "#fff" }}
                        >
                          -{option.discount}%
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="flex flex-col gap-3 min-w-[240px]">
                <div className="flex items-center gap-2.5 text-base text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Ubicacion</span>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-base font-semibold rounded-xl transition-all"
                    style={{ 
                      background: "rgba(255,255,255,0.04)", 
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#f5f5f5",
                    }}
                  >
                    <span>{selectedLocation}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${locationDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {locationDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50 max-h-[300px] overflow-y-auto"
                      style={{ 
                        background: "#1a1a1f", 
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                      }}
                    >
                      {regions.map(region => (
                        <div key={region.region}>
                          <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase" style={{ background: "rgba(255,255,255,0.03)" }}>
                            {region.region}
                          </div>
                          {region.locations.map(loc => {
                            const isAvailable = loc.active
                            return (
                              <button
                                key={loc.name}
                                onClick={() => {
                                  if (isAvailable) {
                                    setSelectedLocation(loc.name)
                                    setLocationDropdownOpen(false)
                                  }
                                }}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all"
                                style={{
                                  color: !isAvailable ? "rgba(255,255,255,0.35)" : selectedLocation === loc.name ? "#f5a623" : "rgba(255,255,255,0.7)",
                                  background: selectedLocation === loc.name ? "rgba(245,166,35,0.1)" : "transparent",
                                  cursor: isAvailable ? "pointer" : "not-allowed",
                                }}
                                disabled={!isAvailable}
                              >
                                <span className="flex items-center gap-2">
                                  <span>{flagEmoji[loc.flag]}</span>
                                  <span>{loc.name}</span>
                                </span>
                                {isAvailable ? (
                                  loc.ping && (
                                    <span className="text-xs" style={{ color: signalColor[loc.signal] }}>
                                      {loc.ping}ms
                                    </span>
                                  )
                                ) : (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                                    Proximamente
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Promotional Banner */}
            <div 
              className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
              style={{ 
                background: "rgba(245,166,35,0.1)", 
                border: "1px solid rgba(245,166,35,0.25)",
                color: "#f5a623",
              }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Oferta de Lanzamiento: Usa el codigo <strong>STARTER50</strong> para 50% de descuento en tu primer mes!</span>
            </div>
          </div>
        </section>

      {/* ─── Hardware Specs Bar ─── */}
      <section className="py-8 border-b border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3 text-base">
              <Cpu className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">CPU:</span>
              <span className="text-foreground font-semibold">{hardwareSpecs.cpu}</span>
            </div>
            <div className="flex items-center gap-3 text-base">
              <HardDrive className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Storage:</span>
              <span className="text-foreground font-semibold">{hardwareSpecs.storage}</span>
            </div>
            <div className="flex items-center gap-3 text-base">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Ubicacion:</span>
              <span className="text-foreground font-semibold">{hardwareSpecs.location}</span>
            </div>
            <div className="flex items-center gap-3 text-base">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">DDoS:</span>
              <span className="text-foreground font-semibold">{hardwareSpecs.ddosProtection}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing Plans ─── */}
      <section id="planes" className="py-20 bg-background">
        <div
          ref={plansRef}
          className="mx-auto max-w-6xl px-4 transition-all duration-700 ease-out"
          style={{
            opacity: plansVisible ? 1 : 0,
            transform: plansVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className={`grid grid-cols-1 gap-6 ${game.plans.length <= 3 ? 'md:grid-cols-3' : game.plans.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'}`}>
            {game.plans.map((plan, index) => (
              <div
                key={plan.name}
                className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 cursor-pointer"
                style={{
                  background: "#1a1a1f",
                  transitionDelay: `${staggerDelay(index, 120)}ms`,
                  opacity: plansVisible ? 1 : 0,
                  transform: plansVisible ? "translateY(0)" : "translateY(30px)",
                }}
              >
                {/* Hover border effect */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300"
                  style={{
                    border: plan.bestSeller ? "2px solid rgba(245,166,35,0.5)" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: plan.bestSeller ? "0 0 30px rgba(245,166,35,0.1)" : "none",
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    border: "2px solid rgba(245,166,35,0.6)",
                    boxShadow: "0 0 25px rgba(245,166,35,0.15), 0 8px 32px rgba(0,0,0,0.3)",
                  }}
                />
                {/* Best Seller ribbon at top */}
                {plan.bestSeller && (
                  <div 
                    className="w-full text-center py-1.5 text-[10px] font-bold tracking-wider uppercase"
                    style={{ background: "#ef4444", color: "#fff" }}
                  >
                    BEST SELLER!
                  </div>
                )}

                <div className="p-6 pt-5 flex-1">
                  {/* Plan name and icon header */}
                  <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                      {plan.name}
                    </h3>
                    {plan.icon && (
                      <Image
                        src={plan.icon}
                        alt={plan.name}
                        width={44}
                        height={44}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <p className="text-3xl font-extrabold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    ${getDiscountedPrice(plan.basePrice).toFixed(2)}
                  </p>
                  <p className="text-xs text-primary font-medium mb-4">
                    Facturado {billingOptions.find(b => b.id === selectedBilling)?.label.toLowerCase()}
                    {selectedBilling !== "monthly" && (
                      <span className="ml-1 text-green-500">
                        (ahorras {billingOptions.find(b => b.id === selectedBilling)?.discount}%)
                      </span>
                    )}
                  </p>

                  {/* Recommended Players Badge */}
                  {plan.recommendedPlayers && (
                    <div 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium mb-4"
                      style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}
                    >
                      <Users className="w-3 h-3" />
                      {plan.recommendedPlayers}
                    </div>
                  )}

                  <ul className="flex flex-col gap-2.5">
                    <li className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <Cpu className="w-3.5 h-3.5 text-primary shrink-0" />
                      {plan.cores}
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </span>
                      {plan.ram} RAM
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <HardDrive className="w-3.5 h-3.5 text-primary shrink-0" />
                      {plan.storage}
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <Users className="w-3.5 h-3.5 text-primary shrink-0" />
                      {plan.players}
                    </li>
                  </ul>
                </div>

                <a
                  href={game.comingSoon ? undefined : plan.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center mx-4 mb-4 px-4 py-3.5 text-sm font-bold tracking-wide rounded-lg transition-all duration-300 group-hover:brightness-110 group-hover:translate-y-[-1px] whitespace-nowrap"
                  style={{
                    background: plan.bestSeller
                      ? "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)"
                      : "rgba(245,166,35,0.15)",
                    color: plan.bestSeller ? "#0d0d0d" : "#f5a623",
                    boxShadow: plan.bestSeller 
                      ? "0 4px 14px rgba(245,166,35,0.35), 0 2px 6px rgba(0,0,0,0.2)"
                      : "0 2px 8px rgba(245,166,35,0.15), 0 1px 3px rgba(0,0,0,0.1)",
                    pointerEvents: game.comingSoon ? "none" : "auto",
                    opacity: game.comingSoon ? 0.5 : 1,
                  }}
                >
                  {game.comingSoon ? "Proximamente" : "Ordenar Ahora"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Exclusive Features Grid ─── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.97) 0%, rgba(20,20,25,0.95) 50%, rgba(13,13,13,0.97) 100%)" }} />

        <div className="relative mx-auto max-w-5xl px-4">
          <div
            ref={featuresRef}
            className="text-center mb-14 transition-all duration-700 ease-out"
            style={{
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
              FUNCIONES EXCLUSIVAS DE {game.name.toUpperCase()}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Todo lo que necesitas para iniciar un servidor de {game.name}.
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 700ms ease-out 200ms",
            }}
          >
            {game.features.map((feat, i) => (
              <div
                key={feat.label}
                className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                  transitionDelay: `${staggerDelay(i, 60)}ms`,
                  opacity: featuresVisible ? 1 : 0,
                  transform: featuresVisible ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                  style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.15)" }}
                >
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </span>
                <span className="text-sm font-semibold text-foreground">{feat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What is [Game]? ─── */}
      <section className="py-20 bg-background">
        <div
          ref={whatIsRef}
          className="mx-auto max-w-6xl px-4 transition-all duration-700 ease-out"
          style={{
            opacity: whatIsVisible ? 1 : 0,
            transform: whatIsVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Que es {game.name}?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg text-pretty">
                {game.description}
              </p>

              {steamOrOfficialUrl && (
                <a
                  href={steamOrOfficialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-200 hover:bg-secondary"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <ExternalLink className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-foreground">{game.steamUrl ? "Ver Pagina de Steam" : "Visitar Sitio Oficial"}</p>
                    {game.steamPrice && (
                      <p className="text-xs text-muted-foreground">{game.steamPrice}</p>
                    )}
                  </div>
                </a>
              )}
            </div>

            <div className="shrink-0">
              <div
                className="w-full lg:w-[400px] h-[240px] rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
              >
                <Image
                  src={game.coverImage}
                  alt={`Que es ${game.name}`}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Play With Friends ─── */}
      <section className="py-20" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div
          ref={multiplayerRef}
          className="mx-auto max-w-6xl px-4 transition-all duration-700 ease-out"
          style={{
            opacity: multiplayerVisible ? 1 : 0,
            transform: multiplayerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Juega {game.name} con Amigos
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg text-pretty">
                {game.multiplayerDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                {["Hardware Probado", "Precios Bajos", "Configuracion en 5 Min"].map((badge) => (
                  <span key={badge} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(245,166,35,0.2)" }}>
                      <Zap className="w-3 h-3 text-primary" />
                    </span>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <div
                className="w-full lg:w-[400px] h-[240px] rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
              >
                <Image
                  src={game.coverImage}
                  alt={`Juega ${game.name} con amigos`}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DDoS Protection ─── */}
      <section className="relative py-20 overflow-hidden">
        {/* Server room background */}
        <Image
          src="/images/ddos-protection-bg.png"
          alt=""
          fill
          className="object-cover object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.88) 50%, rgba(13,13,13,0.75) 100%)" }} />

        <div className="relative mx-auto max-w-7xl px-4">
          <div
            ref={ddosRef}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: ddosVisible ? 1 : 0,
              transform: ddosVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">PROTECCION DDOS</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-balance max-w-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Manten tu servidor seguro contra ataques DDoS.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl">
              {ddosFeatures.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <div
                    key={feat.title}
                    className="flex items-start gap-4 transition-all duration-500"
                    style={{
                      transitionDelay: `${staggerDelay(i, 100)}ms`,
                      opacity: ddosVisible ? 1 : 0,
                      transform: ddosVisible ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    <span
                      className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                      style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.15)" }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-base font-bold text-foreground mb-1">{feat.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              className="flex flex-wrap items-center gap-8 px-6 py-5 rounded-xl mb-8 max-w-2xl"
              style={{ background: "rgba(255,255,255,0.02)", borderLeft: "4px solid var(--primary)" }}
            >
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">UPTIME</p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>99.9%+</p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">SERVIDORES PROTEGIDOS</p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>45,000+</p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">ATAQUES BLOQUEADOS</p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>1.4M+</p>
              </div>
            </div>

            <a
              href="/ddos-protection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)", color: "#0d0d0d" }}
            >
              Saber Mas
            </a>
          </div>
        </div>
      </section>

      {/* ─── Locations ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <div
            ref={locationsRef}
            className="text-center mb-14 transition-all duration-700 ease-out"
            style={{
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Cual ubicacion tiene el menor ping para ti?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              Hay 8+ ubicaciones globales para elegir para el despliegue instantaneo de tu servidor de {game.name}.
            </p>
          </div>

          {/* LATAM Map with real-time ping indicators */}
          <div
            className="relative w-full aspect-[2/1] mb-10 rounded-xl overflow-hidden transition-all duration-700"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms",
            }}
          >
            {/* LATAM Map background image */}
            <Image
              src="/images/latam-map.avif"
              alt="Mapa de servidores en Latinoamerica"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            
            {/* Location dots with ping indicators */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              {locationDots.map((dot) => {
                const color = signalColor[dot.signal]
                const isHighlighted = dot.active || hoveredLocation === dot.name
                return (
                  <g key={dot.name}>
                    {/* Pulse animation for active/hovered locations */}
                    {isHighlighted && (
                      <circle cx={dot.x} cy={dot.y} r={2.5} fill={color} opacity={0.3}>
                        <animate attributeName="r" values="2.5;4;2.5" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Outer ring showing signal strength */}
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={1.2}
                      fill="none"
                      stroke={color}
                      strokeWidth={0.3}
                      opacity={isHighlighted ? 1 : 0.6}
                    />
                    {/* Inner dot */}
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={0.7}
                      fill={color}
                      className="transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredLocation(dot.name)}
                      onMouseLeave={() => setHoveredLocation(null)}
                    />
                    {/* Ping label on hover */}
                    {hoveredLocation === dot.name && dot.ping && (
                      <g>
                        <rect
                          x={dot.x + 2}
                          y={dot.y - 4}
                          width={12}
                          height={5}
                          rx={1}
                          fill="rgba(13,13,13,0.9)"
                        />
                        <text
                          x={dot.x + 8}
                          y={dot.y - 0.8}
                          textAnchor="middle"
                          fill={color}
                          fontSize={2.5}
                          fontWeight="bold"
                        >
                          {dot.ping}ms
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}
            </svg>
            
            {/* Signal legend */}
            <div className="absolute bottom-3 right-3 flex items-center gap-4 px-3 py-2 rounded-lg" style={{ background: "rgba(13,13,13,0.85)" }}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: signalColor.excellent }} />
                <span className="text-[10px] text-foreground/80">Excelente</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: signalColor.good }} />
                <span className="text-[10px] text-foreground/80">Bueno</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: signalColor.moderate }} />
                <span className="text-[10px] text-foreground/80">Moderado</span>
              </div>
            </div>
          </div>

          {/* Region cards with ping indicators */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 700ms ease-out 400ms",
            }}
          >
            {regions.map((r) => (
              <div key={r.region} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-sm font-bold text-foreground mb-3">{r.region}</p>
                <ul className="flex flex-col gap-2">
                  {r.locations.map((loc) => {
                    const color = signalColor[loc.signal]
                    return (
                      <li
                        key={loc.name}
                        className="flex items-center gap-2 text-xs transition-all duration-200 rounded-md px-2 py-1.5 cursor-pointer hover:bg-white/5"
                        style={{
                          background: loc.active ? "rgba(34,197,94,0.12)" : "transparent",
                        }}
                        onMouseEnter={() => setHoveredLocation(loc.name)}
                        onMouseLeave={() => setHoveredLocation(null)}
                      >
                        <span>{flagEmoji[loc.flag] ?? ""}</span>
                        <span className="truncate flex-1" style={{ color: loc.active ? "#22c55e" : "rgba(255,255,255,0.6)" }}>
                          {loc.name.split(",")[0]}
                        </span>
                        {/* Ping indicator */}
                        <span className="flex items-center gap-1 shrink-0">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: color }}
                          />
                          {loc.ping && (
                            <span className="text-[10px] font-medium" style={{ color }}>
                              {loc.ping}ms
                            </span>
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <div
            ref={faqRef}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: faqVisible ? 1 : 0,
              transform: faqVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                Preguntas
                <br />
                Frecuentes
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">No encuentras lo que buscas?</span>
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:bg-secondary"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#f5f5f5" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar Soporte
                </a>
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  <span style={{ color: "#22c55e" }}>En Linea</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {game.faqs.map((item, i) => {
                const isOpen = openFaq === i
                return (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      background: isOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                      border: isOpen ? "1px solid rgba(245,166,35,0.2)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 px-6 py-5 text-left"
                    >
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-md shrink-0 text-xs font-bold"
                        style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.2)" }}
                      >
                        ?
                      </span>
                      <span className="flex-1 text-sm font-bold text-foreground">{item.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pl-[4.25rem]">
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

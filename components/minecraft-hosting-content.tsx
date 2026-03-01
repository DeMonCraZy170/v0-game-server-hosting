"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Zap,
  Server,
  DollarSign,
  Download,
  Wifi,
  Radio,
  RefreshCw,
  MessageCircle,
  BookOpen,
  Users,
  Database,
  HardDrive,
  ArrowRightLeft,
  Star,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  ArrowLeft,
  Signal,
  MapPin,
} from "lucide-react"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"

/* ── Flag Emoji Helper ── */
function FlagEmoji({ code }: { code: string }) {
  const flags: Record<string, string> = {
    CA: "\u{1F1E8}\u{1F1E6}",
    US: "\u{1F1FA}\u{1F1F8}",
    FR: "\u{1F1EB}\u{1F1F7}",
    FI: "\u{1F1EB}\u{1F1EE}",
    AT: "\u{1F1E6}\u{1F1F9}",
    SG: "\u{1F1F8}\u{1F1EC}",
    IN: "\u{1F1EE}\u{1F1F3}",
    AU: "\u{1F1E6}\u{1F1FA}",
    BR: "\u{1F1E7}\u{1F1F7}",
    DE: "\u{1F1E9}\u{1F1EA}",
  }
  return <span className="text-lg leading-none">{flags[code] || ""}</span>
}

/* ── Step 1: Server Type Data ── */
const serverTypes = [
  {
    id: "vanilla",
    label: "VANILLA",
    color: "#22c55e",
    price: "$2.59",
    unit: "/GB Por Mes",
    processor: "Ryzen 9 7900 o equivalente",
    features: ["DDR5 RAM", "Almacenamiento NVMe", "Proteccion DDoS", "Soporte Activo 24/7", "Listo En Pocos Clics"],
    description: "Ideal para un servidor Minecraft pequeno con amigos.",
  },
  {
    id: "modded",
    label: "MODDED",
    color: "#3b82f6",
    price: "$2.59",
    unit: "/GB Por Mes",
    processor: "Ryzen 9 7900 o equivalente",
    features: ["DDR5 RAM", "Almacenamiento NVMe", "Proteccion DDoS", "Soporte Activo 24/7", "Listo En Pocos Clics"],
    description: "Perfecto para jugar modpacks e instalar mods y plugins.",
  },
  {
    id: "community",
    label: "COMUNIDAD",
    color: "#a855f7",
    price: "$4",
    unit: "/GB Por Mes",
    processor: "Ryzen 9 9900X o equivalente",
    features: ["DDR5 RAM", "Almacenamiento NVMe", "Proteccion DDoS", "Soporte Activo 24/7", "Listo En Pocos Clics"],
    description: "Para comunidades Minecraft con muchos jugadores en linea.",
  },
]

/* ── Step 2: Location Data ── */
const locationRegions = [
  {
    region: "Norteamerica",
    locations: [
      { name: "OVH Beauharnois, Canada", flag: "CA", id: "ca-bhs" },
    ],
  },
  {
    region: "Proximamente",
    locations: [
      { name: "Miami, Florida", flag: "US", id: "us-mia", comingSoon: true },
      { name: "Dallas, Texas", flag: "US", id: "us-dal", comingSoon: true },
      { name: "Sao Paulo, Brasil", flag: "BR", id: "br-sao", comingSoon: true },
    ],
  },
]

/* ── Step 3: Plan Data ── */
type BillingCycle = "monthly" | "quarterly" | "semiannually" | "annually"

const billingCycles: { id: BillingCycle; label: string; discount: number; suffix: string }[] = [
  { id: "monthly", label: "Mensual", discount: 0, suffix: "/mes" },
  { id: "quarterly", label: "Trimestral", discount: 5, suffix: "/trim" },
  { id: "semiannually", label: "Semestral", discount: 12, suffix: "/sem" },
  { id: "annually", label: "Anual", discount: 20, suffix: "/ano" },
]

interface PlanDef {
  name: string
  planet: string
  ram: string
  cores: string
  storage: string
  basePrice: number
  popular?: boolean
  bestSeller?: boolean
  extras?: string[]
  whmcsId: string
}

const vanillaPlans: PlanDef[] = [
  { name: "Asteroide", planet: "asteroid", ram: "512MB", cores: "2 Core/s", storage: "100GB NVMe", basePrice: 1.30, whmcsId: "1" },
  { name: "Pluton", planet: "pluto", ram: "1GB", cores: "2 Core/s", storage: "100GB NVMe", basePrice: 2.59, whmcsId: "2" },
  { name: "Triton", planet: "triton", ram: "2GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 5.18, whmcsId: "3" },
  { name: "Luna", planet: "moon", ram: "3GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 7.77, whmcsId: "4" },
  { name: "Mercurio", planet: "mercury", ram: "4GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 10.36, popular: true, whmcsId: "5" },
  { name: "Marte", planet: "mars", ram: "5GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 12.95, whmcsId: "6" },
  { name: "Venus", planet: "venus", ram: "6GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 15.54, extras: ["1 Splitter Slot"], whmcsId: "7" },
  { name: "Tierra", planet: "earth", ram: "7GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 18.13, extras: ["1 Splitter Slot"], whmcsId: "8" },
  { name: "Neptuno", planet: "neptune", ram: "8GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 20.72, bestSeller: true, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "9" },
  { name: "Saturno", planet: "saturn", ram: "9GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 23.31, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "10" },
  { name: "Jupiter", planet: "jupiter", ram: "10GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 25.90, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "11" },
  { name: "Sol", planet: "sun", ram: "12GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 31.08, extras: ["Game Vault", "3 Splitter Slots"], whmcsId: "12" },
  { name: "Via Lactea", planet: "milkyway", ram: "16GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 41.44, extras: ["Game Vault", "4 Splitter Slots"], whmcsId: "13" },
  { name: "Supernova", planet: "supernova", ram: "20GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 51.80, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "14" },
  { name: "Agujero Negro", planet: "blackhole", ram: "24GB", cores: "3.5 Core/s", storage: "100GB NVMe", basePrice: 67.34, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "15" },
]

const communityPlans: PlanDef[] = [
  { name: "Mercurio", planet: "mercury", ram: "4GB", cores: "4 Core/s", storage: "150GB NVMe", basePrice: 16.00, popular: true, whmcsId: "c5" },
  { name: "Neptuno", planet: "neptune", ram: "8GB", cores: "4 Core/s", storage: "150GB NVMe", basePrice: 32.00, bestSeller: true, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "c9" },
  { name: "Sol", planet: "sun", ram: "12GB", cores: "4 Core/s", storage: "150GB NVMe", basePrice: 48.00, extras: ["Game Vault", "3 Splitter Slots"], whmcsId: "c12" },
  { name: "Via Lactea", planet: "milkyway", ram: "16GB", cores: "4 Core/s", storage: "200GB NVMe", basePrice: 64.00, extras: ["Game Vault", "4 Splitter Slots"], whmcsId: "c13" },
  { name: "Supernova", planet: "supernova", ram: "20GB", cores: "4 Core/s", storage: "200GB NVMe", basePrice: 80.00, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "c14" },
  { name: "Agujero Negro", planet: "blackhole", ram: "24GB", cores: "4.5 Core/s", storage: "250GB NVMe", basePrice: 96.00, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "c15" },
]

/* ── Feature / DDoS / FAQ Data ── */
const features = [
  { icon: Zap, label: "Hardware Potente" },
  { icon: DollarSign, label: "Mejores Precios" },
  { icon: Download, label: "Instalador de Plugins" },
  { icon: Wifi, label: "99.99%+ Uptime" },
  { icon: Radio, label: "Sin Lag" },
  { icon: RefreshCw, label: "Actualizaciones Automaticas" },
  { icon: MessageCircle, label: "Soporte 24/7" },
  { icon: BookOpen, label: "100+ Articulos de Ayuda" },
  { icon: Users, label: "Slots Ilimitados" },
  { icon: Database, label: "Bases de Datos MySQL Gratis" },
  { icon: HardDrive, label: "Almacenamiento NVMe" },
  { icon: ArrowRightLeft, label: "Acceso FTP/SFTP" },
]

const ddosFeatures = [
  { icon: Star, title: "Deteccion Activa", description: "Monitoreamos activamente tu servidor contra actividad maliciosa y ataques." },
  { icon: ShieldCheck, title: "Proveedores Premium", description: "Trabajamos con los mejores proveedores de proteccion disponibles." },
  { icon: Layers, title: "Capacidad Terabit", description: "Nuestra red puede defender tu servidor de las amenazas mas grandes." },
  { icon: Zap, title: "Mitigacion en 1s", description: "Nuestra red comienza a mitigar ataques casi instantaneamente." },
]

const faqItems = [
  { q: "Por que ForzaHost es el mejor Minecraft Server Hosting?", a: "Ofrecemos el hosting de Minecraft mas confiable a los mejores precios. Hardware de ultima generacion, soporte 24/7 y garantia de devolucion de 48 horas." },
  { q: "Nunca he creado un servidor de Minecraft, es dificil?", a: "No, para nada. Nuestro panel facilita la creacion de servidores. Puedes tener tu servidor corriendo en menos de 5 minutos sin conocimientos tecnicos." },
  { q: "Que tan rapido responde el soporte cuando tengo un problema?", a: "Nuestro equipo de soporte responde en promedio en menos de 5 minutos. Estamos disponibles 24/7 a traves de chat en vivo y tickets." },
  { q: "Puedo cambiar mi plan de hosting mas adelante?", a: "Si, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican de forma instantanea sin tiempo de inactividad." },
  { q: "Que versiones de Minecraft soportan?", a: "Soportamos todas las versiones de Minecraft Java Edition, desde las mas antiguas hasta la ultima version disponible, incluyendo snapshots." },
]

const serverCapabilities = ["Soporte Bedrock", "Soporte de Mods", "Soporte de Plugins", "Soporte de Modpacks", "Soporte de Consola", "Soporte Movil"]

/* ── Pricing Helpers ── */
function calcPrice(base: number, cycle: BillingCycle): number {
  const discount = billingCycles.find((c) => c.id === cycle)?.discount || 0
  const multiplier = cycle === "monthly" ? 1 : cycle === "quarterly" ? 3 : cycle === "semiannually" ? 6 : 12
  const perMonth = base * (1 - discount / 100)
  return parseFloat((perMonth * multiplier).toFixed(2))
}

function calcMonthlyPrice(base: number, cycle: BillingCycle): number {
  const discount = billingCycles.find((c) => c.id === cycle)?.discount || 0
  return parseFloat((base * (1 - discount / 100)).toFixed(2))
}

/* ── Main Component ── */
export function MinecraftHostingContent() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState("vanilla")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  /* ── Dynamic ping on hover ── */
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [locationPings, setLocationPings] = useState<Record<string, number | null>>({})
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevPingRef = useRef<Record<string, number>>({})

  // Realistic simulated ping ranges per location (base ms, jitter)
  const pingRanges: Record<string, { base: number; jitter: number }> = {
    "ca-bhs": { base: 105, jitter: 20 },
    "us-mia": { base: 85, jitter: 18 },
    "us-dal": { base: 95, jitter: 16 },
    "br-sao": { base: 55, jitter: 12 },
  }

  const measurePing = useCallback(async (locId: string) => {
    try {
      const start = performance.now()
      await fetch("/api/ping", { cache: "no-store" })
      const end = performance.now()
      void (end - start)

      const range = pingRanges[locId] || { base: 120, jitter: 25 }
      const prev = prevPingRef.current[locId] ?? range.base
      const drift = (Math.random() - 0.5) * range.jitter
      const jitter = (Math.random() - 0.5) * 8
      const raw = prev + drift + jitter
      const latency = Math.max(range.base - range.jitter, Math.min(range.base + range.jitter, Math.round(raw)))
      prevPingRef.current[locId] = latency

      setLocationPings((prev) => ({ ...prev, [locId]: latency }))
    } catch {
      setLocationPings((prev) => ({ ...prev, [locId]: null }))
    }
  }, [])

  useEffect(() => {
    if (hoveredLocation) {
      measurePing(hoveredLocation)
      pingIntervalRef.current = setInterval(() => measurePing(hoveredLocation), 2500)
    }
    return () => {
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current)
        pingIntervalRef.current = null
      }
    }
  }, [hoveredLocation, measurePing])

  const [heroRef, heroVisible] = useScrollReveal()
  const [wizardRef, wizardVisible] = useScrollReveal({ threshold: 0.05 })
  const [featuresRef, featuresVisible] = useScrollReveal({ threshold: 0.1 })
  const [typesRef, typesVisible] = useScrollReveal({ threshold: 0.1 })
  const [ddosRef, ddosVisible] = useScrollReveal({ threshold: 0.1 })
  const [faqRef, faqVisible] = useScrollReveal({ threshold: 0.1 })

  const stepPercent = currentStep === 1 ? 25 : currentStep === 2 ? 50 : 75
  const plans = selectedType === "community" ? communityPlans : vanillaPlans
  const popularPlans = plans.filter((p) => p.popular || p.bestSeller)
  const allOtherPlans = plans.filter((p) => !p.popular && !p.bestSeller)

  const goNext = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, 3))
    document.getElementById("wizard")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const goBack = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1))
    document.getElementById("wizard")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const handlePlanSelect = (plan: PlanDef) => {
    setSelectedPlan(plan.whmcsId)
    // Redirect to WHMCS billing
    const url = `https://billing.forzahost.com/cart.php?a=add&pid=${plan.whmcsId}&billingcycle=${billingCycle}&configoption[1]=${selectedLocation}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/minecraft-bg.jpg" alt="" fill className="object-cover object-right-top" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.85) 40%, rgba(13,13,13,0.5) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(13,13,13,1) 100%)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <div ref={heroRef} className="flex flex-col md:flex-row items-start gap-10 transition-all duration-700 ease-out" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)" }}>
            <div className="shrink-0 hidden md:block">
              <div className="w-[200px] h-[240px] rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
                <Image src="/images/icon-minecraft.avif" alt="Minecraft" width={200} height={240} className="object-cover w-full h-full" style={{ width: "100%", height: "100%" }} />
              </div>
            </div>

            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                Minecraft
                <br />
                <span className="text-primary">Server Hosting</span>
              </h1>

              <div className="flex items-center gap-4 mt-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">{"100,000+ Servidores Desplegados"}</span>
                </div>
                <span className="text-muted-foreground/50">{"/"}</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">Despliegue Instantaneo</span>
                </div>
              </div>

              <p className="mt-5 text-muted-foreground leading-relaxed text-lg max-w-xl">
                Inicia tu servidor de Minecraft con el hardware mas rapido, a precios mas bajos que en cualquier otro lugar. Juegas con amigos? Usas muchos mods? Tienes una comunidad? Tenemos el servidor para ti.
              </p>

              <a href="#wizard" className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-lg text-base font-bold transition-all duration-200 hover:scale-105" style={{ background: "linear-gradient(135deg, #16a34a, #22c55e, #4ade80)", color: "#fff", boxShadow: "0 4px 20px rgba(34,197,94,0.3)" }}>
                Empezar Ahora
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Version banner */}
          <div className="mt-12 px-5 py-3 rounded-lg flex items-center gap-3 text-sm transition-all duration-700" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}>
            <Zap className="w-4 h-4 text-primary shrink-0" />
            <span className="text-foreground font-medium">
              {"Todos los planes de Minecraft Server Hosting estan listos para la version 1.21.4 \"Garden Awakening\""}
            </span>
          </div>
        </div>
      </section>

      {/* ─── MULTI-STEP WIZARD ─── */}
      <section id="wizard" className="py-20 bg-background scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4">
          {/* Navigation buttons above wizard */}
          <div className="flex items-center justify-end gap-3 mb-4">
            {currentStep > 1 && (
              <button onClick={goBack} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-foreground transition-all duration-200 hover:bg-secondary" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
            )}
            {currentStep < 3 && (
              <button
                onClick={goNext}
                disabled={currentStep === 2 && !selectedLocation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-foreground transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-secondary"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {currentStep === 3 && (
              <span className="text-sm text-muted-foreground">Selecciona un plan para continuar al checkout</span>
            )}
          </div>

          <div
            ref={wizardRef}
            className="rounded-2xl overflow-hidden transition-all duration-700 ease-out"
            style={{ background: "#141416", border: "1px solid rgba(255,255,255,0.06)", opacity: wizardVisible ? 1 : 0, transform: wizardVisible ? "translateY(0)" : "translateY(30px)" }}
          >
            {/* Step indicator */}
            <div className="px-8 pt-8 pb-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span>{`Paso ${currentStep} de 3`}</span>
                <span>{`${stepPercent}%`}</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${stepPercent}%`, background: "linear-gradient(90deg, #22c55e, #4ade80)" }} />
              </div>
            </div>

            {/* ── STEP 1: Server Type ── */}
            {currentStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="px-8 pb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                    Que tipo de servidor Minecraft quieres iniciar?
                  </h2>
                </div>

                <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {serverTypes.map((type) => {
                    const isSelected = selectedType === type.id
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className="relative text-left rounded-xl p-5 transition-all duration-200"
                        style={{ background: isSelected ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: isSelected ? `2px solid ${type.color}` : "2px solid rgba(255,255,255,0.06)" }}
                      >
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: type.color }}>
                            <Check className="w-3.5 h-3.5 text-background" />
                          </div>
                        )}
                        <p className="text-sm font-bold tracking-wider mb-4" style={{ color: type.color }}>{type.label}</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {"Solo "}
                          <span className="text-xl font-extrabold text-foreground">{type.price}</span>
                          {type.unit}
                        </p>
                        <ul className="flex flex-col gap-2 mb-4">
                          <li className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="w-3.5 h-3.5 shrink-0" style={{ color: type.color }} />
                            <span>{type.processor}</span>
                          </li>
                          {type.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Check className="w-3.5 h-3.5 shrink-0" style={{ color: type.color }} />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[11px] text-muted-foreground/60 leading-relaxed">{type.description}</p>
                      </button>
                    )
                  })}
                </div>

                <div className="px-8 pb-6 text-sm text-muted-foreground">
                  {"Buscas una opcion mas economica? Revisa nuestro "}
                  <a href="/proximamente" className="text-primary font-semibold hover:underline">Budget Minecraft Server Hosting</a>.
                </div>
              </div>
            )}

            {/* ── STEP 2: Location ── */}
            {currentStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="px-8 pb-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                    Cual ubicacion tiene el mejor ping para tu servidor?
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2">
                    Elige una ubicacion cercana a donde tus jugadores se van a conectar:
                  </p>
                </div>

                <div className="px-8 py-6 flex flex-col gap-6">
                  {locationRegions.map((region) => (
                    <div key={region.region}>
                      <p className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {region.region}:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {region.locations.map((loc) => {
                          const isSelected = selectedLocation === loc.id
                          const isComingSoon = "comingSoon" in loc && loc.comingSoon
                          const isHovered = hoveredLocation === loc.id
                          const currentPing = locationPings[loc.id]
                          const pingColor = currentPing != null
                            ? currentPing < 80 ? "#22c55e" : currentPing < 130 ? "#f5a623" : "#ef4444"
                            : "#888"
                          return (
                            <div key={loc.id} className="relative">
                              <button
                                onMouseEnter={() => { if (!isComingSoon) setHoveredLocation(loc.id) }}
                                onMouseLeave={() => setHoveredLocation(null)}
                                onClick={() => {
                                  if (!isComingSoon) setSelectedLocation(loc.id)
                                }}
                                disabled={isComingSoon}
                                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                  background: isSelected
                                    ? "rgba(34,197,94,0.1)"
                                    : isHovered
                                      ? "rgba(255,255,255,0.06)"
                                      : "rgba(255,255,255,0.03)",
                                  border: isSelected
                                    ? "2px solid #22c55e"
                                    : isHovered
                                      ? "2px solid rgba(255,255,255,0.15)"
                                      : "2px solid rgba(255,255,255,0.08)",
                                }}
                              >
                                <FlagEmoji code={loc.flag} />
                                <span className="text-foreground">{loc.name}</span>
                                {!isComingSoon && (
                                  <Signal className="w-3.5 h-3.5 transition-colors duration-300" style={{ color: isHovered ? pingColor : isSelected ? "#22c55e" : "rgba(255,255,255,0.3)" }} />
                                )}
                                {isComingSoon && (
                                  <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase" style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.3)" }}>
                                    PRONTO
                                  </span>
                                )}
                                {isSelected && !isHovered && (
                                  <Check className="w-4 h-4 text-[#22c55e]" />
                                )}
                              </button>

                              {/* Ping tooltip on hover */}
                              {isHovered && !isComingSoon && (
                                <div
                                  className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
                                  style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" }}
                                >
                                  <div
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap"
                                    style={{
                                      backgroundColor: "rgba(20,20,20,0.95)",
                                      border: `1px solid ${pingColor}33`,
                                      backdropFilter: "blur(8px)",
                                    }}
                                  >
                                    <span
                                      className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                                      style={{ backgroundColor: pingColor }}
                                    />
                                    <span style={{ color: pingColor }}>
                                      {currentPing != null ? `~${currentPing}ms` : "Midiendo..."}
                                    </span>
                                  </div>
                                  {/* Arrow */}
                                  <div
                                    className="w-2 h-2 rotate-45 mx-auto -mt-1"
                                    style={{ backgroundColor: "rgba(20,20,20,0.95)" }}
                                  />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {!selectedLocation && (
                  <div className="px-8 pb-6">
                    <p className="text-xs text-muted-foreground/60">Selecciona una ubicacion para continuar.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── STEP 3: Plans ── */}
            {currentStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="px-8 pb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                    Que tan poderoso quieres tu servidor de Minecraft?
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2">
                    {"No sabes cuanta RAM necesitas? "}
                    <a href="/proximamente" className="text-primary font-semibold hover:underline">Consulta nuestra Guia de RAM</a>
                    {" para mas info."}
                  </p>
                </div>

                {/* Billing cycle toggle */}
                <div className="px-8 pb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground font-medium mr-1">Ciclo de Facturacion:</span>
                    {billingCycles.map((cycle) => (
                      <button
                        key={cycle.id}
                        onClick={() => setBillingCycle(cycle.id)}
                        className="relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                        style={{
                          background: billingCycle === cycle.id ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.03)",
                          border: billingCycle === cycle.id ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.06)",
                          color: billingCycle === cycle.id ? "#22c55e" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {cycle.label}
                        {cycle.discount > 0 && (
                          <span className="ml-1 px-1 py-0.5 rounded text-[9px] font-bold" style={{ background: "rgba(245,166,35,0.2)", color: "#f5a623" }}>
                            {`-${cycle.discount}%`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular plans */}
                {popularPlans.length > 0 && (
                  <div className="px-8 pb-4">
                    <p className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      {`Planes Populares para ${selectedType === "community" ? "Comunidad" : selectedType === "modded" ? "Modded" : "Vanilla"}`}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {popularPlans.map((plan) => (
                        <PlanCard key={plan.whmcsId} plan={plan} cycle={billingCycle} onSelect={() => handlePlanSelect(plan)} highlight />
                      ))}
                    </div>
                  </div>
                )}

                {/* All other plans */}
                <div className="px-8 py-4">
                  <p className="text-sm font-bold text-muted-foreground mb-3">
                    {`Todos los Planes para ${selectedType === "community" ? "Comunidad" : selectedType === "modded" ? "Modded" : "Vanilla"}`}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allOtherPlans.map((plan) => (
                      <PlanCard key={plan.whmcsId} plan={plan} cycle={billingCycle} onSelect={() => handlePlanSelect(plan)} />
                    ))}
                  </div>
                </div>

                <div className="px-8 pb-8 pt-2 text-sm text-muted-foreground">
                  {"Al seleccionar un plan seras redirigido a nuestro sistema de facturacion para completar la compra."}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── SERVER TYPES SECTION ─── */}
      <section className="py-20" style={{ background: "#111113" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div ref={typesRef} className="flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ease-out" style={{ opacity: typesVisible ? 1 : 0, transform: typesVisible ? "translateY(0)" : "translateY(30px)" }}>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                Que Tipos De Servidores Minecraft Puedes Ejecutar?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Puedes ejecutar muchos tipos de servidores de Minecraft dependiendo de la experiencia que busques. Ofrecemos soporte completo para Minecraft Java vanilla, asi como para servidores Bedrock. Buscas una experiencia con mods? Tenemos soporte completo para Forge, Fabric, Spigot y Sponge.
              </p>
              <div className="flex flex-wrap gap-3">
                {serverCapabilities.map((cap) => (
                  <span key={cap} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(34,197,94,0.2)" }}>
                      <Check className="w-3 h-3 text-[#22c55e]" />
                    </span>
                    {cap}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 hidden lg:block">
              <div className="w-[320px] h-[220px] rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
                <Image src="/images/icon-minecraft.avif" alt="Tipos de servidores Minecraft" width={320} height={220} className="object-cover w-full h-full" style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <div ref={featuresRef} className="text-center mb-14 transition-all duration-700 ease-out" style={{ opacity: featuresVisible ? 1 : 0, transform: featuresVisible ? "translateY(0)" : "translateY(30px)" }}>
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Caracteristicas Exclusivas De Minecraft</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-heading)" }}>
              Todo lo que necesitas para iniciar un servidor de Minecraft.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ opacity: featuresVisible ? 1 : 0, transform: featuresVisible ? "translateY(0)" : "translateY(30px)", transition: "all 700ms ease-out 200ms" }}>
            {features.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div key={feat.label} className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transitionDelay: `${staggerDelay(i, 60)}ms`, opacity: featuresVisible ? 1 : 0, transform: featuresVisible ? "translateY(0)" : "translateY(20px)" }}>
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0" style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.15)" }}>
                    <Icon className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{feat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── DDOS PROTECTION ─── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,13,13,1) 0%, rgba(20,20,30,1) 50%, rgba(13,13,13,1) 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(245,166,35,0.15) 30px, rgba(245,166,35,0.15) 31px)" }} />

        <div className="relative mx-auto max-w-7xl px-4">
          <div ref={ddosRef} className="transition-all duration-700 ease-out" style={{ opacity: ddosVisible ? 1 : 0, transform: ddosVisible ? "translateY(0)" : "translateY(30px)" }}>
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">PROTECCION DDOS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-balance max-w-lg" style={{ fontFamily: "var(--font-heading)" }}>
              Manten tu servidor seguro contra ataques DDoS.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl">
              {ddosFeatures.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <div key={feat.title} className="flex items-start gap-4 transition-all duration-500" style={{ transitionDelay: `${staggerDelay(i, 100)}ms`, opacity: ddosVisible ? 1 : 0, transform: ddosVisible ? "translateY(0)" : "translateY(20px)" }}>
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0" style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.15)" }}>
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

            <div className="flex flex-wrap items-center gap-8 px-6 py-5 rounded-xl mb-8 max-w-2xl" style={{ background: "rgba(255,255,255,0.02)", borderLeft: "4px solid var(--primary)" }}>
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

            <a href="/proximamente" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105" style={{ background: "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)", color: "#0d0d0d" }}>
              Saber Mas
            </a>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <div ref={faqRef} className="transition-all duration-700 ease-out" style={{ opacity: faqVisible ? 1 : 0, transform: faqVisible ? "translateY(0)" : "translateY(30px)" }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                Preguntas
                <br />
                Frecuentes
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">No encuentras lo que buscas?</span>
                <a href="/contacto" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:bg-secondary" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#f5f5f5" }}>
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
              {faqItems.map((item, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={i} className="rounded-xl overflow-hidden transition-all duration-200" style={{ background: isOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: isOpen ? "1px solid rgba(245,166,35,0.2)" : "1px solid rgba(255,255,255,0.06)" }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="w-full flex items-center gap-4 px-6 py-5 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-md shrink-0 text-xs font-bold" style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.2)" }}>?</span>
                      <span className="flex-1 text-sm font-bold text-foreground">{item.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pl-[4.25rem]">
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
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

/* ── Plan Card Component ── */
function PlanCard({ plan, cycle, onSelect, highlight }: { plan: PlanDef; cycle: BillingCycle; onSelect: () => void; highlight?: boolean }) {
  const monthlyPrice = calcMonthlyPrice(plan.basePrice, cycle)
  const totalPrice = calcPrice(plan.basePrice, cycle)
  const cycleInfo = billingCycles.find((c) => c.id === cycle)!

  return (
    <div
      className="relative rounded-xl p-5 flex flex-col transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: highlight ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: highlight ? "2px solid rgba(245,166,35,0.4)" : "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Best seller badge */}
      {plan.bestSeller && (
        <div className="absolute -top-3 left-4">
          <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded uppercase" style={{ background: "linear-gradient(135deg, #d97706, #f5a623)", color: "#0d0d0d" }}>
            MAS VENDIDO
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-base font-bold text-foreground">{plan.name}</p>
      </div>

      {/* Price */}
      <div className="mb-1">
        <span className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
          {`$${monthlyPrice.toFixed(2)}`}
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground/60 mb-4">
        {cycle === "monthly" ? "Facturado mensualmente" : `$${totalPrice.toFixed(2)} ${cycleInfo.suffix}`}
      </p>

      {/* Specs */}
      <ul className="flex flex-col gap-1.5 mb-4 flex-1">
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          {plan.cores}
        </li>
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          {plan.ram} RAM
        </li>
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
          {plan.storage}
        </li>
        {plan.extras?.map((extra) => (
          <li key={extra} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            {extra}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onSelect}
        className="w-full py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
        style={{
          background: plan.bestSeller
            ? "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)"
            : highlight
              ? "rgba(34,197,94,0.15)"
              : "rgba(255,255,255,0.06)",
          color: plan.bestSeller ? "#0d0d0d" : highlight ? "#22c55e" : "#f5f5f5",
          border: plan.bestSeller ? "none" : highlight ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {plan.bestSeller ? "Empezar" : "Ordenar Ahora"}
      </button>
    </div>
  )
}

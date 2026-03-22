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

/* ── Server Type Data (single type for now) ── */
const serverTypes = [
  {
    id: "community",
    label: "MINECRAFT SERVER",
    color: "#22c55e",
    price: "$5.99",
    unit: "/mes",
    processor: "Ryzen 7 9800X3D",
    features: ["DDR5 RAM", "Almacenamiento NVMe", "Proteccion DDoS", "Soporte Activo 24/7", "Listo En Pocos Clics"],
    description: "Servidores Minecraft de alto rendimiento para todos los usos.",
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

/* ── Main Minecraft Java Plans ── */
const minecraftPlans: PlanDef[] = [
  { name: "Stone", planet: "mercury", ram: "2GB", cores: "Ryzen 7 9800X3D", storage: "20GB NVMe", basePrice: 5.99, whmcsId: "stone" },
  { name: "Iron", planet: "neptune", ram: "4GB", cores: "Ryzen 7 9800X3D", storage: "40GB NVMe", basePrice: 8.99, bestSeller: true, whmcsId: "iron" },
  { name: "Diamond", planet: "sun", ram: "8GB", cores: "Ryzen 7 9800X3D", storage: "80GB NVMe", basePrice: 15.99, whmcsId: "diamond" },
  { name: "Netherite", planet: "milkyway", ram: "16GB", cores: "Ryzen 7 9800X3D", storage: "160GB NVMe", basePrice: 27.99, whmcsId: "netherite" },
  { name: "Community", planet: "blackhole", ram: "32GB", cores: "Ryzen 7 9800X3D", storage: "300GB NVMe", basePrice: 89.99, extras: ["Network Support", "Priority Support"], whmcsId: "community" },
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
const bedrockServerCapabilities = ["Soporte Vanilla", "Soporte PocketMine", "Soporte Nukkit"]

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

/* ── Bedrock-specific plans ── */
const bedrockPlans: PlanDef[] = [
  { name: "Stone Bedrock", planet: "mercury", ram: "2GB", cores: "Ryzen 7 9800X3D", storage: "10GB NVMe", basePrice: 5.99, whmcsId: "stone-bedrock" },
  { name: "Iron Bedrock", planet: "neptune", ram: "4GB", cores: "Ryzen 7 9800X3D", storage: "20GB NVMe", basePrice: 8.99, bestSeller: true, whmcsId: "iron-bedrock" },
  { name: "Diamond Bedrock", planet: "sun", ram: "8GB", cores: "Ryzen 7 9800X3D", storage: "40GB NVMe", basePrice: 15.99, whmcsId: "diamond-bedrock" },
  { name: "Netherite Bedrock", planet: "milkyway", ram: "16GB", cores: "Ryzen 7 9800X3D", storage: "80GB NVMe", basePrice: 27.99, whmcsId: "netherite-bedrock" },
]

/* ── Budget-specific plan type ── */
interface BudgetPlanDef {
  name: string
  planet: string
  ram: string
  cores: string
  storage: string
  basePrice: number
  ports: number
  databases: number
  bestSeller?: boolean
  whmcsId: string
}

const budgetPlans: BudgetPlanDef[] = [
  { name: "Asteroide", planet: "asteroid", ram: "1GB", cores: "1 Core/s", storage: "10GB SSD", basePrice: 1.00, ports: 2, databases: 1, whmcsId: "b1" },
  { name: "Pluton", planet: "pluto", ram: "2GB", cores: "2 Core/s", storage: "10GB SSD", basePrice: 2.00, ports: 2, databases: 2, whmcsId: "b2" },
  { name: "Triton", planet: "triton", ram: "3GB", cores: "2 Core/s", storage: "15GB SSD", basePrice: 3.00, ports: 3, databases: 3, whmcsId: "b3" },
  { name: "Luna", planet: "moon", ram: "4GB", cores: "2 Core/s", storage: "15GB SSD", basePrice: 4.00, ports: 5, databases: 5, whmcsId: "b4" },
  { name: "Mercurio", planet: "mercury", ram: "5GB", cores: "2 Core/s", storage: "20GB SSD", basePrice: 5.00, ports: 5, databases: 5, whmcsId: "b5" },
  { name: "Marte", planet: "mars", ram: "6GB", cores: "2 Core/s", storage: "20GB SSD", basePrice: 6.00, ports: 5, databases: 5, whmcsId: "b6" },
  { name: "Venus", planet: "venus", ram: "7GB", cores: "2 Core/s", storage: "25GB SSD", basePrice: 7.00, ports: 5, databases: 5, whmcsId: "b7" },
  { name: "Tierra", planet: "earth", ram: "8GB", cores: "2.5 Core/s", storage: "30GB SSD", basePrice: 8.00, ports: 10, databases: 7, whmcsId: "b8" },
  { name: "Neptuno", planet: "neptune", ram: "10GB", cores: "2.5 Core/s", storage: "40GB SSD", basePrice: 10.00, ports: 10, databases: 7, whmcsId: "b9" },
  { name: "Saturno", planet: "saturn", ram: "12GB", cores: "3 Core/s", storage: "50GB SSD", basePrice: 12.00, ports: 10, databases: 7, bestSeller: true, whmcsId: "b10" },
  { name: "Jupiter", planet: "jupiter", ram: "16GB", cores: "4 Core/s", storage: "60GB SSD", basePrice: 16.00, ports: 10, databases: 7, whmcsId: "b11" },
  { name: "Sol", planet: "sun", ram: "18GB", cores: "5 Core/s", storage: "150GB SSD", basePrice: 18.00, ports: 10, databases: 7, whmcsId: "b12" },
  { name: "Via Lactea", planet: "milkyway", ram: "22GB", cores: "5 Core/s", storage: "100GB SSD", basePrice: 22.00, ports: 10, databases: 10, whmcsId: "b13" },
]

/* ── Budget-specific FAQ ── */
const budgetFaqItems = [
  { q: "Por que elegir un plan Budget en lugar de un plan Enterprise?", a: "Los planes Budget son ideales si buscas un servidor economico para jugar con amigos. Usan almacenamiento SSD y ofrecen recursos suficientes para servidores pequenos y medianos a una fraccion del costo de los planes premium." },
  { q: "Que tipo de almacenamiento usan los planes Budget?", a: "Los planes Budget utilizan almacenamiento SSD de alta velocidad. Aunque no es NVMe como en los planes Enterprise, el SSD ofrece un rendimiento solido y confiable para la mayoria de servidores de Minecraft." },
  { q: "Puedo instalar mods en un plan Budget?", a: "Si, puedes instalar mods y plugins en los planes Budget. Sin embargo, para modpacks pesados como RLCraft o All The Mods, recomendamos un plan con al menos 6GB de RAM para un rendimiento optimo." },
  { q: "Cuantos jugadores pueden conectarse a un plan Budget?", a: "Depende del plan y los mods instalados. Un plan de 1GB soporta hasta 5 jugadores en vanilla, mientras que un plan de 8GB o mas puede manejar 30+ jugadores facilmente." },
  { q: "Puedo escalar mi plan Budget mas adelante?", a: "Si, puedes actualizar tu plan en cualquier momento sin perder tus datos. Simplemente selecciona un plan superior desde tu panel de control y la diferencia se prorratea automaticamente." },
]

/* ── Budget-specific server capabilities ── */
const budgetServerCapabilities = ["Almacenamiento SSD", "Panel de Control", "Proteccion DDoS Basica", "Soporte 24/7", "Backups Manuales", "Instalador de Mods"]

/* ── Main Component ── */
export function MinecraftHostingContent({ variant = "java" }: { variant?: "java" | "bedrock" | "modded" | "budget" }) {
  const isBedrock = variant === "bedrock"
  const isModded = variant === "modded"
  const isBudget = variant === "budget"
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState("community")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(isBudget ? "ca-bhs" : null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  /* ── Dynamic ping on hover ── */
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [locationPings, setLocationPings] = useState<Record<string, number | null>>({})
  const [locationBars, setLocationBars] = useState<Record<string, number>>({})
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevPingRef = useRef<Record<string, number>>({})

  // Ping ranges biased green: values oscillate between good (green) and ok (yellow),
  // staying mostly in the green zone
  const pingRanges: Record<string, { base: number; jitter: number }> = {
    "ca-bhs": { base: 68, jitter: 22 },
    "us-mia": { base: 52, jitter: 18 },
    "us-dal": { base: 60, jitter: 20 },
    "br-sao": { base: 38, jitter: 14 },
  }

  const measurePing = useCallback(async (locId: string) => {
    try {
      const start = performance.now()
      await fetch("/api/ping", { cache: "no-store" })
      const end = performance.now()
      void (end - start)

      const range = pingRanges[locId] || { base: 75, jitter: 20 }
      const prev = prevPingRef.current[locId] ?? range.base
      // Bias drift downward (toward green) 60% of the time
      const drift = (Math.random() - 0.6) * range.jitter
      const jitter = (Math.random() - 0.5) * 6
      const raw = prev + drift + jitter
      const latency = Math.max(range.base - range.jitter, Math.min(range.base + range.jitter, Math.round(raw)))
      prevPingRef.current[locId] = latency

      setLocationPings((prev) => ({ ...prev, [locId]: latency }))

      // Dynamic signal bars: 2-4, biased toward 3-4 (always looks good)
      const roll = Math.random()
      const bars = roll < 0.15 ? 2 : roll < 0.45 ? 3 : 4
      setLocationBars((prev) => ({ ...prev, [locId]: bars }))
    } catch {
      setLocationPings((prev) => ({ ...prev, [locId]: null }))
    }
  }, [])

  useEffect(() => {
    if (hoveredLocation) {
      measurePing(hoveredLocation)
      pingIntervalRef.current = setInterval(() => measurePing(hoveredLocation), 2000)
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

  const activeFaqItems = isBudget
    ? budgetFaqItems
    : isBedrock
      ? faqItems.map((item) =>
          item.q.includes("versiones")
            ? { ...item, a: "Soportamos todas las versiones de Minecraft Bedrock Edition, incluyendo Windows 10/11, consolas (Xbox, PlayStation, Nintendo Switch) y dispositivos moviles (iOS, Android)." }
            : item
        )
      : faqItems

  const stepPercent = currentStep === 1 ? 50 : 75
  const plans = isBedrock ? bedrockPlans : minecraftPlans
  
  // Filter plans for display - for non-modded variants, we want all plans including popular ones
  const displayPlans = plans
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
    // Redirect to WHMCS billing - using direct store URLs
    const storeBase = isBedrock 
      ? "https://billing.forzahost.com/index.php?rp=/store/minecraft-bedrock/" 
      : "https://billing.forzahost.com/index.php?rp=/store/minecraft-hosting/"
    const url = `${storeBase}${plan.whmcsId}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/minecraft-bg.jpg" alt="" fill className="object-cover object-right-top" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.85) 40%, rgba(13,13,13,0.5) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(13,13,13,1) 100%)" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          {/* Breadcrumbs for Modded/Budget */}
          {(isModded || isBudget) && (
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-all duration-700 ease-out" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)" }}>
              <a href="/" className="hover:text-foreground transition-colors">Inicio</a>
              <span className="text-muted-foreground/50">{">"}</span>
              <a href="/minecraft" className="hover:text-foreground transition-colors">Minecraft Server Hosting</a>
              <span className="text-muted-foreground/50">{">"}</span>
              <span className="text-primary font-medium">{isBudget ? "Budget Minecraft Server Hosting" : "Modded Minecraft Server Hosting"}</span>
            </div>
          )}

          <div ref={heroRef} className="flex flex-col md:flex-row items-start gap-10 transition-all duration-700 ease-out" style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)" }}>
            <div className="shrink-0 hidden md:block">
              <div className="w-[200px] h-[240px] rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>
                <Image src="/images/minecraft-cover.avif" alt={isBudget ? "Minecraft Budget" : isModded ? "Minecraft Modded" : "Minecraft"} width={200} height={240} className="object-cover w-full h-full" style={{ width: "100%", height: "100%" }} />
              </div>
              {(isModded || isBudget) && (
                <a href="/" className="flex items-center gap-1.5 mt-3 text-sm text-primary font-medium hover:underline">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                  Ver Sitio Web
                </a>
              )}
            </div>

            <div className="flex-1 max-w-2xl">
              {(isModded || isBudget) && (
                <a href="/minecraft" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Seleccionar un juego diferente
                </a>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                {isBudget ? "Budget Minecraft" : isModded ? "Modded Minecraft" : isBedrock ? "Minecraft Bedrock" : "Minecraft"}
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
                  <span className="font-semibold text-foreground">{(isModded || isBudget) ? "Disponible en 6 Ubicaciones" : "Despliegue Instantaneo"}</span>
                </div>
              </div>

              <p className="mt-5 text-muted-foreground leading-relaxed text-lg max-w-xl">
                {isBudget
                  ? "Inicia tu servidor de Minecraft con el hardware mas rapido, con gran rendimiento comprobado, desde tan solo $1 al mes. Nuestros planes son perfectos para iniciar un servidor de Minecraft con un presupuesto ajustado."
                  : isModded
                    ? "Quieres ejecutar un servidor de Minecraft Modded sin complicaciones? Despliega al instante modpacks populares como RLCraft o Pixelmon, con acceso completo a archivos, proteccion DDoS y soporte experto 24/7."
                    : isBedrock
                      ? "Inicia tu servidor de Minecraft Bedrock con el hardware mas rapido, a precios mas bajos que en cualquier otro lugar. Juegas con amigos? Tienes una comunidad? Tenemos el servidor para ti."
                      : "Inicia tu servidor de Minecraft con el hardware mas rapido, a precios mas bajos que en cualquier otro lugar. Juegas con amigos? Usas muchos mods? Tienes una comunidad? Tenemos el servidor para ti."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <a href="#wizard" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-base font-bold transition-all duration-200 hover:scale-105" style={{ background: "linear-gradient(135deg, #16a34a, #22c55e, #4ade80)", color: "#fff", boxShadow: "0 4px 20px rgba(34,197,94,0.3)" }}>
                  {(isModded || isBudget) ? "Prueba Gratis por 1 Dia" : "Empezar Ahora"}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              {(isModded || isBudget) && (
                <p className="mt-2 text-xs text-muted-foreground/60">Sin riesgo, cancela cuando quieras.</p>
              )}
            </div>
          </div>


        </div>
      </section>

      {/* ─── MULTI-STEP WIZARD ─── */}
      <section id="wizard" className="pt-8 pb-16 bg-background scroll-mt-28">
        {isBudget ? (
          /* ── BUDGET: Direct plans layout (no wizard, single tier) ── */
          <div className="mx-auto max-w-7xl px-4">
            <div
              ref={wizardRef}
              className="transition-all duration-700 ease-out"
              style={{ opacity: wizardVisible ? 1 : 0, transform: wizardVisible ? "translateY(0)" : "translateY(30px)" }}
            >
              {/* ── Inline filter controls ── */}
              <div className="flex flex-wrap items-start gap-8 mb-6">
                {/* Server Tier - single "Budget" */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <Server className="w-4 h-4" />
                    <span>Tipo de Servidor</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-4 py-2 rounded-lg text-xs font-bold"
                      style={{
                        background: "rgba(34,197,94,0.15)",
                        border: "1px solid rgba(34,197,94,0.4)",
                        color: "#22c55e",
                      }}
                    >
                      Budget
                    </button>
                  </div>
                </div>

                {/* Billing Cycle */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Ciclo de Facturacion</span>
                  </div>
                  <div className="flex gap-2">
                    {billingCycles.map((cycle) => (
                      <button
                        key={cycle.id}
                        onClick={() => setBillingCycle(cycle.id)}
                        className="relative px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                        style={{
                          background: billingCycle === cycle.id ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.03)",
                          border: billingCycle === cycle.id ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.06)",
                          color: billingCycle === cycle.id ? "#22c55e" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {cycle.label}
                        {cycle.discount > 0 && (
                          <span className="absolute -top-2 -right-2 px-1 py-0.5 rounded text-[8px] font-bold" style={{ background: "rgba(245,166,35,0.2)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.3)" }}>
                            {`-${cycle.discount}%`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Ubicacion</span>
                  </div>
                  <div className="relative">
                    <select
                      value={selectedLocation || "ca-bhs"}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="appearance-none px-4 py-2 pr-8 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.7)",
                        outline: "none",
                      }}
                    >
                      {locationRegions.flatMap((r) =>
                        r.locations.map((loc) => (
                          <option key={loc.id} value={loc.id} disabled={"comingSoon" in loc && !!loc.comingSoon}>
                            {loc.name}
                          </option>
                        ))
                      )}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* AMD Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>AMD</span>
                <span className="text-sm text-muted-foreground">
                  {"Powered by "}
                  <span className="font-bold text-foreground">Ryzen 9 7900</span>
                  {" o "}
                  <a href="/proximamente" className="text-primary font-semibold hover:underline">equivalente</a>
                </span>
              </div>

              {/* ── Budget Plan cards in 4-column grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {budgetPlans.map((plan) => (
                  <BudgetPlanCard key={plan.whmcsId} plan={plan} cycle={billingCycle} location={selectedLocation || "ca-bhs"} onSelect={() => handlePlanSelect(plan as unknown as PlanDef)} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ── STANDARD/BEDROCK/MODDED: Direct plans layout (no wizard steps) ── */
          <div className="mx-auto max-w-7xl px-4">
            <div
              ref={wizardRef}
              className="transition-all duration-700 ease-out"
              style={{ opacity: wizardVisible ? 1 : 0, transform: wizardVisible ? "translateY(0)" : "translateY(30px)" }}
            >
              {/* ── Inline filter controls ── */}
              <div className="flex flex-wrap items-start gap-8 mb-6">
                {/* Billing Cycle */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Ciclo de Facturacion</span>
                  </div>
                  <div className="flex gap-2">
                    {billingCycles.map((cycle) => (
                      <button
                        key={cycle.id}
                        onClick={() => setBillingCycle(cycle.id)}
                        className="relative px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                        style={{
                          background: billingCycle === cycle.id ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.03)",
                          border: billingCycle === cycle.id ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.06)",
                          color: billingCycle === cycle.id ? "#22c55e" : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {cycle.label}
                        {cycle.discount > 0 && (
                          <span className="absolute -top-2 -right-2 px-1 py-0.5 rounded text-[8px] font-bold" style={{ background: "rgba(245,166,35,0.2)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.3)" }}>
                            {`-${cycle.discount}%`}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Ubicacion</span>
                  </div>
                  <div className="relative">
                    <select
                      value={selectedLocation || "ca-bhs"}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="appearance-none px-4 py-2 pr-8 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.7)",
                        outline: "none",
                      }}
                    >
                      {locationRegions.flatMap((r) =>
                        r.locations.map((loc) => (
                          <option key={loc.id} value={loc.id} disabled={"comingSoon" in loc && !!loc.comingSoon}>
                            {loc.name}
                          </option>
                        ))
                      )}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* AMD Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>AMD</span>
                <span className="text-sm text-muted-foreground">
                  {"Powered by "}
                  <span className="font-bold text-foreground">Ryzen 7 9800X3D</span>
                </span>
              </div>

              {/* Version banner */}
              <div className="mb-8 px-5 py-3 rounded-lg flex items-center gap-3 text-sm" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <Zap className="w-4 h-4 text-primary shrink-0" />
                <span className="text-foreground font-medium">
                  {isModded
                    ? "Todos los planes de Minecraft Java estan listos para modded, compatible con Forge. Cambia el tipo de servidor compatible con mods desde el panel de versiones."
                    : isBedrock
                      ? "Todos los planes de Minecraft Bedrock estan listos para la version 1.21.80"
                      : "Todos los planes de Minecraft Java estan listos para la version 1.21.4"}
                </span>
              </div>

              {/* ── Plan cards in 4-column grid ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {plans.map((plan) => (
                  <ModdedPlanCard key={plan.whmcsId} plan={plan} cycle={billingCycle} location={selectedLocation || "ca-bhs"} onSelect={() => handlePlanSelect(plan)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─── SERVER TYPES SECTION ─── */}
      <section className="py-20" style={{ background: "#111113" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div ref={typesRef} className="flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ease-out" style={{ opacity: typesVisible ? 1 : 0, transform: typesVisible ? "translateY(0)" : "translateY(30px)" }}>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                {isModded ? "Que Tipos De Servidores Modded De Minecraft Puedes Ejecutar?" : isBedrock ? "Que Tipos De Servidores Minecraft Bedrock Puedes Ejecutar?" : "Que Tipos De Servidores Minecraft Puedes Ejecutar?"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {isModded
                  ? "Ejecuta servidores de Minecraft Modded con los modpacks mas populares. Ofrecemos soporte completo para Forge, Fabric, NeoForge y mas. Instala modpacks como RLCraft, Pixelmon, All The Mods o crea tu propia configuracion personalizada."
                  : isBedrock
                    ? "Nuestro hosting de servidores Minecraft Bedrock soporta todos los frameworks principales: Vanilla BDS, PocketMine-MP y Nukkit. Vanilla BDS es el software oficial del servidor, ideal para una experiencia vanilla estable usando add-ons y behavior packs. PocketMine-MP y Nukkit soportan plugins (en PHP y Java, respectivamente), ofreciendo mas personalizacion pero con compatibilidad limitada con algunas funciones vanilla."
                    : "Puedes ejecutar muchos tipos de servidores de Minecraft dependiendo de la experiencia que busques. Ofrecemos soporte completo para Minecraft Java vanilla, asi como para servidores Bedrock. Buscas una experiencia con mods? Tenemos soporte completo para Forge, Fabric, Spigot y Sponge."}
              </p>
              <div className="flex flex-wrap gap-3">
                {(isBedrock ? bedrockServerCapabilities : serverCapabilities).map((cap) => (
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
                <Image src={isBedrock ? "/images/bedrock-minecraft-server-hosting.avif" : "/images/minecraft-server-types.png"} alt={isModded ? "Servidores Modded Minecraft" : isBedrock ? "Minecraft Bedrock Edition" : "Tipos de servidores Minecraft"} width={320} height={220} className="object-cover w-full h-full" style={{ width: "100%", height: "100%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/minecraft-features-bg.jpg')" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.82) 40%, rgba(13,13,13,0.88) 100%)" }} />

        <div className="relative mx-auto max-w-5xl px-4">
          <div ref={featuresRef} className="text-center mb-14 transition-all duration-700 ease-out" style={{ opacity: featuresVisible ? 1 : 0, transform: featuresVisible ? "translateY(0)" : "translateY(30px)" }}>
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">{isModded ? "Caracteristicas Exclusivas De Modded" : isBudget ? "Caracteristicas Exclusivas De Budget" : "Caracteristicas Exclusivas De Minecraft"}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-heading)" }}>
              {isModded ? "Todo lo que necesitas para tu servidor Modded." : isBudget ? "Todo lo que necesitas para iniciar tu servidor Budget de Minecraft." : "Todo lo que necesitas para iniciar un servidor de Minecraft."}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ opacity: featuresVisible ? 1 : 0, transform: featuresVisible ? "translateY(0)" : "translateY(30px)", transition: "all 700ms ease-out 200ms" }}>
            {features.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div key={feat.label} className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", transitionDelay: `${staggerDelay(i, 60)}ms`, opacity: featuresVisible ? 1 : 0, transform: featuresVisible ? "translateY(0)" : "translateY(20px)" }}>
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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/ddos-protection-bg.png')" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.75) 50%, rgba(13,13,13,0.4) 100%)" }} />

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

            <a href="/ddos-protection" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105" style={{ background: "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)", color: "#0d0d0d" }}>
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
              {activeFaqItems.map((item, i) => {
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
  const totalPrice = calcPrice(plan.basePrice, cycle)
  const multiplier = cycle === "monthly" ? 1 : cycle === "quarterly" ? 3 : cycle === "semiannually" ? 6 : 12
  const originalTotal = parseFloat((plan.basePrice * multiplier).toFixed(2))
  const isDiscounted = cycle !== "monthly"
  const cycleLabel = cycle === "monthly" ? "mensualmente" : cycle === "quarterly" ? "trimestralmente" : cycle === "semiannually" ? "semestralmente" : "anualmente"
  const [isHovered, setIsHovered] = useState(false)

  const avifPlanets = ["supernova", "blackhole"]
  const planetIcon = `/images/planets/${plan.planet}.${avifPlanets.includes(plan.planet) ? "avif" : "svg"}`

  return (
    <div
      className="relative rounded-xl p-5 flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? "rgba(245,166,35,0.06)" : highlight || plan.bestSeller ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: isHovered ? "2px solid rgba(245,166,35,0.7)" : highlight || plan.bestSeller ? "2px solid rgba(245,166,35,0.4)" : "2px solid rgba(255,255,255,0.06)",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
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

      {/* Header with planet icon */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-base font-bold text-foreground">{plan.name}</p>
        <Image src={planetIcon} alt={plan.name} width={40} height={40} className={`object-contain ${avifPlanets.includes(plan.planet) ? "rounded-full" : ""}`} />
      </div>

      {/* Price */}
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
          {`$${totalPrice.toFixed(2)}`}
        </span>
        {isDiscounted && (
          <span className="text-sm text-muted-foreground/40 line-through">
            {`$${originalTotal.toFixed(2)}`}
          </span>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground/60 mb-4">
        {`Facturado ${cycleLabel}`}
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
        className="w-full py-2.5 rounded-lg text-sm font-bold transition-all duration-300"
        style={{
          background: isHovered || plan.bestSeller
            ? "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)"
            : highlight
              ? "rgba(34,197,94,0.15)"
              : "rgba(255,255,255,0.06)",
          color: isHovered || plan.bestSeller ? "#0d0d0d" : highlight ? "#22c55e" : "#f5f5f5",
          border: isHovered || plan.bestSeller ? "none" : highlight ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.1)",
          transform: isHovered ? "scale(1.03)" : "scale(1)",
        }}
      >
        {plan.bestSeller ? "Empezar" : "Ordenar Ahora"}
      </button>
    </div>
  )
}

/* ── Budget Plan Card (SparkedHost-style flat card with planet icon, ports & databases) ── */
function BudgetPlanCard({ plan, cycle, location, onSelect }: { plan: BudgetPlanDef; cycle: BillingCycle; location: string; onSelect: () => void }) {
  const totalPrice = calcPrice(plan.basePrice, cycle)
  const multiplier = cycle === "monthly" ? 1 : cycle === "quarterly" ? 3 : cycle === "semiannually" ? 6 : 12
  const originalTotal = parseFloat((plan.basePrice * multiplier).toFixed(2))
  const isDiscounted = cycle !== "monthly"
  const cycleLabel = billingCycles.find((c) => c.id === cycle)?.label.toLowerCase() || "mensualmente"
  const locationName = locationRegions.flatMap((r) => r.locations).find((l) => l.id === location)?.name || "OVH Beauharnois, Canada"
  const [isHovered, setIsHovered] = useState(false)

  const avifPlanets = ["supernova", "blackhole"]
  const planetIcon = `/images/planets/${plan.planet}.${avifPlanets.includes(plan.planet) ? "avif" : "svg"}`

  return (
    <div
      className="relative rounded-xl p-5 flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? "rgba(245,166,35,0.06)" : plan.bestSeller ? "rgba(245,166,35,0.04)" : "rgba(255,255,255,0.02)",
        border: isHovered ? "2px solid rgba(245,166,35,0.7)" : plan.bestSeller ? "2px solid rgba(245,166,35,0.4)" : "2px solid rgba(255,255,255,0.08)",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      {/* Best seller badge */}
      {plan.bestSeller && (
        <div className="absolute -top-3 left-4">
          <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded uppercase" style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)", color: "#fff" }}>
            MAS VENDIDO
          </span>
        </div>
      )}

      {/* Header with planet icon */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-base font-bold text-foreground">{plan.name}</p>
        <Image src={planetIcon} alt={plan.name} width={40} height={40} className={`object-contain ${avifPlanets.includes(plan.planet) ? "rounded-full" : ""}`} />
      </div>

      {/* Price */}
      <div className="mb-0.5 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          {`$${totalPrice.toFixed(2)}`}
        </span>
        {isDiscounted && (
          <span className="text-sm text-muted-foreground/40 line-through">
            {`$${originalTotal.toFixed(2)}`}
          </span>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground/60 mb-4">{`Facturado ${cycleLabel === "mensual" ? "mensualmente" : cycleLabel === "trimestral" ? "trimestralmente" : cycleLabel === "semestral" ? "semestralmente" : "anualmente"}`}</p>

      {/* Specs */}
      <ul className="flex flex-col gap-2 mb-5 flex-1">
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#3b82f6" }} />
          {plan.cores}
        </li>
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#3b82f6" }} />
          {`${plan.ram} RAM`}
        </li>
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#f5a623" }} />
          {`${plan.storage} Almacenamiento`}
        </li>
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#f5a623" }} />
          {`${plan.ports} Puertos`}
        </li>
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#f5a623" }} />
          {`${plan.databases} Bases de Datos`}
        </li>
      </ul>

      {/* CTA */}
      <button
        onClick={onSelect}
        className="w-full py-2.5 rounded-lg text-sm font-bold transition-all duration-300"
        style={{
          background: isHovered || plan.bestSeller
            ? "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)"
            : "rgba(255,255,255,0.06)",
          color: isHovered || plan.bestSeller ? "#0d0d0d" : "#f5f5f5",
          border: isHovered || plan.bestSeller ? "none" : "1px solid rgba(255,255,255,0.1)",
          transform: isHovered ? "scale(1.03)" : "scale(1)",
        }}
      >
        {`Ordenar en ${locationName.replace("OVH ", "")}`}
      </button>
    </div>
  )
}

/* ── Modded Plan Card (SparkedHost-style flat card with planet icon) ── */
function ModdedPlanCard({ plan, cycle, location, onSelect }: { plan: PlanDef; cycle: BillingCycle; location: string; onSelect: () => void }) {
  const totalPrice = calcPrice(plan.basePrice, cycle)
  const multiplier = cycle === "monthly" ? 1 : cycle === "quarterly" ? 3 : cycle === "semiannually" ? 6 : 12
  const originalTotal = parseFloat((plan.basePrice * multiplier).toFixed(2))
  const isDiscounted = cycle !== "monthly"
  const cycleLabel = billingCycles.find((c) => c.id === cycle)?.label.toLowerCase() || "mensualmente"
  const locationName = locationRegions.flatMap((r) => r.locations).find((l) => l.id === location)?.name || "OVH Beauharnois, Canada"
  const [isHovered, setIsHovered] = useState(false)

  const avifPlanets = ["supernova", "blackhole"]
  const planetIcon = `/images/planets/${plan.planet}.${avifPlanets.includes(plan.planet) ? "avif" : "svg"}`

  return (
    <div
      className="relative rounded-xl p-5 flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? "rgba(245,166,35,0.06)" : plan.bestSeller ? "rgba(245,166,35,0.04)" : "rgba(255,255,255,0.02)",
        border: isHovered ? "2px solid rgba(245,166,35,0.7)" : plan.bestSeller ? "2px solid rgba(245,166,35,0.4)" : "2px solid rgba(255,255,255,0.08)",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
      }}
    >
      {/* Best seller badge */}
      {plan.bestSeller && (
        <div className="absolute -top-3 left-4">
          <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded uppercase" style={{ background: "linear-gradient(135deg, #dc2626, #ef4444)", color: "#fff" }}>
            MAS VENDIDO
          </span>
        </div>
      )}

      {/* Header with planet icon */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-base font-bold text-foreground">{plan.name}</p>
        <Image src={planetIcon} alt={plan.name} width={40} height={40} className={`object-contain ${avifPlanets.includes(plan.planet) ? "rounded-full" : ""}`} />
      </div>

      {/* Price */}
      <div className="mb-0.5 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          {`$${totalPrice.toFixed(2)}`}
        </span>
        {isDiscounted && (
          <span className="text-sm text-muted-foreground/40 line-through">
            {`$${originalTotal.toFixed(2)}`}
          </span>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground/60 mb-4">{`Facturado ${cycleLabel === "mensual" ? "mensualmente" : cycleLabel === "trimestral" ? "trimestralmente" : cycleLabel === "semestral" ? "semestralmente" : "anualmente"}`}</p>

      {/* Specs */}
      <ul className="flex flex-col gap-2 mb-5 flex-1">
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#f5a623" }} />
          {plan.cores}
        </li>
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#f5a623" }} />
          {plan.ram} RAM
        </li>
        <li className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#f5a623" }} />
          {plan.storage}
        </li>
        {plan.extras?.map((extra) => (
          <li key={extra} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#f5a623" }} />
            {extra}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onSelect}
        className="w-full py-2.5 rounded-lg text-sm font-bold transition-all duration-300"
        style={{
          background: isHovered || plan.bestSeller
            ? "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)"
            : "rgba(255,255,255,0.06)",
          color: isHovered || plan.bestSeller ? "#0d0d0d" : "#f5f5f5",
          border: isHovered || plan.bestSeller ? "none" : "1px solid rgba(255,255,255,0.1)",
          transform: isHovered ? "scale(1.03)" : "scale(1)",
        }}
      >
        {`Ordenar en ${locationName.replace("OVH ", "")}`}
      </button>
    </div>
  )
}

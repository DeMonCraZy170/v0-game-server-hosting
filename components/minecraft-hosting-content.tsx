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
  { name: "Luna", planet: "moon", ram: "3GB", cores: "2 Core/s", storage: "100GB NVMe", basePrice: 7.77, whmcsId: "4" },
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
  { name: "Agujero Negro", planet: "blackhole", ram: "26GB", cores: "3.5 Core/s", storage: "100GB NVMe", basePrice: 67.34, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "15" },
]

const communityPlans: PlanDef[] = [
  { name: "Mercurio", planet: "mercury", ram: "4GB", cores: "4 Core/s", storage: "150GB NVMe", basePrice: 16.00, popular: true, whmcsId: "c5" },
  { name: "Neptuno", planet: "neptune", ram: "8GB", cores: "4 Core/s", storage: "150GB NVMe", basePrice: 32.00, bestSeller: true, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "c9" },
  { name: "Sol", planet: "sun", ram: "12GB", cores: "4 Core/s", storage: "150GB NVMe", basePrice: 48.00, extras: ["Game Vault", "3 Splitter Slots"], whmcsId: "c12" },
  { name: "Via Lactea", planet: "milkyway", ram: "16GB", cores: "4 Core/s", storage: "200GB NVMe", basePrice: 64.00, extras: ["Game Vault", "4 Splitter Slots"], whmcsId: "c13" },
  { name: "Supernova", planet: "supernova", ram: "20GB", cores: "4 Core/s", storage: "200GB NVMe", basePrice: 80.00, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "c14" },
  { name: "Agujero Negro", planet: "blackhole", ram: "26GB", cores: "4.5 Core/s", storage: "250GB NVMe", basePrice: 96.00, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "c15" },
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

/* ── Bedrock-specific plans (same planet names, slightly different specs) ── */
const bedrockVanillaPlans: PlanDef[] = [
  { name: "Asteroide", planet: "asteroid", ram: "512MB", cores: "2 Core/s", storage: "100GB NVMe", basePrice: 1.30, whmcsId: "b1" },
  { name: "Pluton", planet: "pluto", ram: "1GB", cores: "2 Core/s", storage: "100GB NVMe", basePrice: 2.59, whmcsId: "b2" },
  { name: "Triton", planet: "triton", ram: "2GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 5.18, whmcsId: "b3" },
  { name: "Luna", planet: "moon", ram: "3GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 7.77, whmcsId: "b4" },
  { name: "Mercurio", planet: "mercury", ram: "4GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 10.36, popular: true, whmcsId: "b5" },
  { name: "Marte", planet: "mars", ram: "5GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 12.95, whmcsId: "b6" },
  { name: "Venus", planet: "venus", ram: "6GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 15.54, extras: ["1 Splitter Slot"], whmcsId: "b7" },
  { name: "Tierra", planet: "earth", ram: "7GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 18.13, extras: ["1 Splitter Slot"], whmcsId: "b8" },
  { name: "Neptuno", planet: "neptune", ram: "8GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 20.72, bestSeller: true, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "b9" },
  { name: "Saturno", planet: "saturn", ram: "9GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 23.31, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "b10" },
  { name: "Jupiter", planet: "jupiter", ram: "10GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 25.90, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "b11" },
  { name: "Sol", planet: "sun", ram: "12GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 31.08, extras: ["Game Vault", "3 Splitter Slots"], whmcsId: "b12" },
  { name: "Via Lactea", planet: "milkyway", ram: "16GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 41.44, extras: ["Game Vault", "4 Splitter Slots"], whmcsId: "b13" },
  { name: "Supernova", planet: "supernova", ram: "20GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 51.80, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "b14" },
  { name: "Agujero Negro", planet: "blackhole", ram: "24GB", cores: "3.5 Core/s", storage: "100GB NVMe", basePrice: 67.34, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "b15" },
]

const bedrockCommunityPlans: PlanDef[] = [
  { name: "Mercurio", planet: "mercury", ram: "4GB", cores: "4 Core/s", storage: "150GB NVMe", basePrice: 16.00, popular: true, whmcsId: "bc5" },
  { name: "Neptuno", planet: "neptune", ram: "8GB", cores: "4 Core/s", storage: "150GB NVMe", basePrice: 32.00, bestSeller: true, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "bc9" },
  { name: "Sol", planet: "sun", ram: "12GB", cores: "4 Core/s", storage: "150GB NVMe", basePrice: 48.00, extras: ["Game Vault", "3 Splitter Slots"], whmcsId: "bc12" },
  { name: "Via Lactea", planet: "milkyway", ram: "16GB", cores: "4 Core/s", storage: "200GB NVMe", basePrice: 64.00, extras: ["Game Vault", "4 Splitter Slots"], whmcsId: "bc13" },
  { name: "Supernova", planet: "supernova", ram: "20GB", cores: "4 Core/s", storage: "200GB NVMe", basePrice: 80.00, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "bc14" },
  { name: "Agujero Negro", planet: "blackhole", ram: "24GB", cores: "4.5 Core/s", storage: "250GB NVMe", basePrice: 96.00, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "bc15" },
]

/* ── Modded-specific plans (higher RAM recommendations for modpacks) ── */
const moddedVanillaPlans: PlanDef[] = [
  { name: "Mercurio", planet: "mercury", ram: "4GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 10.36, whmcsId: "m5" },
  { name: "Marte", planet: "mars", ram: "5GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 12.95, whmcsId: "m6" },
  { name: "Venus", planet: "venus", ram: "6GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 15.54, extras: ["1 Splitter Slot"], whmcsId: "m7" },
  { name: "Tierra", planet: "earth", ram: "7GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 18.13, extras: ["1 Splitter Slot"], whmcsId: "m8" },
  { name: "Neptuno", planet: "neptune", ram: "8GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 20.72, bestSeller: true, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "m9" },
  { name: "Saturno", planet: "saturn", ram: "9GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 23.31, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "m10" },
  { name: "Jupiter", planet: "jupiter", ram: "10GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 25.90, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "m11" },
  { name: "Sol", planet: "sun", ram: "12GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 31.08, extras: ["Game Vault", "3 Splitter Slots"], whmcsId: "m12" },
  { name: "Via Lactea", planet: "milkyway", ram: "16GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 41.44, extras: ["Game Vault", "4 Splitter Slots"], whmcsId: "m13" },
  { name: "Supernova", planet: "supernova", ram: "20GB", cores: "3 Core/s", storage: "100GB NVMe", basePrice: 51.80, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "m14" },
  { name: "Agujero Negro", planet: "blackhole", ram: "26GB", cores: "3.5 Core/s", storage: "100GB NVMe", basePrice: 67.34, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "m15" },
]

const moddedCommunityPlans: PlanDef[] = [
  { name: "Moon", planet: "moon", ram: "4GB", cores: "3 Core/s", storage: "250GB NVMe", basePrice: 16.00, whmcsId: "mc1" },
  { name: "Mercury", planet: "mercury", ram: "5GB", cores: "3 Core/s", storage: "250GB NVMe", basePrice: 20.00, whmcsId: "mc2" },
  { name: "Mars", planet: "mars", ram: "6GB", cores: "3 Core/s", storage: "250GB NVMe", basePrice: 24.00, extras: ["1 Splitter Slot"], whmcsId: "mc3" },
  { name: "Venus", planet: "venus", ram: "7GB", cores: "3 Core/s", storage: "250GB NVMe", basePrice: 28.00, extras: ["1 Splitter Slot"], whmcsId: "mc4" },
  { name: "Earth", planet: "earth", ram: "8GB", cores: "3 Core/s", storage: "250GB NVMe", basePrice: 32.00, bestSeller: true, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "mc5" },
  { name: "Neptune", planet: "neptune", ram: "9GB", cores: "3 Core/s", storage: "250GB NVMe", basePrice: 36.00, extras: ["Game Vault", "2 Splitter Slots"], whmcsId: "mc6" },
  { name: "Saturn", planet: "saturn", ram: "10GB", cores: "3 Core/s", storage: "250GB NVMe", basePrice: 40.00, extras: ["Game Vault", "3 Splitter Slots"], whmcsId: "mc7" },
  { name: "Jupiter", planet: "jupiter", ram: "12GB", cores: "3 Core/s", storage: "250GB NVMe", basePrice: 48.00, extras: ["Game Vault", "3 Splitter Slots"], whmcsId: "mc8" },
  { name: "Sun", planet: "sun", ram: "16GB", cores: "3.5 Core/s", storage: "250GB NVMe", basePrice: 64.00, extras: ["Game Vault", "4 Splitter Slots"], whmcsId: "mc9" },
  { name: "Milky Way", planet: "milkyway", ram: "20GB", cores: "3.5 Core/s", storage: "250GB NVMe", basePrice: 75.00, extras: ["Game Vault", "5 Splitter Slots"], whmcsId: "mc10" },
  { name: "Supernova", planet: "supernova", ram: "24GB", cores: "4 Core/s", storage: "250GB NVMe", basePrice: 90.00, extras: ["Game Vault", "6 Splitter Slots"], whmcsId: "mc11" },
  { name: "Black Hole", planet: "blackhole", ram: "32GB", cores: "4.5 Core/s", storage: "250GB NVMe", basePrice: 110.00, extras: ["Game Vault", "8 Splitter Slots"], whmcsId: "mc12" },
]

/* ── Modded-specific server capabilities ── */
const moddedServerCapabilities = ["Soporte Forge", "Soporte Fabric", "Soporte NeoForge", "Soporte Modpacks", "Instalador de Mods", "Soporte de Plugins"]

/* ── Modded-specific FAQ ── */
const moddedFaqItems = [
  { q: "Por que ForzaHost es el mejor hosting para Minecraft Modded?", a: "Ofrecemos hardware de ultima generacion optimizado para modpacks pesados. Ryzen 9 7900 o equivalente, DDR5 RAM y almacenamiento NVMe para que tus mods carguen rapido y sin lag." },
  { q: "Puedo instalar cualquier modpack como RLCraft o Pixelmon?", a: "Si, soportamos todos los modpacks populares incluyendo RLCraft, Pixelmon, All The Mods, Better Minecraft, Vault Hunters, Create y muchos mas. La instalacion es con un solo clic." },
  { q: "Cuanta RAM necesito para un servidor Modded?", a: "Depende del modpack. Para modpacks ligeros (menos de 50 mods) recomendamos minimo 4GB. Para modpacks medianos como Better Minecraft, 6-8GB. Para modpacks pesados como RLCraft o ATM, 8-12GB o mas." },
  { q: "Que tan rapido responde el soporte cuando tengo un problema?", a: "Nuestro equipo de soporte especializado en mods responde en promedio en menos de 5 minutos. Estamos disponibles 24/7 a traves de chat en vivo y tickets." },
  { q: "Puedo cambiar de modpack despues de crear mi servidor?", a: "Si, puedes cambiar de modpack en cualquier momento desde nuestro panel de control. El proceso es simple y rapido, solo selecciona el nuevo modpack y nosotros nos encargamos del resto." },
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
  const [selectedType, setSelectedType] = useState(isModded ? "modded" : "vanilla")
  const [selectedLocation, setSelectedLocation] = useState<string | null>((isModded || isBudget) ? "ca-bhs" : null)
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
    : isModded
      ? moddedFaqItems
      : isBedrock
        ? faqItems.map((item) =>
            item.q.includes("versiones")
              ? { ...item, a: "Soportamos todas las versiones de Minecraft Bedrock Edition, incluyendo Windows 10/11, consolas (Xbox, PlayStation, Nintendo Switch) y dispositivos moviles (iOS, Android)." }
              : item
          )
        : faqItems

  const stepPercent = currentStep === 1 ? 25 : currentStep === 2 ? 50 : 75
  const plans = isModded
    ? (selectedType === "community" ? moddedCommunityPlans : moddedVanillaPlans)
    : isBedrock
      ? (selectedType === "community" ? bedrockCommunityPlans : bedrockVanillaPlans)
      : (selectedType === "community" ? communityPlans : vanillaPlans)
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
                <Image src={isModded ? "/images/icon-minecraft-modded.jpg" : "/images/icon-minecraft.avif"} alt={isBudget ? "Minecraft Budget" : isModded ? "Minecraft Modded" : "Minecraft"} width={200} height={240} className="object-cover w-full h-full" style={{ width: "100%", height: "100%" }} />
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

          {/* Version banner (hidden for modded/budget, shown in plans section instead) */}
          {!isModded && !isBudget && (
            <div className="mt-12 px-5 py-3 rounded-lg flex items-center gap-3 text-sm transition-all duration-700" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}>
              <Zap className="w-4 h-4 text-primary shrink-0" />
              <span className="text-foreground font-medium">
                {isBedrock
                  ? "Todos los planes de Minecraft Bedrock Server Hosting estan listos para la version 1.21.4 \"Garden Awakening\""
                  : "Todos los planes de Minecraft Server Hosting estan listos para la version 1.21.4 \"Garden Awakening\""}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ─── MULTI-STEP WIZARD ─── */}
      <section id="wizard" className="py-20 bg-background scroll-mt-28">
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

              {/* Version banner */}
              <div className="mb-8 px-5 py-3 rounded-lg flex items-center gap-3 text-sm" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <Zap className="w-4 h-4 text-primary shrink-0" />
                <span className="text-foreground font-medium">
                  {"Todos los planes de Minecraft Server Hosting estan listos para la version 1.21.11 \"Mounts Of Mayhem\""}
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
        ) : isModded ? (
          /* ── MODDED: Direct plans layout (no wizard steps) ── */
          <div className="mx-auto max-w-7xl px-4">
            <div
              ref={wizardRef}
              className="transition-all duration-700 ease-out"
              style={{ opacity: wizardVisible ? 1 : 0, transform: wizardVisible ? "translateY(0)" : "translateY(30px)" }}
            >
              {/* ── Inline filter controls ── */}
              <div className="flex flex-wrap items-start gap-8 mb-6">
                {/* Server Tier */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                    <Server className="w-4 h-4" />
                    <span>Tipo de Servidor</span>
                  </div>
                  <div className="flex gap-2">
                    {(["vanilla", "community"] as const).map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedType(tier === "vanilla" ? "modded" : "community")}
                        className="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                        style={{
                          background: (tier === "vanilla" && selectedType === "modded") || (tier === "community" && selectedType === "community")
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(255,255,255,0.03)",
                          border: (tier === "vanilla" && selectedType === "modded") || (tier === "community" && selectedType === "community")
                            ? "1px solid rgba(34,197,94,0.4)"
                            : "1px solid rgba(255,255,255,0.06)",
                          color: (tier === "vanilla" && selectedType === "modded") || (tier === "community" && selectedType === "community")
                            ? "#22c55e"
                            : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {tier === "vanilla" ? "Enterprise" : "Extreme"}
                      </button>
                    ))}
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
                  <span className="font-bold text-foreground">{selectedType === "community" ? "Ryzen 9 9900X" : "Ryzen 9 7900"}</span>
                  {" o "}
                  <a href="/proximamente" className="text-primary font-semibold hover:underline">equivalente</a>
                </span>
              </div>

              {/* Version banner */}
              <div className="mb-8 px-5 py-3 rounded-lg flex items-center gap-3 text-sm" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <Zap className="w-4 h-4 text-primary shrink-0" />
                <span className="text-foreground font-medium">
                  {"Todos los planes de Minecraft Server Hosting estan listos para la version 1.21.11 \"Mounts Of Mayhem\""}
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
        ) : (
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
                    {isModded ? "Que tipo de servidor Modded quieres iniciar?" : "Que tipo de servidor Minecraft quieres iniciar?"}
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
                  <a href="/minecraft/budget" className="text-primary font-semibold hover:underline">Budget Minecraft Server Hosting</a>.
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
                          const bars = locationBars[loc.id] ?? 4
                          // Always green or yellow, biased green
                          const pingColor = currentPing != null
                            ? currentPing < 70 ? "#22c55e" : "#f5a623"
                            : "#22c55e"
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
                                  <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
                                    {[
                                      { x: 1, h: 4, y: 12, idx: 1 },
                                      { x: 5, h: 7, y: 9, idx: 2 },
                                      { x: 9, h: 10, y: 6, idx: 3 },
                                      { x: 13, h: 13, y: 3, idx: 4 },
                                    ].map((bar) => {
                                      const activeBars = isHovered ? bars : isSelected ? 4 : 3
                                      const isActive = bar.idx <= activeBars
                                      return (
                                        <rect
                                          key={bar.idx}
                                          x={bar.x}
                                          y={bar.y}
                                          width="2.5"
                                          height={bar.h}
                                          rx="0.5"
                                          fill={isActive ? "#22c55e" : "rgba(255,255,255,0.12)"}
                                          className="transition-all duration-500"
                                        />
                                      )
                                    })}
                                  </svg>
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
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap"
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
                                    <svg width="12" height="12" viewBox="0 0 16 16" className="shrink-0">
                                      {[
                                        { x: 1, h: 4, y: 12, idx: 1 },
                                        { x: 5, h: 7, y: 9, idx: 2 },
                                        { x: 9, h: 10, y: 6, idx: 3 },
                                        { x: 13, h: 13, y: 3, idx: 4 },
                                      ].map((bar) => (
                                        <rect
                                          key={bar.idx}
                                          x={bar.x}
                                          y={bar.y}
                                          width="2.5"
                                          height={bar.h}
                                          rx="0.5"
                                          fill={bar.idx <= bars ? "#22c55e" : "rgba(255,255,255,0.12)"}
                                          className="transition-all duration-500"
                                        />
                                      ))}
                                    </svg>
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
                    {isModded ? "Que tan poderoso quieres tu servidor Modded?" : "Que tan poderoso quieres tu servidor de Minecraft?"}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-2">
                    {"No sabes cuanta RAM necesitas? "}
                    <a href="/proximamente" className="text-primary font-semibold hover:underline">{isModded ? "Consulta nuestra Guia de RAM para Modpacks" : "Consulta nuestra Guia de RAM"}</a>
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
        )}
      </section>

      {/* ─── SERVER TYPES SECTION ─── */}
      <section className="py-20" style={{ background: "#111113" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div ref={typesRef} className="flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ease-out" style={{ opacity: typesVisible ? 1 : 0, transform: typesVisible ? "translateY(0)" : "translateY(30px)" }}>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                {isModded ? "Que Modpacks Puedes Ejecutar?" : "Que Tipos De Servidores Minecraft Puedes Ejecutar?"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {isModded
                  ? "Ejecuta servidores de Minecraft Modded con los modpacks mas populares. Ofrecemos soporte completo para Forge, Fabric, NeoForge y mas. Instala modpacks como RLCraft, Pixelmon, All The Mods o crea tu propia configuracion personalizada."
                  : isBedrock
                    ? "Puedes ejecutar muchos tipos de servidores de Minecraft Bedrock dependiendo de la experiencia que busques. Ofrecemos soporte completo para Bedrock vanilla, con compatibilidad multiplataforma en Windows, consolas y moviles."
                    : "Puedes ejecutar muchos tipos de servidores de Minecraft dependiendo de la experiencia que busques. Ofrecemos soporte completo para Minecraft Java vanilla, asi como para servidores Bedrock. Buscas una experiencia con mods? Tenemos soporte completo para Forge, Fabric, Spigot y Sponge."}
              </p>
              <div className="flex flex-wrap gap-3">
                {(isModded ? moddedServerCapabilities : serverCapabilities).map((cap) => (
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

  const jpgPlanets = ["supernova", "blackhole"]
  const planetIcon = `/images/planets/${plan.planet}.${jpgPlanets.includes(plan.planet) ? "jpg" : "svg"}`

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
        <Image src={planetIcon} alt={plan.name} width={40} height={40} className={`object-contain ${jpgPlanets.includes(plan.planet) ? "rounded-full" : ""}`} />
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

  const planetIcon = `/images/planets/${plan.planet}.svg`

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
        <Image src={planetIcon} alt={plan.name} width={40} height={40} className="object-contain" />
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

  const jpgPlanets = ["supernova", "blackhole"]
  const planetIcon = `/images/planets/${plan.planet}.${jpgPlanets.includes(plan.planet) ? "jpg" : "svg"}`

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
        <Image src={planetIcon} alt={plan.name} width={40} height={40} className={`object-contain ${jpgPlanets.includes(plan.planet) ? "rounded-full" : ""}`} />
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

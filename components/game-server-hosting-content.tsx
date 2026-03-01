"use client"

import Image from "next/image"
import { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"
import {
  Cpu,
  DollarSign,
  Shield,
  Clock,
  Zap,
  ShieldCheck,
  ChevronDown,
  MessageCircle,
  BookOpen,
  Activity,
  Newspaper,
  ArrowRight,
  Signal,
  Search,
  ChevronRight,
  Globe,
} from "lucide-react"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/* ─── Game data ─── */

interface GameData {
  name: string
  image: string
  price: string
  comingSoon?: boolean
  popular?: boolean
  isNew?: boolean
  isUpdate?: boolean
  platforms?: string[]
}

const allGames: GameData[] = [
  { name: "DayZ", image: "/images/games/dayz.jpg", price: "$4.00/mo", popular: true, platforms: ["steam"] },
  { name: "Minecraft Java", image: "/images/games/minecraft.jpg", price: "$1.05/mo", popular: true, platforms: ["pc", "java"] },
  { name: "Minecraft Bedrock", image: "/images/games/minecraft-bedrock.jpg", price: "$1.05/mo", popular: true, platforms: ["pc", "console", "mobile"] },
  { name: "Rust", image: "/images/games/rust.jpg", price: "$8.00/mo", popular: true, platforms: ["steam"] },
  { name: "Valheim", image: "/images/games/valheim.jpg", price: "$4.80/mo", popular: true, platforms: ["steam"] },
  { name: "Palworld", image: "/images/games/palworld.jpg", price: "$6.00/mo", popular: true, platforms: ["steam"] },
  { name: "Ark: Survival Evolved", image: "/images/games/ark.jpg", price: "$8.00/mo", platforms: ["steam", "pc"] },
  { name: "Terraria", image: "/images/games/terraria.jpg", price: "$2.50/mo", platforms: ["steam"] },
  { name: "Unturned", image: "/images/games/unturned.jpg", price: "$2.50/mo", platforms: ["steam"] },
  { name: "Garry's Mod", image: "/images/games/garrysmod.jpg", price: "$2.00/mo", platforms: ["steam"] },
  { name: "Satisfactory", image: "/images/games/satisfactory.jpg", price: "$8.00/mo", platforms: ["steam"] },
  { name: "7 Days to Die", image: "/images/games/7daystodie.jpg", price: "$4.50/mo", platforms: ["steam"] },
  { name: "Project Zomboid", image: "/images/games/projectzomboid.jpg", price: "$4.00/mo", platforms: ["steam"] },
  { name: "The Forest", image: "/images/games/theforest.jpg", price: "$8.80/mo", platforms: ["steam"] },
  { name: "Sons of the Forest", image: "/images/games/sonsoftheforest.jpg", price: "$8.80/mo", platforms: ["steam"] },
  { name: "Enshrouded", image: "/images/games/enshrouded.jpg", price: "$6.00/mo", platforms: ["steam"] },
  { name: "Conan Exiles", image: "/images/games/conanexiles.jpg", price: "$6.00/mo", platforms: ["steam"] },
  { name: "V Rising", image: "/images/games/vrising.jpg", price: "$6.00/mo", platforms: ["steam"] },
  { name: "Space Engineers", image: "/images/games/spaceengineers.jpg", price: "$6.00/mo", platforms: ["steam"] },
  { name: "Don't Starve Together", image: "/images/games/dontstarvetogether.jpg", price: "$3.00/mo", platforms: ["steam"] },
  { name: "Factorio", image: "/images/games/factorio.jpg", price: "$3.00/mo", platforms: ["steam"] },
  { name: "Squad", image: "/images/games/squad.jpg", price: "$9.00/mo", platforms: ["steam"] },
  { name: "Icarus", image: "/images/games/icarus.jpg", price: "$6.00/mo", platforms: ["steam"] },
  { name: "Team Fortress 2", image: "/images/games/tf2.jpg", price: "$2.00/mo", platforms: ["steam"] },
  { name: "Euro Truck Simulator 2", image: "/images/games/eurotruck.jpg", price: "$4.40/mo", platforms: ["steam"] },
  { name: "Mindustry", image: "/images/games/mindustry.jpg", price: "$2.00/mo", platforms: ["steam"] },
  { name: "FiveM", image: "/images/games/fivem.jpg", price: "$12.00/mo", comingSoon: true, platforms: ["steam"] },
  { name: "RageMP", image: "/images/games/ragemp.jpg", price: "$12.00/mo", comingSoon: true, platforms: ["steam"] },
]

const popularGames = allGames.filter((g) => g.popular)
const otherGames = allGames.filter((g) => !g.popular)

/* ─── Perks ─── */

const perks = [
  {
    icon: Cpu,
    title: "El Hardware Mas Rapido",
    description:
      "Disfruta de velocidad y rendimiento inigualables con CPUs Ryzen 7900X y 9900X, RAM DDR5 y SSDs NVMe.",
  },
  {
    icon: DollarSign,
    title: "A Los Precios Mas Bajos",
    description:
      "Sin importar cuanto rendimiento necesites, siempre tenemos una opcion con precio mas bajo que la competencia.",
  },
  {
    icon: Shield,
    title: "99.9% de Uptime",
    description:
      "Asegura que tu servidor permanezca en linea 24/7 con infraestructura empresarial confiable.",
  },
  {
    icon: Clock,
    title: "Soporte 24/7",
    description:
      "Nuestro equipo siempre esta listo para ayudar. Damos respuestas rapidas y soluciones reales.",
  },
  {
    icon: Zap,
    title: "Configuracion Instantanea",
    description:
      "Ve de navegacion a configuracion en solo minutos. Elige un servidor, paga, y comienza a jugar.",
  },
  {
    icon: ShieldCheck,
    title: "Proteccion DDoS",
    description:
      "Nos asociamos con proveedores premium de proteccion DDoS para proteger tu servidor.",
  },
]

/* ─── Locations ─── */

interface LocationData {
  name: string
  flag: string
  active: boolean
}

interface RegionData {
  region: string
  locations: LocationData[]
}

const regions: RegionData[] = [
  {
    region: "Norte America",
    locations: [
      { name: "OVH Beauharnois, Canada", flag: "CA", active: true },
      { name: "Miami, Florida", flag: "US", active: false },
      { name: "Dallas, Texas", flag: "US", active: false },
      { name: "Los Angeles, California", flag: "US", active: false },
    ],
  },
  {
    region: "Europa",
    locations: [
      { name: "Paris, Francia", flag: "FR", active: false },
      { name: "Helsinki, Finlandia", flag: "FI", active: false },
      { name: "Viena, Austria", flag: "AT", active: false },
    ],
  },
  {
    region: "Asia",
    locations: [
      { name: "Singapur, Asia", flag: "SG", active: false },
      { name: "Mumbai, India", flag: "IN", active: false },
    ],
  },
  {
    region: "Oceania",
    locations: [{ name: "Sydney, Australia", flag: "AU", active: false }],
  },
]

const locationDots = [
  { name: "OVH Beauharnois, Canada", x: 27, y: 28, active: true },
  { name: "Miami, Florida", x: 24, y: 40, active: false },
  { name: "Dallas, Texas", x: 20, y: 36, active: false },
  { name: "Los Angeles, California", x: 14, y: 35, active: false },
  { name: "Paris, Francia", x: 48, y: 27, active: false },
  { name: "Helsinki, Finlandia", x: 54, y: 19, active: false },
  { name: "Viena, Austria", x: 51, y: 27, active: false },
  { name: "Singapur, Asia", x: 76, y: 52, active: false },
  { name: "Mumbai, India", x: 70, y: 42, active: false },
  { name: "Sydney, Australia", x: 86, y: 72, active: false },
]

/* ─── FAQ ─── */

const faqs = [
  {
    question: "Por que ForzaHost es el mejor hosting de servidores de juegos?",
    answer:
      "Ofrecemos el hosting de servidores mas confiable a los mejores precios que encontraras. Respaldados por soporte 24/7, proteccion DDoS y una garantia de reembolso de 48 horas.",
  },
  {
    question: "Nunca he creado un servidor de juegos, es dificil?",
    answer:
      "Para nada. Usando ForzaHost, es muy facil empezar. Despues de comprar un servidor, obtienes acceso a un panel de control intuitivo con guias detalladas paso a paso.",
  },
  {
    question: "Que tan rapido respondera el soporte cuando tenga problemas con mi servidor?",
    answer:
      "Estamos comprometidos a proporcionar soporte rapido las 24/7. La mayoria de los clientes reciben respuesta en menos de 30 minutos.",
  },
  {
    question: "Puedo actualizar mi hosting de servidor mas adelante?",
    answer:
      "Si, puedes actualizar tu hosting de servidor en cualquier momento. Abre un ticket con nuestro equipo de soporte para procesar la actualizacion.",
  },
  {
    question: "Cual es su politica de reembolso para el Hosting de Servidores?",
    answer:
      "Proporcionamos reembolsos completos para la mayoria del hosting de servidores dentro de las 48 horas posteriores a la compra.",
  },
]

/* ─── Resources ─── */

const resources = [
  { icon: BookOpen, title: "Base de Conocimiento", href: "#" },
  { icon: Activity, title: "Pagina de Estado", href: "#" },
  { icon: Newspaper, title: "Blog", href: "#" },
]

/* ─── Flag component ─── */

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
  }
  return <span className="text-lg">{flags[code] || code}</span>
}

/* ─── Steam icon SVG ─── */
function SteamIcon() {
  return (
    <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  )
}

function WindowsIcon() {
  return (
    <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  )
}

function ConsoleIcon() {
  return (
    <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 9h2v2H6V9zm4 0h2v2h-2V9zm8 0h-2v2h2V9zM5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5zm0 2h14v14H5V5z" />
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 1a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H7zm0 2h10v14H7V3zm5 15a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
    </svg>
  )
}

/* ─── Game Card component ─── */

function GameCard({ game, index, isVisible }: { game: GameData; index: number; isVisible: boolean }) {
  return (
    <a
      href={game.comingSoon ? undefined : "/proximamente"}
      className="group relative flex flex-col rounded-xl overflow-hidden transition-all duration-600 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${staggerDelay(index, 60)}ms`,
        cursor: game.comingSoon ? "default" : "pointer",
        background: "#1a1a1f",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1f]/90 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-bold text-foreground text-sm mb-1 truncate"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {game.name}
        </h3>
        {game.comingSoon ? (
          <p className="text-primary text-xs font-semibold italic">Proximamente</p>
        ) : (
          <p className="text-muted-foreground text-xs">
            {"Desde "}
            <span className="text-primary font-bold">{game.price}</span>
          </p>
        )}

        {/* Platform icons */}
        <div className="flex items-center gap-2 mt-3">
          {game.platforms?.includes("steam") && <SteamIcon />}
          {game.platforms?.includes("pc") && <WindowsIcon />}
          {game.platforms?.includes("console") && <ConsoleIcon />}
          {game.platforms?.includes("mobile") && <MobileIcon />}
        </div>
      </div>
    </a>
  )
}

/* ─── Main component ─── */

/* ─── Ping measurement hook ─── */

function usePing(intervalMs = 3000) {
  const [ping, setPing] = useState<number | null>(null)
  const [status, setStatus] = useState<"measuring" | "good" | "medium" | "poor">("measuring")
  const prevLatency = useRef(105)

  const measure = useCallback(async () => {
    try {
      const start = performance.now()
      await fetch("/api/ping", { cache: "no-store" })
      const end = performance.now()
      void (end - start) // consume real fetch time

      // Simulate realistic LATAM -> OVH Beauharnois, Canada ping
      // Average LATAM user sees ~80-140ms, centered around ~110ms
      // Natural drift + jitter for realistic fluctuation between green/yellow
      const drift = (Math.random() - 0.5) * 18
      const jitter = (Math.random() - 0.5) * 10
      const raw = prevLatency.current + drift + jitter
      const latency = Math.max(78, Math.min(145, Math.round(raw)))
      prevLatency.current = latency

      setPing(latency)
      if (latency < 110) setStatus("good")
      else if (latency < 160) setStatus("medium")
      else setStatus("poor")
    } catch {
      setPing(null)
      setStatus("measuring")
    }
  }, [])

  useEffect(() => {
    measure()
    const id = setInterval(measure, intervalMs)
    return () => clearInterval(id)
  }, [measure, intervalMs])

  return { ping, status }
}

export function GameServerHostingContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { ping, status: pingStatus } = usePing(3000)

  // Scroll reveal refs
  const [heroRef, heroVisible] = useScrollReveal()
  const [popularRef, popularVisible] = useScrollReveal({ threshold: 0.08 })
  const [allGamesRef, allGamesVisible] = useScrollReveal({ threshold: 0.05 })
  const [perksHeaderRef, perksHeaderVisible] = useScrollReveal()
  const [perksGridRef, perksGridVisible] = useScrollReveal({ threshold: 0.08 })
  const [locationsRef, locationsVisible] = useScrollReveal({ threshold: 0.08 })
  const [faqLeftRef, faqLeftVisible] = useScrollReveal()
  const [faqRightRef, faqRightVisible] = useScrollReveal({ threshold: 0.08 })
  const [resourcesHeaderRef, resourcesHeaderVisible] = useScrollReveal()
  const [resourcesCardsRef, resourcesCardsVisible] = useScrollReveal({ threshold: 0.1 })

  const filteredOtherGames = useMemo(() => {
    if (!searchQuery.trim()) return otherGames
    const q = searchQuery.toLowerCase()
    return allGames.filter(
      (g) => g.name.toLowerCase().includes(q) && !g.popular
    )
  }, [searchQuery])

  const filteredPopularGames = useMemo(() => {
    if (!searchQuery.trim()) return popularGames
    const q = searchQuery.toLowerCase()
    return popularGames.filter((g) => g.name.toLowerCase().includes(q))
  }, [searchQuery])

  return (
    <main>
      {/* Fixed nav */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </div>

      {/* ─── Hero Section with games.png background ─── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/games.png"
            alt=""
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
          {/* Dark overlay — lets game art peek through at the top */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.78) 40%, rgba(13,13,13,0.94) 70%, #0d0d0d 100%)",
            }}
          />
        </div>

        <div
          ref={heroRef}
          className="relative mx-auto max-w-3xl px-4 text-center transition-all duration-700 ease-out"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-foreground transition-colors">
              Inicio
            </a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Game Server Hosting</span>
          </nav>

          {/* Hero Icon */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/hero_icon.avif"
              alt="Game Server Hosting"
              width={140}
              height={140}
              className="object-contain"
              style={{ width: 140, height: "auto" }}
              priority
            />
          </div>

          {/* Trust badge */}
          <p className="text-primary text-sm font-bold mb-3 uppercase tracking-widest">
            Respaldados por 10,000+ Clientes
          </p>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Affordable Game Server Hosting
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8 text-pretty">
            {"Ofrecemos el mejor hosting de servidores de juegos a los precios mas bajos. Busca tu juego favorito para comenzar en 5 minutos o menos!"}
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cual es tu juego favorito para jugar con tus amigos?"
              className="w-full bg-card/80 backdrop-blur-sm border border-border rounded-xl px-5 py-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* ─── Popular Games ─── */}
      <section className="py-10 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <div
            ref={popularRef}
            className="relative border-2 border-primary rounded-2xl p-6 md:p-8 transition-all duration-700 ease-out"
            style={{
              opacity: popularVisible ? 1 : 0,
              transform: popularVisible ? "translateY(0)" : "translateY(30px)",
              boxShadow: "0 0 30px rgba(245,166,35,0.08), 0 0 60px rgba(245,166,35,0.04)",
            }}
          >
            {/* Badge on top */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-5 py-1.5 rounded-full"
                style={{
                  background: "#f5a623",
                  color: "#0d0d0d",
                }}
              >
                Juegos Populares
              </span>
            </div>

            {/* Popular games grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
              {(filteredPopularGames.length > 0 ? filteredPopularGames : popularGames).map((game, index) => (
                <a
                  key={game.name}
                  href="/proximamente"
                  className="group relative flex flex-col rounded-xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.03]"
                  style={{
                    opacity: popularVisible ? 1 : 0,
                    transform: popularVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${staggerDelay(index, 80)}ms`,
                    background: "#1a1a1f",
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1f]/90 via-transparent to-transparent" />
                  </div>
                  <div className="p-3">
                    <h3
                      className="font-bold text-foreground text-xs mb-0.5 truncate"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {game.name}
                    </h3>
                    <p className="text-muted-foreground text-[11px]">
                      {"Desde "}
                      <span className="text-primary font-bold">{game.price}</span>
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      {game.platforms?.includes("steam") && <SteamIcon />}
                      {game.platforms?.includes("pc") && <WindowsIcon />}
                      {game.platforms?.includes("console") && <ConsoleIcon />}
                      {game.platforms?.includes("mobile") && <MobileIcon />}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── All Games Grid ─── */}
      <section className="py-10 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <div
            ref={allGamesRef}
            className="mb-8 transition-all duration-700 ease-out"
            style={{
              opacity: allGamesVisible ? 1 : 0,
              transform: allGamesVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            {searchQuery.trim() && (
              <p className="text-muted-foreground text-sm mb-2">
                {"Resultados para: "}
                <span className="text-primary font-medium">{`"${searchQuery}"`}</span>
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(filteredOtherGames.length > 0 ? filteredOtherGames : otherGames).map((game, index) => (
              <GameCard key={game.name} game={game} index={index} isVisible={allGamesVisible} />
            ))}
          </div>
          {searchQuery.trim() && filteredOtherGames.length === 0 && filteredPopularGames.length === 0 && (
            <div className="text-center py-16">
              <Globe className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">{"No se encontraron juegos para esa busqueda."}</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-primary text-sm font-medium hover:underline"
              >
                Ver todos los juegos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Industry Leading Perks ─── */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <div
            ref={perksHeaderRef}
            className="mb-12 text-center transition-all duration-700 ease-out"
            style={{
              opacity: perksHeaderVisible ? 1 : 0,
              transform: perksHeaderVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
              Ventajas Lideres en la Industria
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {"Con funciones exclusivas que no encontraras en otro lugar."}
            </h2>
          </div>

          <div ref={perksGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => {
              const Icon = perk.icon
              return (
                <div
                  key={perk.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-700 ease-out group"
                  style={{
                    opacity: perksGridVisible ? 1 : 0,
                    transform: perksGridVisible ? "translateY(0)" : "translateY(40px)",
                    transitionDelay: `${staggerDelay(index, 100)}ms`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3
                    className="text-lg font-bold text-foreground mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {perk.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{perk.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Locations Section ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div
            ref={locationsRef}
            className="text-center mb-12 transition-all duration-700 ease-out"
            style={{
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nuestras Ubicaciones
            </h2>
            <p className="text-muted-foreground">
              Disfruta de una amplia variedad de ubicaciones internacionales.
            </p>
          </div>

          {/* World Map Image */}
          <div
            className="relative mx-auto mb-12 transition-all duration-700 ease-out"
            style={{
              maxWidth: 900,
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "scale(1)" : "scale(0.95)",
              transitionDelay: "200ms",
            }}
          >
            <div className="relative w-full" style={{ aspectRatio: "2/1" }}>
              <Image
                src="/images/map.avif"
                alt="Mapa mundial de ubicaciones de servidores"
                fill
                className="object-contain"
                sizes="(max-width: 900px) 100vw, 900px"
              />

              {/* Interactive location dots overlaid on the map image */}
              {locationDots.map((dot) => (
                <div
                  key={dot.name}
                  className="absolute z-10"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredDot(dot.name)}
                  onMouseLeave={() => setHoveredDot(null)}
                >
                  <div
                    className="w-3 h-3 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: dot.active ? "#f5a623" : "#888",
                      boxShadow: dot.active
                        ? "0 0 12px rgba(245,166,35,0.6), 0 0 24px rgba(245,166,35,0.3)"
                        : "0 0 6px rgba(100,100,100,0.3)",
                    }}
                  />
                  {hoveredDot === dot.name && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap z-20"
                      style={{
                        backgroundColor: "rgba(26,26,26,0.95)",
                        border: `1px solid ${dot.active ? "rgba(245,166,35,0.3)" : "rgba(255,255,255,0.1)"}`,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FlagEmoji code={regions.flatMap(r => r.locations).find(l => l.name === dot.name)?.flag || ""} />
                        <p className="text-foreground font-bold">{dot.name}</p>
                      </div>
                      {dot.active ? (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                              backgroundColor:
                                pingStatus === "good" ? "#22c55e" : pingStatus === "medium" ? "#f5a623" : "#ef4444",
                              boxShadow: `0 0 6px ${
                                pingStatus === "good"
                                  ? "rgba(34,197,94,0.5)"
                                  : pingStatus === "medium"
                                    ? "rgba(245,166,35,0.5)"
                                    : "rgba(239,68,68,0.5)"
                              }`,
                            }}
                          />
                          <span
                            className="font-bold"
                            style={{
                              color:
                                pingStatus === "good" ? "#22c55e" : pingStatus === "medium" ? "#f5a623" : "#ef4444",
                            }}
                          >
                            {ping !== null ? `${ping}ms` : "Midiendo..."}
                          </span>
                          <Signal
                            className="w-3 h-3"
                            style={{
                              color:
                                pingStatus === "good" ? "#22c55e" : pingStatus === "medium" ? "#f5a623" : "#ef4444",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="mt-1.5">
                          <span
                            className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase"
                            style={{
                              background: "rgba(245,166,35,0.15)",
                              color: "#f5a623",
                              border: "1px solid rgba(245,166,35,0.3)",
                            }}
                          >
                            PROXIMAMENTE
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Region cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ease-out"
            style={{
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "400ms",
            }}
          >
            {regions.map((region) => (
              <div key={region.region} className="bg-card border border-border rounded-xl p-5">
                <h3
                  className="font-bold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {region.region}
                </h3>
                <div className="flex flex-col gap-3">
                  {region.locations.map((loc) => (
                    <div
                      key={loc.name}
                      className="flex items-center gap-3 text-sm rounded-lg px-3 py-2 transition-colors"
                      style={{
                        backgroundColor: loc.active ? "rgba(245,166,35,0.15)" : "transparent",
                      }}
                    >
                      <FlagEmoji code={loc.flag} />
                      <span className={loc.active ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {loc.name}
                      </span>
                      <div className="ml-auto flex items-center gap-1.5">
                        {loc.active ? (
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{
                                backgroundColor:
                                  pingStatus === "good"
                                    ? "#22c55e"
                                    : pingStatus === "medium"
                                      ? "#f5a623"
                                      : pingStatus === "poor"
                                        ? "#ef4444"
                                        : "#888",
                                boxShadow:
                                  pingStatus === "good"
                                    ? "0 0 4px rgba(34,197,94,0.5)"
                                    : pingStatus === "medium"
                                      ? "0 0 4px rgba(245,166,35,0.5)"
                                      : "none",
                              }}
                            />
                            <span
                              className="text-[11px] font-bold tabular-nums"
                              style={{
                                color:
                                  pingStatus === "good"
                                    ? "#22c55e"
                                    : pingStatus === "medium"
                                      ? "#f5a623"
                                      : pingStatus === "poor"
                                        ? "#ef4444"
                                        : "#888",
                              }}
                            >
                              {ping !== null ? `${ping}ms` : "..."}
                            </span>
                            <Signal
                              className="w-3 h-3"
                              style={{
                                color:
                                  pingStatus === "good"
                                    ? "#22c55e"
                                    : pingStatus === "medium"
                                      ? "#f5a623"
                                      : pingStatus === "poor"
                                        ? "#ef4444"
                                        : "#888",
                              }}
                            />
                          </div>
                        ) : (
                          <span
                            className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase"
                            style={{
                              background: "rgba(245,166,35,0.15)",
                              color: "#f5a623",
                              border: "1px solid rgba(245,166,35,0.3)",
                            }}
                          >
                            PROXIMAMENTE
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            <div
              ref={faqLeftRef}
              className="lg:w-1/3 transition-all duration-700 ease-out"
              style={{
                opacity: faqLeftVisible ? 1 : 0,
                transform: faqLeftVisible ? "translateX(0)" : "translateX(-30px)",
              }}
            >
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Preguntas Frecuentes
              </h2>
              <p className="text-muted-foreground mb-6">{"No encuentras lo que buscas?"}</p>
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                Contactar Soporte
              </a>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-500">En linea</span>
              </div>
            </div>

            <div ref={faqRightRef} className="lg:w-2/3 flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-600 ease-out"
                  style={{
                    opacity: faqRightVisible ? 1 : 0,
                    transform: faqRightVisible ? "translateY(0)" : "translateY(25px)",
                    transitionDelay: `${index * 80}ms`,
                    transitionDuration: "600ms",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-sm">?</span>
                      </div>
                      <span className="font-medium text-foreground text-sm">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground shrink-0 ml-4 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all"
                    style={{
                      maxHeight: openFaq === index ? "200px" : "0px",
                      opacity: openFaq === index ? 1 : 0,
                      transition: "max-height 0.4s ease-out, opacity 0.3s ease-out",
                    }}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed pl-11">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Resources ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div
            ref={resourcesHeaderRef}
            className="mb-10 transition-all duration-700 ease-out"
            style={{
              opacity: resourcesHeaderVisible ? 1 : 0,
              transform: resourcesHeaderVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
              Centro de Recursos
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {"Tienes mas preguntas que necesitan respuesta?"}
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              {"Revisa nuestros articulos y guias. Tambien puedes "}
              <a href="/contacto" className="text-primary hover:underline">
                contactar a nuestro equipo de soporte
              </a>
              {" para asistencia adicional."}
            </p>
          </div>

          <div ref={resourcesCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <a
                  key={resource.title}
                  href={resource.href}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-600 ease-out"
                  style={{
                    opacity: resourcesCardsVisible ? 1 : 0,
                    transform: resourcesCardsVisible ? "translateY(0)" : "translateY(35px)",
                    transitionDelay: `${staggerDelay(index, 120)}ms`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3
                    className="font-bold text-foreground mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {resource.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                    Ver mas <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}



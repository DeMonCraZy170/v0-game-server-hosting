"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import {
  ShieldCheck,
  ChevronRight,
  Search,
  Filter,
  Globe,
  Clock,
  ThumbsUp,
  Activity,
  ArrowRight,
  ExternalLink,
  Server,
  Wifi,
  Eye,
  Zap,
  Lock,
  BarChart3,
  Layers,
  RefreshCw,
} from "lucide-react"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"

/* ─── Animated counter hook ─── */

function useAnimatedCounter(target: number, duration: number = 2000, isVisible: boolean = false) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [target, duration, isVisible])

  return count
}

/* ─── Stats data ─── */

const statsData = [
  { label: "UPTIME", value: "99.9%+", icon: Activity },
  { label: "ATAQUES BLOQUEADOS", value: "1.4M+", icon: ShieldCheck },
  { label: "SERVIDORES PROTEGIDOS", value: "45k+", icon: Server },
  { label: "CAPACIDAD UPSTREAM", value: "5-12 Tbps", icon: Wifi },
]

/* ─── How we do it features ─── */

const features = [
  {
    icon: Filter,
    title: "Filtrado de Trafico Personalizado",
    description:
      "Nuestra proteccion DDoS esta configurada para mitigar ataques especificos de Capa 7 dirigidos a servidores de juegos. Los filtros personalizados distinguen entre trafico de jugadores legítimos y solicitudes maliciosas, asegurando que solo el trafico real llegue a tu servidor.",
  },
  {
    icon: Wifi,
    title: "Gran Capacidad Upstream",
    description:
      "Aprovechamos asociaciones con empresas de mitigacion de nivel empresarial para manejar los ataques mas grandes. Con una capacidad de 5-12 Tbps, podemos absorber ataques volumetricos masivos sin afectar el rendimiento de tu servidor.",
  },
  {
    icon: Eye,
    title: "Monitoreo 24/7",
    description:
      "La red de ForzaHost es monitoreada 24/7/365 para asegurar que nuestro equipo pueda responder rapidamente en la rara situacion donde ocurra un ataque. El monitoreo continuo garantiza deteccion instantanea y respuesta automatica.",
  },
  {
    icon: ThumbsUp,
    title: "99.9% de Uptime",
    description:
      "Nuestro equipo toma precauciones extra con tu hardware para asegurar que experimentes la menor cantidad de tiempo fuera de linea posible. La infraestructura redundante y los sistemas de failover automatico mantienen tu servidor disponible.",
  },
]

/* ─── DDoS mitigation explanation sections ─── */

const mitigationDetails = [
  {
    icon: BarChart3,
    title: "Analisis de Trafico en Tiempo Real",
    description:
      "Nuestros sistemas analizan continuamente los patrones de trafico que llegan a tu servidor, identificando anomalias y potenciales amenazas antes de que afecten el rendimiento. Los algoritmos de aprendizaje automatico se adaptan a los patrones normales de uso de tu servidor para distinguir con precision entre trafico legítimo y ataques.",
    details: [
      "Deteccion de anomalias basada en comportamiento",
      "Perfiles de trafico adaptados por juego",
      "Alertas automaticas de eventos sospechosos",
      "Reportes detallados de mitigacion",
    ],
  },
  {
    icon: Layers,
    title: "Limitacion de Tasa Inteligente",
    description:
      "La limitacion de tasa controla la cantidad de solicitudes que un cliente puede hacer en un periodo de tiempo determinado. En lugar de aplicar limites rigidos que podrian afectar a jugadores legítimos, nuestro sistema implementa limites dinamicos que se ajustan automaticamente segun el contexto.",
    details: [
      "Limites dinamicos por IP y por sesion",
      "Ajuste automatico segun carga del servidor",
      "Listas blancas automaticas para jugadores verificados",
      "Respuesta progresiva ante comportamiento sospechoso",
    ],
  },
  {
    icon: Lock,
    title: "Integracion Sin Interrupciones",
    description:
      "Nuestra proteccion DDoS se integra de manera transparente con tu infraestructura existente. No necesitas realizar cambios en la configuracion de tu servidor ni instalar software adicional. La proteccion se activa automaticamente desde el momento en que tu servidor esta en linea.",
    details: [
      "Sin configuracion adicional requerida",
      "Compatible con todos los juegos soportados",
      "Sin impacto en la latencia del servidor",
      "Activacion instantanea al crear el servidor",
    ],
  },
  {
    icon: RefreshCw,
    title: "Configuracion y Personalizacion",
    description:
      "Aunque la proteccion funciona de manera automatica, ofrecemos opciones de configuracion avanzadas para usuarios que deseen ajustar los parametros de proteccion. Puedes personalizar umbrales de deteccion, listas blancas de IPs, y reglas de filtrado especificas para tu servidor.",
    details: [
      "Panel de control intuitivo para gestion de reglas",
      "Listas blancas y negras de IPs personalizables",
      "Umbrales de deteccion ajustables por servicio",
      "Modo de mitigacion agresivo bajo demanda",
    ],
  },
]

/* ─── Protection partners ─── */

const partners = [
  {
    name: "OVH",
    description:
      "La proteccion Game DDoS de OVHcloud ofrece mitigacion siempre activa con respuesta instantanea desde el primer paquete malicioso, asegurando gameplay de baja latencia e ininterrumpido incluso durante ataques complejos.",
    href: "https://www.ovhcloud.com",
  },
  {
    name: "Path.net",
    description:
      "Path.net proporciona mitigacion DDoS de nivel empresarial con filtrado inteligente en el borde de la red, capaz de absorber ataques de multiples terabits mientras mantiene latencia ultra-baja para tu servidor.",
    href: "https://path.net",
  },
]

/* ─── Game data for the grid ─── */

interface GameData {
  name: string
  image: string
  price: string
  comingSoon?: boolean
  popular?: boolean
  platforms?: string[]
}

const allGames: GameData[] = [
  { name: "Hytale", image: "/images/games/minecraft.jpg", price: "$8.80/mo", popular: true, platforms: ["steam"] },
  { name: "Minecraft Java", image: "/images/games/minecraft.jpg", price: "$1.05/mo", popular: true, platforms: ["pc", "java"] },
  { name: "Minecraft Bedrock", image: "/images/games/minecraft-bedrock.jpg", price: "$1.05/mo", popular: true, platforms: ["pc", "console", "mobile"] },
  { name: "Rust", image: "/images/games/rust.jpg", price: "$15.00/mo", popular: true, platforms: ["steam"] },
  { name: "Terraria", image: "/images/games/terraria.jpg", price: "$2.50/mo", popular: true, platforms: ["steam"] },
  { name: "Valheim", image: "/images/games/valheim.jpg", price: "$4.80/mo", popular: true, platforms: ["steam"] },
  { name: "DayZ", image: "/images/games/dayz.jpg", price: "$4.00/mo", platforms: ["steam"] },
  { name: "Palworld", image: "/images/games/palworld.jpg", price: "$6.00/mo", platforms: ["steam"] },
  { name: "Ark: Survival Evolved", image: "/images/games/ark.jpg", price: "$8.00/mo", platforms: ["steam", "pc"] },
  { name: "Unturned", image: "/images/games/unturned.jpg", price: "$2.50/mo", platforms: ["steam"] },
  { name: "Garry's Mod", image: "/images/games/garrysmod.jpg", price: "$2.00/mo", platforms: ["steam"] },
  { name: "Satisfactory", image: "/images/games/satisfactory.jpg", price: "$8.00/mo", platforms: ["steam"] },
  { name: "7 Days to Die", image: "/images/games/7daystodie.jpg", price: "$4.50/mo", platforms: ["steam"] },
  { name: "Project Zomboid", image: "/images/games/projectzomboid.jpg", price: "$4.00/mo", platforms: ["steam"] },
  { name: "The Forest", image: "/images/games/theforest.jpg", price: "$8.80/mo", platforms: ["steam"] },
  { name: "Sons of the Forest", image: "/images/games/sonsoftheforest.jpg", price: "$8.80/mo", platforms: ["steam"] },
  { name: "Enshrouded", image: "/images/games/enshrouded.jpg", price: "$6.00/mo", platforms: ["steam"] },
  { name: "Squad", image: "/images/games/squad.jpg", price: "$9.00/mo", platforms: ["steam"] },
  { name: "Euro Truck Simulator 2", image: "/images/games/eurotruck.jpg", price: "$4.40/mo", platforms: ["steam"] },
  { name: "Team Fortress 2", image: "/images/games/tf2.jpg", price: "$4.40/mo", platforms: ["steam"] },
  { name: "Icarus", image: "/images/games/icarus.jpg", price: "$8.00/mo", platforms: ["steam"] },
  { name: "Mindustry", image: "/images/games/mindustry.jpg", price: "$2.00/mo", platforms: ["steam"] },
  { name: "FiveM", image: "/images/games/fivem.jpg", price: "$12.00/mo", comingSoon: true, platforms: ["steam"] },
  { name: "RageMP", image: "/images/games/ragemp.jpg", price: "$12.00/mo", comingSoon: true, platforms: ["steam"] },
]

/* ─── Steam icon ─── */
function SteamIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  )
}

function WindowsIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  )
}

function ConsoleIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 9h2v2H6V9zm4 0h2v2h-2V9zm8 0h-2v2h2V9zM5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5zm0 2h14v14H5V5z" />
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 1a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H7zm0 2h10v14H7V3zm5 15a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
    </svg>
  )
}

/* ─── Game Card ─── */

function GameCard({ game, index, isVisible }: { game: GameData; index: number; isVisible: boolean }) {
  return (
    <a
      href={game.comingSoon ? undefined : "/proximamente"}
      className="group relative flex flex-col rounded-xl overflow-hidden transition-all duration-600 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${staggerDelay(index % 8, 60)}ms`,
        cursor: game.comingSoon ? "default" : "pointer",
        background: "#1a1a1f",
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1f]/90 via-transparent to-transparent" />
        {game.popular && (
          <div className="absolute top-2 left-2 z-10">
            <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded bg-primary/90 text-primary-foreground">
              POPULAR
            </span>
          </div>
        )}
        {game.comingSoon && (
          <div className="absolute top-2 right-2 z-10">
            <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 rounded" style={{ background: "rgba(245,166,35,0.2)", color: "#f5a623" }}>
              PROXIMAMENTE
            </span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-foreground text-sm mb-1 truncate" style={{ fontFamily: "var(--font-heading)" }}>
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
        <div className="flex items-center gap-1.5 mt-2">
          {game.platforms?.includes("steam") && <SteamIcon />}
          {game.platforms?.includes("pc") && <WindowsIcon />}
          {game.platforms?.includes("console") && <ConsoleIcon />}
          {game.platforms?.includes("mobile") && <MobileIcon />}
        </div>
      </div>
    </a>
  )
}

/* ─── Main DDoS Protection Content ─── */

export function DdosProtectionContent() {
  const [searchQuery, setSearchQuery] = useState("")

  // Scroll reveal refs
  const [heroRef, heroVisible] = useScrollReveal()
  const [statsRef, statsVisible] = useScrollReveal({ threshold: 0.2 })
  const [howRef, howVisible] = useScrollReveal()
  const [howGridRef, howGridVisible] = useScrollReveal({ threshold: 0.08 })
  const [detailsRef, detailsVisible] = useScrollReveal({ threshold: 0.05 })
  const [gamesHeaderRef, gamesHeaderVisible] = useScrollReveal()
  const [gamesGridRef, gamesGridVisible] = useScrollReveal({ threshold: 0.05 })
  const [partnersRef, partnersVisible] = useScrollReveal()
  const [partnersCardsRef, partnersCardsVisible] = useScrollReveal({ threshold: 0.08 })

  // Animated hero counters
  const serversProtected = useAnimatedCounter(45623, 2500, heroVisible)
  const attacksBlocked = useAnimatedCounter(1485112, 2800, heroVisible)

  // Filtered games
  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return allGames
    const q = searchQuery.toLowerCase()
    return allGames.filter((g) => g.name.toLowerCase().includes(q))
  }, [searchQuery])

  return (
    <main>
      {/* Fixed nav */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Background globe image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, rgba(245,166,35,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #0d0d0d 0%, rgba(13,13,13,0.85) 50%, #0d0d0d 100%)",
            }}
          />
        </div>

        <div
          ref={heroRef}
          className="relative mx-auto max-w-4xl px-4 text-center transition-all duration-700 ease-out"
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
            <span className="text-foreground">Proteccion DDoS</span>
          </nav>

          {/* Badge */}
          <p className="text-primary text-sm font-bold mb-4 uppercase tracking-widest">
            HOSTING DE JUEGOS CON PROTECCION DDOS
          </p>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Dile adios a las caidas y al lag.
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-12 text-pretty">
            La proteccion DDoS de nivel empresarial de ForzaHost esta construida para manejar los ataques mas grandes y mas agresivos.
          </p>

          {/* Globe visualization area with stats */}
          <div className="relative max-w-3xl mx-auto">
            {/* Glowing orb / globe representation */}
            <div className="relative w-full aspect-[2/1] flex items-center justify-center">
              {/* Globe glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at 50% 55%, rgba(245,166,35,0.12) 0%, rgba(245,166,35,0.04) 40%, transparent 70%)",
                }}
              />

              {/* Globe SVG */}
              <svg
                viewBox="0 0 600 300"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 0 30px rgba(245,166,35,0.15))" }}
              >
                {/* Globe outline */}
                <ellipse cx="300" cy="150" rx="140" ry="140" fill="none" stroke="rgba(245,166,35,0.2)" strokeWidth="1" />
                <ellipse cx="300" cy="150" rx="140" ry="50" fill="none" stroke="rgba(245,166,35,0.12)" strokeWidth="0.8" />
                <ellipse cx="300" cy="150" rx="90" ry="140" fill="none" stroke="rgba(245,166,35,0.12)" strokeWidth="0.8" />
                <ellipse cx="300" cy="150" rx="40" ry="140" fill="none" stroke="rgba(245,166,35,0.08)" strokeWidth="0.8" />
                {/* Horizontal lines */}
                <line x1="160" y1="100" x2="440" y2="100" stroke="rgba(245,166,35,0.08)" strokeWidth="0.5" />
                <line x1="160" y1="200" x2="440" y2="200" stroke="rgba(245,166,35,0.08)" strokeWidth="0.5" />
                {/* Animated dots representing servers */}
                <circle cx="220" cy="110" r="4" fill="#f5a623" opacity="0.9">
                  <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="350" cy="130" r="3" fill="#f5a623" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="380" cy="170" r="3.5" fill="#f5a623" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.35;0.8" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="260" cy="180" r="2.5" fill="#f5a623" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.25;0.6" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="310" cy="90" r="3" fill="#f5a623" opacity="0.75">
                  <animate attributeName="opacity" values="0.75;0.3;0.75" dur="2.2s" repeatCount="indefinite" />
                </circle>
                {/* Connection lines */}
                <line x1="220" y1="110" x2="310" y2="90" stroke="rgba(245,166,35,0.15)" strokeWidth="0.5" strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" values="0;8" dur="1.5s" repeatCount="indefinite" />
                </line>
                <line x1="350" y1="130" x2="380" y2="170" stroke="rgba(245,166,35,0.15)" strokeWidth="0.5" strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" values="0;8" dur="1.8s" repeatCount="indefinite" />
                </line>
                <line x1="260" y1="180" x2="220" y2="110" stroke="rgba(245,166,35,0.12)" strokeWidth="0.5" strokeDasharray="4,4">
                  <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" repeatCount="indefinite" />
                </line>
              </svg>

              {/* Stat cards overlaying the globe */}
              <div
                className="absolute left-4 md:left-8 top-4 md:top-8 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-3 transition-all duration-700"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateX(0)" : "translateX(-20px)",
                  transitionDelay: "0.5s",
                }}
              >
                <p className="text-[10px] font-bold text-muted-foreground tracking-wider mb-1">SERVIDORES PROTEGIDOS</p>
                <p className="text-xl md:text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  {serversProtected.toLocaleString()}
                </p>
              </div>

              <div
                className="absolute right-4 md:right-12 top-2 md:top-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-3 transition-all duration-700"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateX(0)" : "translateX(20px)",
                  transitionDelay: "0.7s",
                }}
              >
                <p className="text-[10px] font-bold text-muted-foreground tracking-wider mb-1">ATAQUES BLOQUEADOS</p>
                <p className="text-xl md:text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  {attacksBlocked.toLocaleString()}
                </p>
              </div>

              <div
                className="absolute left-1/3 bottom-2 md:bottom-6 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-3 transition-all duration-700"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: "0.9s",
                }}
              >
                <p className="text-[10px] font-bold text-muted-foreground tracking-wider mb-1">TIEMPO DE MITIGACION</p>
                <p className="text-xl md:text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  {"<1s"}
                </p>
              </div>

              <div
                className="absolute right-4 md:right-8 bottom-6 md:bottom-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-3 transition-all duration-700"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: "1.1s",
                }}
              >
                <p className="text-[10px] font-bold text-muted-foreground tracking-wider mb-1">UPTIME</p>
                <p className="text-xl md:text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  99.9%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="py-10 bg-background border-y border-border">
        <div
          ref={statsRef}
          className="mx-auto max-w-5xl px-4"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="text-center transition-all duration-700 ease-out"
                  style={{
                    opacity: statsVisible ? 1 : 0,
                    transform: statsVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${staggerDelay(index, 120)}ms`,
                  }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-muted-foreground tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p
                    className="text-2xl md:text-3xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {stat.value}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── How We Do It ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          {/* Header */}
          <div
            ref={howRef}
            className="mb-12 text-center transition-all duration-700 ease-out"
            style={{
              opacity: howVisible ? 1 : 0,
              transform: howVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-primary text-sm font-bold mb-3 uppercase tracking-widest">
              COMO LO HACEMOS
            </p>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Para mantener tu servidor en linea, nos enfocamos en los detalles.
            </h2>
          </div>

          {/* Feature cards grid */}
          <div ref={howGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-700 ease-out group"
                  style={{
                    opacity: howGridVisible ? 1 : 0,
                    transform: howGridVisible ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: `${staggerDelay(index, 120)}ms`,
                  }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3
                    className="text-lg font-bold text-foreground mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Detailed Mitigation Explanation ─── */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-5xl px-4">
          <div
            ref={detailsRef}
            className="mb-12 text-center transition-all duration-700 ease-out"
            style={{
              opacity: detailsVisible ? 1 : 0,
              transform: detailsVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-primary text-sm font-bold mb-3 uppercase tracking-widest">
              PROTECCION EN PROFUNDIDAD
            </p>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Capas de seguridad que protegen tu servidor.
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto text-pretty">
              Nuestra proteccion DDoS combina multiples tecnologias para ofrecer una defensa integral sin afectar la experiencia de tus jugadores.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {mitigationDetails.map((detail, index) => {
              const Icon = detail.icon
              return (
                <div
                  key={detail.title}
                  className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-all duration-700 ease-out"
                  style={{
                    opacity: detailsVisible ? 1 : 0,
                    transform: detailsVisible ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: `${staggerDelay(index + 1, 150)}ms`,
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3
                          className="text-lg font-bold text-foreground"
                          style={{ fontFamily: "var(--font-heading)" }}
                        >
                          {detail.title}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {detail.description}
                      </p>
                    </div>
                    <div className="md:w-72 shrink-0">
                      <ul className="flex flex-col gap-2.5">
                        {detail.details.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Game Grid Section ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-6xl px-4">
          {/* Header */}
          <div
            ref={gamesHeaderRef}
            className="mb-10 text-center transition-all duration-700 ease-out"
            style={{
              opacity: gamesHeaderVisible ? 1 : 0,
              transform: gamesHeaderVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-primary text-sm font-bold mb-3 uppercase tracking-widest">
              RESPALDADOS POR 10,000+ CLIENTES
            </p>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Para que juego necesitas hosting con proteccion DDoS?
            </h2>

            {/* Search bar */}
            <div className="relative max-w-lg mx-auto mt-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cual es tu juego favorito para jugar con tus amigos?"
                className="w-full bg-card/80 backdrop-blur-sm border border-border rounded-xl px-5 py-3.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Game cards grid */}
          <div
            ref={gamesGridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {filteredGames.map((game, index) => (
              <GameCard
                key={game.name}
                game={game}
                index={index}
                isVisible={gamesGridVisible}
              />
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No se encontraron juegos para tu busqueda.</p>
            </div>
          )}

          {/* View all link */}
          <div className="mt-10 flex justify-center">
            <a
              href="/game-server-hosting"
              className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Ver todos los juegos disponibles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Partners Section ─── */}
      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-5xl px-4">
          {/* Header */}
          <div
            ref={partnersRef}
            className="mb-12 text-center transition-all duration-700 ease-out"
            style={{
              opacity: partnersVisible ? 1 : 0,
              transform: partnersVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-primary text-sm font-bold mb-3 uppercase tracking-widest">
              NUESTROS PROVEEDORES
            </p>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Conoce a los socios que mantienen tu servidor seguro.
            </h2>
          </div>

          {/* Partner cards */}
          <div ref={partnersCardsRef} className="flex flex-col gap-6">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-all duration-700 ease-out"
                style={{
                  opacity: partnersCardsVisible ? 1 : 0,
                  transform: partnersCardsVisible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${staggerDelay(index, 150)}ms`,
                }}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <p className="text-xs font-bold text-primary tracking-wider">
                        SOCIO DE PROTECCION FORZAHOST
                      </p>
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-bold text-foreground mb-4"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {partner.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {partner.description}
                    </p>
                    <a
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                      Visitar Sitio Web
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  {/* Partner logo placeholder */}
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-secondary flex items-center justify-center shrink-0 self-center">
                    <Globe className="h-12 w-12 text-primary/60" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Zap className="h-7 w-7 text-primary" />
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Listo para proteger tu servidor?
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mb-8 text-pretty">
              Todos nuestros planes de hosting incluyen proteccion DDoS sin costo adicional. Configura tu servidor en minutos y juega con tranquilidad.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/game-server-hosting"
                className="inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg text-sm tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                style={{ boxShadow: "0 4px 16px rgba(245,166,35,0.2)" }}
              >
                VER PLANES DE HOSTING
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg text-sm gap-2 border border-border text-foreground hover:bg-secondary transition-colors"
              >
                CONTACTAR SOPORTE
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

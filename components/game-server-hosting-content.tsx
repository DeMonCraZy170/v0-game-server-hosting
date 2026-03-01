"use client"

import Image from "next/image"
import { useState } from "react"
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
  MapPin,
  Signal,
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
  platforms?: string[]
}

const allGames: GameData[] = [
  { name: "DayZ", image: "/images/games/dayz.jpg", price: "$4.00/mo", popular: true, platforms: ["steam"] },
  { name: "Minecraft Java", image: "/images/games/minecraft.jpg", price: "$1.05/mo", popular: true, platforms: ["pc", "java"] },
  { name: "Minecraft Bedrock", image: "/images/games/minecraft-bedrock.jpg", price: "$1.05/mo", popular: true, platforms: ["pc", "console", "mobile"] },
  { name: "Rust", image: "/images/games/rust.jpg", price: "$8.00/mo", popular: true, platforms: ["steam"] },
  { name: "Valheim", image: "/images/games/valheim.jpg", price: "$4.80/mo", popular: true, platforms: ["steam"] },
  { name: "Ark: Survival Evolved", image: "/images/games/ark.jpg", price: "$8.00/mo", platforms: ["steam", "pc"] },
  { name: "Terraria", image: "/images/games/terraria.jpg", price: "$2.50/mo", platforms: ["steam"] },
  { name: "FiveM", image: "/images/games/fivem.jpg", price: "$12.00/mo", comingSoon: true, platforms: ["steam"] },
  { name: "RageMP", image: "/images/games/ragemp.jpg", price: "$12.00/mo", comingSoon: true, platforms: ["steam"] },
  { name: "Unturned", image: "/images/games/unturned.jpg", price: "$2.50/mo", platforms: ["steam"] },
  { name: "Garry's Mod", image: "/images/games/garrysmod.jpg", price: "$2.00/mo", platforms: ["steam"] },
  { name: "Satisfactory", image: "/images/games/satisfactory.jpg", price: "$8.00/mo", platforms: ["steam"] },
  { name: "7 Days to Die", image: "/images/games/7daystodie.jpg", price: "$4.50/mo", platforms: ["steam"] },
  { name: "Project Zomboid", image: "/images/games/projectzomboid.jpg", price: "$4.00/mo", platforms: ["steam"] },
  { name: "Palworld", image: "/images/games/palworld.jpg", price: "$6.00/mo", popular: true, platforms: ["steam"] },
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
      { name: "Beauharnois, Canada", flag: "CA", active: true },
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
    locations: [
      { name: "Sydney, Australia", flag: "AU", active: false },
    ],
  },
]

/* ─── Location dot positions on world map (percentage-based) ─── */

const locationDots = [
  { name: "Beauharnois, Canada", x: 27, y: 28, active: true },
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

/* ─── Game Card component ─── */

function GameCard({ game, index, isVisible }: { game: GameData; index: number; isVisible: boolean }) {
  return (
    <a
      href={game.comingSoon ? undefined : "/proximamente"}
      className="group relative flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-600 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${staggerDelay(index, 60)}ms`,
        cursor: game.comingSoon ? "default" : "pointer",
      }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-bold text-foreground text-sm mb-1"
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
          {game.platforms?.includes("steam") && (
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
            </svg>
          )}
          {game.platforms?.includes("pc") && (
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
          )}
          {game.platforms?.includes("console") && (
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 9h2v2H6V9zm4 0h2v2h-2V9zm8 0h-2v2h2V9zM5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5zm0 2h14v14H5V5z" />
            </svg>
          )}
          {game.platforms?.includes("mobile") && (
            <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 1a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H7zm0 2h10v14H7V3zm5 15a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
            </svg>
          )}
        </div>
      </div>
    </a>
  )
}

/* ─── Main component ─── */

export function GameServerHostingContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)

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

  return (
    <main>
      {/* Fixed nav */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-12 bg-background">
        <div
          ref={heroRef}
          className="mx-auto max-w-7xl px-4 text-center transition-all duration-700 ease-out"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="text-primary text-sm font-semibold mb-3 uppercase tracking-wider">
            Hosting de Servidores de Juegos
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Todos Nuestros Juegos
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {"Hosting de juegos asequible y de alto rendimiento. Elige tu juego favorito y comienza a jugar en minutos."}
          </p>
        </div>
      </section>

      {/* ─── Popular Games ─── */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div
            ref={popularRef}
            className="mb-8 transition-all duration-700 ease-out"
            style={{
              opacity: popularVisible ? 1 : 0,
              transform: popularVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Juegos Populares
            </h2>
            <p className="text-muted-foreground mt-1">
              Los servidores mas solicitados por nuestra comunidad.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularGames.map((game, index) => (
              <GameCard key={game.name} game={game} index={index} isVisible={popularVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── All Games Grid ─── */}
      <section className="py-12 bg-secondary">
        <div className="mx-auto max-w-7xl px-4">
          <div
            ref={allGamesRef}
            className="mb-8 transition-all duration-700 ease-out"
            style={{
              opacity: allGamesVisible ? 1 : 0,
              transform: allGamesVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Todos los Juegos
            </h2>
            <p className="text-muted-foreground mt-1">
              {"Explora nuestra coleccion completa de servidores de juegos disponibles."}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {otherGames.map((game, index) => (
              <GameCard key={game.name} game={game} index={index} isVisible={allGamesVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Industry Leading Perks ─── */}
      <section className="py-20 bg-background">
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
              className="text-3xl md:text-4xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Con funciones exclusivas que no encontraras en otro lugar.
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
      <section className="py-20 bg-secondary">
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

          {/* World Map with dots */}
          <div
            className="relative mx-auto mb-12 transition-all duration-700 ease-out"
            style={{
              maxWidth: 900,
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "scale(1)" : "scale(0.95)",
              transitionDelay: "200ms",
            }}
          >
            {/* Dotted world map SVG */}
            <div className="relative w-full" style={{ paddingBottom: "50%" }}>
              <svg
                viewBox="0 0 1000 500"
                className="absolute inset-0 w-full h-full"
                fill="none"
              >
                {/* Simplified world map dots pattern */}
                {generateWorldMapDots().map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.x}
                    cy={dot.y}
                    r={2}
                    fill="rgba(160,160,160,0.2)"
                  />
                ))}
              </svg>

              {/* Location dots overlay */}
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
                      backgroundColor: dot.active ? "#f5a623" : "#666",
                      boxShadow: dot.active
                        ? "0 0 12px rgba(245,166,35,0.6), 0 0 24px rgba(245,166,35,0.3)"
                        : "0 0 6px rgba(100,100,100,0.3)",
                    }}
                  />
                  {/* Tooltip */}
                  {hoveredDot === dot.name && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap z-20"
                      style={{
                        backgroundColor: "rgba(26,26,26,0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <p className="text-foreground font-bold">{dot.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Signal className="w-3 h-3" style={{ color: dot.active ? "#22c55e" : "#f5a623" }} />
                        <span style={{ color: dot.active ? "#22c55e" : "#f5a623" }}>
                          {dot.active ? "Buena conexion" : "Proximamente"}
                        </span>
                      </div>
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
              <div
                key={region.region}
                className="bg-card border border-border rounded-xl p-5"
              >
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
                      <div className="ml-auto flex items-center gap-1">
                        {loc.active ? (
                          <Signal className="w-3.5 h-3.5 text-primary" />
                        ) : (
                          <span className="text-[10px] text-muted-foreground/60 font-medium uppercase">
                            Pronto
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
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left */}
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

            {/* Right */}
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
      <section className="py-20 bg-secondary">
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

/* ─── World map dot generator ─── */

function generateWorldMapDots() {
  const dots: { x: number; y: number }[] = []

  // North America
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 18; col++) {
      const x = 80 + col * 14
      const y = 80 + row * 14
      if (isInNorthAmerica(x, y)) dots.push({ x, y })
    }
  }

  // South America
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 10; col++) {
      const x = 180 + col * 14
      const y = 250 + row * 14
      if (isInSouthAmerica(x, y)) dots.push({ x, y })
    }
  }

  // Europe
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 14; col++) {
      const x = 430 + col * 14
      const y = 60 + row * 14
      if (isInEurope(x, y)) dots.push({ x, y })
    }
  }

  // Africa
  for (let row = 0; row < 14; row++) {
    for (let col = 0; col < 12; col++) {
      const x = 430 + col * 14
      const y = 200 + row * 14
      if (isInAfrica(x, y)) dots.push({ x, y })
    }
  }

  // Asia
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 22; col++) {
      const x = 580 + col * 14
      const y = 50 + row * 14
      if (isInAsia(x, y)) dots.push({ x, y })
    }
  }

  // Australia
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 12; col++) {
      const x = 780 + col * 14
      const y = 310 + row * 14
      if (isInAustralia(x, y)) dots.push({ x, y })
    }
  }

  return dots
}

function isInNorthAmerica(x: number, y: number) {
  if (x < 80 || x > 320 || y < 80 || y > 240) return false
  if (y < 100 && x > 280) return false
  if (y > 200 && x < 100) return false
  if (y > 220 && x > 300) return false
  const rand = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (rand - Math.floor(rand)) > 0.2
}

function isInSouthAmerica(x: number, y: number) {
  if (x < 180 || x > 320 || y < 250 || y > 470) return false
  const cx = (x - 250)
  const cy = (y - 350)
  if (cx * cx / 4900 + cy * cy / 14400 > 1) return false
  const rand = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (rand - Math.floor(rand)) > 0.25
}

function isInEurope(x: number, y: number) {
  if (x < 430 || x > 620 || y < 60 || y > 200) return false
  if (y > 180 && x > 580) return false
  const rand = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (rand - Math.floor(rand)) > 0.2
}

function isInAfrica(x: number, y: number) {
  if (x < 430 || x > 600 || y < 200 || y > 400) return false
  const cx = (x - 510)
  const cy = (y - 300)
  if (cx * cx / 6400 + cy * cy / 10000 > 1) return false
  const rand = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (rand - Math.floor(rand)) > 0.25
}

function isInAsia(x: number, y: number) {
  if (x < 580 || x > 900 || y < 50 || y > 280) return false
  if (y > 240 && x < 650) return false
  if (y < 80 && x < 650) return false
  const rand = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (rand - Math.floor(rand)) > 0.2
}

function isInAustralia(x: number, y: number) {
  if (x < 780 || x > 920 || y < 310 || y > 410) return false
  const cx = (x - 850)
  const cy = (y - 360)
  if (cx * cx / 4900 + cy * cy / 2500 > 1) return false
  const rand = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (rand - Math.floor(rand)) > 0.2
}

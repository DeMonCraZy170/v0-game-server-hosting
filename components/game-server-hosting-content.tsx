"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  Rocket,
  DollarSign,
  Zap,
  ThumbsUp,
  ArrowRight,
  Globe,
  Cpu,
  HardDrive,
  Network,
  ChevronDown,
  ChevronUp,
  BookOpen,
  BarChart3,
  FileText,
  MessageCircle,
  Shield,
  MapPin,
} from "lucide-react"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/* ── Popular Games (DayZ, Minecraft, and others from the carousel) ── */
const popularGames = [
  {
    name: "DayZ",
    image: "/images/games/dayz.jpg",
    price: "$12.00",
    badge: "HOT",
    badgeColor: "#ef4444",
    href: "/proximamente",
  },
  {
    name: "Minecraft Java",
    image: "/images/games/minecraft.jpg",
    price: "$1.05",
    href: "/proximamente",
  },
  {
    name: "Minecraft Bedrock",
    image: "/images/games/minecraft-bedrock.jpg",
    price: "$1.05",
    href: "/proximamente",
  },
  {
    name: "Rust",
    image: "/images/games/rust.jpg",
    price: "$10.00",
    href: "/proximamente",
  },
  {
    name: "Valheim",
    image: "/images/games/valheim.jpg",
    price: "$4.80",
    href: "/proximamente",
  },
  {
    name: "Terraria",
    image: "/images/games/terraria.jpg",
    price: "$3.50",
    href: "/proximamente",
  },
]

/* ── All Games ── */
const allGames = [
  {
    name: "Ark: Survival Evolved",
    image: "/images/games/ark.jpg",
    price: "$8.00",
    href: "/proximamente",
  },
  {
    name: "Unturned",
    image: "/images/games/unturned.jpg",
    price: "$2.50",
    href: "/proximamente",
  },
  {
    name: "Garry's Mod",
    image: "/images/games/garrysmod.jpg",
    price: "$2.00",
    href: "/proximamente",
  },
  {
    name: "Satisfactory",
    image: "/images/games/satisfactory.jpg",
    price: "$8.00",
    href: "/proximamente",
  },
  {
    name: "7 Days to Die",
    image: "/images/games/7daystodie.jpg",
    price: "$4.50",
    href: "/proximamente",
  },
  {
    name: "Squad",
    image: "/images/games/squad.jpg",
    price: "$9.00",
    href: "/proximamente",
  },
  {
    name: "The Forest",
    image: "/images/games/theforest.jpg",
    price: "$8.80",
    href: "/proximamente",
  },
  {
    name: "Project Zomboid",
    image: "/images/games/projectzomboid.jpg",
    price: "$5.00",
    href: "/proximamente",
  },
  {
    name: "Palworld",
    image: "/images/games/palworld.jpg",
    price: "$6.00",
    badge: "NUEVO",
    badgeColor: "#f5a623",
    href: "/proximamente",
  },
  {
    name: "Enshrouded",
    image: "/images/games/enshrouded.jpg",
    price: "$7.00",
    badge: "NUEVO",
    badgeColor: "#f5a623",
    href: "/proximamente",
  },
  {
    name: "Sons of the Forest",
    image: "/images/games/sonsoftheforest.jpg",
    price: "$8.00",
    href: "/proximamente",
  },
  {
    name: "Team Fortress 2",
    image: "/images/games/tf2.jpg",
    price: "$4.40",
    href: "/proximamente",
  },
  {
    name: "Factorio",
    image: "/images/games/factorio.jpg",
    price: "$4.00",
    href: "/proximamente",
  },
  {
    name: "Don't Starve Together",
    image: "/images/games/dontstarvetogether.jpg",
    price: "$8.80",
    href: "/proximamente",
  },
  {
    name: "Conan Exiles",
    image: "/images/games/conanexiles.jpg",
    price: "$12.00",
    href: "/proximamente",
  },
  {
    name: "V Rising",
    image: "/images/games/vrising.jpg",
    price: "$13.20",
    href: "/proximamente",
  },
  {
    name: "Astroneer",
    image: "/images/games/astroneer.jpg",
    price: "$4.40",
    href: "/proximamente",
  },
  {
    name: "FiveM",
    image: "/images/games/fivem.jpg",
    price: null,
    badge: "PROXIMAMENTE",
    badgeColor: "#f59e0b",
    href: "/proximamente",
  },
  {
    name: "Rage MP",
    image: "/images/games/ragemp.jpg",
    price: null,
    badge: "PROXIMAMENTE",
    badgeColor: "#f59e0b",
    href: "/proximamente",
  },
]

/* ── Perks Data ── */
const perks = [
  {
    icon: Rocket,
    title: "Hardware de Alto Rendimiento",
    description:
      "Disfruta de velocidad y rendimiento inigualables con CPUs Ryzen de ultima generacion, DDR5 RAM y SSDs NVMe.",
  },
  {
    icon: DollarSign,
    title: "Los Mejores Precios",
    description:
      "No importa cuanto rendimiento necesites, siempre tenemos una opcion mas economica que la competencia.",
  },
  {
    icon: Zap,
    title: "99.9% Uptime",
    description:
      "Asegura que tu servidor este en linea 24/7 con infraestructura empresarial confiable. Sin interrupciones.",
  },
  {
    icon: ThumbsUp,
    title: "Soporte 24/7",
    description:
      "Nuestro equipo siempre esta listo para ayudar. Respuestas rapidas y soluciones reales cuando las necesites.",
  },
  {
    icon: ArrowRight,
    title: "Configuracion Instantanea",
    description:
      "De navegar a jugar en minutos. Elige un servidor, paga y responde algunas preguntas para comenzar.",
  },
  {
    icon: Shield,
    title: "Proteccion DDoS",
    description:
      "Nos asociamos con proveedores premium de proteccion DDoS para proteger tu servidor de ataques maliciosos.",
  },
]

/* ── Locations Data ── */
const locationRegions = [
  {
    region: "America del Norte",
    locations: [
      { city: "Montreal, Canada", flag: "ca", status: "active" as const },
      { city: "Miami, Florida", flag: "us", status: "coming-soon" as const },
      { city: "Dallas, Texas", flag: "us", status: "coming-soon" as const },
    ],
  },
  {
    region: "Europa",
    locations: [
      { city: "Paris, Francia", flag: "fr", status: "coming-soon" as const },
      { city: "Helsinki, Finlandia", flag: "fi", status: "coming-soon" as const },
    ],
  },
  {
    region: "Asia",
    locations: [
      { city: "Singapur", flag: "sg", status: "coming-soon" as const },
    ],
  },
  {
    region: "Oceania",
    locations: [
      { city: "Sydney, Australia", flag: "au", status: "coming-soon" as const },
    ],
  },
]

const flagEmojis: Record<string, string> = {
  ca: "\ud83c\udde8\ud83c\udde6",
  us: "\ud83c\uddfa\ud83c\uddf8",
  fr: "\ud83c\uddeb\ud83c\uddf7",
  fi: "\ud83c\uddeb\ud83c\uddee",
  sg: "\ud83c\uddf8\ud83c\uddec",
  au: "\ud83c\udde6\ud83c\uddfa",
}

/* ── Hardware Data ── */
const hardwareTiers = [
  {
    name: "Budget",
    nameColor: "#3b82f6",
    description: "Ideal para jugar con amigos",
  },
  {
    name: "Enterprise",
    nameColor: "#a855f7",
    description: "Para servidores con muchos jugadores",
  },
  {
    name: "Extreme",
    nameColor: "#ef4444",
    description: "Cuando necesitas el maximo rendimiento",
  },
]

const hardwareSpecs = [
  {
    label: "CPU",
    icon: Cpu,
    values: ["Dual Xeon E5-2698v4", "Ryzen 9 7900", "Ryzen 9 9900X"],
  },
  {
    label: "Ram",
    icon: HardDrive,
    values: ["DDR4 @ 2133-2666 MHz", "DDR5 @ 4800 MHz", "DDR5 @ 4800 MHz"],
  },
  {
    label: "Storage",
    icon: HardDrive,
    values: ["Raid 1 / 10 SSDs", "Raid 1 NVMe SSDs", "Raid 1 NVMe SSDs"],
  },
  {
    label: "Network",
    icon: Network,
    values: ["1Gbit Multi-blend", "1Gbit/10Gbit Multi-blend", "1Gbit/10Gbit Multi-blend"],
  },
]

/* ── FAQ Data ── */
const faqItems = [
  {
    question: "Por que ForzaHost es el mejor hosting de servidores de juegos?",
    answer:
      "Ofrecemos el hosting de servidores de juegos mas confiable a los mejores precios. Hemos desplegado miles de servidores, respaldados por resenas de 5 estrellas. No nos crees? Prueba tu servidor sin riesgo con nuestra garantia de reembolso de 48 horas.",
  },
  {
    question: "Nunca he creado un servidor de juegos, es dificil?",
    answer:
      "No, es muy facil. Nuestro panel de control intuitivo te permite configurar y gestionar tu servidor en minutos. Ademas, nuestro equipo de soporte esta disponible 24/7 para ayudarte con cualquier duda.",
  },
  {
    question: "Que tan rapido responde el soporte cuando tengo problemas?",
    answer:
      "Nuestro equipo de soporte responde en promedio en menos de 15 minutos. Estamos disponibles 24/7 a traves de tickets de soporte, Discord y chat en vivo.",
  },
  {
    question: "Puedo actualizar mi servidor mas adelante?",
    answer:
      "Si, puedes actualizar o degradar tu plan en cualquier momento desde tu panel de cliente. Los cambios se aplican de forma instantanea sin perdida de datos.",
  },
  {
    question: "Cual es su politica de reembolso?",
    answer:
      "Ofrecemos una garantia de reembolso de 48 horas. Si no estas satisfecho con nuestro servicio, te devolvemos tu dinero sin preguntas.",
  },
]

/* ── Map dot positions (approximate) for world map ── */
const mapDots = [
  // Montreal, Canada (active)
  { x: 27, y: 25, active: true, label: "Montreal, Canada" },
  // Miami (coming soon)
  { x: 25, y: 38, active: false, label: "Miami, Florida" },
  // Dallas (coming soon)
  { x: 22, y: 35, active: false, label: "Dallas, Texas" },
  // Paris (coming soon)
  { x: 49, y: 27, active: false, label: "Paris, Francia" },
  // Helsinki (coming soon)
  { x: 53, y: 20, active: false, label: "Helsinki, Finlandia" },
  // Singapore (coming soon)
  { x: 73, y: 50, active: false, label: "Singapur" },
  // Sydney (coming soon)
  { x: 83, y: 70, active: false, label: "Sydney, Australia" },
]

/* ── Component ── */
export function GameServerHostingContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </div>

      {/* Hero */}
      <section className="pt-36 pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs font-medium text-muted-foreground mb-3">
            {"Confiado por 10,000+ clientes"}
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Hosting de Servidores de Juegos a Precios Increibles
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            {"Ofrecemos el mejor hosting de servidores de juegos a los precios mas bajos. Busca tu juego favorito y comienza en 5 minutos o menos."}
          </p>
        </div>
      </section>

      {/* Popular Games */}
      <section className="pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <h2
            className="text-2xl font-bold text-foreground mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Juegos Populares
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {popularGames.map((game) => (
              <GameCard key={game.name} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* All Games */}
      <section className="pb-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <h2
            className="text-2xl font-bold text-foreground mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Todos los Juegos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {allGames.map((game) => (
              <GameCard key={game.name} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(180deg, #0d0d0d 0%, #111116 50%, #0d0d0d 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p
            className="text-sm font-bold tracking-widest text-primary uppercase mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            VENTAJAS LIDERES EN LA INDUSTRIA
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-14 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Con funciones exclusivas que no encontraras en otro lugar.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {perks.map((perk) => {
              const Icon = perk.icon
              return (
                <div key={perk.title} className="flex flex-col items-center">
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
                    style={{ background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.2)" }}
                  >
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3
                    className="text-lg font-bold text-foreground mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {perk.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {perk.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nuestras Ubicaciones
            </h2>
            <p className="text-muted-foreground text-lg">
              Disfruta de una amplia gama de ubicaciones internacionales
            </p>
          </div>

          {/* World Map */}
          <div
            className="relative w-full rounded-xl mb-10 overflow-hidden"
            style={{
              background: "#111116",
              border: "1px solid rgba(255,255,255,0.06)",
              aspectRatio: "2.2 / 1",
            }}
          >
            {/* Dot grid world map background */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <svg viewBox="0 0 100 60" className="w-full h-full opacity-30">
                {/* Simplified world map dots */}
                {generateWorldMapDots().map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.x}
                    cy={dot.y}
                    r={0.35}
                    fill="#4a4a4a"
                  />
                ))}
              </svg>
            </div>

            {/* Location dots */}
            {mapDots.map((dot, i) => (
              <div
                key={i}
                className="absolute z-10"
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setHoveredDot(i)}
                onMouseLeave={() => setHoveredDot(null)}
              >
                {/* Pulse animation for active */}
                {dot.active && (
                  <div
                    className="absolute w-6 h-6 rounded-full"
                    style={{
                      background: "rgba(245,166,35,0.3)",
                      animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
                <div
                  className="relative w-3 h-3 rounded-full cursor-pointer transition-transform hover:scale-150"
                  style={{
                    background: dot.active ? "#f5a623" : "#666",
                    boxShadow: dot.active
                      ? "0 0 10px rgba(245,166,35,0.6)"
                      : "0 0 6px rgba(100,100,100,0.3)",
                  }}
                />
                {/* Tooltip */}
                {hoveredDot === i && (
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap z-20"
                    style={{
                      background: dot.active ? "#f5a623" : "#333",
                      color: dot.active ? "#0d0d0d" : "#ccc",
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3" />
                      {dot.label}
                    </div>
                    <p className="text-[10px] mt-0.5" style={{ color: dot.active ? "#0d0d0d" : "#22c55e" }}>
                      {dot.active ? "Disponible" : "Proximamente"}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Location grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 rounded-xl p-6"
            style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {locationRegions.map((region) => (
              <div key={region.region}>
                <h3
                  className="text-base font-bold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {region.region}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {region.locations.map((loc) => (
                    <div
                      key={loc.city}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm"
                      style={{
                        background: loc.status === "active" ? "#f5a623" : "transparent",
                        color: loc.status === "active" ? "#0d0d0d" : "#c0c0c0",
                        fontWeight: loc.status === "active" ? 600 : 400,
                      }}
                    >
                      <span className="text-base">{flagEmojis[loc.flag]}</span>
                      {loc.city}
                      {loc.status === "active" ? (
                        <span className="ml-auto text-xs font-bold" style={{ color: "#0d0d0d" }}>
                          {"|||"}
                        </span>
                      ) : (
                        <span className="ml-auto text-[10px] font-bold tracking-wider text-primary/70 italic">
                          Pronto
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Comparison */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(180deg, #0d0d0d 0%, #111116 50%, #0d0d0d 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          {/* Mobile view - cards */}
          <div className="lg:hidden flex flex-col gap-6">
            <div className="text-center mb-4">
              <h3
                className="text-xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {"Necesitas ayuda eligiendo plan?"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Compara nuestras lineas de hardware
              </p>
            </div>
            {hardwareTiers.map((tier, tierIdx) => (
              <div
                key={tier.name}
                className="rounded-xl overflow-hidden"
                style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="p-5 text-center" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <h4
                    className="text-xl font-bold italic"
                    style={{ fontFamily: "var(--font-heading)", color: tier.nameColor }}
                  >
                    {tier.name}
                  </h4>
                  <p
                    className="text-xl font-bold italic"
                    style={{ fontFamily: "var(--font-heading)", color: tier.nameColor }}
                  >
                    Hardware
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{tier.description}</p>
                </div>
                <div className="flex flex-col">
                  {hardwareSpecs.map((spec) => {
                    const Icon = spec.icon
                    return (
                      <div
                        key={spec.label}
                        className="flex items-center gap-3 px-5 py-3.5"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      >
                        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-xs text-muted-foreground shrink-0 w-16">{spec.label}</span>
                        <span className="text-sm text-foreground/80">{spec.values[tierIdx]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view - table */}
          <div
            className="hidden lg:block rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Header row */}
            <div className="grid grid-cols-4" style={{ background: "#111116" }}>
              <div className="p-6 flex flex-col justify-center">
                <h3
                  className="text-xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {"Necesitas ayuda eligiendo plan?"}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Compara nuestras lineas de hardware
                </p>
              </div>
              {hardwareTiers.map((tier) => (
                <div key={tier.name} className="p-6 text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  <h4
                    className="text-xl font-bold italic"
                    style={{ fontFamily: "var(--font-heading)", color: tier.nameColor }}
                  >
                    {tier.name}
                  </h4>
                  <h4
                    className="text-xl font-bold italic"
                    style={{ fontFamily: "var(--font-heading)", color: tier.nameColor }}
                  >
                    Hardware
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2">{tier.description}</p>
                </div>
              ))}
            </div>
            {/* Spec rows */}
            {hardwareSpecs.map((spec) => {
              const Icon = spec.icon
              return (
                <div
                  key={spec.label}
                  className="grid grid-cols-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="p-5 flex items-center gap-3" style={{ background: "#0f0f13" }}>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-sm text-foreground">{spec.label}</span>
                  </div>
                  {spec.values.map((val, i) => (
                    <div
                      key={i}
                      className="p-5 flex items-center justify-center text-sm text-muted-foreground"
                      style={{
                        background: "#0f0f13",
                        borderLeft: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {val}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Preguntas Frecuentes
            </h2>
            <p className="text-muted-foreground">
              {"No encuentras lo que buscas? "}
              <Link href="/contacto" className="text-primary hover:underline">
                Contacta a soporte
              </Link>
            </p>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden"
                style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 text-sm font-bold"
                    style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623" }}
                  >
                    ?
                  </span>
                  <span className="font-semibold text-foreground text-sm flex-1">
                    {item.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 pl-17">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Center */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(180deg, #0d0d0d 0%, #111116 50%, #0d0d0d 100%)" }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/3">
              <p
                className="text-sm font-bold tracking-widest text-primary uppercase mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                CENTRO DE RECURSOS
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {"Tienes mas preguntas que necesitan respuesta?"}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {"Consulta nuestros articulos de conocimiento y publicaciones del blog. Tambien puedes "}
                <Link href="/contacto" className="text-primary hover:underline">
                  contactar a nuestro equipo de soporte
                </Link>
                {" para asistencia adicional."}
              </p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, label: "Base de Conocimiento", href: "/proximamente" },
                { icon: BarChart3, label: "Estado del Servicio", href: "/proximamente" },
                { icon: FileText, label: "Blog", href: "/proximamente" },
              ].map((resource) => {
                const Icon = resource.icon
                return (
                  <Link
                    key={resource.label}
                    href={resource.href}
                    className="group flex flex-col items-center justify-center rounded-xl p-8 transition-all duration-300 hover:border-primary/30"
                    style={{ background: "#161619", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "rgba(245,166,35,0.12)",
                        border: "1px solid rgba(245,166,35,0.2)",
                      }}
                    >
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground text-sm">{resource.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(245,166,35,0.08) 0%, #111116 50%, rgba(245,166,35,0.04) 100%)",
              border: "1px solid rgba(245,166,35,0.15)",
            }}
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <p className="text-muted-foreground mb-2 text-sm uppercase tracking-wider">
                  {"Aun no estas convencido?"}
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {"Prueba una "}
                  <span className="text-primary">prueba gratuita</span>
                  {" de 24 horas sin riesgo!"}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-lg">
                  Elige el juego que quieres alojar, luego prueba nuestro servicio. Puedes cancelar en cualquier momento.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link
                    href="/proximamente"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    Comenzar Sin Riesgo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/proximamente"
                    className="inline-flex items-center justify-center border border-border text-foreground font-semibold px-6 py-3 rounded-lg hover:bg-card transition-colors text-sm"
                  >
                    Productos Soportados
                  </Link>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-3xl flex items-center justify-center"
                  style={{
                    background: "rgba(245,166,35,0.08)",
                    border: "1px solid rgba(245,166,35,0.15)",
                  }}
                >
                  <div className="text-center">
                    <span className="text-5xl md:text-6xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                      24
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">horas gratis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

/* ── Game Card Component ── */
function GameCard({
  game,
}: {
  game: {
    name: string
    image: string
    price: string | null
    badge?: string
    badgeColor?: string
    href: string
  }
}) {
  return (
    <Link
      href={game.href}
      className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ background: "#111116", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={game.image}
          alt={game.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {game.badge && (
          <span
            className="absolute top-2 right-2 text-[10px] font-bold tracking-wider px-2 py-0.5 rounded"
            style={{
              background: `${game.badgeColor}22`,
              color: game.badgeColor,
              border: `1px solid ${game.badgeColor}44`,
            }}
          >
            {game.badge}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-3.5">
        <h3
          className="font-bold text-foreground text-sm mb-1 truncate"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {game.name}
        </h3>
        {game.price ? (
          <p className="text-xs text-muted-foreground">
            {"Desde "}
            <span className="text-primary font-semibold">{game.price}/mes</span>
          </p>
        ) : (
          <p className="text-xs italic" style={{ color: "#f5a623" }}>
            Proximamente
          </p>
        )}
      </div>
    </Link>
  )
}

/* ── World Map Dot Generator ── */
function generateWorldMapDots() {
  const dots: { x: number; y: number }[] = []

  // North America
  for (let x = 10; x < 35; x += 1.5) {
    for (let y = 12; y < 42; y += 1.5) {
      const inContinent =
        (x > 12 && x < 33 && y > 15 && y < 35) ||
        (x > 15 && x < 30 && y > 35 && y < 42) ||
        (x > 10 && x < 25 && y > 12 && y < 20)
      if (inContinent && Math.random() > 0.3) {
        dots.push({ x, y })
      }
    }
  }

  // South America
  for (let x = 20; x < 38; x += 1.5) {
    for (let y = 42; y < 58; y += 1.5) {
      const inContinent =
        (x > 22 && x < 36 && y > 42 && y < 50) ||
        (x > 24 && x < 34 && y > 50 && y < 58)
      if (inContinent && Math.random() > 0.3) {
        dots.push({ x, y })
      }
    }
  }

  // Europe
  for (let x = 44; x < 60; x += 1.5) {
    for (let y = 12; y < 35; y += 1.5) {
      const inContinent = x > 44 && x < 58 && y > 14 && y < 33
      if (inContinent && Math.random() > 0.3) {
        dots.push({ x, y })
      }
    }
  }

  // Africa
  for (let x = 44; x < 62; x += 1.5) {
    for (let y = 33; y < 55; y += 1.5) {
      const inContinent =
        (x > 46 && x < 60 && y > 33 && y < 45) ||
        (x > 48 && x < 58 && y > 45 && y < 55)
      if (inContinent && Math.random() > 0.3) {
        dots.push({ x, y })
      }
    }
  }

  // Asia
  for (let x = 55; x < 85; x += 1.5) {
    for (let y = 10; y < 45; y += 1.5) {
      const inContinent =
        (x > 57 && x < 83 && y > 12 && y < 35) ||
        (x > 60 && x < 80 && y > 35 && y < 45) ||
        (x > 55 && x < 70 && y > 10 && y < 20)
      if (inContinent && Math.random() > 0.35) {
        dots.push({ x, y })
      }
    }
  }

  // Oceania
  for (let x = 75; x < 92; x += 1.5) {
    for (let y = 50; y < 58; y += 1.5) {
      const inContinent = x > 77 && x < 90 && y > 51 && y < 57
      if (inContinent && Math.random() > 0.35) {
        dots.push({ x, y })
      }
    }
  }

  return dots
}

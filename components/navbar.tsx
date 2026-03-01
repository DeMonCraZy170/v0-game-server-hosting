"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Menu, X, Zap, HelpCircle, BookOpen, ArrowRight, Gamepad2, Sword, TreePine, Pickaxe, Flame, Bug, Shield, Rocket, Globe, Mountain, Skull, Factory, Compass, Crosshair, Swords, Server, Cpu, HardDrive, Monitor, GlobeLock, ArrowRightLeft, Bot, Package, MessageCircle, Activity, ShieldCheck, Building, Users, Briefcase, Palette, Gift, Handshake, HeadphonesIcon } from "lucide-react"
import Image from "next/image"

/* ── Minecraft Hosting mega-dropdown cards ── */
const minecraftCards = [
  {
    label: "Java Edition",
    href: "/minecraft",
    image: "/images/dropdown-java.jpg",
    borderColor: "#f59e0b",
    badge: "NUEVA ACTUALIZACION!",
    badgeColor: "#ef4444",
  },
  {
    label: "Bedrock Edition",
    href: "/minecraft/bedrock",
    image: "/images/dropdown-bedrock.jpg",
    borderColor: "#6b7280",
    badge: "NUEVA ACTUALIZACION!",
    badgeColor: "#ef4444",
  },
  {
    label: "Modded Hosting",
    href: "/minecraft/modded",
    image: "/images/dropdown-modded.jpg",
    borderColor: "#ef4444",
    badge: "NUEVA ACTUALIZACION!",
    badgeColor: "#ef4444",
  },
  {
    label: "Budget Hosting",
    href: "/minecraft/budget",
    image: "/images/dropdown-budget.jpg",
    borderColor: "#22c55e",
    badge: "NUEVA ACTUALIZACION!",
    badgeColor: "#ef4444",
  },
]

/* ── Game Hosting mega-dropdown data ── */
const gameNewReleases = [
  { label: "Palworld", href: "/game-server-hosting/palworld", icon: Globe, badge: "NUEVO!", badgeColor: "#f5a623" },
  { label: "Enshrouded", href: "/game-server-hosting/enshrouded", icon: Flame, badge: "NUEVO!", badgeColor: "#f5a623" },
  { label: "Soulmask", href: "/proximamente", icon: Skull, badge: "NUEVO!", badgeColor: "#f5a623" },
]

const gamePopular = [
  { label: "Rust", href: "/game-server-hosting/rust", icon: Shield, badge: "NUEVA ACT!", badgeColor: "#ef4444" },
  { label: "Valheim", href: "/game-server-hosting/valheim", icon: Sword },
  { label: "Unturned", href: "/game-server-hosting/unturned", icon: Bug },
  { label: "Terraria", href: "/game-server-hosting/terraria", icon: Pickaxe, badge: "NUEVA ACT!", badgeColor: "#ef4444" },
  { label: "DayZ", href: "/game-server-hosting/dayz", icon: Crosshair },
  { label: "Project Zomboid", href: "/game-server-hosting/project-zomboid", icon: Skull },
  { label: "Garry's Mod", href: "/game-server-hosting/garrys-mod", icon: Gamepad2 },
  { label: "7 Days to Die", href: "/game-server-hosting/7-days-to-die", icon: Swords },
  { label: "Ark: Survival", href: "/game-server-hosting/ark-survival-evolved", icon: Mountain },
  { label: "Satisfactory", href: "/game-server-hosting/satisfactory", icon: Factory },
  { label: "Astroneer", href: "/proximamente", icon: Rocket },
  { label: "Factorio", href: "/game-server-hosting/factorio", icon: Compass },
]

/* ── Cloud Hosting mega-dropdown data ── */
const cloudSolutions = [
  { label: "Servidores Dedicados", href: "/proximamente", icon: Server, comingSoon: true },
  { label: "VPS Premium", href: "/proximamente", icon: Cpu, comingSoon: true },
  { label: "VPS Economico", href: "/proximamente", icon: HardDrive, comingSoon: true },
]

const websiteSolutions = [
  { label: "Hosting Web", href: "/proximamente", icon: Monitor, comingSoon: true },
  { label: "Registrar Dominio", href: "/proximamente", icon: GlobeLock, comingSoon: true },
  { label: "Transferir Dominio", href: "/proximamente", icon: ArrowRightLeft, comingSoon: true },
]

const otherHosting = [
  { label: "Hosting de Bots", href: "/proximamente", icon: Bot, comingSoon: true },
  { label: "Hosting Combinado", href: "/proximamente", icon: Package, comingSoon: true },
]

/* ── Resources mega-dropdown data ── */
const resourcesAssistance = [
  { label: "Contactanos", href: "/contacto", icon: MessageCircle },
  { label: "Estado del Servicio", href: "/proximamente", icon: Activity },
]

const resourcesInfo = [
  { label: "Proteccion DDoS", href: "/ddos-protection", icon: ShieldCheck },
  { label: "Hardware y Ubicaciones", href: "/proximamente", icon: Building },
]

/* ── More mega-dropdown data ── */
const moreCompany = [
  { label: "Sobre Nosotros", href: "/proximamente", icon: Users, comingSoon: true },
  { label: "Empleos y Carreras", href: "/proximamente", icon: Briefcase, comingSoon: true },
  { label: "Nuestra Marca", href: "/proximamente", icon: Palette, comingSoon: true },
]

const morePrograms = [
  { label: "Programa de Afiliados", href: "/proximamente", icon: Gift, comingSoon: true },
  { label: "Programa de Socios", href: "/proximamente", icon: Handshake, comingSoon: true },
]

const moreSupport = [
  { label: "Contactanos", href: "/contacto", icon: HeadphonesIcon },
]

/* ── Standard dropdown items ── */
const navItems = [
  {
    label: "Hosting Minecraft",
    hasDropdown: true,
    isMega: true,
    megaType: "minecraft" as const,
    items: [],
  },
  {
    label: "Hosting de Juegos",
    hasDropdown: true,
    isMega: true,
    megaType: "games" as const,
    items: [],
  },
  {
    label: "Cloud Hosting",
    hasDropdown: true,
    isMega: true,
    megaType: "cloud" as const,
    items: [],
  },
  {
    label: "Recursos",
    hasDropdown: true,
    isMega: true,
    megaType: "resources" as const,
    items: [],
  },
  {
    label: "Mas",
    hasDropdown: true,
    isMega: true,
    megaType: "more" as const,
    items: [],
  },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }

  return (
    <>
      <nav
        className={`transition-all duration-300 ${
          scrolled || openDropdown === "Hosting Minecraft" || openDropdown === "Hosting de Juegos" || openDropdown === "Cloud Hosting" || openDropdown === "Recursos" || openDropdown === "Mas"
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Zap className="h-9 w-9 text-primary" />
            <span
              className="text-2xl font-extrabold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              FORZA <span className="text-primary">HOST</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-[15px] font-semibold transition-colors rounded-lg hover:bg-secondary ${
                    openDropdown === item.label ? "text-primary" : "text-foreground/90 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {item.label === "Cloud Hosting" && (
                    <span className="text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary/20 text-primary ml-1">
                      PRONTO
                    </span>
                  )}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Standard dropdown */}
                {item.hasDropdown && !item.isMega && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-xl py-2 z-50">
                    {item.items?.map((subItem) => (
                      <a
                        key={subItem}
                        href="/proximamente"
                        className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="p-2 text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
              <BookOpen className="h-5 w-5" />
            </button>
            <button className="p-2 text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* ── Minecraft Hosting Mega Dropdown ── */}
      <div
        className={`hidden lg:block overflow-hidden transition-all duration-300 ease-in-out ${
          openDropdown === "Hosting Minecraft"
            ? "max-h-[200px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{
          background: scrolled
            ? "rgba(13,13,13,0.95)"
            : "linear-gradient(to bottom, rgba(13,13,13,0.85), rgba(13,13,13,0.7))",
          backdropFilter: "blur(12px)",
        }}
        onMouseEnter={() => handleMouseEnter("Hosting Minecraft")}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-4 gap-4">
            {minecraftCards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                className="group relative block h-[100px] rounded-lg overflow-hidden transition-transform duration-200 hover:scale-[1.03]"
                style={{
                  borderLeft: `4px solid ${card.borderColor}`,
                }}
              >
                {/* Background image */}
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 bg-black/50 group-hover:bg-black/35 transition-colors duration-200"
                />
                {/* Badge */}
                <div className="absolute top-2 right-2 z-[2]">
                  <span
                    className="text-[10px] font-bold text-white px-2 py-0.5 rounded"
                    style={{ background: card.badgeColor }}
                  >
                    {card.badge}
                  </span>
                </div>
                {/* Label */}
                <div className="absolute inset-0 flex items-center justify-center z-[1]">
                  <span className="text-lg font-extrabold text-white tracking-wide drop-shadow-lg">
                    {card.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Game Hosting Mega Dropdown ── */}
      <div
        className={`hidden lg:block overflow-hidden transition-all duration-300 ease-in-out ${
          openDropdown === "Hosting de Juegos"
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{
          background: scrolled
            ? "rgba(13,13,13,0.97)"
            : "linear-gradient(to bottom, rgba(13,13,13,0.95), rgba(13,13,13,0.85))",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        onMouseEnter={() => handleMouseEnter("Hosting de Juegos")}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-10">
            {/* New Releases column */}
            <div className="shrink-0">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Nuevos Lanzamientos
              </h4>
              <div className="flex flex-col gap-1">
                {gameNewReleases.map((game) => {
                  const Icon = game.icon
                  return (
                    <a
                      key={game.label}
                      href={game.href}
                      className="group/game flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/game:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/game:text-foreground transition-colors">
                        {game.label}
                      </span>
                      {game.badge && (
                        <span
                          className="text-[10px] font-bold text-background px-1.5 py-0.5 rounded ml-1"
                          style={{ background: game.badgeColor }}
                        >
                          {game.badge}
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-border/50 self-stretch" />

            {/* Popular Games columns */}
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Juegos Populares
              </h4>
              <div className="grid grid-cols-4 gap-x-2 gap-y-1">
                {gamePopular.map((game) => {
                  const Icon = game.icon
                  return (
                    <a
                      key={game.label}
                      href={game.href}
                      className="group/game flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/game:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/game:text-foreground transition-colors whitespace-nowrap">
                        {game.label}
                      </span>
                      {game.badge && (
                        <span
                          className="text-[10px] font-bold text-background px-1.5 py-0.5 rounded ml-1 shrink-0"
                          style={{ background: game.badgeColor }}
                        >
                          {game.badge}
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* View all games link */}
          <div className="mt-5 pt-4 border-t border-border/40 flex justify-center">
            <a
              href="/game-server-hosting"
              className="group/all flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
            >
              Ver todos los juegos
              <ArrowRight className="h-4 w-4 transition-transform group-hover/all:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Cloud Hosting Mega Dropdown ── */}
      <div
        className={`hidden lg:block overflow-hidden transition-all duration-300 ease-in-out ${
          openDropdown === "Cloud Hosting"
            ? "max-h-[300px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{
          background: scrolled
            ? "rgba(13,13,13,0.97)"
            : "linear-gradient(to bottom, rgba(13,13,13,0.95), rgba(13,13,13,0.85))",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        onMouseEnter={() => handleMouseEnter("Cloud Hosting")}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-10">
            {/* Cloud Solutions column */}
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Soluciones Cloud
              </h4>
              <div className="flex flex-col gap-1">
                {cloudSolutions.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group/cloud flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/cloud:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/cloud:text-foreground transition-colors">
                        {item.label}
                      </span>
                      {item.comingSoon && (
                        <span className="text-[9px] font-bold tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded ml-auto shrink-0">
                          PROXIMAMENTE
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-border/50 self-stretch" />

            {/* Website Solutions column */}
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Soluciones Web
              </h4>
              <div className="flex flex-col gap-1">
                {websiteSolutions.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group/web flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/web:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/web:text-foreground transition-colors">
                        {item.label}
                      </span>
                      {item.comingSoon && (
                        <span className="text-[9px] font-bold tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded ml-auto shrink-0">
                          PROXIMAMENTE
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-border/50 self-stretch" />

            {/* Other Hosting column */}
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Otro Hosting
              </h4>
              <div className="flex flex-col gap-1">
                {otherHosting.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group/other flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/other:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/other:text-foreground transition-colors">
                        {item.label}
                      </span>
                      {item.comingSoon && (
                        <span className="text-[9px] font-bold tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded ml-auto shrink-0">
                          PROXIMAMENTE
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Resources Mega Dropdown ── */}
      <div
        className={`hidden lg:block overflow-hidden transition-all duration-300 ease-in-out ${
          openDropdown === "Recursos"
            ? "max-h-[250px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{
          background: scrolled
            ? "rgba(13,13,13,0.97)"
            : "linear-gradient(to bottom, rgba(13,13,13,0.95), rgba(13,13,13,0.85))",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        onMouseEnter={() => handleMouseEnter("Recursos")}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-10">
            {/* Assistance column */}
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Asistencia
              </h4>
              <div className="flex flex-col gap-1">
                {resourcesAssistance.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group/res flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/res:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/res:text-foreground transition-colors">
                        {item.label}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-border/50 self-stretch" />

            {/* Information column */}
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Informacion
              </h4>
              <div className="flex flex-col gap-1">
                {resourcesInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group/info flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/info:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/info:text-foreground transition-colors">
                        {item.label}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── More Mega Dropdown ── */}
      <div
        className={`hidden lg:block overflow-hidden transition-all duration-300 ease-in-out ${
          openDropdown === "Mas"
            ? "max-h-[280px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{
          background: scrolled
            ? "rgba(13,13,13,0.97)"
            : "linear-gradient(to bottom, rgba(13,13,13,0.95), rgba(13,13,13,0.85))",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        onMouseEnter={() => handleMouseEnter("Mas")}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-10">
            {/* Company column */}
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Compania
              </h4>
              <div className="flex flex-col gap-1">
                {moreCompany.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group/more flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/more:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/more:text-foreground transition-colors">
                        {item.label}
                      </span>
                      {item.comingSoon && (
                        <span className="text-[9px] font-bold tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded ml-auto shrink-0">
                          PROXIMAMENTE
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-border/50 self-stretch" />

            {/* Programs column */}
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Programas
              </h4>
              <div className="flex flex-col gap-1">
                {morePrograms.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group/prog flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/prog:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/prog:text-foreground transition-colors">
                        {item.label}
                      </span>
                      {item.comingSoon && (
                        <span className="text-[9px] font-bold tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded ml-auto shrink-0">
                          PROXIMAMENTE
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-border/50 self-stretch" />

            {/* Support column */}
            <div className="flex-1">
              <h4
                className="text-sm font-bold text-foreground mb-4 tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Soporte
              </h4>
              <div className="flex flex-col gap-1">
                {moreSupport.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group/sup flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <span className="flex items-center justify-center w-7 h-7 rounded-md bg-secondary text-muted-foreground group-hover/sup:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-foreground/90 group-hover/sup:text-foreground transition-colors">
                        {item.label}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4">
          {navItems.map((item) => (
            <div key={item.label} className="py-2">
              <button
                className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() =>
                  setOpenDropdown(openDropdown === item.label ? null : item.label)
                }
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {openDropdown === item.label && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  {item.isMega && item.megaType === "minecraft"
                    ? minecraftCards.map((card) => (
                        <a
                          key={card.label}
                          href={card.href}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {card.label}
                        </a>
                      ))
                    : item.isMega && item.megaType === "games"
                    ? [...gameNewReleases, ...gamePopular].map((game) => (
                        <a
                          key={game.label}
                          href={game.href}
                          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                        >
                          {game.label}
                          {game.badge && (
                            <span
                              className="text-[9px] font-bold text-background px-1 py-0.5 rounded"
                              style={{ background: game.badgeColor }}
                            >
                              {game.badge}
                            </span>
                          )}
                        </a>
                      ))
                    : item.isMega && item.megaType === "cloud"
                    ? [...cloudSolutions, ...websiteSolutions, ...otherHosting].map((cloudItem) => (
                        <a
                          key={cloudItem.label}
                          href={cloudItem.href}
                          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                        >
                          <cloudItem.icon className="h-3.5 w-3.5" />
                          {cloudItem.label}
                          {cloudItem.comingSoon && (
                            <span className="text-[8px] font-bold tracking-wider text-primary bg-primary/15 px-1 py-0.5 rounded">
                              PRONTO
                            </span>
                          )}
                        </a>
                      ))
                    : item.isMega && item.megaType === "resources"
                    ? [...resourcesAssistance, ...resourcesInfo].map((resItem) => (
                        <a
                          key={resItem.label}
                          href={resItem.href}
                          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                        >
                          <resItem.icon className="h-3.5 w-3.5" />
                          {resItem.label}
                        </a>
                      ))
                    : item.isMega && item.megaType === "more"
                    ? [...moreCompany, ...morePrograms, ...moreSupport].map((moreItem) => (
                        <a
                          key={moreItem.label}
                          href={moreItem.href}
                          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                        >
                          <moreItem.icon className="h-3.5 w-3.5" />
                          {moreItem.label}
                          {moreItem.comingSoon && (
                            <span className="text-[8px] font-bold tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded ml-auto shrink-0">
                              PROXIMAMENTE
                            </span>
                          )}
                        </a>
                      ))
                    : item.items?.map((subItem) => (
                        <a
                          key={subItem}
                          href="/proximamente"
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {subItem}
                        </a>
                      ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

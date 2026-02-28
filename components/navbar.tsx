"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Menu, X, Zap, HelpCircle, BookOpen } from "lucide-react"
import Image from "next/image"

/* ── Minecraft Hosting mega-dropdown cards ── */
const minecraftCards = [
  {
    label: "Java Edition",
    href: "#",
    image: "/images/dropdown-java.jpg",
    borderColor: "#f59e0b",
    badge: "NUEVA ACTUALIZACION!",
    badgeColor: "#ef4444",
  },
  {
    label: "Bedrock Edition",
    href: "#",
    image: "/images/dropdown-bedrock.jpg",
    borderColor: "#6b7280",
    badge: "NUEVA ACTUALIZACION!",
    badgeColor: "#ef4444",
  },
  {
    label: "Modded Hosting",
    href: "#",
    image: "/images/dropdown-modded.jpg",
    borderColor: "#ef4444",
    badge: "NUEVA ACTUALIZACION!",
    badgeColor: "#ef4444",
  },
  {
    label: "Budget Hosting",
    href: "#",
    image: "/images/dropdown-budget.jpg",
    borderColor: "#22c55e",
    badge: "NUEVA ACTUALIZACION!",
    badgeColor: "#ef4444",
  },
]

/* ── Standard dropdown items ── */
const navItems = [
  {
    label: "Hosting Minecraft",
    hasDropdown: true,
    isMega: true,
    items: [],
  },
  {
    label: "Hosting de Juegos",
    hasDropdown: true,
    isMega: false,
    items: ["Valheim", "Terraria", "Satisfactory", "Factorio", "Astroneer", "Unturned"],
  },
  {
    label: "Cloud Hosting",
    hasDropdown: true,
    isMega: false,
    items: ["VPS KVM", "Servidor Dedicado", "Hosting Web"],
  },
  {
    label: "Recursos",
    hasDropdown: true,
    isMega: false,
    items: ["Base de Conocimiento", "Blog", "Estado del Servicio"],
  },
  {
    label: "Mas",
    hasDropdown: true,
    isMega: false,
    items: ["Sobre Nosotros", "Contacto", "Programa de Afiliados"],
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
          scrolled || openDropdown === "Hosting Minecraft"
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
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
                        href="#"
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
                  {item.isMega
                    ? minecraftCards.map((card) => (
                        <a
                          key={card.label}
                          href={card.href}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {card.label}
                        </a>
                      ))
                    : item.items?.map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
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

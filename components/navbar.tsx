"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Menu, X, Zap, HelpCircle, BookOpen } from "lucide-react"

const navItems = [
  {
    label: "Hosting Minecraft",
    hasDropdown: true,
    items: ["Minecraft Java", "Minecraft Bedrock", "Modpacks"],
  },
  {
    label: "Hosting de Juegos",
    hasDropdown: true,
    items: ["Valheim", "Terraria", "Satisfactory", "Factorio", "Astroneer", "Unturned"],
  },
  {
    label: "Cloud Hosting",
    hasDropdown: true,
    items: ["VPS KVM", "Servidor Dedicado", "Hosting Web"],
  },
  {
    label: "Recursos",
    hasDropdown: true,
    items: ["Base de Conocimiento", "Blog", "Estado del Servicio"],
  },
  {
    label: "Mas",
    hasDropdown: true,
    items: ["Sobre Nosotros", "Contacto", "Programa de Afiliados"],
  },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            FORZA <span className="text-primary">HOST</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
              </button>
              {item.hasDropdown && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-lg shadow-xl py-2 z-50">
                  {item.items?.map((subItem) => (
                    <a
                      key={subItem}
                      href="#"
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
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
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
            <BookOpen className="h-5 w-5" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 py-4">
          {navItems.map((item) => (
            <div key={item.label} className="py-2">
              <button
                className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                )}
              </button>
              {item.hasDropdown && openDropdown === item.label && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  {item.items?.map((subItem) => (
                    <a key={subItem} href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}

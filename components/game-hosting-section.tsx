"use client"

import Image from "next/image"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"
import { useRef, useState, useEffect, useCallback } from "react"

const hostingCategories = [
  {
    icon: "/images/icon-dayz.jpg",
    iconWidth: 70,
    iconHeight: 70,
    title: "DayZ",
    subtitle: "Hosting",
    description:
      "Servidores DayZ de alto rendimiento con proteccion DDoS y soporte 24/7 para la mejor experiencia de supervivencia.",
    features: ["Alto Rendimiento", "Proteccion DDoS", "Soporte 24/7"],
    cta: "Encontrar Mi Hosting DayZ",
    href: "/game-server-hosting/dayz",
    accentColor: "#ef4444",
    accentGlow: "rgba(239,68,68,0.5)",
    buttonBg: "linear-gradient(135deg, #dc2626, #ef4444, #f87171)",
    dotColor: "#ef4444",
    dotGlow: "rgba(239,68,68,0.5)",
    hot: true,
  },
  {
    icon: "/images/icon-minecraft.avif",
    iconWidth: 60,
    iconHeight: 60,
    title: "Minecraft",
    subtitle: "Hosting",
    description:
      "99.9% de uptime respaldado por soporte 24/7 y la confianza de mas de 1500+ resenas de 5 estrellas.",
    features: ["Mejor Precio", "Hardware Potente", "Facil de Usar"],
    cta: "Encontrar Mi Hosting Minecraft",
    href: "/minecraft",
    accentColor: "#22c55e",
    accentGlow: "rgba(34,197,94,0.5)",
    buttonBg: "linear-gradient(135deg, #16a34a, #22c55e, #4ade80)",
    dotColor: "#22c55e",
    dotGlow: "rgba(34,197,94,0.5)",
  },
  {
    icon: "/images/icon-gamehosting.avif",
    iconWidth: 140,
    iconHeight: 90,
    title: "Hosting de",
    subtitle: "Juegos",
    description:
      "Obtiene hosting de juegos mas potente por menos de lo que pagarias en cualquier otro lugar.",
    features: ["30+ Juegos Disponibles", "Soporte Experto 24/7", "Facil Configuracion"],
    cta: "Elegir Mi Hosting de Juegos",
    href: "/game-server-hosting",
    accentColor: "#a855f7",
    accentGlow: "rgba(168,85,247,0.5)",
    buttonBg: "linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)",
    dotColor: "#a855f7",
    dotGlow: "rgba(168,85,247,0.5)",
  },
  {
    icon: "/images/icon-cs16.jpg",
    iconWidth: 70,
    iconHeight: 70,
    title: "Counter-Strike",
    subtitle: "1.6 Hosting",
    description:
      "El legendario shooter tactico que definio una generacion. Servidores con AMX Mod X y modos clasicos.",
    features: ["AMX Mod X", "Baja Latencia", "Mods Clasicos"],
    cta: "Ver Planes CS 1.6",
    href: "/game-server-hosting/cs16",
    accentColor: "#f97316",
    accentGlow: "rgba(249,115,22,0.5)",
    buttonBg: "linear-gradient(135deg, #ea580c, #f97316, #fb923c)",
    dotColor: "#f97316",
    dotGlow: "rgba(249,115,22,0.5)",
    hot: true,
  },
  {
    icon: "/images/icon-cssource.jpg",
    iconWidth: 70,
    iconHeight: 70,
    title: "CS: Source",
    subtitle: "Hosting",
    description:
      "La evolucion del clasico con el motor Source. SourceMod, Zombie Escape, Surf y mas.",
    features: ["SourceMod", "Workshop Steam", "Modos Custom"],
    cta: "Ver Planes CS:Source",
    href: "/game-server-hosting/cssource",
    accentColor: "#06b6d4",
    accentGlow: "rgba(6,182,212,0.5)",
    buttonBg: "linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)",
    dotColor: "#06b6d4",
    dotGlow: "rgba(6,182,212,0.5)",
    hot: true,
  },
  {
    icon: "/images/icon-fivem.jpg",
    iconWidth: 70,
    iconHeight: 70,
    title: "FiveM",
    subtitle: "Hosting",
    description:
      "Servidores FiveM personalizados con recursos ilimitados y la mejor latencia para tu comunidad GTA.",
    features: ["Recursos Ilimitados", "Baja Latencia", "Panel Personalizado"],
    cta: "Proximamente",
    href: "/proximamente",
    accentColor: "#f59e0b",
    accentGlow: "rgba(245,158,11,0.5)",
    buttonBg: "linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)",
    dotColor: "#f59e0b",
    dotGlow: "rgba(245,158,11,0.5)",
    comingSoon: true,
  },
  {
    icon: "/images/icon-ragemp.jpg",
    iconWidth: 70,
    iconHeight: 70,
    title: "Rage MP",
    subtitle: "Hosting",
    description:
      "Hosting dedicado para servidores Rage MP con rendimiento optimizado y soporte tecnico especializado.",
    features: ["Rendimiento Optimizado", "Soporte Especializado", "Alta Disponibilidad"],
    cta: "Ver Planes",
    href: "/game-server-hosting/ragemp",
    accentColor: "#e11d48",
    accentGlow: "rgba(225,29,72,0.5)",
    buttonBg: "linear-gradient(135deg, #be123c, #e11d48, #fb7185)",
    dotColor: "#e11d48",
    dotGlow: "rgba(225,29,72,0.5)",
    comingSoon: false,
  },
  {
    icon: "/images/icon-cloud.avif",
    iconWidth: 90,
    iconHeight: 90,
    title: "Cloud",
    subtitle: "Hosting",
    description:
      "Necesitas un sitio web? Iniciando un proyecto en la nube? Asegurate de obtener el mejor precio.",
    features: ["Flexibilidad Total", "Facil Configuracion", "Proteccion DDoS"],
    cta: "Proximamente",
    href: "/proximamente",
    accentColor: "#3b82f6",
    accentGlow: "rgba(59,130,246,0.5)",
    buttonBg: "linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa)",
    dotColor: "#3b82f6",
    dotGlow: "rgba(59,130,246,0.5)",
    comingSoon: true,
  },
]

export function GameHostingSection() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardsRef, cardsVisible] = useScrollReveal({ threshold: 0.1 })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll])

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 350
    el.scrollBy({ left: direction === "left" ? -cardWidth - 28 : cardWidth + 28, behavior: "smooth" })
  }

  return (
    <section id="games" className="pt-8 pb-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-20 transition-all duration-700 ease-out"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Hacemos hosting de servidores de juegos a precios increibles.
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {"Hemos alojado mas de "}
                <span className="text-primary font-semibold">{"100,000+ servidores"}</span>
                {" — brindando experiencias de hosting de alto rendimiento a "}
                <span className="text-primary font-semibold">{"1,000,000s de jugadores"}</span>
                {" de todo el mundo."}
              </p>
            </div>
            {/* Navigation arrows */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Anterior"
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                style={{
                  background: canScrollLeft ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                  color: canScrollLeft ? "#fff" : "#555",
                  border: `1px solid ${canScrollLeft ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}`,
                  cursor: canScrollLeft ? "pointer" : "default",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Siguiente"
                className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                style={{
                  background: canScrollRight ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                  color: canScrollRight ? "#fff" : "#555",
                  border: `1px solid ${canScrollRight ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)"}`,
                  cursor: canScrollRight ? "pointer" : "default",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Hosting cards carousel */}
        <div
          ref={(node) => {
            (cardsRef as React.MutableRefObject<HTMLDivElement | null>).current = node
            ;(scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          }}
          className="flex gap-7 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingTop: 36,
          }}
        >
          {hostingCategories.map((category, index) => (
            <a
              key={category.title}
              href={category.comingSoon ? undefined : category.href}
              data-card
              className="group relative flex flex-col rounded-xl transition-all duration-500 ease-out snap-start shrink-0"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${staggerDelay(index, 120)}ms`,
                width: "calc((100% - 56px) / 3)",
                minWidth: 290,
              }}
            >
              {/* Card border - default subtle, brighter on hover */}
              <div
                className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                style={{
                  border: `1px solid ${category.accentGlow}`,
                  boxShadow: `0 0 15px ${category.accentGlow.replace("0.5", "0.15")}, 0 0 30px ${category.accentGlow.replace("0.5", "0.05")}, 0 4px 30px rgba(0,0,0,0.3)`,
                }}
              />

              {/* Card background */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{ background: "#1a1a1f" }}
              />

              {/* Icon - overflowing above the card */}
              <div
                className="absolute z-10 left-7"
                style={{
                  top: -36,
                  width: category.iconWidth,
                  height: category.iconHeight,
                }}
              >
                <Image
                  src={category.icon}
                  alt={category.title}
                  fill
                  className="object-contain drop-shadow-lg rounded-lg"
                  sizes="140px"
                />
              </div>

              {/* Card content - with top padding to clear the icon */}
              <div className="relative z-[1] flex flex-col flex-1 pt-12 px-7 pb-7">
                {/* Title + Badges */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="text-[22px] font-bold text-foreground leading-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {category.title}
                    </h3>
                    <p
                      className="text-[22px] font-bold leading-tight mb-4 text-primary"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {category.subtitle}
                    </p>
                  </div>
                  {category.hot && (
                    <span
                      className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded mt-1 shrink-0 uppercase"
                      style={{
                        background: "rgba(239,68,68,0.15)",
                        color: "#ef4444",
                        border: "1px solid rgba(239,68,68,0.3)",
                        animation: "pulse 2s ease-in-out infinite",
                      }}
                    >
                      HOT
                    </span>
                  )}
                  {category.comingSoon && (
                    <span
                      className="text-[10px] font-bold tracking-wider px-2 py-1 rounded mt-1 shrink-0"
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

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Features with colored dots */}
                <ul className="flex flex-col gap-3 mb-6">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground/90">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          background: category.dotColor,
                          boxShadow: `0 0 6px ${category.dotGlow}`,
                        }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Spacer to push button to bottom */}
                <div className="flex-1" />
              </div>

              {/* Full-width CTA button */}
              <div
                className="relative z-[1] flex items-center justify-center rounded-b-xl px-6 py-4 text-[15px] font-bold tracking-wide transition-all duration-300"
                style={{
                  background: category.comingSoon ? "#333" : category.buttonBg,
                  color: category.comingSoon ? "#888" : "#fff",
                  pointerEvents: category.comingSoon ? "none" : "auto",
                }}
              >
                {category.cta}
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"

interface GameSlide {
  id: string
  title: string
  label: string
  badges: string[]
  cta: string
  bgImage: string
  cardImage: string
}

const gameSlides: GameSlide[] = [
  {
    id: "dedicated",
    title: "Servidor Dedicado",
    label: "SERVIDOR DEDICADO",
    badges: ["Rendimiento Maximo", "Control Total", "Mejor Precio"],
    cta: "INICIAR MI SERVIDOR DEDICADO",
    bgImage: "/images/hero-dedicated.jpg",
    cardImage: "/images/card-dedicated.jpg",
  },
  {
    id: "discord",
    title: "Hosting de Bot\nde Discord",
    label: "BOT DE DISCORD",
    badges: ["Configuracion Instantanea", "Uptime 99.9%", "Soporte 24/7"],
    cta: "INICIAR MI BOT DE DISCORD",
    bgImage: "/images/hero-discord.jpg",
    cardImage: "/images/card-discord.jpg",
  },
  {
    id: "minecraft",
    title: "Encuentra Tu\nHosting de Minecraft",
    label: "MINECRAFT",
    badges: ["Bedrock & Java", "Configuracion Instantanea", "Mejor Precio"],
    cta: "INICIAR MI SERVIDOR MINECRAFT",
    bgImage: "/images/hero-minecraft.jpg",
    cardImage: "/images/card-minecraft.jpg",
  },
  {
    id: "valheim",
    title: "Hosting de Servidores\nValheim",
    label: "VALHEIM",
    badges: ["Configuracion Instantanea", "Proteccion DDoS", "Hardware Potente"],
    cta: "INICIAR MI SERVIDOR VALHEIM",
    bgImage: "/images/hero-valheim.jpg",
    cardImage: "/images/card-valheim.jpg",
  },
  {
    id: "satisfactory",
    title: "Hosting de Servidores\nSatisfactory",
    label: "SATISFACTORY",
    badges: ["Configuracion Instantanea", "Sin Lag", "Mejor Precio"],
    cta: "INICIAR MI SERVIDOR SATISFACTORY",
    bgImage: "/images/hero-satisfactory.jpg",
    cardImage: "/images/card-satisfactory.jpg",
  },
  {
    id: "terraria",
    title: "Hosting de Servidores\nTerraria",
    label: "TERRARIA",
    badges: ["Configuracion Instantanea", "Mejor Precio", "Soporte 24/7"],
    cta: "INICIAR MI SERVIDOR TERRARIA",
    bgImage: "/images/hero-terraria.jpg",
    cardImage: "/images/card-terraria.jpg",
  },
  {
    id: "hytale",
    title: "Hosting de Servidores\nHytale",
    label: "HYTALE",
    badges: ["Configuracion Instantanea", "Proteccion DDoS", "Soporte Experto 24/7"],
    cta: "INICIAR MI SERVIDOR HYTALE",
    bgImage: "/images/hero-hytale.jpg",
    cardImage: "/images/card-hytale.jpg",
  },
  {
    id: "astroneer",
    title: "Hosting de Servidores\nAstroneer",
    label: "ASTRONEER",
    badges: ["Configuracion Instantanea", "Proteccion DDoS", "Hardware Potente"],
    cta: "INICIAR MI SERVIDOR ASTRONEER",
    bgImage: "/images/hero-astroneer.jpg",
    cardImage: "/images/card-astroneer.jpg",
  },
]

// How many cards visible at once in the right column
const VISIBLE_CARDS = 5

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(2) // Start on Minecraft
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }, [isTransitioning])

  // Auto-rotate
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gameSlides.length)
    }, 6000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Reset timer when user clicks
  const handleCardClick = useCallback((index: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    goToSlide(index)
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gameSlides.length)
    }, 6000)
  }, [goToSlide])

  const activeSlide = gameSlides[activeIndex]

  // Calculate which cards to show (centered on active with 2 above and 2 below)
  const getVisibleCards = () => {
    const cards: { slide: GameSlide; globalIndex: number }[] = []
    const half = Math.floor(VISIBLE_CARDS / 2)
    for (let i = -half; i <= half; i++) {
      const idx = ((activeIndex + i) % gameSlides.length + gameSlides.length) % gameSlides.length
      cards.push({ slide: gameSlides[idx], globalIndex: idx })
    }
    return cards
  }

  const visibleCards = getVisibleCards()

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background images - crossfade */}
      {gameSlides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === activeIndex ? 1 : 0 }}
        >
          <img
            src={slide.bgImage}
            alt=""
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/85 to-[#0d0d0d]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-[#0d0d0d]/40" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24 flex items-center min-h-[600px] lg:min-h-[700px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-8">
          {/* Left content - changes with active slide */}
          <div className="flex-1 max-w-2xl">
            <p className="text-[#a0a0a0] text-sm mb-3 tracking-wide">
              {"100,000+ Clientes Satisfechos"}
            </p>

            {/* Animated title area */}
            <div className="relative min-h-[140px] md:min-h-[180px] lg:min-h-[200px] mb-6">
              {gameSlides.map((slide, index) => (
                <h1
                  key={slide.id}
                  className="absolute top-0 left-0 text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5f5f5] leading-tight transition-all duration-500 whitespace-pre-line"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    opacity: index === activeIndex ? 1 : 0,
                    transform: index === activeIndex ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  {slide.title}
                </h1>
              ))}
            </div>

            {/* Feature badges - animated */}
            <div className="min-h-[60px] mb-8">
              <div
                className="flex flex-wrap gap-x-4 gap-y-2 transition-opacity duration-500"
                key={activeSlide.id}
              >
                {activeSlide.badges.map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-[#f5a623] shrink-0" />
                    <span className="text-sm text-[#f5f5f5]">{badge}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-[#f5a623] shrink-0" />
                  <span className="text-sm text-[#f5f5f5]">Hardware Potente</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-[#f5a623] shrink-0" />
                  <span className="text-sm text-[#f5f5f5]">Soporte 24/7</span>
                </div>
              </div>
            </div>

            {/* CTAs - animated */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center bg-[#f5a623] text-[#0d0d0d] font-bold px-6 py-3 rounded-lg hover:bg-[#f5a623]/90 transition-all duration-300 text-sm tracking-wide"
              >
                {activeSlide.cta}
              </a>
              <a
                href="#games"
                className="inline-flex items-center justify-center border border-[#2a2a2a] text-[#f5f5f5] font-semibold px-6 py-3 rounded-lg hover:bg-[#1a1a1a] transition-colors text-sm gap-2"
              >
                VER TODOS LOS JUEGOS
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right side - Vertical game card carousel */}
          <div className="hidden lg:flex flex-col gap-2.5 w-52 xl:w-56">
            {visibleCards.map(({ slide, globalIndex }) => {
              const isActive = globalIndex === activeIndex
              return (
                <button
                  key={`${slide.id}-${globalIndex}`}
                  onClick={() => handleCardClick(globalIndex)}
                  className={`relative overflow-hidden rounded-xl transition-all duration-500 text-left group ${
                    isActive
                      ? "h-24 ring-2 ring-[#f5a623] shadow-lg shadow-[#f5a623]/20"
                      : "h-16 opacity-60 hover:opacity-90"
                  }`}
                >
                  {/* Card background image */}
                  <img
                    src={slide.cardImage}
                    alt={slide.label}
                    className="absolute inset-0 w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-colors duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#0d0d0d]/70 to-[#0d0d0d]/40"
                      : "bg-[#0d0d0d]/60 group-hover:bg-[#0d0d0d]/50"
                  }`} />
                  {/* Label */}
                  <div className="relative h-full flex flex-col justify-center px-4">
                    <span className={`font-bold tracking-wider transition-all duration-300 ${
                      isActive ? "text-base text-[#f5f5f5]" : "text-xs text-[#a0a0a0] group-hover:text-[#f5f5f5]"
                    }`}>
                      {slide.label}
                    </span>
                    {isActive && (
                      <span className="text-[10px] text-[#f5a623] font-semibold tracking-widest mt-0.5">
                        HOSTING
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
        {gameSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-[#f5a623] w-6" : "bg-[#a0a0a0]/40 w-1.5"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

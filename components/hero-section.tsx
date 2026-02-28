"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

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
    title: "Servidor\nDedicado",
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
    id: "astroneer",
    title: "Hosting de Servidores\nAstroneer",
    label: "ASTRONEER",
    badges: ["Configuracion Instantanea", "Proteccion DDoS", "Hardware Potente"],
    cta: "INICIAR MI SERVIDOR ASTRONEER",
    bgImage: "/images/hero-astroneer.jpg",
    cardImage: "/images/card-astroneer.jpg",
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
]

const VISIBLE_CARDS = 5
const CARD_HEIGHT_ACTIVE = 96 // px
const CARD_HEIGHT_INACTIVE = 64 // px
const CARD_GAP = 10 // px

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(3) // Start on Minecraft
  const [prevIndex, setPrevIndex] = useState(3)
  const [bgTransitioning, setBgTransitioning] = useState(false)
  const [contentKey, setContentKey] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const totalSlides = gameSlides.length

  const startAutoRotate = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setPrevIndex((prev) => {
        const next = (prev + 1) % totalSlides
        return prev
      })
      setActiveIndex((prev) => {
        const next = (prev + 1) % totalSlides
        setPrevIndex(prev)
        setBgTransitioning(true)
        setContentKey((k) => k + 1)
        return next
      })
    }, 5000)
  }, [totalSlides])

  useEffect(() => {
    startAutoRotate()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startAutoRotate])

  // Clear bg transition flag after animation completes
  useEffect(() => {
    if (bgTransitioning) {
      const timeout = setTimeout(() => setBgTransitioning(false), 900)
      return () => clearTimeout(timeout)
    }
  }, [bgTransitioning])

  const handleCardClick = useCallback(
    (index: number) => {
      if (index === activeIndex) return
      setPrevIndex(activeIndex)
      setActiveIndex(index)
      setBgTransitioning(true)
      setContentKey((k) => k + 1)
      startAutoRotate()
    },
    [activeIndex, startAutoRotate]
  )

  const activeSlide = gameSlides[activeIndex]

  // Build the visible cards array - centered on active with items above and below
  const getVisibleCards = () => {
    const cards: { slide: GameSlide; globalIndex: number; position: number }[] = []
    const half = Math.floor(VISIBLE_CARDS / 2)
    for (let i = -half; i <= half; i++) {
      const idx =
        ((activeIndex + i) % totalSlides + totalSlides) % totalSlides
      cards.push({ slide: gameSlides[idx], globalIndex: idx, position: i })
    }
    return cards
  }

  const visibleCards = getVisibleCards()

  // Calculate total height of carousel viewport
  const carouselHeight =
    CARD_HEIGHT_ACTIVE +
    (VISIBLE_CARDS - 1) * CARD_HEIGHT_INACTIVE +
    (VISIBLE_CARDS - 1) * CARD_GAP

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* ========== Background layers with crossfade + subtle zoom ========== */}
      {gameSlides.map((slide, index) => {
        const isActive = index === activeIndex
        const wasPrev = index === prevIndex && bgTransitioning

        return (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : wasPrev ? 0 : 0,
              transition: "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: isActive ? 2 : wasPrev ? 1 : 0,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                transform: isActive && bgTransitioning ? "scale(1.05)" : "scale(1)",
                transition: "transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <Image
                src={slide.bgImage}
                alt=""
                fill
                className="object-cover"
                priority={index <= 3}
                sizes="100vw"
              />
            </div>
          </div>
        )
      })}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to right, #0d0d0d 0%, rgba(13,13,13,0.92) 25%, rgba(13,13,13,0.7) 55%, rgba(13,13,13,0.3) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, #0d0d0d 0%, transparent 40%, rgba(13,13,13,0.5) 100%)",
        }}
      />

      {/* ========== Main content ========== */}
      <div className="relative z-[4] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex items-center min-h-[600px] lg:min-h-[700px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-8 lg:gap-12">
          {/* ===== Left content ===== */}
          <div className="flex-1 max-w-2xl">
            <p className="text-[#a0a0a0] text-sm mb-4 tracking-wide">
              {"100,000+ Clientes Satisfechos"}
            </p>

            {/* Animated title */}
            <div className="relative min-h-[130px] md:min-h-[170px] lg:min-h-[200px] mb-6 overflow-hidden">
              {gameSlides.map((slide, index) => (
                <h1
                  key={slide.id}
                  className="absolute top-0 left-0 text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#f5f5f5] leading-[1.1] whitespace-pre-line"
                  style={{
                    fontFamily: "var(--font-heading)",
                    opacity: index === activeIndex ? 1 : 0,
                    transform:
                      index === activeIndex
                        ? "translateY(0)"
                        : index === prevIndex
                          ? "translateY(-30px)"
                          : "translateY(30px)",
                    transition:
                      index === activeIndex
                        ? "opacity 0.6s cubic-bezier(0.4,0,0.2,1) 0.15s, transform 0.6s cubic-bezier(0.4,0,0.2,1) 0.15s"
                        : "opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {slide.title}
                </h1>
              ))}
            </div>

            {/* Feature badges */}
            <div className="mb-8 overflow-hidden">
              <div
                key={`badges-${contentKey}`}
                className="flex flex-wrap gap-x-5 gap-y-2"
                style={{
                  animation: "fadeSlideIn 0.5s cubic-bezier(0.4,0,0.2,1) 0.2s both",
                }}
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

            {/* CTA buttons */}
            <div
              key={`cta-${contentKey}`}
              className="flex flex-col sm:flex-row gap-3"
              style={{
                animation: "fadeSlideIn 0.5s cubic-bezier(0.4,0,0.2,1) 0.3s both",
              }}
            >
              <a
                href="#"
                className="inline-flex items-center justify-center bg-[#f5a623] text-[#0d0d0d] font-bold px-6 py-3 rounded-lg hover:bg-[#e09510] transition-colors duration-200 text-sm tracking-wide"
              >
                {activeSlide.cta}
              </a>
              <a
                href="#games"
                className="inline-flex items-center justify-center border border-[#333] text-[#f5f5f5] font-semibold px-6 py-3 rounded-lg hover:bg-[#1a1a1a] transition-colors duration-200 text-sm gap-2"
              >
                VER TODOS LOS JUEGOS
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ===== Right side - Vertical sliding card carousel ===== */}
          <div
            className="hidden lg:block relative w-52 xl:w-56"
            style={{ height: carouselHeight }}
          >
            {/* Fade masks top/bottom for depth illusion */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0d0d0d]/60 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent z-10 pointer-events-none" />

            <div className="relative w-full h-full overflow-hidden">
              {visibleCards.map(({ slide, globalIndex, position }) => {
                const isActive = globalIndex === activeIndex
                // Calculate Y offset: cards above active are inactive height, active is in middle
                const half = Math.floor(VISIBLE_CARDS / 2)
                let yOffset = 0
                for (let p = -half; p < position; p++) {
                  const h = p === 0 ? CARD_HEIGHT_ACTIVE : CARD_HEIGHT_INACTIVE
                  yOffset += h + CARD_GAP
                }

                return (
                  <button
                    key={`card-${globalIndex}-${activeIndex}`}
                    onClick={() => handleCardClick(globalIndex)}
                    className="absolute left-0 w-full overflow-hidden rounded-xl text-left group"
                    style={{
                      height: isActive ? CARD_HEIGHT_ACTIVE : CARD_HEIGHT_INACTIVE,
                      top: 0,
                      transform: `translateY(${yOffset}px)`,
                      transition:
                        "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), height 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                      opacity: isActive ? 1 : 0.55,
                      zIndex: isActive ? 5 : 1,
                    }}
                  >
                    {/* Card bg image */}
                    <Image
                      src={slide.cardImage}
                      alt={slide.label}
                      fill
                      className="object-cover"
                      sizes="224px"
                    />
                    {/* Dark overlay */}
                    <div
                      className="absolute inset-0 transition-all duration-500"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(13,13,13,0.65) 0%, rgba(13,13,13,0.35) 100%)"
                          : "rgba(13,13,13,0.55)",
                      }}
                    />
                    {/* Active ring glow */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          boxShadow: "inset 0 0 0 2px #f5a623, 0 0 20px rgba(245,166,35,0.25)",
                        }}
                      />
                    )}
                    {/* Label */}
                    <div className="relative h-full flex flex-col justify-center px-4 z-[2]">
                      <span
                        className="font-bold tracking-wider transition-all duration-500"
                        style={{
                          fontSize: isActive ? "15px" : "11px",
                          color: isActive ? "#f5f5f5" : "#888",
                        }}
                      >
                        {slide.label}
                      </span>
                      <span
                        className="text-[10px] text-[#f5a623] font-semibold tracking-widest transition-all duration-500"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(-4px)",
                          marginTop: isActive ? "2px" : 0,
                        }}
                      >
                        HOSTING
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden z-[5]">
        {gameSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: index === activeIndex ? 24 : 6,
              backgroundColor: index === activeIndex ? "#f5a623" : "rgba(160,160,160,0.35)",
            }}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Keyframe animation for content */}
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

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
const CARD_H = 72
const CARD_H_ACTIVE = 100
const GAP = 8

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(3)
  const [direction, setDirection] = useState<"up" | "down">("down")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [contentVisible, setContentVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = gameSlides.length

  // Preload all background images
  useEffect(() => {
    gameSlides.forEach((slide) => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.src = slide.bgImage
    })
  }, [])

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex || isTransitioning) return
      setIsTransitioning(true)
      setDirection(nextIndex > activeIndex ? "down" : "up")

      // Fade out content first
      setContentVisible(false)

      // After short delay, switch index and fade content back in
      setTimeout(() => {
        setActiveIndex(nextIndex)
        // Let the new background start fading in, then show content
        setTimeout(() => {
          setContentVisible(true)
          setIsTransitioning(false)
        }, 200)
      }, 300)
    },
    [activeIndex, isTransitioning]
  )

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % total
    goTo(next)
  }, [activeIndex, total, goTo])

  // Auto-rotate
  const startAutoRotate = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(goNext, 5000)
  }, [goNext])

  useEffect(() => {
    startAutoRotate()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startAutoRotate])

  const handleCardClick = useCallback(
    (index: number) => {
      goTo(index)
      startAutoRotate()
    },
    [goTo, startAutoRotate]
  )

  const activeSlide = gameSlides[activeIndex]

  // Build visible card indices centered around active
  const getVisibleIndices = () => {
    const half = Math.floor(VISIBLE_CARDS / 2)
    const indices: number[] = []
    for (let i = -half; i <= half; i++) {
      indices.push(((activeIndex + i) % total + total) % total)
    }
    return indices
  }

  const visibleIndices = getVisibleIndices()
  const carouselHeight = CARD_H_ACTIVE + (VISIBLE_CARDS - 1) * CARD_H + (VISIBLE_CARDS - 1) * GAP

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] overflow-hidden">
      {/* ===== Background images - crossfade with slow scale ===== */}
      {gameSlides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 will-change-[opacity,transform]"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: i === activeIndex ? 2 : 1,
          }}
        >
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              transform: i === activeIndex ? "scale(1.08)" : "scale(1)",
              transition: "transform 8s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            <Image
              src={slide.bgImage}
              alt=""
              fill
              className="object-cover"
              priority={i <= 3}
              sizes="100vw"
            />
          </div>
        </div>
      ))}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.88) 30%, rgba(13,13,13,0.6) 55%, rgba(13,13,13,0.2) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,13,1) 0%, rgba(13,13,13,0.0) 30%, rgba(13,13,13,0.3) 100%)",
        }}
      />

      {/* ===== Content ===== */}
      <div className="relative z-[4] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex items-center min-h-[640px] lg:min-h-[720px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-8 lg:gap-16">
          {/* Left side content with smooth transitions */}
          <div className="flex-1 max-w-2xl">
            <p
              className="text-[#a0a0a0] text-sm mb-5 tracking-wide transition-all duration-500"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(-8px)",
              }}
            >
              {"100,000+ Clientes Satisfechos"}
            </p>

            {/* Title - each slide has its own positioned title */}
            <div className="relative min-h-[140px] md:min-h-[180px] lg:min-h-[210px] mb-7">
              {gameSlides.map((slide, i) => {
                const isActive = i === activeIndex
                const exitDir = direction === "down" ? -40 : 40
                const enterDir = direction === "down" ? 40 : -40
                return (
                  <h1
                    key={slide.id}
                    className="absolute top-0 left-0 text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#f5f5f5] leading-[1.08] whitespace-pre-line will-change-[opacity,transform]"
                    style={{
                      fontFamily: "var(--font-heading)",
                      opacity: isActive && contentVisible ? 1 : 0,
                      transform: isActive && contentVisible
                        ? "translateY(0)"
                        : isActive
                          ? `translateY(${enterDir}px)`
                          : `translateY(${exitDir}px)`,
                      transition: isActive && contentVisible
                        ? "opacity 0.65s cubic-bezier(0.25, 0.1, 0.25, 1) 0.1s, transform 0.65s cubic-bezier(0.25, 0.1, 0.25, 1) 0.1s"
                        : "opacity 0.35s cubic-bezier(0.4, 0, 1, 1), transform 0.35s cubic-bezier(0.4, 0, 1, 1)",
                    }}
                  >
                    {slide.title}
                  </h1>
                )
              })}
            </div>

            {/* Badges */}
            <div
              className="mb-8 flex flex-wrap gap-x-5 gap-y-2 transition-all duration-500 ease-out"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: contentVisible ? "0.2s" : "0s",
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

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 transition-all duration-500 ease-out"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: contentVisible ? "0.28s" : "0s",
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

          {/* ===== Right side - Vertical carousel ===== */}
          <div
            className="hidden lg:block relative w-52 xl:w-56"
            style={{ height: carouselHeight }}
          >
            {/* Fade masks */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#0d0d0d]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0d0d0d]/80 to-transparent z-10 pointer-events-none" />

            <div className="relative w-full h-full">
              {visibleIndices.map((slideIndex, posIndex) => {
                const slide = gameSlides[slideIndex]
                const isActive = slideIndex === activeIndex
                const centerPos = Math.floor(VISIBLE_CARDS / 2)

                // Calculate Y based on position in visible list
                let y = 0
                for (let p = 0; p < posIndex; p++) {
                  y += (p === centerPos ? CARD_H_ACTIVE : CARD_H) + GAP
                }

                const distFromCenter = Math.abs(posIndex - centerPos)
                const opacityVal = isActive ? 1 : distFromCenter <= 1 ? 0.6 : 0.3

                return (
                  <button
                    key={`${slideIndex}-${activeIndex}`}
                    onClick={() => handleCardClick(slideIndex)}
                    className="absolute left-0 w-full overflow-hidden rounded-xl text-left will-change-transform"
                    style={{
                      height: isActive ? CARD_H_ACTIVE : CARD_H,
                      transform: `translateY(${y}px) scale(${isActive ? 1 : 0.97})`,
                      transition: "all 0.8s cubic-bezier(0.4, 0, 0.15, 1)",
                      opacity: opacityVal,
                      zIndex: isActive ? 5 : 3 - distFromCenter,
                    }}
                  >
                    <Image
                      src={slide.cardImage}
                      alt={slide.label}
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-out"
                      style={{
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                      }}
                      sizes="224px"
                    />
                    <div
                      className="absolute inset-0 transition-all duration-700"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.25) 100%)"
                          : "rgba(13,13,13,0.6)",
                      }}
                    />
                    {/* Active glow border */}
                    <div
                      className="absolute inset-0 rounded-xl transition-all duration-700"
                      style={{
                        boxShadow: isActive
                          ? "inset 0 0 0 2px rgba(245,166,35,0.9), 0 0 24px rgba(245,166,35,0.2)"
                          : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                      }}
                    />
                    <div className="relative h-full flex flex-col justify-center px-4 z-[2]">
                      <span
                        className="font-bold tracking-wider transition-all duration-700"
                        style={{
                          fontSize: isActive ? "15px" : "11px",
                          color: isActive ? "#f5f5f5" : "#777",
                        }}
                      >
                        {slide.label}
                      </span>
                      <span
                        className="text-[10px] text-[#f5a623] font-semibold tracking-widest transition-all duration-700"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(-6px)",
                          maxHeight: isActive ? "20px" : "0px",
                          marginTop: isActive ? "3px" : "0px",
                          overflow: "hidden",
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
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: index === activeIndex ? 28 : 6,
              backgroundColor: index === activeIndex ? "#f5a623" : "rgba(160,160,160,0.3)",
            }}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

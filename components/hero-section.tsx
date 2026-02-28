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
const CARD_HEIGHT = 72
const CARD_HEIGHT_ACTIVE = 108
const CARD_GAP = 10

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(3)
  const [prevIndex, setPrevIndex] = useState(3)
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle")
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const phaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = gameSlides.length

  // Preload images
  useEffect(() => {
    gameSlides.forEach((slide) => {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.src = slide.bgImage
      const card = new window.Image()
      card.crossOrigin = "anonymous"
      card.src = slide.cardImage
    })
  }, [])

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex || phase !== "idle") return

      // Phase 1: Exit current content
      setPhase("exit")
      setPrevIndex(activeIndex)

      phaseTimerRef.current = setTimeout(() => {
        // Phase 2: Switch slide and enter new content
        setActiveIndex(nextIndex)
        setPhase("enter")

        phaseTimerRef.current = setTimeout(() => {
          setPhase("idle")
        }, 700)
      }, 350)
    },
    [activeIndex, phase]
  )

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % total)
  }, [activeIndex, total, goTo])

  const startAutoRotate = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(goNext, 5500)
  }, [goNext])

  useEffect(() => {
    startAutoRotate()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current)
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
  const showContent = phase === "idle" || phase === "enter"

  // Get carousel card positions
  const getVisibleIndices = () => {
    const half = Math.floor(VISIBLE_CARDS / 2)
    const indices: number[] = []
    for (let i = -half; i <= half; i++) {
      indices.push(((activeIndex + i) % total + total) % total)
    }
    return indices
  }

  const visibleIndices = getVisibleIndices()
  const centerPos = Math.floor(VISIBLE_CARDS / 2)
  const totalCarouselH = CARD_HEIGHT_ACTIVE + (VISIBLE_CARDS - 1) * CARD_HEIGHT + (VISIBLE_CARDS - 1) * CARD_GAP

  // Calculate vertical position for each card slot
  const getCardY = (posIndex: number) => {
    let y = 0
    for (let p = 0; p < posIndex; p++) {
      y += (p === centerPos ? CARD_HEIGHT_ACTIVE : CARD_HEIGHT) + CARD_GAP
    }
    return y
  }

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] overflow-hidden">
      {/* ===== BACKGROUNDS with cinematic crossfade + blur pulse ===== */}
      {gameSlides.map((slide, i) => {
        const isActive = i === activeIndex
        const wasActive = i === prevIndex
        const isInTransition = phase === "exit" || phase === "enter"

        return (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : wasActive && isInTransition ? 0.4 : 0,
              transition: isActive
                ? "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                : "opacity 0.8s cubic-bezier(0.4, 0, 1, 1)",
              zIndex: isActive ? 2 : wasActive ? 1 : 0,
            }}
          >
            <div
              className="absolute inset-[-20px]"
              style={{
                transform: isActive
                  ? "scale(1.06)"
                  : "scale(1.12)",
                filter: isActive && !isInTransition
                  ? "blur(0px) brightness(1)"
                  : "blur(6px) brightness(0.7)",
                transition: isActive
                  ? "transform 10s cubic-bezier(0.25, 0.1, 0.25, 1), filter 1.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  : "transform 0.8s ease-out, filter 0.6s ease-out",
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
        )
      })}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.88) 30%, rgba(13,13,13,0.55) 55%, rgba(13,13,13,0.15) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background: "linear-gradient(to top, rgba(13,13,13,1) 0%, transparent 30%, rgba(13,13,13,0.25) 100%)",
        }}
      />

      {/* ===== CONTENT AREA ===== */}
      <div className="relative z-[4] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex items-center min-h-[640px] lg:min-h-[720px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-8 lg:gap-16">

          {/* ===== LEFT: Text content ===== */}
          <div className="flex-1 max-w-2xl">
            {/* Subtitle */}
            <p
              className="text-sm mb-5 tracking-wide"
              style={{
                color: "#a0a0a0",
                opacity: showContent ? 1 : 0,
                transform: showContent ? "translateY(0)" : "translateY(-12px)",
                filter: showContent ? "blur(0px)" : "blur(4px)",
                transition: showContent
                  ? "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s"
                  : "all 0.3s cubic-bezier(0.4, 0, 1, 1)",
              }}
            >
              {"100,000+ Clientes Satisfechos"}
            </p>

            {/* Title - cinematic slide with blur */}
            <div className="relative min-h-[140px] md:min-h-[180px] lg:min-h-[210px] mb-7">
              {gameSlides.map((slide, i) => {
                const isActive = i === activeIndex
                const isExiting = i === prevIndex && phase === "exit"

                let opacity = 0
                let translateY = 30
                let blur = 8
                let scale = 0.97

                if (isActive && showContent) {
                  opacity = 1
                  translateY = 0
                  blur = 0
                  scale = 1
                } else if (isExiting) {
                  opacity = 0
                  translateY = -25
                  blur = 6
                  scale = 0.98
                }

                return (
                  <h1
                    key={slide.id}
                    className="absolute top-0 left-0 text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] whitespace-pre-line"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "#f5f5f5",
                      opacity,
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      filter: `blur(${blur}px)`,
                      transition: isActive && showContent
                        ? "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s"
                        : "all 0.35s cubic-bezier(0.4, 0, 1, 1)",
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    {slide.title}
                  </h1>
                )
              })}
            </div>

            {/* Badges - staggered entrance */}
            <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2">
              {[...activeSlide.badges, "Hardware Potente", "Soporte 24/7"].map((badge, idx) => (
                <div
                  key={`${activeSlide.id}-${badge}`}
                  className="flex items-center gap-1.5"
                  style={{
                    opacity: showContent ? 1 : 0,
                    transform: showContent ? "translateY(0) translateX(0)" : "translateY(12px) translateX(-8px)",
                    filter: showContent ? "blur(0px)" : "blur(3px)",
                    transition: showContent
                      ? `all 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 + idx * 0.06}s`
                      : "all 0.25s cubic-bezier(0.4, 0, 1, 1)",
                  }}
                >
                  <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#f5a623" }} />
                  <span className="text-sm" style={{ color: "#f5f5f5" }}>{badge}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg text-sm tracking-wide"
                style={{
                  backgroundColor: "#f5a623",
                  color: "#0d0d0d",
                  opacity: showContent ? 1 : 0,
                  transform: showContent ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
                  filter: showContent ? "blur(0px)" : "blur(3px)",
                  transition: showContent
                    ? "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s"
                    : "all 0.25s cubic-bezier(0.4, 0, 1, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e09510"
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(245,166,35,0.3)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5a623"
                  e.currentTarget.style.transform = showContent ? "translateY(0) scale(1)" : ""
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {activeSlide.cta}
              </a>
              <a
                href="#games"
                className="inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg text-sm gap-2"
                style={{
                  border: "1px solid #333",
                  color: "#f5f5f5",
                  opacity: showContent ? 1 : 0,
                  transform: showContent ? "translateY(0)" : "translateY(16px)",
                  filter: showContent ? "blur(0px)" : "blur(3px)",
                  transition: showContent
                    ? "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.32s"
                    : "all 0.25s cubic-bezier(0.4, 0, 1, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#1a1a1a"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                VER TODOS LOS JUEGOS
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ===== RIGHT: Vertical Card Carousel ===== */}
          <div
            className="hidden lg:block relative w-52 xl:w-60"
            style={{ height: totalCarouselH }}
          >
            {/* Edge fade masks */}
            <div
              className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(13,13,13,0.85), transparent)" }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(13,13,13,0.85), transparent)" }}
            />

            {/* Cards container */}
            <div className="relative w-full h-full">
              {visibleIndices.map((slideIndex, posIndex) => {
                const slide = gameSlides[slideIndex]
                const isActive = slideIndex === activeIndex
                const distFromCenter = Math.abs(posIndex - centerPos)
                const y = getCardY(posIndex)

                // Parallax-like depth: further cards are smaller
                const depthScale = isActive ? 1 : 1 - distFromCenter * 0.04
                const depthOpacity = isActive ? 1 : Math.max(0.2, 1 - distFromCenter * 0.28)
                const depthBlur = isActive ? 0 : distFromCenter * 1.2

                // Horizontal offset for depth feel
                const depthX = isActive ? 0 : distFromCenter * 4

                return (
                  <button
                    key={`card-${slideIndex}`}
                    onClick={() => handleCardClick(slideIndex)}
                    className="absolute left-0 w-full overflow-hidden rounded-xl text-left group"
                    style={{
                      height: isActive ? CARD_HEIGHT_ACTIVE : CARD_HEIGHT,
                      transform: `translateY(${y}px) translateX(${depthX}px) scale(${depthScale})`,
                      opacity: depthOpacity,
                      filter: `blur(${depthBlur}px)`,
                      transition: "all 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      zIndex: isActive ? 5 : 4 - distFromCenter,
                      willChange: "transform, opacity, height, filter",
                    }}
                  >
                    {/* Card background image */}
                    <Image
                      src={slide.cardImage}
                      alt={slide.label}
                      fill
                      className="object-cover"
                      style={{
                        transform: isActive ? "scale(1.08)" : "scale(1.02)",
                        transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      sizes="240px"
                    />

                    {/* Card overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(13,13,13,0.35), rgba(13,13,13,0.15))"
                          : "rgba(13,13,13,0.65)",
                        transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />

                    {/* Active glow border with animated sweep */}
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        boxShadow: isActive
                          ? "inset 0 0 0 2px rgba(245,166,35,0.85), 0 0 28px -4px rgba(245,166,35,0.25), 0 4px 20px -4px rgba(0,0,0,0.5)"
                          : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                        transition: "box-shadow 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />

                    {/* Animated light sweep on active card */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
                        style={{ zIndex: 3 }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: "-100%",
                            width: "60%",
                            height: "100%",
                            background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.08), transparent)",
                            animation: "cardSweep 3s ease-in-out infinite",
                          }}
                        />
                      </div>
                    )}

                    {/* Card content */}
                    <div className="relative h-full flex flex-col justify-center px-4 z-[2]">
                      <span
                        className="font-bold tracking-wider"
                        style={{
                          fontSize: isActive ? "15px" : "11px",
                          color: isActive ? "#f5f5f5" : "#888",
                          textShadow: isActive ? "0 2px 8px rgba(0,0,0,0.5)" : "none",
                          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        {slide.label}
                      </span>
                      <span
                        className="text-[10px] font-semibold tracking-widest"
                        style={{
                          color: "#f5a623",
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? "translateY(0)" : "translateY(-8px)",
                          maxHeight: isActive ? "20px" : "0px",
                          marginTop: isActive ? "4px" : "0px",
                          overflow: "hidden",
                          transition: isActive
                            ? "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s"
                            : "all 0.3s ease-out",
                        }}
                      >
                        HOSTING
                      </span>
                    </div>

                    {/* Hover glow for non-active cards */}
                    {!isActive && (
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                        style={{
                          boxShadow: "inset 0 0 0 1px rgba(245,166,35,0.3)",
                          transition: "opacity 0.4s ease",
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile game pill selector */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden z-[5]">
        {gameSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(index)}
            className="h-1.5 rounded-full"
            style={{
              width: index === activeIndex ? 28 : 6,
              backgroundColor: index === activeIndex ? "#f5a623" : "rgba(160,160,160,0.3)",
              transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* CSS Keyframe for card light sweep */}
      <style jsx>{`
        @keyframes cardSweep {
          0% { left: -100%; }
          50% { left: 200%; }
          100% { left: 200%; }
        }
      `}</style>
    </section>
  )
}

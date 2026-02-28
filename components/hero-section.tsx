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
    title: "Encuentra Tu\nHosting Minecraft",
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
const CARD_H = 70
const CARD_H_ACTIVE = 100
const GAP = 10

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [contentKey, setContentKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = gameSlides.length

  // Preload all images on mount
  useEffect(() => {
    gameSlides.forEach((slide) => {
      const bg = new window.Image()
      bg.crossOrigin = "anonymous"
      bg.src = slide.bgImage
      const card = new window.Image()
      card.crossOrigin = "anonymous"
      card.src = slide.cardImage
    })
  }, [])

  const goTo = useCallback((idx: number) => {
    setActiveIndex(idx)
    setContentKey((k) => k + 1)
  }, [])

  // Auto-rotate
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total)
      setContentKey((k) => k + 1)
    }, 5500)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [total])

  const handleCardClick = useCallback(
    (idx: number) => {
      if (idx === activeIndex) return
      goTo(idx)
      // Reset auto-rotate timer
      if (timerRef.current) clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % total)
        setContentKey((k) => k + 1)
      }, 5500)
    },
    [activeIndex, goTo, total]
  )

  const slide = gameSlides[activeIndex]

  // Build visible card indices centered on active
  const getVisibleCards = () => {
    const half = Math.floor(VISIBLE_CARDS / 2)
    const result: number[] = []
    for (let i = -half; i <= half; i++) {
      result.push(((activeIndex + i) % total + total) % total)
    }
    return result
  }
  const visibleCards = getVisibleCards()
  const centerSlot = Math.floor(VISIBLE_CARDS / 2)
  const totalH = CARD_H_ACTIVE + (VISIBLE_CARDS - 1) * CARD_H + (VISIBLE_CARDS - 1) * GAP

  const getYForSlot = (slot: number) => {
    let y = 0
    for (let s = 0; s < slot; s++) {
      y += (s === centerSlot ? CARD_H_ACTIVE : CARD_H) + GAP
    }
    return y
  }

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] overflow-hidden">
      {/* ===== BACKGROUND LAYERS ===== */}
      {gameSlides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0"
          style={{
            zIndex: i === activeIndex ? 2 : 1,
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        >
          <Image
            src={s.bgImage}
            alt=""
            fill
            className="object-cover"
            priority={i < 4}
            sizes="100vw"
            style={{
              transform: i === activeIndex ? "scale(1.05)" : "scale(1.12)",
              filter: i === activeIndex ? "blur(0px) brightness(0.9)" : "blur(4px) brightness(0.5)",
              transition: "transform 8s ease-out, filter 1.2s ease-in-out",
            }}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.85) 35%, rgba(13,13,13,0.5) 60%, rgba(13,13,13,0.1) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,13,1) 0%, transparent 25%, rgba(13,13,13,0.2) 100%)",
        }}
      />

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-[4] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex items-center min-h-[640px] lg:min-h-[720px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-8 lg:gap-16">

          {/* LEFT: Text + CTA */}
          <div className="flex-1 max-w-2xl">
            {/* Subtitle */}
            <p
              key={`sub-${contentKey}`}
              className="text-sm mb-5 tracking-wide hero-fade-in"
              style={{ color: "#a0a0a0", animationDelay: "0s" }}
            >
              {"100,000+ Clientes Satisfechos"}
            </p>

            {/* Title */}
            <h1
              key={`title-${contentKey}`}
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] whitespace-pre-line mb-7 hero-fade-in"
              style={{
                fontFamily: "var(--font-heading)",
                color: "#f5f5f5",
                animationDelay: "0.07s",
              }}
            >
              {slide.title}
            </h1>

            {/* Badges */}
            <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2">
              {[...slide.badges, "Hardware Potente", "Soporte 24/7"].map(
                (badge, idx) => (
                  <div
                    key={`${contentKey}-${badge}`}
                    className="flex items-center gap-1.5 hero-fade-in"
                    style={{ animationDelay: `${0.14 + idx * 0.05}s` }}
                  >
                    <CheckCircle
                      className="h-4 w-4 shrink-0"
                      style={{ color: "#f5a623" }}
                    />
                    <span className="text-sm" style={{ color: "#f5f5f5" }}>
                      {badge}
                    </span>
                  </div>
                )
              )}
            </div>

            {/* CTA buttons */}
            <div
              key={`cta-${contentKey}`}
              className="flex flex-col sm:flex-row gap-3 hero-fade-in"
              style={{ animationDelay: "0.35s" }}
            >
              <a
                href="#"
                className="inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg text-sm tracking-wide hover:brightness-110"
                style={{
                  backgroundColor: "#f5a623",
                  color: "#0d0d0d",
                  transition: "transform 0.25s, box-shadow 0.25s, filter 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(245,166,35,0.35)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {slide.cta}
              </a>
              <a
                href="#games"
                className="inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg text-sm gap-2"
                style={{
                  border: "1px solid #333",
                  color: "#f5f5f5",
                  transition: "background 0.3s",
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

          {/* RIGHT: Vertical card carousel */}
          <div
            className="hidden lg:block relative w-52 xl:w-60"
            style={{ height: totalH }}
          >
            {/* Top / bottom fade masks */}
            <div
              className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(13,13,13,0.9), transparent)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(13,13,13,0.9), transparent)",
              }}
            />

            {/* Cards */}
            <div className="relative w-full h-full">
              {visibleCards.map((slideIdx, slot) => {
                const s = gameSlides[slideIdx]
                const isActive = slideIdx === activeIndex
                const dist = Math.abs(slot - centerSlot)
                const y = getYForSlot(slot)
                const h = isActive ? CARD_H_ACTIVE : CARD_H

                // Depth effects
                const scale = isActive ? 1 : 1 - dist * 0.05
                const opacity = isActive ? 1 : Math.max(0.25, 1 - dist * 0.3)
                const blur = isActive ? 0 : dist * 1.5
                const xShift = isActive ? 0 : dist * 6

                return (
                  <button
                    key={`vis-${slideIdx}`}
                    onClick={() => handleCardClick(slideIdx)}
                    className="absolute left-0 w-full rounded-xl overflow-hidden text-left group"
                    style={{
                      height: h,
                      transform: `translateY(${y}px) translateX(${xShift}px) scale(${scale})`,
                      opacity,
                      filter: `blur(${blur}px)`,
                      transition:
                        "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease, height 0.7s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease",
                      zIndex: isActive ? 5 : 4 - dist,
                    }}
                  >
                    {/* Card bg image */}
                    <Image
                      src={s.cardImage}
                      alt={s.label}
                      fill
                      className="object-cover"
                      sizes="240px"
                      style={{
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                        transition: "transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)",
                      }}
                    />

                    {/* Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(0,0,0,0.25), rgba(0,0,0,0.1))"
                          : "rgba(0,0,0,0.6)",
                        transition: "background 0.6s ease",
                      }}
                    />

                    {/* Active border glow */}
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        boxShadow: isActive
                          ? "inset 0 0 0 2px rgba(245,166,35,0.9), 0 0 24px -4px rgba(245,166,35,0.3)"
                          : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                        transition:
                          "box-shadow 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
                      }}
                    />

                    {/* Light sweep on active */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-[3]">
                        <div className="hero-light-sweep" />
                      </div>
                    )}

                    {/* Card label */}
                    <div className="relative h-full flex flex-col justify-center px-4 z-[2]">
                      <span
                        className="font-bold tracking-wider"
                        style={{
                          fontSize: isActive ? 15 : 11,
                          color: isActive ? "#f5f5f5" : "#999",
                          textShadow: isActive
                            ? "0 2px 8px rgba(0,0,0,0.5)"
                            : "none",
                          transition: "all 0.5s ease",
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="text-[10px] font-semibold tracking-widest"
                        style={{
                          color: "#f5a623",
                          opacity: isActive ? 1 : 0,
                          maxHeight: isActive ? 20 : 0,
                          marginTop: isActive ? 4 : 0,
                          overflow: "hidden",
                          transition: "all 0.5s ease",
                        }}
                      >
                        HOSTING
                      </span>
                    </div>

                    {/* Hover glow for inactive */}
                    {!isActive && (
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                        style={{
                          boxShadow:
                            "inset 0 0 0 1px rgba(245,166,35,0.3)",
                          transition: "opacity 0.3s ease",
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

      {/* Mobile dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden z-[5]">
        {gameSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleCardClick(i)}
            className="h-1.5 rounded-full"
            style={{
              width: i === activeIndex ? 28 : 6,
              backgroundColor:
                i === activeIndex ? "#f5a623" : "rgba(160,160,160,0.3)",
              transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            aria-label={`Ir a ${gameSlides[i].label}`}
          />
        ))}
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        .hero-fade-in {
          animation: heroFadeIn 0.65s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(18px);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        .hero-light-sweep {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(245, 166, 35, 0.1),
            transparent
          );
          animation: lightSweep 2.8s ease-in-out infinite;
        }
        @keyframes lightSweep {
          0% {
            left: -100%;
          }
          50% {
            left: 200%;
          }
          100% {
            left: 200%;
          }
        }
      `}</style>
    </section>
  )
}

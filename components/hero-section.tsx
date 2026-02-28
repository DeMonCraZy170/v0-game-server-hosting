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
    badges: ["Rendimiento Maximo", "Control Total", "Mejor Precio", "Soporte 24/7"],
    cta: "INICIAR MI SERVIDOR DEDICADO",
    bgImage: "/images/hero-dedicated.jpg",
    cardImage: "/images/card-dedicated.jpg",
  },
  {
    id: "discord",
    title: "Hosting de Bot\nde Discord",
    label: "BOT DE DISCORD",
    badges: ["Configuracion Instantanea", "Uptime 99.9%", "Hardware Potente", "Soporte 24/7"],
    cta: "INICIAR MI BOT DE DISCORD",
    bgImage: "/images/hero-discord.jpg",
    cardImage: "/images/card-discord.jpg",
  },
  {
    id: "astroneer",
    title: "Hosting de Servidores\nAstroneer",
    label: "ASTRONEER",
    badges: ["Configuracion Instantanea", "Proteccion DDoS", "Hardware Potente", "Soporte 24/7"],
    cta: "INICIAR MI SERVIDOR ASTRONEER",
    bgImage: "/images/hero-astroneer.jpg",
    cardImage: "/images/card-astroneer.jpg",
  },
  {
    id: "minecraft",
    title: "Encuentra Tu\nHosting Minecraft",
    label: "MINECRAFT",
    badges: ["Bedrock & Java", "Configuracion Instantanea", "Mejor Precio", "Soporte 24/7"],
    cta: "INICIAR MI SERVIDOR MINECRAFT",
    bgImage: "/images/hero-minecraft.jpg",
    cardImage: "/images/card-minecraft.jpg",
  },
  {
    id: "valheim",
    title: "Hosting de Servidores\nValheim",
    label: "VALHEIM",
    badges: ["Configuracion Instantanea", "Proteccion DDoS", "Hardware Potente", "Soporte 24/7"],
    cta: "INICIAR MI SERVIDOR VALHEIM",
    bgImage: "/images/hero-valheim.jpg",
    cardImage: "/images/card-valheim.jpg",
  },
  {
    id: "satisfactory",
    title: "Hosting de Servidores\nSatisfactory",
    label: "SATISFACTORY",
    badges: ["Configuracion Instantanea", "Sin Lag", "Mejor Precio", "Soporte 24/7"],
    cta: "INICIAR MI SERVIDOR SATISFACTORY",
    bgImage: "/images/hero-satisfactory.jpg",
    cardImage: "/images/card-satisfactory.jpg",
  },
  {
    id: "terraria",
    title: "Hosting de Servidores\nTerraria",
    label: "TERRARIA",
    badges: ["Configuracion Instantanea", "Mejor Precio", "Hardware Potente", "Soporte 24/7"],
    cta: "INICIAR MI SERVIDOR TERRARIA",
    bgImage: "/images/hero-terraria.jpg",
    cardImage: "/images/card-terraria.jpg",
  },
  {
    id: "hytale",
    title: "Hosting de Servidores\nHytale",
    label: "HYTALE",
    badges: ["Configuracion Instantanea", "Proteccion DDoS", "Soporte Experto 24/7", "Hardware Potente"],
    cta: "INICIAR MI SERVIDOR HYTALE",
    bgImage: "/images/hero-hytale.jpg",
    cardImage: "/images/card-hytale.jpg",
  },
]

const VISIBLE_CARDS = 5
const CARD_H = 68
const CARD_H_ACTIVE = 96
const GAP = 8

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(-1)
  const [textVisible, setTextVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = gameSlides.length

  useEffect(() => {
    gameSlides.forEach((s) => {
      const bg = new window.Image()
      bg.crossOrigin = "anonymous"
      bg.src = s.bgImage
      const card = new window.Image()
      card.crossOrigin = "anonymous"
      card.src = s.cardImage
    })
  }, [])

  const changeTo = useCallback(
    (idx: number) => {
      if (idx === activeIndex) return
      setTextVisible(false)
      setTimeout(() => {
        setPrevIndex(activeIndex)
        setActiveIndex(idx)
        setTimeout(() => {
          setTextVisible(true)
        }, 80)
      }, 250)
    },
    [activeIndex]
  )

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTextVisible(false)
      setTimeout(() => {
        setActiveIndex((prev) => {
          setPrevIndex(prev)
          return (prev + 1) % total
        })
        setTimeout(() => setTextVisible(true), 80)
      }, 250)
    }, 5500)
  }, [total])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  const handleCardClick = useCallback(
    (idx: number) => {
      changeTo(idx)
      resetTimer()
    },
    [changeTo, resetTimer]
  )

  const slide = gameSlides[activeIndex]

  // Calculate visible card indices centered around activeIndex
  const half = Math.floor(VISIBLE_CARDS / 2)
  const visibleCards: number[] = []
  for (let i = -half; i <= half; i++) {
    visibleCards.push(((activeIndex + i) % total + total) % total)
  }
  const centerSlot = half

  // Calculate Y position for each slot
  const getYForSlot = (slot: number) => {
    let y = 0
    for (let s = 0; s < slot; s++) {
      y += (s === centerSlot ? CARD_H_ACTIVE : CARD_H) + GAP
    }
    return y
  }

  const totalH = CARD_H_ACTIVE + (VISIBLE_CARDS - 1) * CARD_H + (VISIBLE_CARDS - 1) * GAP

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] overflow-hidden">
      {/* ===== BACKGROUND ===== */}
      {gameSlides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0"
          style={{
            zIndex: i === activeIndex ? 2 : i === prevIndex ? 1 : 0,
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        >
          <Image
            src={s.bgImage}
            alt=""
            fill
            className="object-cover"
            priority={i < 3}
            sizes="100vw"
            style={{
              transform: i === activeIndex ? "scale(1.05)" : "scale(1.15)",
              filter: i === activeIndex ? "brightness(0.85)" : "brightness(0.4) blur(4px)",
              transition: "transform 10s ease-out, filter 1s ease",
            }}
          />
        </div>
      ))}

      {/* Dark gradient overlays */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to right, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.8) 30%, rgba(13,13,13,0.4) 55%, rgba(13,13,13,0.05) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,13,1) 0%, transparent 20%)",
        }}
      />

      {/* ===== CONTENT ===== */}
      <div className="relative z-[4] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex items-center min-h-[640px] lg:min-h-[720px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-8 lg:gap-16">

          {/* LEFT: Text content */}
          <div
            className="flex-1 max-w-2xl"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <p
              className="text-sm mb-5 tracking-wide"
              style={{ color: "#a0a0a0" }}
            >
              100,000+ Clientes Satisfechos
            </p>

            <h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] whitespace-pre-line mb-7"
              style={{
                fontFamily: "var(--font-heading)",
                color: "#f5f5f5",
              }}
            >
              {slide.title}
            </h1>

            <div className="mb-8 flex flex-wrap gap-x-5 gap-y-2">
              {slide.badges.map((badge, idx) => (
                <div
                  key={`${slide.id}-badge-${idx}`}
                  className="flex items-center gap-1.5"
                >
                  <CheckCircle
                    className="h-4 w-4 shrink-0"
                    style={{ color: "#f5a623" }}
                  />
                  <span className="text-sm" style={{ color: "#f5f5f5" }}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg text-sm tracking-wide transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "#f5a623",
                  color: "#0d0d0d",
                  boxShadow: "0 4px 16px rgba(245,166,35,0.2)",
                }}
              >
                {slide.cta}
              </a>
              <a
                href="#games"
                className="inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg text-sm gap-2 transition-all duration-300 hover:bg-[#1a1a1a]"
                style={{
                  border: "1px solid #333",
                  color: "#f5f5f5",
                }}
              >
                VER TODOS LOS JUEGOS
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* RIGHT: Vertical carousel */}
          <div
            className="hidden lg:block relative w-52 xl:w-60"
            style={{ height: totalH }}
          >
            {/* Top fade - softer */}
            <div
              className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(13,13,13,0.6), transparent)",
              }}
            />
            {/* Bottom fade - softer */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(13,13,13,0.6), transparent)",
              }}
            />

            <div className="relative w-full h-full">
              {visibleCards.map((slideIdx, slot) => {
                const s = gameSlides[slideIdx]
                const isActive = slideIdx === activeIndex
                const dist = Math.abs(slot - centerSlot)
                const y = getYForSlot(slot)
                const h = isActive ? CARD_H_ACTIVE : CARD_H
                const cardScale = isActive ? 1 : 1 - dist * 0.04
                const cardOpacity = isActive ? 1 : Math.max(0.35, 1 - dist * 0.25)
                const xShift = isActive ? 0 : dist * 5

                return (
                  <button
                    key={s.id}
                    onClick={() => handleCardClick(slideIdx)}
                    className="absolute left-0 w-full rounded-xl overflow-hidden text-left group focus:outline-none"
                    style={{
                      height: h,
                      transform: `translateY(${y}px) translateX(${xShift}px) scale(${cardScale})`,
                      opacity: cardOpacity,
                      transition: "all 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
                      zIndex: isActive ? 5 : 4 - dist,
                    }}
                  >
                    {/* Card background image */}
                    <Image
                      src={s.cardImage}
                      alt={s.label}
                      fill
                      className="object-cover"
                      sizes="240px"
                      style={{
                        transform: isActive ? "scale(1.08)" : "scale(1)",
                        transition: "transform 2s ease-out",
                      }}
                    />

                    {/* Dark overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,0,0,0.05))"
                          : "rgba(0,0,0,0.55)",
                        transition: "background 0.5s ease",
                      }}
                    />

                    {/* Border + glow */}
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{
                        boxShadow: isActive
                          ? "inset 0 0 0 2px rgba(245,166,35,0.85), 0 0 20px -4px rgba(245,166,35,0.25)"
                          : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                        transition: "box-shadow 0.5s ease",
                      }}
                    />

                    {/* Light sweep on active card */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-[3]">
                        <div
                          className="absolute top-0 left-0 w-1/2 h-full"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(245,166,35,0.08), transparent)",
                            animation: "lightSweep 3s ease-in-out infinite",
                          }}
                        />
                      </div>
                    )}

                    {/* Card text */}
                    <div className="relative h-full flex flex-col justify-center px-4 z-[2]">
                      <span
                        className="font-bold tracking-wider leading-tight"
                        style={{
                          fontSize: isActive ? 15 : 11,
                          color: isActive ? "#f5f5f5" : "#999",
                          textShadow: isActive ? "0 2px 8px rgba(0,0,0,0.5)" : "none",
                          transition: "all 0.5s ease",
                        }}
                      >
                        {s.label}
                      </span>
                      {isActive && (
                        <span
                          className="text-[10px] font-semibold tracking-widest mt-1"
                          style={{
                            color: "#f5a623",
                            animation: "fadeIn 0.4s ease both",
                          }}
                        >
                          HOSTING
                        </span>
                      )}
                    </div>

                    {/* Hover glow for inactive cards */}
                    {!isActive && (
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                        style={{
                          boxShadow: "inset 0 0 0 1px rgba(245,166,35,0.3)",
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
        {gameSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleCardClick(i)}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === activeIndex ? 28 : 6,
              backgroundColor: i === activeIndex ? "#f5a623" : "rgba(160,160,160,0.3)",
            }}
            aria-label={`Ir a ${s.label}`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes lightSweep {
          0% { transform: translateX(-200%); }
          50% { transform: translateX(400%); }
          100% { transform: translateX(400%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

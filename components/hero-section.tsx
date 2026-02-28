"use client"

import { useEffect, useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"

const heroSlides = [
  {
    title: "Encuentra Tu Hosting de Minecraft",
    badges: ["Bedrock & Java", "Configuracion Instantanea", "Mejor Precio"],
    cta: "Iniciar Mi Servidor Minecraft",
    game: "Minecraft",
  },
  {
    title: "Hosting de Servidores Valheim",
    badges: ["Configuracion Instantanea", "Proteccion DDoS", "Hardware Potente"],
    cta: "Iniciar Mi Servidor Valheim",
    game: "Valheim",
  },
  {
    title: "Hosting de Servidores Terraria",
    badges: ["Configuracion Instantanea", "Mejor Precio", "Soporte 24/7"],
    cta: "Iniciar Mi Servidor Terraria",
    game: "Terraria",
  },
]

const gameCards = [
  "Servidor Dedicado",
  "Bot de Discord",
  "Minecraft",
  "Valheim",
  "Terraria",
  "Satisfactory",
  "Factorio",
  "Astroneer",
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-minecraft.jpg"
          alt="Escena de juego"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24 flex items-center min-h-[600px] lg:min-h-[700px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center w-full gap-8">
          {/* Left content */}
          <div className="flex-1 max-w-2xl">
            <p className="text-muted-foreground text-sm mb-3">
              {"100,000+ Clientes Satisfechos"}
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {slide.title}
            </h1>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-8">
              {slide.badges.map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">{badge}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Hardware Potente</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Soporte 24/7</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                {slide.cta.toUpperCase()}
              </a>
              <a
                href="#games"
                className="inline-flex items-center justify-center border border-border text-foreground font-semibold px-6 py-3 rounded-lg hover:bg-secondary transition-colors text-sm gap-2"
              >
                VER TODOS LOS JUEGOS
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right side - Game cards carousel */}
          <div className="hidden lg:flex flex-col gap-3 w-64">
            {gameCards.slice(0, 5).map((game, index) => (
              <div
                key={game}
                className={`rounded-xl px-4 py-3 border transition-all duration-300 ${
                  index === 2
                    ? "bg-primary/20 border-primary text-foreground scale-105"
                    : "bg-card/60 border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${index === 2 ? "bg-primary" : "bg-muted-foreground/50"}`} />
                  <span className="text-sm font-medium uppercase tracking-wide">{game}</span>
                </div>
                {index === 2 && (
                  <span className="text-xs text-primary ml-5 block mt-0.5">HOSTING</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-6" : "bg-muted-foreground/50"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

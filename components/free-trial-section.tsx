"use client"

import { ArrowRight, Zap } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function FreeTrialSection() {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.15 })

  return (
    <section className="py-20 bg-secondary">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4">
        <div
          className="relative bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden transition-all duration-800 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.98)",
            transitionDuration: "800ms",
          }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-center gap-8">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary font-medium">Prueba gratuita de 24 horas</span>
              </div>
              <p className="text-muted-foreground mb-2 text-sm uppercase tracking-wider">
                {"Aun no estas convencido?"}
              </p>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Prueba una <span className="text-primary">prueba gratuita</span> de 24 horas sin riesgo!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg">
                Elige el juego que quieres alojar, luego prueba nuestro servicio. Puedes cancelar en cualquier momento.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <a
                  href="/game-server-hosting"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                >
                  Comenzar Sin Riesgo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/game-server-hosting"
                  className="inline-flex items-center justify-center border border-border text-foreground font-semibold px-6 py-3 rounded-lg hover:bg-card transition-colors text-sm"
                >
                  Productos Soportados
                </a>
              </div>
            </div>

            {/* Right - visual element */}
            <div
              className="flex-shrink-0 transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.85)",
                transitionDelay: "0.3s",
              }}
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-5xl md:text-6xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                    24
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">horas gratis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Clock, MessageCircle, Headphones } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const supportCards = [
  {
    icon: Clock,
    title: "Disponible Todo el Tiempo",
    description: "Dias, noches, fines de semana, e incluso festivos. Siempre estaremos aqui para ayudarte.",
  },
  {
    icon: MessageCircle,
    title: "Soporte por Chat en Vivo en 2 Min",
    description: "No nos crees? Haz clic en el boton de abajo a la derecha y saluda a nuestro soporte 24/7 (humanos reales).",
  },
  {
    icon: Headphones,
    title: "Equipo de Expertos",
    description: "Nuestro equipo de soporte esta formado por expertos en juegos que entienden tus necesidades reales.",
  },
]

export function SupportSection() {
  const [leftRef, leftVisible] = useScrollReveal()
  const [rightRef, rightVisible] = useScrollReveal({ threshold: 0.1 })

  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left - main message */}
          <div
            ref={leftRef}
            className="flex-1 transition-all duration-700 ease-out"
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
              Obten una Respuesta a tu Ticket en 10 Minutos
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Y soporte siempre en linea.
            </h2>
            <p className="text-muted-foreground text-lg">
              {"Trabajando en tu servidor a las 3 AM? Te tenemos cubierto."}
            </p>
          </div>

          {/* Right - cards */}
          <div ref={rightRef} className="flex-1 flex flex-col gap-4 w-full">
            {supportCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 transition-all duration-600 ease-out hover:border-primary/30"
                  style={{
                    opacity: rightVisible ? 1 : 0,
                    transform: rightVisible ? "translateX(0)" : "translateX(30px)",
                    transitionDelay: `${index * 120}ms`,
                    transitionDuration: "600ms",
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-foreground mb-1"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

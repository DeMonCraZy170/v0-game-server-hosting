"use client"

import { Gamepad2, Server, Cloud, ArrowRight, CheckCircle } from "lucide-react"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"

const hostingCategories = [
  {
    icon: Gamepad2,
    title: "Minecraft",
    subtitle: "Hosting",
    description:
      "99.9% de uptime respaldado por soporte 24/7 y la confianza de mas de 1500+ resenas de 5 estrellas.",
    features: ["Mejor Precio", "Hardware Potente", "Facil de Usar"],
    cta: "Encontrar Mi Hosting Minecraft",
    color: "from-green-500/20 to-green-500/5",
    borderColor: "hover:border-green-500/50",
  },
  {
    icon: Server,
    title: "Hosting de",
    subtitle: "Juegos",
    description:
      "Obtiene hosting de juegos mas potente por menos de lo que pagarias en cualquier otro lugar.",
    features: ["30+ Juegos Disponibles", "Soporte Experto 24/7", "Facil Configuracion"],
    cta: "Elegir Mi Hosting de Juegos",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "hover:border-blue-500/50",
  },
  {
    icon: Cloud,
    title: "Cloud",
    subtitle: "Hosting",
    description:
      "Necesitas un sitio web? Iniciando un proyecto en la nube? Asegurate de obtener el mejor precio.",
    features: ["Flexibilidad Total", "Facil Configuracion", "Proteccion DDoS"],
    cta: "Obtener Mi Cloud Hosting",
    color: "from-purple-500/20 to-purple-500/5",
    borderColor: "hover:border-purple-500/50",
  },
]

export function GameHostingSection() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [cardsRef, cardsVisible] = useScrollReveal({ threshold: 0.1 })

  return (
    <section id="games" className="pt-8 pb-20 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-12 transition-all duration-700 ease-out"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
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

        {/* Hosting cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hostingCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={category.title}
                className={`group relative bg-card border border-border rounded-2xl p-6 transition-all duration-700 ease-out hover:shadow-xl hover:shadow-primary/5 ${category.borderColor}`}
                style={{
                  opacity: cardsVisible ? 1 : 0,
                  transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${staggerDelay(index, 120)}ms`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${category.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-foreground mb-1"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {category.title}
                  </h3>
                  <p
                    className="text-2xl font-bold text-primary mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {category.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="flex flex-col gap-2 mb-6">
                    {category.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    {category.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

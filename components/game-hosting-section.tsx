"use client"

import { ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"

const hostingCategories = [
  {
    icon: "/images/icon-minecraft.jpg",
    title: "Minecraft",
    subtitle: "Hosting",
    description:
      "99.9% de uptime respaldado por soporte 24/7 y la confianza de mas de 1500+ resenas de 5 estrellas.",
    features: ["Mejor Precio", "Hardware Potente", "Facil de Usar"],
    cta: "Encontrar Mi Hosting Minecraft",
    accentColor: "#22c55e",
    buttonGradient: "from-green-600 to-green-700 hover:from-green-500 hover:to-green-600",
  },
  {
    icon: "/images/icon-gamehosting.jpg",
    title: "Hosting de",
    subtitle: "Juegos",
    description:
      "Obtiene hosting de juegos mas potente por menos de lo que pagarias en cualquier otro lugar.",
    features: ["30+ Juegos Disponibles", "Soporte Experto 24/7", "Facil Configuracion"],
    cta: "Elegir Mi Hosting de Juegos",
    accentColor: "#3b82f6",
    buttonGradient: "from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600",
  },
  {
    icon: "/images/icon-cloud.jpg",
    title: "Cloud",
    subtitle: "Hosting",
    description:
      "Necesitas un sitio web? Iniciando un proyecto en la nube? Asegurate de obtener el mejor precio.",
    features: ["Flexibilidad Total", "Facil Configuracion", "Proteccion DDoS"],
    cta: "Obtener Mi Cloud Hosting",
    accentColor: "#6366f1",
    buttonGradient: "from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600",
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
          className="mb-14 transition-all duration-700 ease-out"
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
          {hostingCategories.map((category, index) => (
            <div
              key={category.title}
              className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:border-border/80 hover:shadow-2xl hover:shadow-black/20"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${staggerDelay(index, 120)}ms`,
              }}
            >
              {/* Card content */}
              <div className="relative flex flex-col flex-1 p-7">
                {/* Large icon image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden mb-5 relative">
                  <Image
                    src={category.icon}
                    alt={category.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold text-foreground leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {category.title}
                </h3>
                <p
                  className="text-2xl font-bold leading-tight mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: category.accentColor }}
                >
                  {category.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-6">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 shrink-0" style={{ color: category.accentColor }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Spacer pushes button to bottom */}
                <div className="flex-1" />
              </div>

              {/* Full-width CTA button at the bottom */}
              <a
                href="#"
                className={`flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-foreground tracking-wide bg-gradient-to-r ${category.buttonGradient} transition-all duration-300`}
              >
                {category.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

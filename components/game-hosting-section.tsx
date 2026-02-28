"use client"

import Image from "next/image"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"

const hostingCategories = [
  {
    icon: "/images/icon-minecraft.avif",
    iconWidth: 60,
    iconHeight: 60,
    title: "Minecraft",
    subtitle: "Hosting",
    description:
      "99.9% de uptime respaldado por soporte 24/7 y la confianza de mas de 1500+ resenas de 5 estrellas.",
    features: ["Mejor Precio", "Hardware Potente", "Facil de Usar"],
    cta: "Encontrar Mi Hosting Minecraft",
    href: "#",
  },
  {
    icon: "/images/icon-gamehosting.avif",
    iconWidth: 140,
    iconHeight: 90,
    title: "Hosting de",
    subtitle: "Juegos",
    description:
      "Obtiene hosting de juegos mas potente por menos de lo que pagarias en cualquier otro lugar.",
    features: ["30+ Juegos Disponibles", "Soporte Experto 24/7", "Facil Configuracion"],
    cta: "Elegir Mi Hosting de Juegos",
    href: "#",
  },
  {
    icon: "/images/icon-cloud.avif",
    iconWidth: 90,
    iconHeight: 90,
    title: "Cloud",
    subtitle: "Hosting",
    description:
      "Necesitas un sitio web? Iniciando un proyecto en la nube? Asegurate de obtener el mejor precio.",
    features: ["Flexibilidad Total", "Facil Configuracion", "Proteccion DDoS"],
    cta: "Obtener Mi Cloud Hosting",
    href: "#",
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
          className="mb-20 transition-all duration-700 ease-out"
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

        {/* Hosting cards grid - extra top padding for overflowing icons */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {hostingCategories.map((category, index) => (
            <a
              key={category.title}
              href={category.href}
              className="group relative flex flex-col rounded-xl transition-all duration-500 ease-out"
              style={{
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${staggerDelay(index, 120)}ms`,
                marginTop: 36,
              }}
            >
              {/* Card border - default subtle, brighter on hover */}
              <div
                className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none"
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                style={{
                  border: "1px solid rgba(14,165,233,0.5)",
                  boxShadow: "0 0 15px rgba(14,165,233,0.15), 0 0 30px rgba(14,165,233,0.05), 0 4px 30px rgba(0,0,0,0.3)",
                }}
              />

              {/* Card background */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{ background: "#1a1a1f" }}
              />

              {/* Icon - overflowing above the card */}
              <div
                className="absolute z-10 left-7"
                style={{
                  top: -36,
                  width: category.iconWidth,
                  height: category.iconHeight,
                }}
              >
                <Image
                  src={category.icon}
                  alt={category.title}
                  width={category.iconWidth}
                  height={category.iconHeight}
                  className="object-contain drop-shadow-lg"
                  sizes="110px"
                />
              </div>

              {/* Card content - with top padding to clear the icon */}
              <div className="relative z-[1] flex flex-col flex-1 pt-12 px-7 pb-7">
                {/* Title */}
                <h3
                  className="text-[22px] font-bold text-foreground leading-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {category.title}
                </h3>
                <p
                  className="text-[22px] font-bold leading-tight mb-4 text-primary"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {category.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Features with green dots */}
                <ul className="flex flex-col gap-3 mb-6">
                  {category.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground/90">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          background: "#22c55e",
                          boxShadow: "0 0 6px rgba(34,197,94,0.5)",
                        }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Spacer to push button to bottom */}
                <div className="flex-1" />
              </div>

              {/* Full-width CTA button - solid teal matching SparkedHost */}
              <div
                className="relative z-[1] flex items-center justify-center rounded-b-xl px-6 py-4 text-[15px] font-bold text-white tracking-wide transition-all duration-300 group-hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #0891b2, #0ea5e9, #38bdf8)",
                }}
              >
                {category.cta}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

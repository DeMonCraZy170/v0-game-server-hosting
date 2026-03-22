"use client"

import { Cpu, DollarSign, Shield, Clock, Zap, ShieldCheck } from "lucide-react"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"

const perks = [
  {
    icon: Cpu,
    title: "El Hardware Mas Rapido",
    description:
      "Disfruta de velocidad y rendimiento inigualables con el CPU AMD Ryzen 7 9800X3D (8 cores/16 threads), RAM DDR5 y Dual NVMe SSDs de ForzaHost.",
  },
  {
    icon: DollarSign,
    title: "A Los Precios Mas Bajos",
    description:
      "Sin importar cuanto rendimiento necesites, siempre tenemos una opcion con precio mas bajo que la competencia.",
  },
  {
    icon: Shield,
    title: "99.9% de Uptime",
    description:
      "Asegura que tu servidor permanezca en linea 24/7 con infraestructura empresarial confiable. Nunca te preocupes por caidas o interrupciones.",
  },
  {
    icon: Clock,
    title: "Soporte 24/7",
    description:
      "Cuando compras un servidor de ForzaHost, nuestro equipo siempre esta listo para ayudar. Damos respuestas rapidas y soluciones reales.",
  },
  {
    icon: Zap,
    title: "Configuracion Instantanea",
    description:
      "Ve de navegacion a configuracion en solo minutos. Elige un servidor, paga, y responde algunas preguntas para comenzar.",
  },
  {
    icon: ShieldCheck,
    title: "Proteccion DDoS",
    description:
      "Nos asociamos con proveedores premium de proteccion DDoS para proteger tu servidor de actores maliciosos.",
  },
]

export function PerksSection() {
  const [headerRef, headerVisible] = useScrollReveal()
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.08 })

  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-12 text-center transition-all duration-700 ease-out"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
            Ventajas Lideres en la Industria
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Con funciones exclusivas que no encontraras en ningun otro lugar.
          </h2>
        </div>

        {/* Perks grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, index) => {
            const Icon = perk.icon
            return (
              <div
                key={perk.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-700 ease-out group"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${staggerDelay(index, 100)}ms`,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3
                  className="text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {perk.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {perk.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Cpu, DollarSign, Shield, Clock, Zap, ShieldCheck } from "lucide-react"

const perks = [
  {
    icon: Cpu,
    title: "El Hardware Mas Rapido",
    description:
      "Disfruta de velocidad y rendimiento inigualables con los CPUs Ryzen 7900X y 9900X, RAM DDR5 y SSDs NVMe de ForzaHost.",
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
  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <div className="mb-12 text-center">
          <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
            Ventajas Lideres en la Industria
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Con funciones exclusivas que no encontraras en ningun otro lugar.
          </h2>
        </div>

        {/* Perks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk) => {
            const Icon = perk.icon
            return (
              <div
                key={perk.title}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3
                  className="text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
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

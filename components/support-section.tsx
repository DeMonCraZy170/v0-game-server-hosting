import { Clock, MessageCircle, Headphones } from "lucide-react"

export function SupportSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left - main message */}
          <div className="flex-1">
            <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
              Obten una Respuesta a tu Ticket en 10 Minutos
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Y soporte siempre en linea.
            </h2>
            <p className="text-muted-foreground text-lg">
              {"Trabajando en tu servidor a las 3 AM? Te tenemos cubierto."}
            </p>
          </div>

          {/* Right - cards */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3
                  className="font-bold text-foreground mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Disponible Todo el Tiempo
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Dias, noches, fines de semana, e incluso festivos. Siempre estaremos aqui para ayudarte.
                </p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3
                  className="font-bold text-foreground mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Soporte por Chat en Vivo en 2 Min
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {"No nos crees? Haz clic en el boton de abajo a la derecha y saluda a nuestro soporte 24/7 (humanos reales)."}
                </p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3
                  className="font-bold text-foreground mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Equipo de Expertos
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nuestro equipo de soporte esta formado por expertos en juegos que entienden tus necesidades reales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

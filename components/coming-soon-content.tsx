"use client"

import { Zap, ArrowLeft, Clock, Rocket, Bell } from "lucide-react"
import Link from "next/link"

import { Footer } from "@/components/footer"

export function ComingSoonContent() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated icon */}
          <div className="relative mx-auto mb-8 w-24 h-24">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "rgba(245,166,35,0.1)",
                border: "1px solid rgba(245,166,35,0.2)",
              }}
            />
            <div
              className="absolute inset-2 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(245,166,35,0.08)",
              }}
            >
              <Rocket className="h-10 w-10 text-primary" />
            </div>
            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: "rgba(245,166,35,0.08)",
                animationDuration: "3s",
              }}
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full" style={{
            background: "rgba(245,166,35,0.1)",
            border: "1px solid rgba(245,166,35,0.25)",
          }}>
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-bold tracking-wider text-primary uppercase">
              En Desarrollo
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Proximamente
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-lg mx-auto">
            Estamos trabajando para ofrecerte la mejor experiencia. Esta seccion estara disponible muy pronto.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-10 max-w-md mx-auto">
            Nuestro equipo esta construyendo algo increible. Mantente atento a las novedades en nuestras redes sociales y Discord.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Zap, label: "Rendimiento", desc: "Hardware de ultima generacion" },
              { icon: Rocket, label: "Innovacion", desc: "Tecnologia de punta" },
              { icon: Bell, label: "Notificaciones", desc: "Se el primero en saberlo" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="rounded-xl p-5 transition-colors"
                  style={{
                    background: "#1a1a1f",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              )
            })}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al Inicio
            </Link>
            <a
              href="https://discord.gg/YRHckAJD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
              style={{
                background: "transparent",
                color: "#f5f5f5",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Unirse a Discord
            </a>
          </div>
        </div>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  )
}

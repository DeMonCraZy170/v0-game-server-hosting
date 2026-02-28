"use client"

import { Monitor, FolderOpen, Download, Puzzle, Lock, ArrowLeftRight, Scissors, ArrowRight, ExternalLink } from "lucide-react"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"

const features = [
  { icon: Monitor, label: "Consola de Servidor Intuitiva" },
  { icon: FolderOpen, label: "Gestor de Archivos Moderno" },
  { icon: Download, label: "Instalador de Modpacks en 1 Clic" },
  { icon: Puzzle, label: "Instalador de Plugins en 1 Clic" },
  { icon: Lock, label: "Proxy Inverso Seguro" },
  { icon: ArrowLeftRight, label: "Herramienta de Importacion" },
  { icon: Scissors, label: "Herramienta de Division de Servidor" },
]

export function ApolloPanelSection() {
  const [leftRef, leftVisible] = useScrollReveal()
  const [rightRef, rightVisible] = useScrollReveal({ threshold: 0.1 })

  return (
    <section className="py-20 bg-secondary">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side */}
          <div
            ref={leftRef}
            className="flex-1 transition-all duration-700 ease-out"
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">
              Panel Apollo
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Un panel de control que simplemente funciona.
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Exclusivo de ForzaHost, el Panel Apollo es un panel de control moderno
              construido para hacer tu vida como propietario de servidor super facil.
            </p>

            {/* Feature list */}
            <ul className="flex flex-col gap-3 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <li
                    key={feature.label}
                    className="flex items-center gap-3 transition-all duration-500 ease-out"
                    style={{
                      opacity: leftVisible ? 1 : 0,
                      transform: leftVisible ? "translateX(0)" : "translateX(-20px)",
                      transitionDelay: `${staggerDelay(index, 60)}ms`,
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature.label}</span>
                  </li>
                )
              })}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Vista Previa del Panel
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-5 py-2.5 rounded-lg hover:bg-card transition-colors text-sm"
              >
                Demo del Panel
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right side - Panel Preview */}
          <div
            ref={rightRef}
            className="flex-1 w-full transition-all duration-700 ease-out"
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "translateX(0) scale(1)" : "translateX(40px) scale(0.97)",
              transitionDelay: "0.15s",
            }}
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4">
                  <div className="bg-muted rounded-md px-3 py-1 text-xs text-muted-foreground max-w-xs">
                    panel.forzahost.com
                  </div>
                </div>
              </div>
              <div className="p-6 font-mono text-xs">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-green-500">Servidor en linea</span>
                  <span className="text-muted-foreground ml-auto">CPU: 12% | RAM: 2.1GB/4GB</span>
                </div>
                <div className="bg-background rounded-lg p-4 h-48 overflow-hidden">
                  <p className="text-muted-foreground">{"[15:32:01] [Server] Servidor iniciado en 3.2s"}</p>
                  <p className="text-muted-foreground">{"[15:32:01] [Server] Cargando mundo: world"}</p>
                  <p className="text-green-500">{"[15:32:02] [Server] Listo! Para ayuda, escribe \"help\""}</p>
                  <p className="text-muted-foreground">{"[15:33:15] [Server] Carlos se ha unido al juego"}</p>
                  <p className="text-muted-foreground">{"[15:33:28] [Server] Maria se ha unido al juego"}</p>
                  <p className="text-primary">{"[15:34:02] [Server] Guardado automatico completado"}</p>
                  <p className="text-muted-foreground">{"[15:35:10] [Server] Diego se ha unido al juego"}</p>
                  <p className="text-muted-foreground mt-2 flex items-center gap-1">
                    <span className="text-primary">{">"}</span>
                    <span className="animate-pulse">_</span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="mt-6 border-l-2 border-primary pl-4 transition-all duration-700 ease-out"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "0.35s",
              }}
            >
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                {"\"Estan constantemente mejorando — ya sea el panel de control, el area de cliente, o nuevas funciones. Es genial ver y experimentar estas actualizaciones cada vez que uso sus servicios.\""}
              </p>
              <p className="text-sm text-foreground font-medium mt-2">— Miguel A.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Zap } from "lucide-react"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"

const footerLinks = {
  "Hosting de Juegos": [
    "Minecraft Hosting",
    "Valheim Hosting",
    "Terraria Hosting",
    "Satisfactory Hosting",
    "Factorio Hosting",
    "Astroneer Hosting",
  ],
  "Cloud Hosting": ["VPS KVM", "Servidor Dedicado", "Hosting Web", "Bot de Discord"] as string[],
  Compania: ["Sobre Nosotros", "Contacto", "Afiliados", "Empleo", "Blog"],
  Soporte: ["Base de Conocimiento", "Estado del Servicio", "Abrir un Ticket", "Chat en Vivo"],
}

const linkGroups = Object.entries(footerLinks)

export function Footer() {
  const [footerRef, footerVisible] = useScrollReveal({ threshold: 0.08 })

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div ref={footerRef} className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo column */}
          <div
            className="col-span-2 md:col-span-1 transition-all duration-700 ease-out"
            style={{
              opacity: footerVisible ? 1 : 0,
              transform: footerVisible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <a href="#" className="flex items-center gap-2 mb-4">
              <Zap className="h-7 w-7 text-primary" />
              <span
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                FORZA<span className="text-primary">HOST</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hosting de servidores de juegos de alto rendimiento a precios increibles.
            </p>
          </div>

          {/* Link columns */}
          {linkGroups.map(([category, links], colIndex) => (
            <div
              key={category}
              className="transition-all duration-700 ease-out"
              style={{
                opacity: footerVisible ? 1 : 0,
                transform: footerVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${staggerDelay(colIndex + 1, 80)}ms`,
              }}
            >
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => {
                  const isCloudItem = category === "Cloud Hosting" && ["VPS KVM", "Servidor Dedicado", "Hosting Web", "Bot de Discord"].includes(link)
                  return (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link}
                        {isCloudItem && (
                          <span className="text-[8px] font-bold tracking-wider text-primary bg-primary/15 px-1 py-0.5 rounded">
                            PRONTO
                          </span>
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 ease-out"
          style={{
            opacity: footerVisible ? 1 : 0,
            transitionDelay: "0.4s",
          }}
        >
          <p className="text-xs text-muted-foreground">
            {"2024 ForzaHost. Todos los derechos reservados."}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Politica de Privacidad
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terminos de Servicio
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Politica de Reembolso
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

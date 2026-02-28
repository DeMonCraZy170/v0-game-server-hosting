import { Zap } from "lucide-react"

const footerLinks = {
  "Hosting de Juegos": [
    "Minecraft Hosting",
    "Valheim Hosting",
    "Terraria Hosting",
    "Satisfactory Hosting",
    "Factorio Hosting",
    "Astroneer Hosting",
  ],
  "Cloud Hosting": [
    "VPS KVM",
    "Servidor Dedicado",
    "Hosting Web",
    "Bot de Discord",
  ],
  Compania: [
    "Sobre Nosotros",
    "Contacto",
    "Afiliados",
    "Empleo",
    "Blog",
  ],
  Soporte: [
    "Base de Conocimiento",
    "Estado del Servicio",
    "Abrir un Ticket",
    "Chat en Vivo",
  ],
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Zap className="h-7 w-7 text-primary" />
              <span className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                FORZA<span className="text-primary">HOST</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hosting de servidores de juegos de alto rendimiento a precios increibles.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
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

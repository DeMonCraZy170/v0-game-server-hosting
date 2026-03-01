"use client"

import { Ticket, MessageSquare } from "lucide-react"
import Link from "next/link"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// Contact methods configuration
const contactMethods = [
  {
    icon: Ticket,
    title: "TICKET DE SOPORTE",
    description:
      "Plataforma principal de soporte. Para todo lo relacionado con facturacion, ventas, pre-ventas y asistencia tecnica.",
    cta: "Enviar un Ticket",
    href: "#",
    disabled: false,
  },
  {
    icon: MessageSquare,
    title: "SERVIDOR DE DISCORD",
    description:
      "Unete a nuestra comunidad para chatear con otros usuarios y recibir soporte de la comunidad.",
    cta: "Unirse a Discord",
    href: "https://discord.gg/EVxNxChX",
    disabled: false,
    external: true,
  },

]

export function ContactPageContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Shared Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </div>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-32">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Inicio
          </Link>
          <span>{">"}</span>
          <span className="text-foreground">Contactar Soporte</span>
        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Contactanos
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          {"Tienes alguna pregunta o necesitas ayuda? Ponte en contacto con nosotros!"}
        </p>
      </div>

      {/* Contact Cards */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <div
                key={method.title}
                className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #f5a623, #e09100)",
                }}
              >
                {/* Card Content */}
                <div className="flex flex-col flex-1 p-7">
                  <h3
                    className="text-lg font-extrabold tracking-wide mb-3"
                    style={{ fontFamily: "var(--font-heading)", color: "#0d0d0d" }}
                  >
                    {method.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#3d2800" }}>
                    {method.description}
                  </p>

                  {/* CTA Button */}
                  <a
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="mt-auto flex items-center justify-center rounded-xl py-3.5 px-6 text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90"
                    style={{
                      background: "#0d0d0d",
                      color: "#f5f5f5",
                    }}
                  >
                    {method.cta}
                  </a>
                </div>

                {/* Decorative bottom section */}
                <div className="px-7 pb-6 pt-2">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex gap-2">
                      <div
                        className="h-3 rounded-full"
                        style={{ width: "30%", background: "rgba(13,13,13,0.15)" }}
                      />
                      <div
                        className="h-3 rounded-full"
                        style={{ width: "50%", background: "rgba(13,13,13,0.15)" }}
                      />
                      <div
                        className="h-3 rounded-full"
                        style={{ width: "20%", background: "rgba(13,13,13,0.1)" }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <div
                        className="h-3 rounded-full"
                        style={{ width: "45%", background: "rgba(13,13,13,0.12)" }}
                      />
                      <div
                        className="h-3 rounded-full"
                        style={{ width: "35%", background: "rgba(13,13,13,0.12)" }}
                      />
                    </div>
                    <div
                      className="h-8 rounded-lg mt-1"
                      style={{ background: "rgba(13,13,13,0.08)" }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Shared Footer */}
      <Footer />
    </div>
  )
}

"use client"

import { Zap, Shield, Clock, Users, Globe, Server, HeartHandshake, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Footer } from "@/components/footer"

// Stats data
const stats = [
  { label: "HOSTING DESDE", value: "2024", description: "Ano de fundacion" },
  { label: "UBICACIONES GLOBALES", value: "1", description: "Proximamente mas" },
  { label: "CLIENTES ACTIVOS", value: "50+", description: "Y creciendo" },
  { label: "SERVIDORES DESPLEGADOS", value: "100+", description: "Capacidad total" },
]

// Values/How we do it
const values = [
  {
    icon: Zap,
    title: "Rendimiento Sin Compromisos",
    description:
      "Utilizamos hardware de ultima generacion con procesadores de alto rendimiento y almacenamiento NVMe para garantizar que tu servidor funcione a maxima velocidad.",
  },
  {
    icon: Shield,
    title: "Proteccion DDoS Avanzada",
    description:
      "Todos nuestros servidores incluyen proteccion DDoS gratuita para mantener tu servidor en linea incluso durante los ataques mas intensos.",
  },
  {
    icon: Clock,
    title: "Soporte 24/7",
    description:
      "Nuestro equipo de soporte esta disponible las 24 horas del dia, los 7 dias de la semana para ayudarte con cualquier problema o consulta.",
  },
  {
    icon: HeartHandshake,
    title: "Precios Justos",
    description:
      "Creemos que el hosting de calidad no tiene que ser caro. Ofrecemos planes accesibles sin sacrificar rendimiento ni caracteristicas.",
  },
]

// Team focus areas
const focusAreas = [
  {
    icon: Server,
    title: "Hardware Enterprise",
    description: "Procesadores de alto rendimiento y almacenamiento NVMe de ultima generacion.",
  },
  {
    icon: Globe,
    title: "Red Global",
    description: "Ubicaciones estrategicas para minimizar la latencia de tus jugadores.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description: "Una comunidad activa en Discord donde puedes conectar con otros usuarios.",
  },
  {
    icon: Rocket,
    title: "Innovacion Constante",
    description: "Siempre mejorando y anadiendo nuevas caracteristicas a nuestros servicios.",
  },
]

export function AboutUsContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/about-bg.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-12">
            <Link href="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <span>{">"}</span>
            <span className="text-foreground">Sobre Nosotros</span>
          </div>

          {/* Mission Section */}
          <div className="max-w-4xl">
            <p
              className="text-sm font-bold tracking-widest mb-4"
              style={{ color: "#f59e0b" }}
            >
              NUESTRA MISION
            </p>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Impulsar tus ideas con servicios de hosting de alto rendimiento a un precio accesible.
            </h1>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative rounded-2xl p-6 md:p-8 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(245,158,11,0.05) 100%)",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              <p
                className="text-xs md:text-sm font-bold tracking-wider mb-2"
                style={{ color: "#f59e0b" }}
              >
                {stat.label}
              </p>
              <p
                className="text-3xl md:text-5xl font-black text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Text */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <p className="text-muted-foreground leading-relaxed">
            Desde nuestra fundacion, ForzaHost ha sido construido sobre una creencia fundamental: 
            que el hosting de calidad y los precios accesibles no tienen que ser mutuamente excluyentes. 
            Nos esforzamos por ofrecer la mejor experiencia de hosting posible.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Al ofrecer planes de hosting que comienzan desde precios muy accesibles, nos aseguramos 
            de que incluso los usuarios con presupuestos ajustados puedan acceder a servicios de 
            hosting de alta calidad con caracteristicas premium que no encontraras en ningun otro lugar.
          </p>
        </div>
      </div>

      {/* How We Do It Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <p
          className="text-sm font-bold tracking-widest mb-4"
          style={{ color: "#f59e0b" }}
        >
          COMO LO HACEMOS
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          {/* Left Column */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Te Ahorramos Mucho Dinero
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              En ForzaHost, combinamos asequibilidad con rendimiento excepcional. 
              Nuestros planes de hosting de servidores de juegos comienzan desde precios muy competitivos, 
              haciendo que los servidores de alta calidad sean accesibles para todos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              En promedio, nuestros clientes ahorran significativamente en su factura mensual de hosting 
              de servidores de juegos, mientras obtienen hardware de servidor que es considerablemente mas rapido.
            </p>
          </div>

          {/* Right Column */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Enfocados en lo que Importa
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Para lograr esto, nos enfocamos en perfeccionar lo basico:
            </p>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span style={{ color: "#f59e0b" }}>•</span>
                Hardware de nivel enterprise para darte el mejor rendimiento
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#f59e0b" }}>•</span>
                Ubicaciones de servidor globales para minimizar tu latencia
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#f59e0b" }}>•</span>
                Panel de control intuitivo para ahorrarte dolores de cabeza
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#f59e0b" }}>•</span>
                Soporte al cliente 24/7 para ayudarte cuando lo necesites
              </li>
              <li className="flex items-start gap-2">
                <span style={{ color: "#f59e0b" }}>•</span>
                Proteccion DDoS gratuita para protegerte de actores maliciosos
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <p
          className="text-sm font-bold tracking-widest mb-4"
          style={{ color: "#f59e0b" }}
        >
          NUESTROS VALORES
        </p>
        <h2
          className="text-2xl md:text-3xl font-bold text-foreground mb-12"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Lo que nos define
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.02) 100%)",
                  border: "1px solid rgba(245,158,11,0.15)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(245,158,11,0.15)" }}
                >
                  <Icon className="w-6 h-6" style={{ color: "#f59e0b" }} />
                </div>
                <h3
                  className="text-lg font-bold text-foreground mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <p
          className="text-sm font-bold tracking-widest mb-4"
          style={{ color: "#f59e0b" }}
        >
          EN QUE NOS ENFOCAMOS
        </p>
        <h2
          className="text-2xl md:text-3xl font-bold text-foreground mb-12"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Pilares de nuestro servicio
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(245,158,11,0.1)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#f59e0b" }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    {area.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div
          className="rounded-3xl p-8 md:p-12 text-center"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "#0d0d0d" }}
          >
            Listo para comenzar?
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: "#3d2800" }}>
            Unete a cientos de clientes satisfechos que confian en ForzaHost para sus servidores de juegos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/game-server-hosting"
              className="inline-flex items-center justify-center rounded-xl py-3.5 px-8 text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90"
              style={{
                background: "#0d0d0d",
                color: "#f5f5f5",
              }}
            >
              Ver Planes de Hosting
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-xl py-3.5 px-8 text-sm font-bold tracking-wide transition-all duration-200"
              style={{
                background: "rgba(13,13,13,0.15)",
                color: "#0d0d0d",
              }}
            >
              Contactar Soporte
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

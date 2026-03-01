"use client"

import Image from "next/image"
import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ExternalLink,
  Server,
  Globe,
  Shield,
  Star,
  Zap,
  CheckCircle2,
  MessageCircle,
  Cpu,
  HardDrive,
  Users,
  ShieldCheck,
} from "lucide-react"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"
import { Footer } from "@/components/footer"
import type { GameDetail } from "@/lib/game-data"

/* ─── DDoS features ─── */

const ddosFeatures = [
  {
    icon: Star,
    title: "Deteccion Activa",
    description: "Monitoreamos activamente tu servidor para detectar actividad maliciosa y ataques.",
  },
  {
    icon: CheckCircle2,
    title: "Proveedores Premium",
    description: "Estamos asociados con los mejores proveedores de proteccion DDoS disponibles.",
  },
  {
    icon: Shield,
    title: "Capacidad a Escala Terabit",
    description: "Nuestra red de proteccion asegura que podemos defender tu servidor de las amenazas mas grandes.",
  },
  {
    icon: Zap,
    title: "Mitigacion en 1 Segundo",
    description: "Nuestra red comienza a mitigar ataques casi al instante tan pronto como se detectan.",
  },
]

/* ─── Locations ─── */

const regions = [
  {
    region: "Norte America",
    locations: [
      { name: "OVH Beauharnois, Canada", flag: "CA", active: true },
      { name: "Miami, Florida", flag: "US", active: false },
      { name: "Dallas, Texas", flag: "US", active: false },
      { name: "Los Angeles, California", flag: "US", active: false },
    ],
  },
  {
    region: "Europa",
    locations: [
      { name: "Paris, Francia", flag: "FR", active: false },
      { name: "Helsinki, Finlandia", flag: "FI", active: false },
      { name: "Viena, Austria", flag: "AT", active: false },
    ],
  },
  {
    region: "Asia",
    locations: [
      { name: "Singapur, Asia", flag: "SG", active: false },
      { name: "Mumbai, India", flag: "IN", active: false },
    ],
  },
  {
    region: "Oceania",
    locations: [{ name: "Sydney, Australia", flag: "AU", active: false }],
  },
]

const locationDots = [
  { name: "OVH Beauharnois, Canada", x: 27, y: 28, active: true },
  { name: "Miami, Florida", x: 24, y: 40, active: false },
  { name: "Dallas, Texas", x: 20, y: 36, active: false },
  { name: "Los Angeles, California", x: 14, y: 35, active: false },
  { name: "Paris, Francia", x: 48, y: 27, active: false },
  { name: "Helsinki, Finlandia", x: 54, y: 19, active: false },
  { name: "Viena, Austria", x: 51, y: 27, active: false },
  { name: "Singapur, Asia", x: 76, y: 52, active: false },
  { name: "Mumbai, India", x: 70, y: 42, active: false },
  { name: "Sydney, Australia", x: 86, y: 72, active: false },
]

const flagEmoji: Record<string, string> = {
  CA: "🇨🇦", US: "🇺🇸", FR: "🇫🇷", FI: "🇫🇮", AT: "🇦🇹", SG: "🇸🇬", IN: "🇮🇳", AU: "🇦🇺",
}

/* ─── Component ─── */

export function GameDetailContent({ game }: { game: GameDetail }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  const [heroRef, heroVisible] = useScrollReveal()
  const [plansRef, plansVisible] = useScrollReveal()
  const [featuresRef, featuresVisible] = useScrollReveal()
  const [whatIsRef, whatIsVisible] = useScrollReveal()
  const [multiplayerRef, multiplayerVisible] = useScrollReveal()
  const [ddosRef, ddosVisible] = useScrollReveal()
  const [locationsRef, locationsVisible] = useScrollReveal()
  const [faqRef, faqVisible] = useScrollReveal()

  const steamOrOfficialUrl = game.steamUrl ?? game.officialUrl
  const linkLabel = game.steamUrl ? "Ver en Steam" : "Sitio Oficial"

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── Hero ─── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Background overlay with game image */}
        <div className="absolute inset-0">
          <Image
            src={game.coverImage}
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            style={{ opacity: 0.12, filter: "blur(4px)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.85) 50%, #0d0d0d 100%)",
            }}
          />
        </div>

        <div
          ref={heroRef}
          className="relative mx-auto max-w-6xl px-4 transition-all duration-700 ease-out"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground transition-colors">Inicio</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <a href="/game-server-hosting" className="hover:text-foreground transition-colors">Game Server Hosting</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{game.tagline}</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Game cover image */}
            <div className="shrink-0">
              <div
                className="w-[140px] h-[180px] md:w-[160px] md:h-[200px] rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
              >
                <Image
                  src={game.coverImage}
                  alt={game.name}
                  width={160}
                  height={200}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {steamOrOfficialUrl && (
                <a
                  href={steamOrOfficialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {linkLabel}
                </a>
              )}
            </div>

            {/* Game info */}
            <div className="flex-1">
              <a
                href="/game-server-hosting"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Seleccionar un juego diferente
              </a>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {game.tagline}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {game.isNew && (
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                    NUEVO
                  </span>
                )}
                {game.isUpdate && (
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>
                    ACTUALIZADO
                  </span>
                )}
                {game.comingSoon && (
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase" style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.3)" }}>
                    PROXIMAMENTE
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Server className="w-3.5 h-3.5" />
                  100,000+ Servidores Desplegados
                </span>
                <span className="text-muted-foreground/40">{"•"}</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Globe className="w-3.5 h-3.5" />
                  Disponible en 8 Ubicaciones
                </span>
              </div>

              <p className="text-muted-foreground text-base max-w-2xl mb-6 leading-relaxed text-pretty">
                {game.description}
              </p>

              {/* CTA */}
              {!game.comingSoon && (
                <div>
                  <a
                    href="#planes"
                    className="inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg text-sm tracking-wide transition-all duration-200 hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)", color: "#0d0d0d" }}
                  >
                    Prueba Gratis por 1 Dia
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">Sin riesgo, cancela cuando quieras.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing Plans ─── */}
      <section id="planes" className="py-20 bg-background">
        <div
          ref={plansRef}
          className="mx-auto max-w-5xl px-4 transition-all duration-700 ease-out"
          style={{
            opacity: plansVisible ? 1 : 0,
            transform: plansVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {game.plans.map((plan, index) => (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: "#1a1a1f",
                  border: plan.bestSeller ? "1px solid rgba(245,166,35,0.4)" : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: plan.bestSeller ? "0 0 30px rgba(245,166,35,0.08)" : "none",
                  transitionDelay: `${staggerDelay(index, 120)}ms`,
                  opacity: plansVisible ? 1 : 0,
                  transform: plansVisible ? "translateY(0)" : "translateY(30px)",
                }}
              >
                {plan.bestSeller && (
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase"
                    style={{ background: "#ef4444", color: "#fff" }}
                  >
                    BEST SELLER!
                  </span>
                )}

                <div className="p-6 flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    {plan.name}
                  </h3>
                  <p className="text-3xl font-extrabold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                    ${plan.basePrice.toFixed(2)}
                  </p>
                  <p className="text-xs text-primary font-medium mb-5">Facturado mensualmente</p>

                  <ul className="flex flex-col gap-2.5">
                    <li className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <Cpu className="w-3.5 h-3.5 text-primary shrink-0" />
                      {plan.cores}
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <span className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </span>
                      {plan.ram} RAM
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <HardDrive className="w-3.5 h-3.5 text-primary shrink-0" />
                      {plan.storage}
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-foreground/90">
                      <Users className="w-3.5 h-3.5 text-primary shrink-0" />
                      {plan.players}
                    </li>
                  </ul>
                </div>

                <a
                  href={game.comingSoon ? undefined : "#"}
                  className="flex items-center justify-center px-6 py-4 text-sm font-bold tracking-wide transition-all duration-200"
                  style={{
                    background: plan.bestSeller
                      ? "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)"
                      : "rgba(255,255,255,0.06)",
                    color: plan.bestSeller ? "#0d0d0d" : "#f5f5f5",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    pointerEvents: game.comingSoon ? "none" : "auto",
                    opacity: game.comingSoon ? 0.5 : 1,
                  }}
                >
                  {game.comingSoon ? "Proximamente" : "Ordenar en Miami, Florida"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Exclusive Features Grid ─── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,13,13,0.97) 0%, rgba(20,20,25,0.95) 50%, rgba(13,13,13,0.97) 100%)" }} />

        <div className="relative mx-auto max-w-5xl px-4">
          <div
            ref={featuresRef}
            className="text-center mb-14 transition-all duration-700 ease-out"
            style={{
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
              FUNCIONES EXCLUSIVAS DE {game.name.toUpperCase()}
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Todo lo que necesitas para iniciar un servidor de {game.name}.
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 700ms ease-out 200ms",
            }}
          >
            {game.features.map((feat, i) => (
              <div
                key={feat.label}
                className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(8px)",
                  transitionDelay: `${staggerDelay(i, 60)}ms`,
                  opacity: featuresVisible ? 1 : 0,
                  transform: featuresVisible ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                  style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.15)" }}
                >
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </span>
                <span className="text-sm font-semibold text-foreground">{feat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What is [Game]? ─── */}
      <section className="py-20 bg-background">
        <div
          ref={whatIsRef}
          className="mx-auto max-w-6xl px-4 transition-all duration-700 ease-out"
          style={{
            opacity: whatIsVisible ? 1 : 0,
            transform: whatIsVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Que es {game.name}?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg text-pretty">
                {game.description}
              </p>

              {steamOrOfficialUrl && (
                <a
                  href={steamOrOfficialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-200 hover:bg-secondary"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <ExternalLink className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-foreground">{game.steamUrl ? "Ver Pagina de Steam" : "Visitar Sitio Oficial"}</p>
                    {game.steamPrice && (
                      <p className="text-xs text-muted-foreground">{game.steamPrice}</p>
                    )}
                  </div>
                </a>
              )}
            </div>

            <div className="shrink-0">
              <div
                className="w-full lg:w-[400px] h-[240px] rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
              >
                <Image
                  src={game.coverImage}
                  alt={`Que es ${game.name}`}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Play With Friends ─── */}
      <section className="py-20" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div
          ref={multiplayerRef}
          className="mx-auto max-w-6xl px-4 transition-all duration-700 ease-out"
          style={{
            opacity: multiplayerVisible ? 1 : 0,
            transform: multiplayerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Juega {game.name} con Amigos
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg text-pretty">
                {game.multiplayerDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                {["Hardware Probado", "Precios Bajos", "Configuracion en 5 Min"].map((badge) => (
                  <span key={badge} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(245,166,35,0.2)" }}>
                      <Zap className="w-3 h-3 text-primary" />
                    </span>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              <div
                className="w-full lg:w-[400px] h-[240px] rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
              >
                <Image
                  src={game.coverImage}
                  alt={`Juega ${game.name} con amigos`}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DDoS Protection ─── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.9) 50%, rgba(13,13,13,0.85) 100%)" }} />

        <div className="relative mx-auto max-w-7xl px-4">
          <div
            ref={ddosRef}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: ddosVisible ? 1 : 0,
              transform: ddosVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">PROTECCION DDOS</p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-balance max-w-lg"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Manten tu servidor seguro contra ataques DDoS.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-3xl">
              {ddosFeatures.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <div
                    key={feat.title}
                    className="flex items-start gap-4 transition-all duration-500"
                    style={{
                      transitionDelay: `${staggerDelay(i, 100)}ms`,
                      opacity: ddosVisible ? 1 : 0,
                      transform: ddosVisible ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    <span
                      className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                      style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.15)" }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-base font-bold text-foreground mb-1">{feat.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              className="flex flex-wrap items-center gap-8 px-6 py-5 rounded-xl mb-8 max-w-2xl"
              style={{ background: "rgba(255,255,255,0.02)", borderLeft: "4px solid var(--primary)" }}
            >
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">UPTIME</p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>99.9%+</p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">SERVIDORES PROTEGIDOS</p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>45,000+</p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">ATAQUES BLOQUEADOS</p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>1.4M+</p>
              </div>
            </div>

            <a
              href="/ddos-protection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)", color: "#0d0d0d" }}
            >
              Saber Mas
            </a>
          </div>
        </div>
      </section>

      {/* ─── Locations ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <div
            ref={locationsRef}
            className="text-center mb-14 transition-all duration-700 ease-out"
            style={{
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Cual ubicacion tiene el menor ping para ti?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              Hay 8+ ubicaciones globales para elegir para el despliegue instantaneo de tu servidor de {game.name}.
            </p>
          </div>

          {/* World map */}
          <div
            className="relative w-full aspect-[2/1] mb-10 rounded-xl overflow-hidden transition-all duration-700"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms",
            }}
          >
            {/* Dot grid world map */}
            <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Simplified dot-based world map */}
              {Array.from({ length: 50 }, (_, row) =>
                Array.from({ length: 100 }, (_, col) => {
                  const isLand =
                    (col > 15 && col < 30 && row > 10 && row < 45) ||
                    (col > 42 && col < 58 && row > 8 && row < 38) ||
                    (col > 55 && col < 75 && row > 12 && row < 45) ||
                    (col > 75 && col < 95 && row > 25 && row < 45) ||
                    (col > 60 && col < 80 && row > 5 && row < 20)
                  if (!isLand || Math.random() > 0.35) return null
                  return (
                    <circle
                      key={`${row}-${col}`}
                      cx={col}
                      cy={row}
                      r={0.25}
                      fill="rgba(255,255,255,0.12)"
                    />
                  )
                })
              )}
              {/* Location dots */}
              {locationDots.map((dot) => (
                <g key={dot.name}>
                  {dot.active && (
                    <circle cx={dot.x} cy={dot.y} r={1.5} fill="rgba(245,166,35,0.2)">
                      <animate attributeName="r" values="1.5;2.5;1.5" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r={0.6}
                    fill={dot.active || hoveredLocation === dot.name ? "#f5a623" : "rgba(255,255,255,0.4)"}
                    className="transition-all duration-300"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredLocation(dot.name)}
                    onMouseLeave={() => setHoveredLocation(null)}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Region cards */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{
              opacity: locationsVisible ? 1 : 0,
              transform: locationsVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 700ms ease-out 400ms",
            }}
          >
            {regions.map((r) => (
              <div key={r.region} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-sm font-bold text-foreground mb-3">{r.region}</p>
                <ul className="flex flex-col gap-2">
                  {r.locations.map((loc) => (
                    <li
                      key={loc.name}
                      className="flex items-center gap-2 text-xs transition-all duration-200 rounded-md px-2 py-1.5"
                      style={{
                        background: loc.active ? "rgba(245,166,35,0.12)" : "transparent",
                        color: loc.active ? "#f5a623" : "rgba(255,255,255,0.6)",
                      }}
                      onMouseEnter={() => setHoveredLocation(loc.name)}
                      onMouseLeave={() => setHoveredLocation(null)}
                    >
                      <span>{flagEmoji[loc.flag] ?? ""}</span>
                      <span className="truncate">{loc.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <div
            ref={faqRef}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: faqVisible ? 1 : 0,
              transform: faqVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance" style={{ fontFamily: "var(--font-heading)" }}>
                Preguntas
                <br />
                Frecuentes
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">No encuentras lo que buscas?</span>
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:bg-secondary"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#f5f5f5" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar Soporte
                </a>
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  <span style={{ color: "#22c55e" }}>En Linea</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {game.faqs.map((item, i) => {
                const isOpen = openFaq === i
                return (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      background: isOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                      border: isOpen ? "1px solid rgba(245,166,35,0.2)" : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 px-6 py-5 text-left"
                    >
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-md shrink-0 text-xs font-bold"
                        style={{ background: "rgba(245,166,35,0.15)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.2)" }}
                      >
                        ?
                      </span>
                      <span className="flex-1 text-sm font-bold text-foreground">{item.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pl-[4.25rem]">
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

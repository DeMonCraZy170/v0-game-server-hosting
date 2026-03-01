"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Zap,
  Server,
  DollarSign,
  Download,
  Wifi,
  Radio,
  RefreshCw,
  MessageCircle,
  BookOpen,
  Users,
  Database,
  HardDrive,
  ArrowRightLeft,
  Star,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
} from "lucide-react"
import { AnnouncementBar } from "@/components/announcement-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useScrollReveal, staggerDelay } from "@/hooks/use-scroll-reveal"

/* ── Plan Data ── */
const serverTypes = [
  {
    id: "vanilla",
    label: "VANILLA",
    color: "#22c55e",
    price: "$2.59",
    unit: "/GB Por Mes",
    processor: "Ryzen 9 7900 o equivalente",
    features: ["DDR5 RAM", "Almacenamiento NVMe", "Proteccion DDoS", "Soporte Activo 24/7", "Listo En Pocos Clics"],
    description: "Ideal para un servidor Minecraft pequeno con amigos.",
  },
  {
    id: "modded",
    label: "MODDED",
    color: "#3b82f6",
    price: "$2.59",
    unit: "/GB Por Mes",
    processor: "Ryzen 9 7900 o equivalente",
    features: ["DDR5 RAM", "Almacenamiento NVMe", "Proteccion DDoS", "Soporte Activo 24/7", "Listo En Pocos Clics"],
    description: "Perfecto para jugar modpacks e instalar mods y plugins.",
  },
  {
    id: "community",
    label: "COMUNIDAD",
    color: "#a855f7",
    price: "$4",
    unit: "/GB Por Mes",
    processor: "Ryzen 9 9900X o equivalente",
    features: ["DDR5 RAM", "Almacenamiento NVMe", "Proteccion DDoS", "Soporte Activo 24/7", "Listo En Pocos Clics"],
    description: "Para comunidades Minecraft con muchos jugadores en linea.",
  },
]

const features = [
  { icon: Zap, label: "Hardware Potente" },
  { icon: DollarSign, label: "Mejores Precios" },
  { icon: Download, label: "Instalador de Plugins" },
  { icon: Wifi, label: "99.99%+ Uptime" },
  { icon: Radio, label: "Sin Lag" },
  { icon: RefreshCw, label: "Actualizaciones Automaticas" },
  { icon: MessageCircle, label: "Soporte 24/7" },
  { icon: BookOpen, label: "100+ Articulos de Ayuda" },
  { icon: Users, label: "Slots Ilimitados" },
  { icon: Database, label: "Bases de Datos MySQL Gratis" },
  { icon: HardDrive, label: "Almacenamiento NVMe" },
  { icon: ArrowRightLeft, label: "Acceso FTP/SFTP" },
]

const ddosFeatures = [
  {
    icon: Star,
    title: "Deteccion Activa",
    description: "Monitoreamos activamente tu servidor contra actividad maliciosa y ataques.",
  },
  {
    icon: ShieldCheck,
    title: "Proveedores Premium",
    description: "Trabajamos con los mejores proveedores de proteccion disponibles.",
  },
  {
    icon: Layers,
    title: "Capacidad Terabit",
    description: "Nuestra red puede defender tu servidor de las amenazas mas grandes.",
  },
  {
    icon: Zap,
    title: "Mitigacion en 1s",
    description: "Nuestra red comienza a mitigar ataques casi instantaneamente.",
  },
]

const faqItems = [
  {
    q: "Por que ForzaHost es el mejor Minecraft Server Hosting?",
    a: "Ofrecemos el hosting de Minecraft mas confiable a los mejores precios. Hardware de ultima generacion, soporte 24/7 y garantia de devolucion de 48 horas.",
  },
  {
    q: "Nunca he creado un servidor de Minecraft, es dificil?",
    a: "No, para nada. Nuestro panel facilita la creacion de servidores. Puedes tener tu servidor corriendo en menos de 5 minutos sin conocimientos tecnicos.",
  },
  {
    q: "Que tan rapido responde el soporte cuando tengo un problema?",
    a: "Nuestro equipo de soporte responde en promedio en menos de 5 minutos. Estamos disponibles 24/7 a traves de chat en vivo y tickets.",
  },
  {
    q: "Puedo cambiar mi plan de hosting mas adelante?",
    a: "Si, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se aplican de forma instantanea sin tiempo de inactividad.",
  },
  {
    q: "Que versiones de Minecraft soportan?",
    a: "Soportamos todas las versiones de Minecraft Java Edition, desde las mas antiguas hasta la ultima version disponible, incluyendo snapshots.",
  },
]

const serverCapabilities = [
  "Soporte Bedrock",
  "Soporte de Mods",
  "Soporte de Plugins",
  "Soporte de Modpacks",
  "Soporte de Consola",
  "Soporte Movil",
]

/* ── Component ── */
export function MinecraftHostingContent() {
  const [selectedType, setSelectedType] = useState("vanilla")
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [heroRef, heroVisible] = useScrollReveal()
  const [plansRef, plansVisible] = useScrollReveal({ threshold: 0.1 })
  const [featuresRef, featuresVisible] = useScrollReveal({ threshold: 0.1 })
  const [typesRef, typesVisible] = useScrollReveal({ threshold: 0.1 })
  const [ddosRef, ddosVisible] = useScrollReveal({ threshold: 0.1 })
  const [faqRef, faqVisible] = useScrollReveal({ threshold: 0.1 })

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/minecraft-bg.jpg"
            alt=""
            fill
            className="object-cover object-right-top"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(13,13,13,0.97) 0%, rgba(13,13,13,0.85) 40%, rgba(13,13,13,0.5) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 60%, rgba(13,13,13,1) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <div
            ref={heroRef}
            className="flex flex-col md:flex-row items-start gap-10 transition-all duration-700 ease-out"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            {/* Minecraft cover image */}
            <div className="shrink-0 hidden md:block">
              <div
                className="w-[200px] h-[240px] rounded-xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src="/images/icon-minecraft.avif"
                  alt="Minecraft"
                  width={200}
                  height={240}
                  className="object-cover w-full h-full"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>

            {/* Hero text */}
            <div className="flex-1 max-w-2xl">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Minecraft
                <br />
                <span className="text-primary">Server Hosting</span>
              </h1>

              <div className="flex items-center gap-4 mt-5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">{"100,000+ Servidores Desplegados"}</span>
                </div>
                <span className="text-muted-foreground/50">{"/"}</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground">Despliegue Instantaneo</span>
                </div>
              </div>

              <p className="mt-5 text-muted-foreground leading-relaxed text-lg max-w-xl">
                Inicia tu servidor de Minecraft con el hardware mas rapido, a precios mas bajos que en cualquier otro
                lugar. Juegas con amigos? Usas muchos mods? Tienes una comunidad? Tenemos el servidor para ti.
              </p>

              <a
                href="#plans"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-lg text-base font-bold transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #16a34a, #22c55e, #4ade80)",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(34,197,94,0.3)",
                }}
              >
                Empezar Ahora
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Version banner */}
          <div
            className="mt-12 px-5 py-3 rounded-lg flex items-center gap-3 text-sm transition-all duration-700"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "200ms",
            }}
          >
            <Zap className="w-4 h-4 text-primary shrink-0" />
            <span className="text-foreground font-medium">
              Todos los planes de Minecraft Server Hosting estan listos para la version 1.21.11 {"\"Mounts Of Mayhem\""}
            </span>
          </div>
        </div>
      </section>

      {/* ─── PLAN SELECTOR SECTION ─── */}
      <section id="plans" className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4">
          <div
            ref={plansRef}
            className="rounded-2xl overflow-hidden transition-all duration-700 ease-out"
            style={{
              background: "#141416",
              border: "1px solid rgba(255,255,255,0.06)",
              opacity: plansVisible ? 1 : 0,
              transform: plansVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            {/* Step indicator */}
            <div className="px-8 pt-8 pb-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <span>Paso 1 de 4</span>
                <span>25%</span>
              </div>
              <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: "25%", background: "linear-gradient(90deg, #22c55e, #4ade80)" }}
                />
              </div>
            </div>

            <div className="px-8 pb-2">
              <h2
                className="text-2xl md:text-3xl font-bold text-foreground text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Que tipo de servidor Minecraft quieres iniciar?
              </h2>
            </div>

            {/* Plan cards */}
            <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {serverTypes.map((type) => {
                const isSelected = selectedType === type.id
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className="relative text-left rounded-xl p-5 transition-all duration-200"
                    style={{
                      background: isSelected ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                      border: isSelected
                        ? `2px solid ${type.color}`
                        : "2px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {/* Selected check */}
                    {isSelected && (
                      <div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: type.color }}
                      >
                        <Check className="w-3.5 h-3.5 text-background" />
                      </div>
                    )}

                    {/* Type label */}
                    <p
                      className="text-sm font-bold tracking-wider mb-4"
                      style={{ color: type.color }}
                    >
                      {type.label}
                    </p>

                    {/* Price */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {"Solo "}
                      <span className="text-xl font-extrabold text-foreground">{type.price}</span>
                      {type.unit}
                    </p>

                    {/* Features */}
                    <ul className="flex flex-col gap-2 mb-4">
                      <li className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="w-3.5 h-3.5 shrink-0" style={{ color: type.color }} />
                        <span>{type.processor}</span>
                      </li>
                      {type.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className="w-3.5 h-3.5 shrink-0" style={{ color: type.color }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Description */}
                    <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
                      {type.description}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Budget link */}
            <div className="px-8 pb-6 text-sm text-muted-foreground">
              {"Buscas una opcion mas economica? Revisa nuestro "}
              <a href="/proximamente" className="text-primary font-semibold hover:underline">
                Budget Minecraft Server Hosting
              </a>
              .
            </div>

            {/* Continue button */}
            <div className="px-8 pb-8 flex justify-end">
              <a
                href="/proximamente"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-foreground transition-all duration-200 hover:bg-secondary"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVER TYPES SECTION ─── */}
      <section className="py-20" style={{ background: "#111113" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div
            ref={typesRef}
            className="flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ease-out"
            style={{
              opacity: typesVisible ? 1 : 0,
              transform: typesVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="flex-1">
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Que Tipos De Servidores Minecraft Puedes Ejecutar?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
                Puedes ejecutar muchos tipos de servidores de Minecraft dependiendo de la experiencia que busques.
                Ofrecemos soporte completo para Minecraft Java vanilla, asi como para servidores Bedrock. Buscas una
                experiencia con mods? Tenemos soporte completo para Forge, Fabric, Spigot y Sponge.
              </p>
              <div className="flex flex-wrap gap-3">
                {serverCapabilities.map((cap) => (
                  <span
                    key={cap}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(34,197,94,0.2)" }}
                    >
                      <Check className="w-3 h-3 text-[#22c55e]" />
                    </span>
                    {cap}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 hidden lg:block">
              <div
                className="w-[320px] h-[220px] rounded-xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src="/images/icon-minecraft.avif"
                  alt="Tipos de servidores Minecraft"
                  width={320}
                  height={220}
                  className="object-cover w-full h-full"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          <div
            ref={featuresRef}
            className="text-center mb-14 transition-all duration-700 ease-out"
            style={{
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
              Caracteristicas Exclusivas De Minecraft
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Todo lo que necesitas para iniciar un servidor de Minecraft.
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
            {features.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.label}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    transitionDelay: `${staggerDelay(i, 60)}ms`,
                    opacity: featuresVisible ? 1 : 0,
                    transform: featuresVisible ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                    style={{
                      background: "rgba(245,166,35,0.1)",
                      border: "1px solid rgba(245,166,35,0.15)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{feat.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── DDOS PROTECTION ─── */}
      <section className="relative py-20 overflow-hidden">
        {/* DDoS background effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(13,13,13,1) 0%, rgba(20,20,30,1) 50%, rgba(13,13,13,1) 100%)",
          }}
        />
        {/* Subtle vertical lines */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(245,166,35,0.15) 30px, rgba(245,166,35,0.15) 31px)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4">
          <div
            ref={ddosRef}
            className="transition-all duration-700 ease-out"
            style={{
              opacity: ddosVisible ? 1 : 0,
              transform: ddosVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">
              PROTECCION DDOS
            </p>
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
                      style={{
                        background: "rgba(245,166,35,0.1)",
                        border: "1px solid rgba(245,166,35,0.15)",
                      }}
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

            {/* Stats bar */}
            <div
              className="flex flex-wrap items-center gap-8 px-6 py-5 rounded-xl mb-8 max-w-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderLeft: "4px solid var(--primary)",
              }}
            >
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">UPTIME</p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  99.9%+
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                  SERVIDORES PROTEGIDOS
                </p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  45,000+
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                  ATAQUES BLOQUEADOS
                </p>
                <p className="text-2xl font-extrabold text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                  1.4M+
                </p>
              </div>
            </div>

            <a
              href="/proximamente"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #d97706, #f5a623, #fbbf24)",
                color: "#0d0d0d",
              }}
            >
              Saber Mas
            </a>
          </div>
        </div>
      </section>

      {/* ─── FAQ SECTION ─── */}
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground text-balance"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Preguntas
                <br />
                Frecuentes
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">No encuentras lo que buscas?</span>
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:bg-secondary"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f5f5f5",
                  }}
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

            {/* FAQ items */}
            <div className="flex flex-col gap-2">
              {faqItems.map((item, i) => {
                const isOpen = openFaq === i
                return (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      background: isOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
                      border: isOpen
                        ? "1px solid rgba(245,166,35,0.2)"
                        : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 px-6 py-5 text-left"
                    >
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-md shrink-0 text-xs font-bold"
                        style={{
                          background: "rgba(245,166,35,0.15)",
                          color: "#f5a623",
                          border: "1px solid rgba(245,166,35,0.2)",
                        }}
                      >
                        ?
                      </span>
                      <span className="flex-1 text-sm font-bold text-foreground">{item.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pl-[4.25rem]">
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
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

"use client"

import { useState } from "react"
import { Check, Zap, Shield, Server, Users, Cpu, HardDrive } from "lucide-react"

type GameType = "cs16" | "cssource"

interface Plan {
  name: string
  price: string
  period: string
  slots: string
  popular?: boolean
  features: string[]
}

interface GamePlans {
  cs16: Plan[]
  cssource: Plan[]
}

// Placeholder plans - Easy to update
const gamePlans: GamePlans = {
  cs16: [
    {
      name: "Starter",
      price: "$4.99",
      period: "/mes",
      slots: "12 Slots",
      features: [
        "Proteccion DDoS",
        "Panel de Control",
        "Soporte 24/7",
        "Instalacion Instantanea",
      ],
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/mes",
      slots: "24 Slots",
      popular: true,
      features: [
        "Proteccion DDoS Avanzada",
        "Panel de Control Premium",
        "Soporte Prioritario 24/7",
        "Instalacion Instantanea",
        "Mods Preinstalados",
        "Backups Automaticos",
      ],
    },
    {
      name: "Elite",
      price: "$19.99",
      period: "/mes",
      slots: "32 Slots",
      features: [
        "Proteccion DDoS Enterprise",
        "Panel de Control Premium",
        "Soporte VIP 24/7",
        "Instalacion Instantanea",
        "Todos los Mods",
        "Backups Ilimitados",
        "IP Dedicada",
      ],
    },
  ],
  cssource: [
    {
      name: "Starter",
      price: "$6.99",
      period: "/mes",
      slots: "12 Slots",
      features: [
        "Proteccion DDoS",
        "Panel de Control",
        "Soporte 24/7",
        "Instalacion Instantanea",
      ],
    },
    {
      name: "Pro",
      price: "$12.99",
      period: "/mes",
      slots: "24 Slots",
      popular: true,
      features: [
        "Proteccion DDoS Avanzada",
        "Panel de Control Premium",
        "Soporte Prioritario 24/7",
        "Instalacion Instantanea",
        "SourceMod/MetaMod",
        "Backups Automaticos",
      ],
    },
    {
      name: "Elite",
      price: "$24.99",
      period: "/mes",
      slots: "32 Slots",
      features: [
        "Proteccion DDoS Enterprise",
        "Panel de Control Premium",
        "Soporte VIP 24/7",
        "Instalacion Instantanea",
        "Todos los Plugins",
        "Backups Ilimitados",
        "IP Dedicada",
      ],
    },
  ],
}

const gameInfo = {
  cs16: {
    name: "Counter-Strike 1.6",
    description: "El clasico legendario que definio el genero FPS competitivo",
    icon: "1.6",
  },
  cssource: {
    name: "Counter-Strike: Source",
    description: "La evolucion del clasico con el motor Source de Valve",
    icon: "CSS",
  },
}

export function CSPricingSection() {
  const [activeGame, setActiveGame] = useState<GameType>("cs16")

  const plans = gamePlans[activeGame]
  const info = gameInfo[activeGame]

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,166,35,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,166,35,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow effects */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #f5a623 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #f5a623 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide">HOSTING COUNTER-STRIKE</span>
          </div>
          
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Servidores de Alto Rendimiento
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hosting profesional para Counter-Strike con proteccion DDoS, latencia ultra baja y soporte 24/7
          </p>
        </div>

        {/* Game Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-xl bg-card border border-border">
            <button
              onClick={() => setActiveGame("cs16")}
              className={`
                relative px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300
                ${activeGame === "cs16" 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {activeGame === "cs16" && (
                <div className="absolute inset-0 bg-primary rounded-lg" />
              )}
              <span className="relative flex items-center gap-2">
                <span className="w-8 h-8 rounded-md bg-background/20 flex items-center justify-center text-xs font-bold">
                  1.6
                </span>
                Counter-Strike 1.6
              </span>
            </button>
            <button
              onClick={() => setActiveGame("cssource")}
              className={`
                relative px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300
                ${activeGame === "cssource" 
                  ? "text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              {activeGame === "cssource" && (
                <div className="absolute inset-0 bg-primary rounded-lg" />
              )}
              <span className="relative flex items-center gap-2">
                <span className="w-8 h-8 rounded-md bg-background/20 flex items-center justify-center text-xs font-bold">
                  CSS
                </span>
                CS: Source
              </span>
            </button>
          </div>
        </div>

        {/* Game Info */}
        <div className="text-center mb-10">
          <h3 
            className="text-2xl font-bold text-foreground mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {info.name}
          </h3>
          <p className="text-muted-foreground">{info.description}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={`${activeGame}-${plan.name}`}
              className={`
                relative rounded-2xl p-6 lg:p-8 transition-all duration-500
                ${plan.popular 
                  ? "bg-card border-2 border-primary shadow-[0_0_40px_rgba(245,166,35,0.15)]" 
                  : "bg-card/50 border border-border hover:border-border/80"
                }
              `}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider">
                    <Zap className="w-3 h-3" />
                    RECOMENDADO
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 pt-2">
                <h4 className="text-lg font-semibold text-foreground mb-4">{plan.name}</h4>
                
                {/* Slots Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary mb-4">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{plan.slots}</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-center gap-1">
                  <span 
                    className={`text-4xl lg:text-5xl font-bold ${plan.popular ? "text-primary" : "text-foreground"}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-6" />

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`
                      w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5
                      ${plan.popular ? "bg-primary/20" : "bg-secondary"}
                    `}>
                      <Check className={`w-3 h-3 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`
                  w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300
                  ${plan.popular 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_20px_rgba(245,166,35,0.3)]" 
                    : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                  }
                `}
              >
                Ordenar Ahora
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Features */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Shield, label: "Proteccion DDoS", desc: "Mitigacion avanzada" },
            { icon: Server, label: "99.9% Uptime", desc: "Garantizado" },
            { icon: Cpu, label: "Hardware Premium", desc: "CPUs de ultima generacion" },
            { icon: HardDrive, label: "SSD NVMe", desc: "Almacenamiento ultra rapido" },
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center text-center p-4 rounded-xl bg-card/30 border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="font-semibold text-foreground text-sm">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

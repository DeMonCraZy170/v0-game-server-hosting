"use client";

import { Zap } from "lucide-react";
import { Footer } from "@/components/footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState, useCallback, useEffect } from "react";


const brandColors = {
  primary: {
    name: "Forza Orange",
    hex: "#F5A623",
    rgb: "245, 166, 35",
    usage: "Color principal de la marca. Botones primarios, enlaces, iconos activos, elementos interactivos, CTAs.",
  },

  primaryLight: {
    name: "Forza Orange Light",
    hex: "#FFC04D",
    rgb: "255, 192, 77",
    usage:  "Hovers, estados activos, gradientes suaves, highlights, resplandores.",
  },

  primaryDark: {
    name: "Forza Orange Dark",
    hex: "#D4891A",
    rgb: "212, 137, 26",
    usage: "Sombras, bordes, estados pressed, textos sobre fondos claros.",
  },

  background: {
    name: "Forza Dark",
    hex: "#0F0F1A",
    rgb: "15, 15, 26",
    usage: "Fondo principal de toda la interfaz. Base de la identidad oscura de la marca.",
  },

  text: {
    name: "Forza White",
    hex: "#FAFAFA",
    rgb: "250, 250, 250",
    usage: "Texto principal, títulos, contenido legible sobre fondos oscuros.",
  },

  muted: {
    name: "Forza Gray",
    hex: "#6B7280",
    rgb: "107, 114, 128",
    oklch: "oklch(0.45 0 0)",
    usage: "Texto secundario, placeholders, iconos inactivos, descripciones.",
  },
};

function ColorSwatch({ color }: { color: typeof brandColors.primary }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="h-28 w-full" style={{ backgroundColor: color.hex }} />

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-foreground">{color.name}</h4>

          {/* <CopyButton text={color.hex} /> */}
        </div>

        <div className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">HEX</span>

            <code className="font-sans text-foreground">{color.hex}</code>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">RGB</span>

            <code className="font-sans text-foreground">{color.rgb}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OurBrandContent() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <div
      className="min-h-screen bg-background flex flex-col transition-all duration-700 ease-out relative overflow-hidden"
      ref={headerRef}
      style={{
        opacity: headerVisible ? 1 : 0,

        transform: headerVisible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      {/* --- FONDO TECH EXTENDIDO --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Grid de cuadros - Ahora h-full y con máscara más larga */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(to right, #6B7280 1px, transparent 1px), linear-gradient(to bottom, #6B7280 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            // Máscara lineal que se desvanece mucho después (al 90% de la página)
            maskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 40%, transparent 95%)",
          }}
        />

        {/* Glows de fondo */}
        <div className="absolute top-[-10%] left-[20%] w-[50%] h-[30%] bg-[#F5A623]/15 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[20%] bg-[#D4891A]/10 blur-[100px] rounded-full" />
      </div>

      {/* Main content */}

      <main className="flex-1 relative z-10 flex items-center justify-center py-[15vh]">
        <div className="text-center max-w-4xl mx-auto py-5 px-6">
          {/* Introduction */}

          <section id="intro" className="space-y-8 pt-18 pb-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                <Zap size={14} /> Brand Guidelines 2026
              </div>

              <h1
                className="text-4xl md:text-7xl font-black text-foreground tracking-tight"
                style={{
                  fontFamily: "var(--font-space-grotesk), Space Grotesk",
                }}
              >
                Manual de <span className="text-primary italic">Marca</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
                Esta guía define los elementos visuales de la identidad de{" "}
                <span className="text-foreground">
                  Forza
                  <span className="text-primary">Host</span>
                </span>
                . Consistencia y potencia para el gaming.
              </p>
            </div>
          </section>

          {/* Navegación Estilo Tabs */}

          <div className="flex justify-center gap-2 pb-16">
            {["logo", "colors"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="group relative px-6 py-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {item}s
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
          </div>

          <section id="logo" className="scroll-mt-36 space-y-8">
            {/* Main Logo */}

            <div className="bg-card rounded-xl border border-border p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Dark background version */}

                <div className="space-y-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Versión Principal (Fondo Oscuro)
                  </span>

                  <div className="bg-background rounded-lg p-8 my-2 flex items-center justify-center border border-border">
                    <div className="flex items-center gap-3">
                      <Zap className="w-9 h-9 text-primary" />

                      <span
                        className="text-2xl font-extrabold tracking-tight text-foreground"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        FORZA <span className="text-primary">HOST</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Light background version */}

                <div className="space-y-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Versión Alternativa (Fondo Claro)
                  </span>

                  <div className="bg-white rounded-lg p-8 my-2 flex items-center justify-center border border-border">
                    <div className="flex items-center gap-3">
                      <Zap className="w-9 h-9 text-primary" />

                      <span
                        className="text-2xl font-extrabold text-[#0F0F1A]"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        FORZA<span className="text-[#F5A623]">HOST</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Variations */}

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Isotipo
                </span>

                <div className="bg-background rounded-lg p-6 flex items-center justify-center border border-border">
                  <Zap className="w-9 h-9 text-primary" />
                </div>

                <p className="text-sm text-muted-foreground">
                  Usar cuando el espacio es limitado o como favicon.
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Logotipo Horizontal
                </span>

                <div className="bg-background rounded-lg p-6 flex items-center justify-center border border-border">
                  <div className="flex items-center gap-2">
                    <Zap className="w-9 h-9 text-primary" />

                    <span
                      className="text-xl font-extrabold text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Forza<span className="text-primary">Host</span>
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Versión estándar para headers y materiales.
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Monocromático
                </span>

                <div className="bg-background rounded-lg p-6 flex items-center justify-center border border-border">
                  <div className="flex items-center gap-2">
                    <Zap className="w-9 h-9 text-foreground" />

                    <span
                      className="text-xl font-extrabold font-primary text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      ForzaHost
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Para impresión en un solo color o fondos complejos.
                </p>
              </div>
            </div>

            {/* Logo Spacing */}

            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h4 className="text-lg font-semibold text-foreground">
                Área de Protección
              </h4>

              <p className="text-sm text-muted-foreground">
                Mantener un espacio mínimo alrededor del logo equivalente a la
                altura de la {'"F"'} del logotipo.
              </p>

              <div className="bg-background rounded-lg p-14 flex items-center justify-center border border-border">
                <div className="relative">
                  <div className="absolute inset-0 border-2 border-dashed border-primary/30 -m-6 rounded-lg" />

                  <div className="flex items-center gap-3">
                    <Zap className="w-9 h-9 text-primary" />

                    <span
                      className="text-3xl font-extrabold text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Forza<span className="text-primary">Host</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Colors */}

          <section id="colors" className="scroll-mt-36 space-y-8 py-20">
            <div className="space-y-4">
              <h2
                className="text-3xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Paleta de Colores
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                La paleta de ForzaHost está diseñada para interfaces oscuras de
                alto contraste. El naranja vibrante (#F5A623) actúa como color
                primario de acción, mientras que los tonos oscuros crean
                profundidad y sofisticación tecnológica.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(brandColors).map((color) => (
                <ColorSwatch key={color.name} color={color} />
              ))}
            </div>

            {/* Color Combinations */}

            <div className="bg-card rounded-xl border border-border p-6 space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                Combinaciones Recomendadas
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="h-24 rounded-lg bg-[#0F0F1A] flex items-center justify-center">
                    <span className="text-[#F5A623] font-semibold">
                      Texto Naranja sobre Oscuro
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    CTAs, enlaces, elementos interactivos
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-24 rounded-lg bg-[#F5A623] flex items-center justify-center">
                    <span className="text-[#0F0F1A] font-semibold">
                      Texto Oscuro sobre Naranja
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Botones primarios, badges
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-24 rounded-lg bg-[#0F0F1A] flex items-center justify-center">
                    <span className="text-[#FAFAFA] font-semibold">
                      Texto Blanco sobre Oscuro
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Contenido principal, cards
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

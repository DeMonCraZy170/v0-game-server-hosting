import { Metadata } from "next"
import { CSPricingSection } from "@/components/cs-pricing-section"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Counter-Strike Hosting | CS 1.6 & Source - ForzaHost",
  description: "Hosting profesional para servidores de Counter-Strike 1.6 y Counter-Strike: Source. Proteccion DDoS, latencia ultra baja, soporte 24/7 y precios competitivos.",
}

export default function CounterStrikePage() {
  return (
    <main className="min-h-screen pt-24 lg:pt-28">
      <CSPricingSection />
      <Footer />
    </main>
  )
}

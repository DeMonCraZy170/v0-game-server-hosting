import type { Metadata } from "next"
import { AboutUsContent } from "@/components/about-us-content"

export const metadata: Metadata = {
  title: "Sobre Nosotros - ForzaHost",
  description: "Conoce mas sobre ForzaHost, nuestra mision, valores y el equipo detras de nuestros servicios de hosting de alto rendimiento.",
}

export default function AboutUsPage() {
  return <AboutUsContent />
}

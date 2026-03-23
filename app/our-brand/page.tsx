
import type { Metadata } from "next"
import { OurBrandContent } from "@/components/our-brand-content"

export const metadata: Metadata = {
  title: "Proximamente - ForzaHost",
  description: "Esta seccion estara disponible muy pronto. Estamos trabajando para ofrecerte la mejor experiencia.",
}

export default function OurBrand() {
  return <OurBrandContent />
}

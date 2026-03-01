import type { Metadata } from "next"
import { ComingSoonContent } from "@/components/coming-soon-content"

export const metadata: Metadata = {
  title: "Proximamente - ForzaHost",
  description: "Esta seccion estara disponible muy pronto. Estamos trabajando para ofrecerte la mejor experiencia.",
}

export default function ComingSoonPage() {
  return <ComingSoonContent />
}

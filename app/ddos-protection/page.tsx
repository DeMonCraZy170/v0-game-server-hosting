import { Metadata } from "next"
import { DdosProtectionContent } from "@/components/ddos-protection-content"

export const metadata: Metadata = {
  title: "Proteccion DDoS - ForzaHost",
  description:
    "Proteccion DDoS de nivel empresarial para tu servidor de juegos. Filtrado de trafico, limitacion de tasa, monitoreo 24/7 y 99.9% de uptime. Todos los planes incluyen proteccion DDoS sin costo adicional.",
}

export default function DdosProtectionPage() {
  return <DdosProtectionContent />
}

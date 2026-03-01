import { Metadata } from "next"
import { GameServerHostingContent } from "@/components/game-server-hosting-content"

export const metadata: Metadata = {
  title: "Hosting de Servidores de Juegos - ForzaHost",
  description:
    "Explora todos nuestros servidores de juegos disponibles. DayZ, Minecraft, Rust, Valheim y mas. Precios increibles con soporte 24/7.",
}

export default function JuegosPage() {
  return <GameServerHostingContent />
}

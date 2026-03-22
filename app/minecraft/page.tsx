import { Metadata } from "next"
import { getGameBySlug } from "@/lib/game-data"
import { GameDetailContent } from "@/components/game-detail-content"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Minecraft Server Hosting - ForzaHost",
  description:
    "Hosting de servidores Minecraft Java Edition de alto rendimiento. Hardware potente, precios accesibles, instalacion instantanea y soporte 24/7.",
}

export default function MinecraftPage() {
  const game = getGameBySlug("minecraft")
  
  if (!game) {
    notFound()
  }
  
  return <GameDetailContent game={game} />
}

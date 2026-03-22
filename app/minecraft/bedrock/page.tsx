import { Metadata } from "next"
import { getGameBySlug } from "@/lib/game-data"
import { GameDetailContent } from "@/components/game-detail-content"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Minecraft Bedrock Server Hosting - ForzaHost",
  description:
    "Hosting de servidores Minecraft Bedrock Edition de alto rendimiento. Multiplataforma, hardware potente, precios accesibles, instalacion instantanea y soporte 24/7.",
}

export default function MinecraftBedrockPage() {
  const game = getGameBySlug("minecraft-bedrock")
  
  if (!game) {
    notFound()
  }
  
  return <GameDetailContent game={game} />
}

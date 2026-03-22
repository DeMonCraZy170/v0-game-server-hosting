import { Metadata } from "next"
import { getGameBySlug } from "@/lib/game-data"
import { GameDetailContent } from "@/components/game-detail-content"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Budget Minecraft Server Hosting - ForzaHost",
  description:
    "Hosting de servidores Minecraft con presupuesto ajustado. Hardware rapido, almacenamiento SSD, precios accesibles desde $1/mes. Soporte 24/7 y configuracion instantanea.",
}

export default function BudgetMinecraftPage() {
  const game = getGameBySlug("minecraft")
  
  if (!game) {
    notFound()
  }
  
  return <GameDetailContent game={game} />
}

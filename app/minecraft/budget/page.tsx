import { Metadata } from "next"
import { MinecraftHostingContent } from "@/components/minecraft-hosting-content"

export const metadata: Metadata = {
  title: "Budget Minecraft Server Hosting - ForzaHost",
  description:
    "Hosting de servidores Minecraft con presupuesto ajustado. Hardware rapido, almacenamiento SSD, precios accesibles desde $1/mes. Soporte 24/7 y configuracion instantanea.",
}

export default function BudgetMinecraftPage() {
  return <MinecraftHostingContent variant="budget" />
}

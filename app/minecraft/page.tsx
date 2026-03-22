import { Metadata } from "next"
import { MinecraftHostingContent } from "@/components/minecraft-hosting-content"

export const metadata: Metadata = {
  title: "Minecraft Server Hosting - ForzaHost",
  description:
    "Hosting de servidores Minecraft Java Edition de alto rendimiento. Hardware potente, precios accesibles, instalacion instantanea y soporte 24/7.",
}

export default function MinecraftPage() {
  return <MinecraftHostingContent />
}

import { Metadata } from "next"
import { MinecraftHostingContent } from "@/components/minecraft-hosting-content"

export const metadata: Metadata = {
  title: "Minecraft Bedrock Server Hosting - ForzaHost",
  description:
    "Hosting de servidores Minecraft Bedrock Edition de alto rendimiento. Multiplataforma, hardware potente, precios accesibles, instalacion instantanea y soporte 24/7.",
}

export default function MinecraftBedrockPage() {
  return <MinecraftHostingContent variant="bedrock" />
}

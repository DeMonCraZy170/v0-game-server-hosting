import { Metadata } from "next"
import { MinecraftHostingContent } from "@/components/minecraft-hosting-content"

export const metadata: Metadata = {
  title: "Modded Minecraft Server Hosting - ForzaHost",
  description:
    "Hosting de servidores Minecraft Modded de alto rendimiento. Despliega modpacks como RLCraft o Pixelmon al instante, con acceso completo, proteccion DDoS y soporte experto 24/7.",
}

export default function MinecraftModdedPage() {
  return <MinecraftHostingContent variant="modded" />
}

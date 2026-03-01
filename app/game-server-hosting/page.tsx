import { Metadata } from "next"
import { GameServerHostingContent } from "@/components/game-server-hosting-content"

export const metadata: Metadata = {
  title: "Game Server Hosting - ForzaHost",
  description:
    "Affordable game server hosting. DayZ, Minecraft, Rust, Valheim and more. Search your favorite game to get started in 5 minutes or less!",
}

export default function GameServerHostingPage() {
  return <GameServerHostingContent />
}

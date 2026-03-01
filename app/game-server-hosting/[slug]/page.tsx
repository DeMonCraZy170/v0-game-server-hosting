import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getGameBySlug, getAllGameSlugs } from "@/lib/game-data"
import { GameDetailContent } from "@/components/game-detail-content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllGameSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const game = getGameBySlug(slug)
  if (!game) return { title: "Juego no encontrado - ForzaHost" }

  return {
    title: `${game.tagline} - ForzaHost`,
    description: game.description,
  }
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params
  const game = getGameBySlug(slug)

  if (!game) {
    notFound()
  }

  return <GameDetailContent game={game} />
}

import { HeroSection } from "@/components/hero-section"
import { GameHostingSection } from "@/components/game-hosting-section"
import { ReviewsSection } from "@/components/reviews-section"
import { ApolloPanelSection } from "@/components/apollo-panel-section"
import { PerksSection } from "@/components/perks-section"
import { SupportSection } from "@/components/support-section"
import { FAQSection } from "@/components/faq-section"
import { ResourcesSection } from "@/components/resources-section"
import { FreeTrialSection } from "@/components/free-trial-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <GameHostingSection />
      <ReviewsSection />
      <ApolloPanelSection />
      <PerksSection />
      <SupportSection />
      <FAQSection />
      <ResourcesSection />
      <FreeTrialSection />
      <Footer />
    </main>
  )
}

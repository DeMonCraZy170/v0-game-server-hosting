import { AnnouncementBar } from "@/components/announcement-bar"
import { Navbar } from "@/components/navbar"
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
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </div>
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

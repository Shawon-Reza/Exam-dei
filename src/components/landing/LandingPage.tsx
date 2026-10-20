import {
  ExamCategoriesSection,
  LearningFeaturesSection,
  PainPointsSection,
} from "./FeaturesSection";
import GettingStartedSection from "./GettingStartedSection";
import { FaqSection, FinalCtaSection } from "./FaqSection";
import HeroSection from "./HeroSection";
import { LeaderboardSection, LearningBenefitsSection } from "./SocialProofSections";

export default function LandingPage() {
  
  

  return (
    <main>
      <HeroSection />
      <PainPointsSection />
      <LearningFeaturesSection />
      <ExamCategoriesSection />
      <GettingStartedSection />
      <LeaderboardSection />
      <LearningBenefitsSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}

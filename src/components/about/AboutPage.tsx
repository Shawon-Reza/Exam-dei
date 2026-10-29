import AboutContact from "./AboutContact";
import AboutDeveloper from "./AboutDeveloper";
import AboutHero from "./AboutHero";
import AboutPrinciples from "./AboutPrinciples";
import AboutStory from "./AboutStory";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:space-y-24 lg:px-8 lg:py-16">
      {/* <AboutHero /> */}
      <AboutPrinciples />
      <AboutStory />
      {/* <AboutDeveloper /> */}
      <AboutContact />
    </main>
  );
}

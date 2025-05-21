import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import EcosystemSection from '../components/landing/EcosystemSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import InteractionSection from '../components/landing/InteractionSection';
import ComparisonSection from '../components/landing/ComparisonSection';
import TechnicalSection from '../components/landing/TechnicalSection';
import RisksSection from '../components/landing/RisksSection';
import StatisticsSection from '../components/landing/StatisticsSection';
import Footer from '../components/landing/Footer';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white dark:bg-white dark:text-gray-900">
      <Header />
      <main>
        <HeroSection />
        <EcosystemSection />
        <FeaturesSection />
        <InteractionSection />
        <ComparisonSection />
        <TechnicalSection />
        <RisksSection />
        <StatisticsSection />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
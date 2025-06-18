import HeroSection from './homepage/HeroSection';
import FeaturesSection from './homepage/FeaturesSection';
import HowItWorksSection from './homepage/HowItWorksSection';
import CallToActionSection from './homepage/CallToActionSection';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 min-h-screen flex flex-col gap-0">
        {/* Main Content */}
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection />
    </div>
  );
};

export default HomePage;

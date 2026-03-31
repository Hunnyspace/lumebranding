import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import FAQ from '../components/FAQ';
import Creators from '../components/Creators';
import ReferAndEarn from '../components/ReferAndEarn';
import Careers from '../components/Careers';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <About />
      <Services />
      <Portfolio />
      <Creators />
      <ReferAndEarn />
      <Careers />
      <FAQ />
      <ContactForm />
    </main>
  );
}


import SearchEventComponent from '../../components/landing-page/SearchEventComponent';
import LandingPageCardComponent from '../../components/landing-page/LandingPageCardComponent';
import styles from '../../styles/landing.module.scss';

const HeroSection = () => {
  return (
    <div className={`${styles.heroSectionContainer} flex justify-center`}>
      <div className='flex flex-col gap-4 p-5'>
        <h1 className='font-heading text-4xl font-medium'>Discover Event Around You <span className='text-primary'>Instantly</span></h1>
        <p className='text-lg text-gray-600'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Quos rem explicabo
        </p>
        <SearchEventComponent />
      </div>
      <div className={`${styles.heroHiddenImageSection} bg-gray-200 ml-10 rounded-lg`}>

      </div>
    </div>
  )
}

const LandingPage = () => {

  const cards = [
    {
      number: "01",
      title: "Discover Events Instantly",
      description: "Find the best events around you in seconds — no signup needed to explore.",
      pinColor: "#FAB32D",
      bgGradient: "from-red-50 to-red-100",
      rotation: -2
    },
    {
      number: "02",
      title: "Real People, Real Experiences",
      description: "Join or host events effortlessly. Build memories with genuine communities.",
      pinColor: "#FAB32D",
      bgGradient: "from-blue-50 to-blue-100",
      rotation: 2
    },
    {
      number: "03",
      title: "Designed for Everyone",
      description: "Perfect for solo explorers, friend groups, or professional hosts.",
      pinColor: "#FAB32D",
      bgGradient: "from-purple-50 to-purple-100",
      rotation: -3
    },
    {
      number: "04",
      title: "Effortless Hosting",
      description: "Create events, manage attendees, and grow your presence — all in one app.",
      pinColor: "#FAB32D",
      bgGradient: "from-amber-50 to-amber-100",
      rotation: 1
    }
  ];

  return (
    <div className='w-screen'>
      <div className='bg-background-primary-light'>
        <HeroSection />
      </div>
      <div className={` ${styles.landingCardContainer} py-10 bg-background-tertiary`}>
        {cards.map((card) => (
          <LandingPageCardComponent key={card.number} {...card} />
        ))}
      </div>
    </div>
  )
}

export default LandingPage

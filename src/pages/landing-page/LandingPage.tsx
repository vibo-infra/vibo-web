
import SearchEventComponent from '../../components/landing-page/SearchEventComponent';
import LandingPageCardComponent from '../../components/landing-page/LandingPageCardComponent';
import styles from '../../styles/landing.module.scss';
import OnlyPreviewCardComponent from '../../components/event-cards/OnlyPreviewCardComponent';
import PageTitle from '../../components/ui/PageTitle';

const HeroSection = () => {
  return (
    <div className={`${styles.heroSectionContainer} flex justify-center`}>
      <PageTitle
        title="Find Your Next"
        highlightedText="Adventure"
        description="Discover events happening around you and connect with like-minded individuals."
      >
        <SearchEventComponent />
      </PageTitle>
      {/* <div className={`${styles.heroHiddenImageSection} bg-gray-200 ml-10 rounded-lg`}>

      </div> */}
    </div>
  )
}

const NearbyEventsSection = () => {
  return (
    <div className={`${styles.nearbyEventsSection} flex flex-col`}>
      <h2 className='font-heading text-xxl font-semibold mb-5'>Events <span className='text-primary'>Near You</span></h2>
      <p className='text-gray-600 text-sm mb-8'>Explore events happening in your vicinity and connect with like-minded individuals.</p>
      <div className={`${styles.previewCardContainer}`}>
        <OnlyPreviewCardComponent />
        <OnlyPreviewCardComponent />
        <OnlyPreviewCardComponent />
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
      <div className={` ${styles.landingCardContainer} w-full py-15 bg-background-tertiary`}>
        {cards.map((card) => (
          <LandingPageCardComponent key={card.number} {...card} />
        ))}
      </div>
      <div className='py-18 bg-background-primary-light mx-auto'>
        <NearbyEventsSection />
      </div>
    </div>
  )
}

export default LandingPage

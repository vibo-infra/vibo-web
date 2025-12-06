import SearchEventComponent from '../../components/landing-page/SearchEventComponent';
import LandingPageCardComponent from '../../components/landing-page/LandingPageCardComponent';
import styles from '../../styles/landing.module.scss';
import OnlyPreviewCardComponent from '../../components/event-cards/OnlyPreviewCardComponent';
import PageTitle from '../../components/ui/PageTitle';
import { usePageTracking } from '../../hooks/usePageTracking';

const HeroSection = () => {
  return (
    <div className={`${styles.heroSectionContainer} flex justify-center`}>
      <PageTitle
        title="Something New,"
        highlightedText="Awaits Nearby"
        description="Workshops, meetups, hangouts — discover what’s happening near you without the noise"
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
      <h2 className='font-heading text-xxl font-semibold mb-5'><span className='text-primary'>Events</span> Around You</h2>
      <p className='text-gray-600 text-sm mb-8'>Your city always has something going on. Here are a few things you might actually want to check out.</p>
      <div className={`${styles.previewCardContainer}`}>
        <OnlyPreviewCardComponent />
        <OnlyPreviewCardComponent />
        <OnlyPreviewCardComponent />
      </div>
    </div>
  ) 
}

const LandingPage = () => {
  usePageTracking(); // Track page views

const cards = [
  {
    number: "01",
    title: "Find Something To Do Today",
    description: "Whether you're bored, new in town, or just want company — find micro-events that fit your vibe.",
    pinColor: "#FAB32D",
    bgGradient: "from-purple-50 to-purple-100",
    rotation: -3
  },
  {
    number: "02",
    title: "Made for Everyday Life",
    description: "Walks, coffee meetups, study groups, game nights — small, real moments happening near you.",
    pinColor: "#FAB32D",
    bgGradient: "from-red-50 to-red-100",
    rotation: -2
  },
  {
    number: "03",
    title: "Meet People, Not Algorithms",
    description: "Connect with like-minded people through simple, human events — not complicated social feeds.",
    pinColor: "#FAB32D",
    bgGradient: "from-blue-50 to-blue-100",
    rotation: 2
  },
  {
    number: "04",
    title: "Hyperlocal & Real",
    description: "Discover what’s happening around you right now — in your lane, your block, your city.",
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

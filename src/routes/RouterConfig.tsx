import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/landing-page/LandingPage'
import Login from '../pages/auth/Login'
import ExplorePage from '../pages/explore/ExplorePage'
import EventDetails from '../pages/event-details/EventDetails'
import RegisterToEvent from '../pages/explore/RegisterToEvent'
import Host from '../pages/host/Host'

const RouterConfig = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/explore' element={<ExplorePage />} />
      <Route path='/event/:eventId' element={<EventDetails />} />
      <Route path='/register/:eventId' element={<RegisterToEvent />} />
      <Route path='/host-event' element={<Host />} />
    </Routes>
  )
}

export default RouterConfig;

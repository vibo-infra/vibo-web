import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/landing-page/LandingPage'
import Login from '../pages/auth/Login'
import ExplorePage from '../pages/explore/ExplorePage'
import EventDetails from '../pages/event-details/EventDetails'
import RegisterToEvent from '../pages/explore/RegisterToEvent'

const RouterConfig = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/event/:eventId' element={<EventDetails />} />
            <Route path='/register/:eventId' element={<RegisterToEvent />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RouterConfig;

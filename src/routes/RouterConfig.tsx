import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/landing-page/LandingPage'
import Login from '../pages/auth/Login'
import ExplorePage from '../pages/explore/ExplorePage'
import EventDetails from '../pages/event-details/EventDetails'

const RouterConfig = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/id' element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RouterConfig;

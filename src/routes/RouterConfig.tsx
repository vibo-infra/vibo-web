import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/landing-page/LandingPage'
import Login from '../pages/auth/Login'

const RouterConfig = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default RouterConfig;

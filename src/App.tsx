import { BrowserRouter } from 'react-router-dom'
import BottomNavbar from './components/navbar/BottomNavbar'
import RouterConfig from './routes/RouterConfig'
import { ToastContainer } from 'react-toastify'
import { useShouldShowNavbar } from './hooks/useShouldShowNavbar'

const AppContent = () => {
  const showNavbar = useShouldShowNavbar()

  return (
    <div className='flex justify-center bg-primary'>
      <RouterConfig />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      {showNavbar && (
        <div className='fixed bottom-0 w-full md:w-auto'>
          <BottomNavbar />
        </div>
      )}
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

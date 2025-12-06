import RouterConfig from './routes/RouterConfig'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className='flex justify-center min-h-screen bg-primary'>
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
    </div>
  )
}

export default App

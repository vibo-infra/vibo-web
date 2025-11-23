import Input from '../../components/ui/Input'
import styles from '../../styles/auth.module.scss'
import Button from '../../components/ui/Button'
import OAuth from '../../components/auth/OAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const handleFormClick = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className={`${styles.loginWrapper} flex flex-col`}>
      <div className={`${styles.loginHeader} mb-5 flex flex-col gap-2`}>
        <h1 className='text-4xl font-body font-bold'>Sign In</h1>
        <p className=''>Welcome back! Please enter your details.</p>
      </div>
      <div className={`${styles.loginContainer} bg-background-primary-light flex flex-col rounded-t-4xl px-6 py-12 md:py-8`}>
        <form className={`flex flex-col gap-4 ${styles.loginForm}`} onSubmit={handleFormClick}>
          <Input label="Email" type="email" name="email" className='h-16'/>
          <Input label="Password" type="password" name="password" className='h-16' secret/>
          <div className='flex justify-end'>
            <a href="#" className='text-sm text-text-secondary-light font-medium'>Forgot Password?</a>
          </div>
          <Button variant='secondary' className='mt-4 h-16'>
            Sign In
          </Button>
        </form>
        <OAuth />
      </div>
    </div>
  )
}

export default Login

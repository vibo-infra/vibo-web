import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../../components/ui/Input'
import styles from '../../styles/auth.module.scss'
import Button from '../../components/ui/Button'
import OAuth from '../../components/auth/OAuth'
import { useNavigate } from 'react-router-dom'
import { usePageTracking } from '../../hooks/usePageTracking';
import { trackClick } from '../../utils/tracking';

const Login = () => {
  usePageTracking(); // Track page views
  const navigate = useNavigate();
  const location = useLocation();
  const pageStartTimeRef = useRef<number>(Date.now());

  const handleFormClick = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = Date.now() - pageStartTimeRef.current;
    trackClick(location.pathname, duration, 'sign_in');
    navigate('/');
  }

  return (
    <div className={`${styles.loginWrapper} flex flex-col`}>
      <div className={`${styles.loginHeader} mb-8 flex flex-col gap-2`}>
        <h1 className='text-xxl font-body font-bold'>Sign In</h1>
        <p className='text-sm'>Welcome back! Please enter your details.</p>
      </div>
      <div className={`${styles.loginContainer} bg-background-primary-light flex flex-col rounded-t-[3.2rem] px-8 py-12`}>
        <form className={`flex flex-col gap-4 ${styles.loginForm}`} onSubmit={handleFormClick}>
          <Input label="Email" type="email" name="email" className='h-20'/>
          <Input label="Password" type="password" name="password" className='h-20' secret/>
          <div className='flex justify-end'>
            <a href="#" className='text-xs text-text-secondary-light font-medium'>Forgot Password?</a>
          </div>
          <Button variant='secondary' className='mt-4 h-20 text-md flex items-center justify-center font-medium' type="submit">
            Sign In
          </Button>
        </form>
        <OAuth />
      </div>
    </div>
  )
}

export default Login

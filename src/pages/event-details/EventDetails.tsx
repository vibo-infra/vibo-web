import { IoTimeOutline } from 'react-icons/io5'
import { SlLocationPin } from 'react-icons/sl'
import Button from '../../components/ui/Button'
import { RiHeartAdd2Line } from "react-icons/ri";
import LocationMap from '../../components/event-cards/LocationMap';
import { useEffect } from 'react';


const EventDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


  return (
    <div className='flex flex-col bg-background-tertiary-light min-h-screen py-3'>
      <div className='m-4'>
        <img className='rounded-4xl' src="https://images.unsplash.com/photo-1549452026-91574599e7f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="" />
      </div>
      <div>
        <div className='bg-background-secondary-light flex justify-between items-center mx-4 rounded-2xl p-4 shadow-soft'>
            <div className='flex flex-col'>
                <h2 className='text-md font-semibold'>Event Title Lorem Ipsum</h2>
                <div className='flex items-baseline justify-between'>
                    <p className="text-sm text-gray-400 mt-2"><SlLocationPin className='inline mr-0.5' /> Location</p>
                    <p className="text-sm text-gray-400"><IoTimeOutline className='inline mr-0.5' /> June 2024</p>
                </div>
            </div>
            <div className='bg-background-tertiary-light text-lg font-bold p-2 rounded-2xl'>
                <span>$20</span>
            </div>
        </div>
        <div className='bg-background-secondary-light p-5 m-4 rounded-2xl shadow-soft'>
            <h3 className='text-sm font-bold'>About event</h3>
            <p className='text-background-tertiary text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Dolor, cumque veniam deleniti autem itaque repudiandae id 
                perspiciatis sint impedit, a ducimus dolorem iusto? Impedit 
                reprehenderit omnis voluptatibus officiis ea quod.
            </p>
            <span>

            </span>
        </div>
        <LocationMap />
      </div>
        <div className='fixed bottom-0 w-full flex gap-4 items-center justify-around p-4 z-1000'>
            <Button variant="primary" className="w-full rounded-4xl flex text-text text-md font-bolder shadow-soft">Register Now</Button>
            <RiHeartAdd2Line className='text-xxl w-20 h-17 text-primary bg-background-primary p-2 rounded-full'/>
        </div>
    </div>
  )
}

export default EventDetails

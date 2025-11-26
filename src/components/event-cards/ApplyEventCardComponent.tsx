import styles from '../../styles/component.module.scss';
import { FiUsers } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { IoTimeOutline } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";

const ApplyEventCardComponent = () => {
  return (
    <div className={`${styles.onlyPreviewWrapper} flex flex-col rounded-lg overflow-hidden shadow-lg bg-transparent snap-center`}>
        <div className="relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1549452026-91574599e7f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Only Preview Card Component" />
            <span className='absolute top-4 right-4 bg-background-primary-light text-xs text-text-light rounded px-2'>Tech</span>
        </div>
      <div className="relative p-4 flex flex-col gap-2 rounded-3xl">
        <h1 className="font-bold text-md my-2">Explore Events Card Component</h1>
        <p className="text-sm text-gray-600 mt-2"><SlLocationPin className='inline mr-0.5' /> Location</p>
        <p className="text-sm text-gray-600"><IoTimeOutline className='inline mr-0.5' /> June 2024</p>
        <p className='absolute bottom-4 right-4 text-sm text-gray-600'><FiUsers className='inline mr-0.5' /> 23 attendees</p>
      </div>
      <div className='p-4 border-t border-background-primary-light flex items-center justify-between rounded-b-lg bg-background-secondary-light'>
        <p className='text-sm text-gray-600'> <IoPersonCircleSharp className='inline mr-0.5 w-10 h-10' /> Organiser</p>
        <button className='bg-primary text-white py-2 px-4 rounded-full text-sm'>Join Now</button>
      </div>
    </div>
  )
}

export default ApplyEventCardComponent;

import { useRef, useEffect } from 'react';
import styles from '../../styles/component.module.scss';
import { SlLocationPin } from "react-icons/sl";
import { IoTimeOutline } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import { trackClick } from '../../utils/tracking';
import type { Event } from '../../types';

interface ApplyEventCardComponentProps {
  event: Event;
}

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1549452026-91574599e7f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return dateString;
  }
};

const ApplyEventCardComponent = ({ event }: ApplyEventCardComponentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardStartTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    cardStartTimeRef.current = Date.now();
  }, []);

  const handleButtonClick = () => {
    const duration = Date.now() - cardStartTimeRef.current;
    trackClick(location.pathname, duration, 'join_now');
    navigate(`/event/${event.eventId}`);
  };

  const handleCardClick = () => {
    const duration = Date.now() - cardStartTimeRef.current;
    trackClick(location.pathname, duration, 'event_card');
    navigate(`/event/${event.eventId}`);
  };

  return (
    <div 
      className={`${styles.onlyPreviewWrapper} flex flex-col rounded-lg overflow-hidden shadow-lg bg-transparent snap-center cursor-pointer`}
      onClick={handleCardClick}
    >
        <div className="relative overflow-hidden">
            <img src={DEFAULT_IMAGE} alt={event.eventName} />
            <span className='absolute top-4 right-4 bg-background-primary-light text-xs text-text-light rounded px-2'>Event</span>
        </div>
      <div className="relative p-4 flex flex-col gap-2 rounded-3xl">
        <h1 className="font-bold text-md my-2">{event.eventName}</h1>
        <p className="text-sm text-gray-600 mt-2"><SlLocationPin className='inline mr-0.5' /> {event.eventLatLong.address}</p>
        <p className="text-sm text-gray-600"><IoTimeOutline className='inline mr-0.5' /> {formatDate(event.eventDate)}</p>
      </div>
      <div className='p-4 border-t border-background-primary-light flex items-center justify-between rounded-b-lg bg-background-secondary-light'>
        <p className='text-sm text-gray-600'> <IoPersonCircleSharp className='inline mr-0.5 w-10 h-10' /> Organiser</p>
        <button onClick={handleButtonClick} className='bg-primary text-white py-2 px-4 rounded-full text-sm'>Join Now</button>
      </div>
    </div>
  )
}

export default ApplyEventCardComponent;

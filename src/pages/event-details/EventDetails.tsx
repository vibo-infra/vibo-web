import { IoTimeOutline } from 'react-icons/io5'
import { SlLocationPin } from 'react-icons/sl'
import { RiHeartAdd2Line, RiShareLine, RiArrowLeftLine } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LocationMap from '../../components/event-cards/LocationMap';
import Button from '../../components/ui/Button';
import { getEventById, getEventAttendees } from '../../services/apiServices';
import type { Event, Attendee } from '../../types';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1549452026-91574599e7f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

const formatDateTime = (dateString: string, timeString: string): string => {
    try {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return `${formattedDate} • ${timeString}`;
    } catch {
        return `${dateString} • ${timeString}`;
    }
};

const Tags = [
  {
    tag: "Music",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200"
  },
  {
    tag: "Live",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200"
  },
  {
    tag: "Concert",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200"
  },
  {
    tag: "Festival",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200"
  },
]

const renderTags = () => {
    return Tags.map((tag) => (
        <span
            key={tag.tag}
            className={`text-sm font-medium px-3 py-1 rounded-full border ${tag.bgColor} ${tag.textColor} ${tag.borderColor}`}
        >
            {tag.tag}
        </span>
    ));
};

const EventDetails = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<Event | null>(null);
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchEventData = async () => {
            if (!eventId) {
                setError('Event ID is required');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                
                const [eventResponse, attendeesResponse] = await Promise.all([
                    getEventById(eventId),
                    getEventAttendees(eventId).catch(() => ({ success: true, attendees: [] }))
                ]);

                if (eventResponse.success && eventResponse.event) {
                    setEvent(eventResponse.event);
                } else {
                    const errorMessage = 'Failed to load event';
                    setError(errorMessage);
                    toast.error(errorMessage);
                }

                if (attendeesResponse.success && attendeesResponse.attendees) {
                    setAttendees(attendeesResponse.attendees);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchEventData();
    }, [eventId]);

    const handleRegisterClick = () => {
        if (eventId) {
            navigate(`/register/${eventId}`);
        }
    }

    const handleBackClick = () => {
        navigate('/explore',{ replace: true });
    }

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-text-muted'>Loading event details...</p>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-red-500'>{error || 'Event not found'}</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col bg-gray-50 min-h-screen pb-32'>
            {/* Header with back button */}
            <div className='absolute top-0 left-0 right-0 z-10 p-4 flex justify-between'>
                <button 
                    onClick={handleBackClick}
                    className='bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all'
                >
                    <RiArrowLeftLine className='text-xl text-gray-800' />
                </button>
                <button className='bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all'>
                    <RiShareLine className='text-xl text-gray-800' />
                </button>
            </div>

            {/* Hero Image with gradient overlay */}
            <div className='relative'>
                <img 
                    className='w-full h-80 object-cover' 
                    src={DEFAULT_IMAGE} 
                    alt={event.eventName} 
                />
                <div className='absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent' />
            </div>

            {/* Main Content */}
            <div className='px-5 -mt-8 relative z-10'>
                {/* Event Card */}
                <div className='bg-white rounded-3xl p-6 shadow-xl border border-gray-100'>
                    <div className='flex justify-between items-start mb-4'>
                        <div className='flex-1 pr-4'>
                            <h1 className='text-xxl font-bold text-gray-900 mb-3 leading-tight'>
                                {event.eventName}
                            </h1>
                            {event.eventSubheading && (
                                <p className='text-md text-gray-600 mb-3'>{event.eventSubheading}</p>
                            )}
                            <div className='space-y-2'>
                                <div className='flex items-center text-gray-600'>
                                    <div className='bg-yellow-100 p-2 rounded-lg mr-3'>
                                        <SlLocationPin className='text-yellow-600 text-lg' />
                                    </div>
                                    <span className='text-sm font-medium'>{event.eventLatLong.address}</span>
                                </div>
                                <div className='flex items-center text-gray-600'>
                                    <div className='bg-blue-100 p-2 rounded-lg mr-3'>
                                        <IoTimeOutline className='text-blue-600 text-lg' />
                                    </div>
                                    <span className='text-sm font-medium'>{formatDateTime(event.eventDate, event.eventTime)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='bg-linear-to-br from-primary to-primary-hover text-white px-5 py-3 rounded-2xl shadow-lg'>
                            <div className='text-center'>
                                <span className='text-2xl font-bold'>{event.eventCost}</span>
                                <p className='text-xs opacity-90 mt-0.5'>per ticket</p>
                            </div>
                        </div>
                    </div>

                    {/* Attendees Preview */}
                    {attendees.length > 0 && (
                        <div className='flex items-center pt-4 border-t border-gray-100'>
                            <div className='flex -space-x-3'>
                                {attendees.slice(0, 3).map((_, index) => (
                                    <div key={index} className={`w-8 h-8 rounded-full border-2 border-white ${
                                        index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-yellow-400' : 'bg-pink-400'
                                    }`} />
                                ))}
                                {attendees.length > 3 && (
                                    <div className='w-8 h-8 rounded-full bg-blue-900 border-2 border-white flex items-center justify-center'>
                                        <span className='text-xs text-white font-semibold'>+{attendees.length - 3}</span>
                                    </div>
                                )}
                            </div>
                            <span className='ml-3 text-sm text-gray-600 font-medium'>{attendees.length} {attendees.length === 1 ? 'person' : 'people'} registered</span>
                        </div>
                    )}
                </div>

                {/* About Event */}
                <div className='bg-white rounded-3xl p-6 my-5 shadow-lg border border-gray-100'>
                    <h3 className='text-lg font-bold text-gray-900 mb-3 flex items-center'>
                        <span className='w-1 h-6 bg-primary rounded-full mr-3' />
                        About Event
                    </h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                        {event.eventDescription}
                    </p>
                    
                    {/* Tags */}
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {renderTags()}
                    </div>
                </div>

                {/* Location Section */}
                <LocationMap eventLatLong={event.eventLatLong} />
            </div>

            {/* Fixed Bottom CTA */}
            <div className='fixed bottom-0 w-full flex gap-4 items-center justify-around p-4 z-1000'>
                <Button onClick={handleRegisterClick} variant="primary" className="w-full rounded-4xl flex text-text text-md font-bolder shadow-soft">Register Now</Button>
                <RiHeartAdd2Line className='text-xxl w-20 h-17 text-primary bg-background-primary p-2 rounded-full'/>
            </div>
        </div>
    )
}

export default EventDetails
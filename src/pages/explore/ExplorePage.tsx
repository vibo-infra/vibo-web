import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageTitle from '../../components/ui/PageTitle';
import ApplyEventCardComponent from '../../components/event-cards/ApplyEventCardComponent';
import styles from '../../styles/explorePage.module.scss';
import { getAllEvents } from '../../services/apiServices';
import { usePageTracking } from '../../hooks/usePageTracking';
import { ApiError } from '../../utils/apiUtils';
import { trackClick } from '../../utils/tracking';
import type { Event } from '../../types';
import Loader from '../../components/ui/Loader';
import { MdFreeBreakfast } from "react-icons/md";

interface FilterMenuBarProps {
    selectedOption: string;
    onSelect: (optionValue: string) => void;
}

const FilterMenuBar = ({ selectedOption, onSelect }: FilterMenuBarProps) => {
    const filterMenuOptions = [
        { label: 'For You', value: 'all' },
        { label: 'Near Me', value: 'workshops' },
        { label: 'Today', value: 'webinars' },
        { label: 'Trending', value: 'conferences' },
    ]
    
    const handleFilterMenuBarOptionSelect = (optionValue: string) => {
        onSelect(optionValue);
        // Track filter selection
        const duration = 0; // Filter clicks are instant
        trackClick(window.location.pathname, duration, `filter_${optionValue}`);
    }
    
    const selectedIndex = filterMenuOptions.findIndex(option => option.value === selectedOption);
    
    return (
        <div className={`${styles.filterMenuBar} bg-background-tertiary-light rounded-full p-2 shadow-md`}>
            <div className='flex justify-around overflow-x-auto relative'>
                {/* Sliding background indicator */}
                <div 
                    className='absolute top-0 bottom-0 bg-primary rounded-full transition-all duration-500 ease-out'
                    style={{
                        width: `${100 / filterMenuOptions.length}%`,
                        left: `${(selectedIndex * 100) / filterMenuOptions.length}%`,
                    }}
                />
                
                {filterMenuOptions.map((option) => (
                    <button
                        key={option.value}
                        className={`${styles.filterMenuButton} w-35 py-5 px-4 rounded-full text-center relative z-10 ${
                            selectedOption === option.value ? 'text-white font-semibold' : 'text-primary-light'
                        }`}
                        onClick={() => handleFilterMenuBarOptionSelect(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

const ExplorePage = () => {
    usePageTracking(); // Track page views
    
    const [selectedFilterMenuBarOption, setSelectedFilterMenuBarOption] = useState('all');
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getAllEvents();
                
                if (response.success && response.events) {
                    // Sort events by eventId - latest first (assuming higher eventId = newer)
                    const sortedEvents = [...response.events].sort((a, b) => {
                        // Convert eventId to number for comparison, fallback to string comparison
                        const idA = parseInt(a.eventId, 10) || a.eventId;
                        const idB = parseInt(b.eventId, 10) || b.eventId;
                        // Sort descending (higher/newer eventId first)
                        if (typeof idA === 'number' && typeof idB === 'number') {
                            return idB - idA;
                        }
                        // String comparison (descending)
                        return String(idB).localeCompare(String(idA));
                    });
                    setEvents(sortedEvents);
                } else {
                    const errorMessage = 'Failed to load events. Please try again.';
                    setError(errorMessage);
                    toast.error(errorMessage);
                }
            } catch (err) {
                let errorMessage = 'Failed to load events. Please try again later.';
                
                if (err instanceof ApiError) {
                    errorMessage = err.message || errorMessage;
                    // Handle specific status codes
                    if (err.statusCode === 404) {
                        errorMessage = 'Events endpoint not found. Please contact support.';
                    } else if (err.statusCode === 500) {
                        errorMessage = 'Server error. Please try again later.';
                    } else if (err.statusCode === 0) {
                        errorMessage = 'Network error. Please check your internet connection.';
                    }
                } else if (err instanceof Error) {
                    errorMessage = err.message;
                }
                
                setError(errorMessage);
                toast.error(errorMessage);
                // Set empty array on error so UI doesn't break
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className={`${styles.explorePageContainer} w-screen bg-background-primary-light h-full`}>
            <PageTitle 
                title="Discover"
                highlightedText="Events"
                description="Find the best events happening around you."
            />
            <div className='sticky top-8 z-50 mt-8'>
                <FilterMenuBar 
                    selectedOption={selectedFilterMenuBarOption} 
                    onSelect={setSelectedFilterMenuBarOption}
                />
            </div>
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <Loader size='lg' color='border-primary'/>
                </div>
            )}
            {error && (
                <div className="flex justify-center items-center py-20">
                    <p className="text-red-500">{error}</p>
                </div>
            )}
            {!loading && !error && (
                <div className={`${styles.exploreCardContainer} snap-y snap-mandatory`}>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <ApplyEventCardComponent key={event.eventId} event={event} />
                        ))
                    ) : (
                        <div className="flex flex-col mt-5 text-[10rem] text-text-muted/35 justify-center items-center py-20">
                            <MdFreeBreakfast />
                            <p className="text-text-muted/35 text-xl text-center font-bold">Your neighborhood is taking a break</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ExplorePage

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageTitle from '../../components/ui/PageTitle';
import ApplyEventCardComponent from '../../components/event-cards/ApplyEventCardComponent';
import styles from '../../styles/explorePage.module.scss';
import { getAllEvents } from '../../services/apiServices';
import type { Event } from '../../types';

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
                    setEvents(response.events);
                } else {
                    const errorMessage = 'Failed to load events';
                    setError(errorMessage);
                    toast.error(errorMessage);
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                toast.error(errorMessage);
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
                    <p className="text-text-muted">Loading events...</p>
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
                        <div className="flex justify-center items-center py-20">
                            <p className="text-text-muted">No events found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default ExplorePage

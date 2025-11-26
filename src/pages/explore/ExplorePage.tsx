import { useState } from 'react';
import PageTitle from '../../components/ui/PageTitle';
import ApplyEventCardComponent from '../../components/event-cards/ApplyEventCardComponent';
import styles from '../../styles/explorePage.module.scss';

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
                        className={`${styles.filterMenuButton} py-2 px-4 rounded-full duration-200 ease-out relative z-10 ${
                            selectedOption === option.value ? 'text-white' : 'text-primary-light'
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
         <div className={`${styles.exploreCardContainer} snap-y snap-mandatory`}>
            <ApplyEventCardComponent />
            <ApplyEventCardComponent />
            <ApplyEventCardComponent />
            <ApplyEventCardComponent />
            <ApplyEventCardComponent />
            <ApplyEventCardComponent />
            <ApplyEventCardComponent />
         </div>
    </div>
  )
}

export default ExplorePage

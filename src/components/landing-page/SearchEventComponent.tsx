import Button from "../ui/Button"
import Input from "../ui/Input"
import { SlLocationPin } from "react-icons/sl";

const SearchEventComponent = () => {
  return (
    <div className='flex flex-col gap-4 bg-background-primary-light shadow-soft p-4 rounded-md'>
        <div className="flex items-center px-4 py-1">
            <SlLocationPin className="w-6 h-6" />
            <Input className="text-lg" label="Search events near you" placeholderBg="none" style={{borderRadius: '10px', backgroundColor: 'var(--background-secondary-light)', border: 'none'}}/>
        </div>
      {/* <Input label="Tell me your interested interests" style={{borderRadius: '10px'}}/> */}
      <Button variant="primary" className="mt-2 text-text font-bold" style={{borderRadius: '10px'}}>Find Events</Button>
    </div>
  )
}

export default SearchEventComponent

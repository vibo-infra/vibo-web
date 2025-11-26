import Button from "../ui/Button"
import Input from "../ui/Input"
import { SlLocationPin } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const SearchEventComponent = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/explore');
  }

  return (
    <div className='flex flex-col gap-4 bg-background-primary-light shadow-medium p-4 rounded-xl mt-10'>
        <div className="flex items-center px-4 py-1">
            <SlLocationPin className="w-6 h-6" />
            <Input className="text-lg" label="Search events near you" placeholderBg="none" style={{borderRadius: '10px', backgroundColor: 'var(--background-secondary-light)', border: 'none'}}/>
        </div>
      {/* <Input label="Tell me your interested interests" style={{borderRadius: '10px'}}/> */}
      <Button variant="primary" onClick={handleSearch} className="mt-2 text-text text-lg font-bold shadow-medium hover:shadow-soft" style={{borderRadius: '10px'}}>Find Events</Button>
    </div>
  )
}

export default SearchEventComponent

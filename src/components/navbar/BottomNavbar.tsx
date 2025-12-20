import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";

interface OptionComponentProps {
  option: {
    id: number;
    name: string;
    icon: JSX.Element;
  };
  selected: boolean;
  onSelect: (id: number) => void;
  route?: string;
}

const OptionComponent = ({ option, selected, onSelect, route }: OptionComponentProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelect(option.id);
    if (route) {
      navigate(route, { replace: true });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-full flex flex-col items-center cursor-pointer bg-white duration-100 ease-out transition-all
        ${selected ? 'pt-6' : ''}
      `}
    >
      <div className={`flex flex-col items-center transition-all duration-200 ease-in w-24 ${selected ? 'pb-8' : ''}`}>
        <div
          className={`w-14 h-14 mb-1 p-2 rounded-full flex items-center justify-center transition-all duration-200 ease-in
            ${selected ? 'bg-primary scale-125' : 'bg-gray-200'}
          `}
        >
          {option.icon}
        </div>
        <span className={`text-xs ${selected ? 'text-primary font-semibold' : 'text-gray-700'}`}>
          {option.name}
        </span>
      </div>
    </button>
  );
};


const BottomNavbar = () => {
  const [selectedOption, setSelectedOption] = useState<number>(1); // default = Host

  const optionsList = [
    { id: 1, name: 'Host', icon: <IoMdAddCircleOutline size={24} className="text-text" />, route:'/host-event' },
    { id: 2, name: 'Search', icon: <IoSearch size={24} className="text-text" />, route:'/explore' },
    { id: 3, name: 'Explore', icon: <MdOutlineExplore size={24} className="text-text" />, route:'/' },
    { id: 4, name: 'Messages', icon: <RiMessage3Line size={24} className="text-text" />, route:'/' },
    { id: 5, name: 'Profile', icon: <BsPersonCircle size={24} className="text-text" />, route:'/' },
  ];

  return (
    <div className="bg-white w-full h-26 flex justify-around items-center border-gray-300 rounded-t-lg shadow-strong">
      {optionsList.map((option) => (
        <OptionComponent
          key={option.id}
          option={option}
          selected={selectedOption === option.id}
          onSelect={setSelectedOption}
          route={option.route}
        />
      ))}
    </div>
  );
};

export default BottomNavbar;

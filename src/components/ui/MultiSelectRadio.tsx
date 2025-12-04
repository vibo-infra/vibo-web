
interface MultiSelectRadioProps {
    list: string[];
    selectedItems: string[];
    setSelectedItems: (items: string[]) => void;
    className?: string;
}

const MultiSelectRadio = ({list, selectedItems, setSelectedItems, className}: MultiSelectRadioProps) => {
  return (
    <div className={className}>
      {list.map(item => (
        <button 
            key={item} 
            className={`px-4 py-2 border border-text rounded-3xl text-md mr-2 my-2 hover:bg-primary/10 transition ${selectedItems.includes(item) ? 'bg-primary text-text' : 'text-text'}`}
            onClick={() => {
              if (selectedItems.includes(item)) {
                setSelectedItems(selectedItems.filter(i => i !== item));
              } else {
                setSelectedItems([...selectedItems, item]);
              }
            }}
        >
            {item}
        </button>
      ))}
    </div>
  )
}

export default MultiSelectRadio

interface HeroSectionProps {
    title: string;
    highlightedText: string;
    description: string;
    children?: React.ReactNode;
}

const PageTitle = ({ title, highlightedText, description, children }: HeroSectionProps) => {
    return (
        <div className='flex flex-col gap-4 p-2'>
            <h1 className='text-xxxl font-bold'>
                {title} <span className='text-primary'>{highlightedText}</span>
            </h1>
            <p className='text-md text-gray-600'>
                {description}
            </p>
            {children}
        </div>
    )
}

export default PageTitle;
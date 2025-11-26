interface HeroSectionProps {
    title: string;
    highlightedText: string;
    description: string;
    children?: React.ReactNode;
}

const PageTitle = ({ title, highlightedText, description, children }: HeroSectionProps) => {
    return (
        <div className='flex flex-col gap-4 p-2'>
            <h1 className='font-heading text-5xl md:text-6xl font-bold'>
                {title} <span className='text-primary'>{highlightedText}</span>
            </h1>
            <p className='text-lg text-gray-600'>
                {description}
            </p>
            {children}
        </div>
    )
}

export default PageTitle;
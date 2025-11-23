import styles from '../../styles/component.module.scss';

interface LandingPageCardComponentProps {
  rotation: number;
  pinColor: string;
  bgGradient: string;
  number: string;
  title: string;
  description: string;
}

const LandingPageCardComponent = ({ rotation, pinColor, bgGradient, number, title, description }: LandingPageCardComponentProps) => {
  return (
    <div 
      className={`relative ${styles.cardContainer} w-full h-80 flex justify-center items-center`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Pin */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
        <div 
          className="w-8 h-8 rounded-full shadow-lg"
          style={{ 
            backgroundColor: pinColor,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div 
            className="w-3 h-3 bg-black bg-opacity-20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </div>

      {/* Card */}
      <div 
        className={`relative w-full h-full bg-linear-to-br ${bgGradient} rounded-2xl shadow-xl p-6 flex flex-col`}
        style={{
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        {/* Number */}
        <div className="text-4xl font-light text-gray-400 mb-4">
          {number}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default LandingPageCardComponent

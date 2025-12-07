import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
};

const Loader: React.FC<LoaderProps> = ({ size = 'md', color = 'border-blue-500' }) => {
  return (
    <div
      className={`${sizeMap[size]} ${color} border-t-transparent rounded-full animate-spin`}
    />
  );
};

export default Loader;
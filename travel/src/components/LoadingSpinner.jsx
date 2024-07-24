import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = ({label}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 z-100">
      <FaSpinner className="w-16 h-16 text-white animate-spin" />
      <p className='text-2xl text-center text-white'>{label}</p>
    </div>
  );
};

export default LoadingSpinner;

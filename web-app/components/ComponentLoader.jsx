'use client';

import { useState, useEffect } from 'react';

export default function ComponentLoader({ 
  size = 'medium',
  text = 'Loading...',
  showText = true,
  className = ''
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Size mapping
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-20 h-20'
  };
  
  const spinnerSize = sizeClasses[size] || sizeClasses.medium;
  const textSize = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  }[size] || 'text-sm';

  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-black bg-opacity-90 rounded-lg ${className}`}>
      {/* Spinner animation */}
      <div className={`relative ${spinnerSize} ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        {/* Outer ring */}
        <div className="absolute inset-0 border-2 border-white border-opacity-20 rounded-full"></div>
        
        {/* Loading indicator */}
        <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin"></div>
        
        {/* Center wallet dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Optional loading text */}
      {showText && (
        <div className={`mt-2 text-white ${textSize} font-medium opacity-80 ${mounted ? 'opacity-80' : 'opacity-0'} transition-opacity duration-300 delay-100`}>
          {text}
        </div>
      )}
    </div>
  );
}
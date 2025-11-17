import React from 'react';

export default function Card({ 
  children, 
  variant = 'default',
  padding = 'md',
  className = '',
  ...props 
}) {
  const baseStyles = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white shadow-md hover:shadow-lg',
    outline: 'bg-white border-2 border-gray-200 hover:border-primary',
    gradient: 'bg-gradient-to-br from-primary to-green-500 text-white shadow-lg',
    flat: 'bg-neutral'
  };
  
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
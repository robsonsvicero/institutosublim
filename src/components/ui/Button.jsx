import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
  primary: 'bg-primary text-primary-dark hover:bg-primary-dark hover:text-primary',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-primary-dark',
  secondary: 'bg-white text-primary-dark hover:bg-gray-50',
  ghost: 'text-neutral hover:bg-white hover:text-primary',
  black: 'bg-black text-white hover:bg-gray-900',
};
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <i className={`${icon} mr-2`}></i>}
      {children}
      {icon && iconPosition === 'right' && <i className={`${icon} ml-2`}></i>}
    </button>
  );
}
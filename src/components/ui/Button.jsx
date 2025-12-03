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
    primary: 'bg-primary-500 text-primary-dark hover:bg-primary-700',
    outline: 'w-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-primary-500 font-semibold py-3 px-6 rounded-xl border border-primary-500/30 transition-colors',
    secondary: 'bg-teal-500 text-teal-100 hover:bg-teal-700',
    ghost: 'text-neutral hover:bg-white hover:text-primary',
    black: 'bg-black text-white hover:bg-gray-900',
    red: 'bg-red-500 text-white hover:bg-red-700',
    blue: 'bg-blue-600 text-white hover:bg-blue-800',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm h-[56px]',
    md: 'px-6 py-3 text-base h-[56px]',
    lg: 'px-8 py-4 text-lg h-[56px]'
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
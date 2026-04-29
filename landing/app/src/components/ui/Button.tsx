import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-none';

  const variants = {
    primary: 'bg-[#E60012] text-white hover:bg-[#C20010] hover:-translate-y-px hover:shadow-lg active:translate-y-0',
    secondary: 'bg-[#1A1A1A] text-white hover:bg-[#333] hover:-translate-y-px active:translate-y-0',
    outline: 'bg-transparent border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#1A1A1A] hover:bg-[#F8F8F8]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

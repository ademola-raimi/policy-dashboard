import React from 'react';

interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Btn: React.FC<BtnProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const base =
    'rounded-lg px-6 py-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 border-none';
  const variants = {
    primary: 'bg-cyan-600 hover:bg-cyan-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Btn;

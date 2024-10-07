import React, { ReactNode } from 'react';
import './style/appbutton.style.css';

export interface AppButtonsProps {
  label?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'black' | 'disable' | 'outline';
  icon?: ReactNode;
  fontSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
}

const AppButtons: React.FC<AppButtonsProps> = ({
  label,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  variant = 'primary',
  icon,
  fontSize = 'text-base'
}) => {
  const baseStyles = 'button';
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${fontSize} ${variant !== "outline" ? variant : "border border-primary rounded text-primary"} ${className} w-full`}
      disabled={disabled}
    >
      {icon && <span className={label ? 'mr-2' : ''}>{icon}</span>}
      {label}
    </button>
  );
}

export default AppButtons;

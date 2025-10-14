import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon | null;
}

const Input: React.FC<InputProps> = ({ icon: Icon, className = '', disabled, ...props }) => {
    return (
        <div className='relative w-full'>
            {Icon && (
                <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'>
                    <Icon className='w-5 h-5' />
                </div>
            )}
            <input
                disabled={disabled}
                className={`
                    w-full
                    ${Icon ? 'pl-10' : 'pl-4'}
                    pr-4 py-3
                    border rounded-lg
                    focus:ring-2 focus:ring-gray-900 focus:border-transparent
                    border-gray-300
                    ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900'}
                    ${className}
                `}
                {...props}
            />
        </div>
    );
};

export default Input;

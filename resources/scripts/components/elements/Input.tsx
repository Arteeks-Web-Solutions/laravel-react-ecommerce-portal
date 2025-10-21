import type { LucideIcon } from 'lucide-react';
import React, { type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

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
                    focus:ring-2 focus:ring-gray-500 focus:outline-none focus:border-transparent
                    border-gray-300
                    ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900'}
                    ${className}
                `}
                {...props}
            />
        </div>
    );
};

Input.displayName = 'Input';

export default Input;

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea: React.FC<TextareaProps> = ({ className = '', disabled, ...props }) => {
    return (
        <textarea
            disabled={disabled}
            className={`
                    w-full
                    pl-4
                    pr-4 py-3
                    border rounded-lg
                    focus:ring-2 focus:ring-gray-500 focus:outline-none focus:border-transparent
                    border-gray-300
                    ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900'}
                    ${className}
                `}
            {...props}
        />
    );
};

Textarea.displayName = 'Textarea';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string | number; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ options, className = '', disabled, ...props }) => {
    const defaultClasses = `
        appearance-none /* Remove default arrow in some browsers */
        w-full
        pl-4
        pr-8 py-3 /* Extra room on the right for a custom caret icon */
        border rounded-lg
        focus:ring-2 focus:ring-gray-500 focus:outline-none focus:border-transparent
        border-gray-300
        ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900'}
        ${className}
    `;

    return (
        <div className='relative'>
            <select disabled={disabled} className={defaultClasses} {...props}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'>
                <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                    ></path>
                </svg>
            </div>
        </div>
    );
};

Select.displayName = 'Select';

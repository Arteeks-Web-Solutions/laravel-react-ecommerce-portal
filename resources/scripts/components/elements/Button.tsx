import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className = '',
    disabled,
    isLoading = false,
    fullWidth = false,
    variant = 'primary',
    ...props
}) => {
    const baseStyles =
        variant === 'primary'
            ? `${fullWidth ? 'w-full' : 'w-auto'} py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2`
            : `${fullWidth ? 'w-full' : 'w-auto'} py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border`;

    const variantStyles =
        variant === 'primary'
            ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer'
            : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100 cursor-pointer';

    const disabledStyles =
        'bg-gray-300 border-none text-gray-500 cursor-not-allowed hover:bg-gray-300';

    return (
        <button
            disabled={disabled || isLoading}
            className={`${baseStyles} ${disabled || isLoading ? disabledStyles : variantStyles} ${className}`}
            {...props}
        >
            {isLoading && (
                <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
            )}
            <span
                className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-70' : ''}`}
            >
                {children}
            </span>
        </button>
    );
};

export default Button;

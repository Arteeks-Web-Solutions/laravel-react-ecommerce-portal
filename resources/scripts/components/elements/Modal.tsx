import React, { useCallback } from 'react';

interface ModalProps {
    visible: boolean;
    title?: string;
    children?: React.ReactNode;
    onDismiss?: () => void;
    widthClass?: string;
    dismissable?: boolean;
}

export default function Modal({
    visible,
    title,
    children,
    onDismiss,
    widthClass = 'max-w-2xl',
    dismissable = true,
}: ModalProps) {
    const handleBackdropClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            // Only dismiss if the click was directly on the backdrop (not a child)
            if (dismissable && event.target === event.currentTarget && onDismiss) {
                onDismiss();
            }
        },
        [onDismiss, dismissable],
    );

    if (!visible) return null;

    return (
        <div
            className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white rounded-xl ${widthClass} w-full p-6 relative`}
                onClick={(e) => e.stopPropagation()}
            >
                {dismissable && onDismiss && (
                    <button
                        onClick={onDismiss}
                        className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition cursor-pointer'
                        aria-label='Close modal'
                        type='button'
                    >
                        <svg width={24} height={24} fill='none' viewBox='0 0 24 24'>
                            <path
                                stroke='currentColor'
                                strokeWidth={2}
                                strokeLinecap='round'
                                d='M6 6l12 12M18 6l-12 12'
                            />
                        </svg>
                    </button>
                )}
                {title && <h3 className='text-2xl font-bold text-gray-900 mb-4'>{title}</h3>}
                {children}
            </div>
        </div>
    );
}

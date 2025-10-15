type SpinnerProps = {
    size?: 'small' | 'medium' | 'large';
    centered?: boolean;
};

export default function Spinner({ size = 'medium', centered = false }: SpinnerProps) {
    const sizeClasses = {
        small: 'w-4 h-4 border-2',
        medium: 'w-6 h-6 border-4',
        large: 'w-12 h-12 border-4',
    };

    return (
        <div
            className={
                centered ? `flex items-center justify-center ${size === 'large' && 'm-20'}` : ''
            }
        >
            <div
                className={`${sizeClasses[size]} border-gray-300 border-t-gray-900 rounded-full animate-spin`}
            ></div>
        </div>
    );
}

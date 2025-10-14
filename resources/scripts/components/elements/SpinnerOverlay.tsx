import Spinner from '@/components/elements/Spinner';

interface SpinnerOverlayProps {
    visible: boolean;
    message?: string;
}

export default function SpinnerOverlay({ visible, message }: SpinnerOverlayProps) {
    if (!visible) return null;

    return (
        <div
            className='fixed inset-0 bg-opacity-30 flex flex-col justify-center items-center z-50'
            style={{ background: `rgba(0, 0, 0, 0.45)` }}
        >
            <Spinner size={12} />
            {message && <p className='mt-4 text-white font-medium'>{message}</p>}
        </div>
    );
}

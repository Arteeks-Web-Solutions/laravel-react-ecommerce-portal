import Spinner from '@/components/elements/Spinner';

interface SpinnerOverlayProps {
    visible: boolean;
    message?: string;
}

export default function SpinnerOverlay({ visible, message }: SpinnerOverlayProps) {
    if (!visible) return null;

    return (
        <div className='fixed inset-0 bg-black/50 flex flex-col justify-center items-center z-50'>
            <Spinner size='large' />
            {message && <p className='mt-4 text-white font-medium'>{message}</p>}
        </div>
    );
}

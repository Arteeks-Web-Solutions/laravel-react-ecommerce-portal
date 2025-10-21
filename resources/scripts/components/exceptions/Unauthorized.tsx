import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
    return (
        <div className='bg-gray-50 flex flex-col justify-center items-center text-center px-4 mt-24'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl shadow-lg p-12 max-w-md'>
                <h1 className='text-6xl md:text-7xl font-extrabold mb-4'>401</h1>
                <h2 className='text-2xl md:text-3xl font-bold mb-2'>Unauthorized</h2>
                <p className='text-gray-300 mb-6'>
                    Oops! Your session has expired, please log in to continue.
                </p>
                <Link
                    to='/auth'
                    className='bg-white text-gray-900 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors'
                >
                    <ArrowLeft className='w-4 h-4' />
                    Back to login
                </Link>
            </div>
        </div>
    );
}

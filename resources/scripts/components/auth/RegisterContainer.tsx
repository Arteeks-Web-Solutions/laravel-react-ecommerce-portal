import RegisterForm from '@/components/auth/forms/RegisterForm';

export default function RegisterContainer() {
    return (
        <div className='bg-gray-50 flex flex-col justify-center items-center px-4 mt-24'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-t-xl shadow-lg px-8 py-6 w-full max-w-md text-center'>
                <h1 className='text-3xl font-bold'>Create an account</h1>
                <p className='text-gray-300 mt-1'>Join TechStore</p>
            </div>

            <RegisterForm />
        </div>
    );
}

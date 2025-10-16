import LoginForm from '@/components/auth/forms/LoginForm';

export default function LoginContainer() {
    return (
        <div className='bg-gray-50 flex flex-col justify-center items-center px-4 mt-24'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-t-xl shadow-lg px-8 py-6 w-full max-w-md text-center'>
                <h1 className='text-3xl font-bold'>Welcome back</h1>
                <p className='text-gray-300 mt-1'>Log in to continue</p>
            </div>

            <LoginForm />
        </div>
    );
}

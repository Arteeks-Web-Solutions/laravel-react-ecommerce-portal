import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import { useStoreActions, useStoreState } from '@/state/hooks';
import { LayoutDashboard, LogIn, LogOut, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const user = useStoreState((state) => state.user.data);

    const isAuthenticated = !!user;
    const isAdmin = !!user?.isAdmin;

    const setUserData = useStoreActions((actions) => actions.user.setUserData);

    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            setUserData(undefined);
            navigate('/');
            setIsLoggingOut(false);
        });
    };

    return (
        <nav className='bg-white shadow-sm sticky top-0 z-50'>
            <SpinnerOverlay visible={isLoggingOut} message='Logging out...' />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <div className='flex items-center'>
                        <Link
                            to='/shop'
                            className='text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors'
                        >
                            TechStore
                        </Link>
                    </div>

                    <div className='flex items-center space-x-6'>
                        <NavLink
                            to='/shop'
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                    isActive
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`
                            }
                        >
                            <ShoppingCart className='w-5 h-5' />
                            <span className='hidden sm:inline'>Shop</span>
                        </NavLink>

                        {isAuthenticated ? (
                            <>
                                <NavLink
                                    to='/client'
                                    className={({ isActive }) =>
                                        `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                            isActive
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`
                                    }
                                >
                                    <User className='w-5 h-5' />
                                    <span className='hidden sm:inline'>My Account</span>
                                </NavLink>

                                {isAdmin && (
                                    <NavLink
                                        to='/admin'
                                        className={({ isActive }) =>
                                            `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                                isActive
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`
                                        }
                                    >
                                        <LayoutDashboard className='w-5 h-5' />
                                        <span className='hidden sm:inline'>Admin</span>
                                    </NavLink>
                                )}

                                <button
                                    onClick={onTriggerLogout}
                                    className={`flex cursor-pointer items-center space-x-2 px-4 py-2 rounded-lg transition-all text-gray-700 hover:bg-gray-100`}
                                >
                                    <LogOut className='w-5 h-5' />
                                    <span className='hidden sm:inline'>Logout</span>
                                </button>
                            </>
                        ) : (
                            <NavLink
                                to='/auth'
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                        isActive
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`
                                }
                            >
                                <LogIn className='w-5 h-5' />
                                <span className='hidden sm:inline'>Login</span>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

import { LayoutDashboard, ShoppingCart, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

interface NavbarProps {
    cartItemCount: number;
}

export default function Navbar({ cartItemCount }: NavbarProps) {
    return (
        <nav className='bg-white shadow-sm sticky top-0 z-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <div className='flex items-center'>
                        <Link
                            to='/'
                            className='text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors'
                        >
                            TechStore
                        </Link>
                    </div>

                    <div className='flex items-center space-x-6'>
                        <NavLink
                            to='/'
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
                            {cartItemCount > 0 && (
                                <span className='bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
                                    {cartItemCount}
                                </span>
                            )}
                        </NavLink>

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
                            <span className='hidden sm:inline'>Mijn Account</span>
                        </NavLink>

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
                    </div>
                </div>
            </div>
        </nav>
    );
}

import OrdersContainer from '@/components/client/OrdersContainer';
import ProfileContainer from '@/components/client/ProfileContainer';
import { Package, User } from 'lucide-react';
import { NavLink, Route, Routes } from 'react-router-dom';

export default function ClientRouter() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl md:text-4xl font-bold'>My Account</h1>
                    <p className='text-gray-300 mt-2'>Manage your orders and profile</p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='bg-white rounded-xl shadow-sm mb-6'>
                    <div className='border-b border-gray-200'>
                        <nav className='flex'>
                            <NavLink
                                to='/client'
                                end
                                className={({ isActive }) =>
                                    `px-6 py-4 font-medium border-b-2 transition-colors ${
                                        isActive
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`
                                }
                            >
                                <Package className='w-5 h-5 inline-block mr-2' />
                                My Orders
                            </NavLink>

                            <NavLink
                                to='/client/profile'
                                className={({ isActive }) =>
                                    `px-6 py-4 font-medium border-b-2 transition-colors ${
                                        isActive
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`
                                }
                            >
                                <User className='w-5 h-5 inline-block mr-2' />
                                Profile
                            </NavLink>
                        </nav>
                    </div>
                </div>
                <Routes>
                    <Route path='/' element={<OrdersContainer />} />
                    <Route path='/profile' element={<ProfileContainer />} />
                </Routes>
            </div>
        </div>
    );
}

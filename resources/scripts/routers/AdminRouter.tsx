import DashboardContainer from '@/components/admin/DashboardContainer';
import OrdersContainer from '@/components/admin/OrdersContainer';
import ProductsContainer from '@/components/admin/products/ProductsContainer';
import { Package, TrendingUp } from 'lucide-react';
import { NavLink, Route, Routes } from 'react-router-dom';

export default function AdminRouter() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl md:text-4xl font-bold'>Admin Dashboard</h1>
                    <p className='text-gray-300 mt-2'>Manage your webshop</p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='bg-white rounded-xl shadow-sm mb-6'>
                    <div className='border-b border-gray-200'>
                        <nav className='flex'>
                            <NavLink
                                to='/admin'
                                end
                                className={({ isActive }) =>
                                    `px-6 py-4 font-medium border-b-2 transition-colors ${
                                        isActive
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`
                                }
                            >
                                <TrendingUp className='w-5 h-5 inline-block mr-2' />
                                Dashboard
                            </NavLink>
                            <NavLink
                                to='/admin/products'
                                className={({ isActive }) =>
                                    `px-6 py-4 font-medium border-b-2 transition-colors ${
                                        isActive
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`
                                }
                            >
                                <Package className='w-5 h-5 inline-block mr-2' />
                                Products
                            </NavLink>
                            <NavLink
                                to='/admin/orders'
                                className={({ isActive }) =>
                                    `px-6 py-4 font-medium border-b-2 transition-colors ${
                                        isActive
                                            ? 'border-gray-900 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`
                                }
                            >
                                <Package className='w-5 h-5 inline-block mr-2' />
                                Orders
                            </NavLink>
                        </nav>
                    </div>
                </div>

                <Routes>
                    <Route path='/' element={<DashboardContainer />} />
                    <Route path='/products' element={<ProductsContainer />} />
                    <Route path='/orders' element={<OrdersContainer />} />
                </Routes>
            </div>
        </div>
    );
}

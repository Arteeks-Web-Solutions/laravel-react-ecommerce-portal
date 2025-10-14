import { mockOrders, mockProducts } from '@/data/mockData';
import { DollarSign, Package, TrendingUp, Users } from 'lucide-react';

export default function DashboardContainer() {
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = mockOrders.length;
    const totalProducts = mockProducts.length;
    const totalCustomers = 142;

    const stats = [
        {
            label: 'Total Revenue',
            value: `€${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: 'bg-green-100 text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            label: 'Orders',
            value: totalOrders,
            icon: Package,
            color: 'bg-blue-100 text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: 'Products',
            value: totalProducts,
            icon: TrendingUp,
            color: 'bg-orange-100 text-orange-600',
            bgColor: 'bg-orange-50',
        },
        {
            label: 'Customers',
            value: totalCustomers,
            icon: Users,
            color: 'bg-purple-100 text-purple-600',
            bgColor: 'bg-purple-50',
        },
    ];

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`${stat.bgColor} rounded-xl p-6 border border-gray-200`}
                    >
                        <div className='flex items-center justify-between mb-3'>
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <stat.icon className='w-6 h-6' />
                            </div>
                        </div>
                        <div>
                            <p className='text-gray-600 text-sm font-medium'>{stat.label}</p>
                            <p className='text-3xl font-bold text-gray-900 mt-1'>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='bg-white rounded-xl shadow-sm p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>Recent Orders</h3>
                    <div className='space-y-3'>
                        {mockOrders.slice(0, 5).map((order) => (
                            <div
                                key={order.id}
                                className='flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors'
                            >
                                <div>
                                    <p className='font-semibold text-gray-900'>{order.id}</p>
                                    <p className='text-sm text-gray-500'>
                                        {new Date(order.date).toLocaleDateString('nl-NL')}
                                    </p>
                                </div>
                                <span className='font-bold text-gray-900'>
                                    €{order.total.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-white rounded-xl shadow-sm p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>Popular Products</h3>
                    <div className='space-y-3'>
                        {mockProducts.slice(0, 5).map((product, idx) => (
                            <div
                                key={product.id}
                                className='flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors'
                            >
                                <div className='flex items-center'>
                                    <span className='font-bold text-gray-400 mr-3'>#{idx + 1}</span>
                                    <div>
                                        <p className='font-semibold text-gray-900'>
                                            {product.name}
                                        </p>
                                        <p className='text-sm text-gray-500'>
                                            Stock: {product.stock}
                                        </p>
                                    </div>
                                </div>
                                <span className='font-bold text-gray-900'>
                                    €{product.price.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

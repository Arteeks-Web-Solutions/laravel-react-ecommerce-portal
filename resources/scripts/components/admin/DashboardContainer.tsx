import getStatistics from '@/api/admin/getStatistics';
import Spinner from '@/components/elements/Spinner';
import Error from '@/components/exceptions/Error';
import type { Order, OrderItem, Product } from '@/types/models';
import { DollarSign, Package, TrendingUp, Users } from 'lucide-react';
import { useEffect } from 'react';

export default function DashboardContainer() {
    const { data, error, isValidating } = getStatistics();

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    if (error) return <Error />;

    return !data || isValidating ? (
        <Spinner size='large' centered />
    ) : (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                {/* Revenue */}
                <div className={`bg-green-50 rounded-xl p-6 border border-gray-200`}>
                    <div className='flex items-center justify-between mb-3'>
                        <div className={`bg-green-100 text-green-600 p-3 rounded-lg`}>
                            <DollarSign className='w-6 h-6' />
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm font-medium'>Total Revenue</p>
                        <p className='text-3xl font-bold text-gray-900 mt-1'>
                            €{data.totalRevenue}
                        </p>
                    </div>
                </div>

                {/* Orders */}
                <div className={`bg-blue-50 rounded-xl p-6 border border-gray-200`}>
                    <div className='flex items-center justify-between mb-3'>
                        <div className={`bg-blue-100 text-blue-600 p-3 rounded-lg`}>
                            <Package className='w-6 h-6' />
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm font-medium'>Orders</p>
                        <p className='text-3xl font-bold text-gray-900 mt-1'>{data.ordersCount}</p>
                    </div>
                </div>

                {/* Products */}
                <div className={`bg-orange-50 rounded-xl p-6 border border-gray-200`}>
                    <div className='flex items-center justify-between mb-3'>
                        <div className={`bg-orange-100 text-orange-600 p-3 rounded-lg`}>
                            <TrendingUp className='w-6 h-6' />
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm font-medium'>Products</p>
                        <p className='text-3xl font-bold text-gray-900 mt-1'>
                            {data.productsCount}
                        </p>
                    </div>
                </div>

                {/* Customers */}
                <div className={`bg-purple-50 rounded-xl p-6 border border-gray-200`}>
                    <div className='flex items-center justify-between mb-3'>
                        <div className={`bg-purple-100 text-purple-600 p-3 rounded-lg`}>
                            <Users className='w-6 h-6' />
                        </div>
                    </div>
                    <div>
                        <p className='text-gray-600 text-sm font-medium'>Customers</p>
                        <p className='text-3xl font-bold text-gray-900 mt-1'>
                            {data.customersCount}
                        </p>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='bg-white rounded-xl shadow-sm p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>Recent Orders</h3>
                    <div className='space-y-3'>
                        {data.recentOrders.map((order: Order) => (
                            <div
                                key={order.id}
                                className='flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors'
                            >
                                <div>
                                    <p className='font-semibold text-gray-900'>ORD-{order.id}</p>
                                    <p className='text-sm text-gray-500'>
                                        {new Date(order.createdAt).toLocaleDateString('en-EN')}
                                    </p>
                                </div>
                                <span className='font-bold text-gray-900'>
                                    €{' '}
                                    {order.items
                                        .reduce(
                                            (sum: number, item: OrderItem) =>
                                                sum + Number(item.price),
                                            0,
                                        )
                                        .toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-white rounded-xl shadow-sm p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>Popular Products</h3>
                    <div className='space-y-3'>
                        {data.topProducts.map((product: Product, index: number) => (
                            <div
                                key={product.id}
                                className='flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors'
                            >
                                <div className='flex items-center'>
                                    <span className='font-bold text-gray-400 mr-3'>
                                        #{index + 1}
                                    </span>
                                    <div>
                                        <p className='font-semibold text-gray-900'>
                                            {product.name}
                                        </p>
                                        <p className='text-sm text-gray-500'>
                                            Stock: {product.stock ?? 'Unlimited'}
                                        </p>
                                    </div>
                                </div>
                                <span className='font-bold text-gray-900'>€{product.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

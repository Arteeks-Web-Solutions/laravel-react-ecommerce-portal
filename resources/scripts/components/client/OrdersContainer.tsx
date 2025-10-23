import getOrders from '@/api/client/getOrders';
import type { Order, OrderItem } from '@/types/models';
import { useEffect } from 'react';
import Spinner from '@/components/elements/Spinner';
import Error from '@/components/exceptions/Error';

const getStatusColor = (status: string) => {
    switch (status) {
        case 'delivered':
            return 'bg-green-100 text-green-800';
        case 'shipped':
            return 'bg-blue-100 text-blue-800';
        case 'processing':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default function OrdersContainer() {
    const { data, error, isValidating } = getOrders();

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    if (error) return <Error />;

    return !data || isValidating ? (
        <Spinner centered size='large' />
    ) : (
        <div className='space-y-4'>
            {data.length === 0 ? (
                <p className='text-center text-gray-500'>You have no orders yet.</p>
            ) : (
                data.map((order: Order) => (
                    <div
                        key={order.id}
                        className='bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow'
                    >
                        <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
                            <div>
                                <h3 className='text-lg font-bold text-gray-900'>
                                    Order ORD-{order.id}
                                </h3>
                                <p className='text-gray-500 text-sm'>
                                    {new Date(order.createdAt).toLocaleDateString('en-EN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div className='mt-3 md:mt-0 flex items-center space-x-4'>
                                <span
                                    className={`px-4 py-2 rounded-full text-sm capitalize font-semibold ${getStatusColor(order.status)}`}
                                >
                                    {order.status}
                                </span>
                                <span className='text-xl font-bold text-gray-900'>
                                    €
                                    {order.items
                                        .reduce(
                                            (sum: number, item: OrderItem) =>
                                                sum + Number(item.price),
                                            0,
                                        )
                                        .toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <div className='border-t border-gray-200 pt-4'>
                            <h4 className='text-sm font-semibold text-gray-700 mb-3'>Products:</h4>
                            <div className='space-y-2'>
                                {order.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className='flex justify-between items-center text-sm'
                                    >
                                        <span className='text-gray-700'>
                                            {item.productName}{' '}
                                            <span className='text-gray-500'>x{item.quantity}</span>
                                        </span>
                                        <span className='font-medium text-gray-900'>
                                            €{item.price}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

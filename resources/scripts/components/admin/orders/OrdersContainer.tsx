import getOrders from '@/api/admin/orders/getOrders';
import OrderModal from '@/components/admin/orders/OrderModal';
import Spinner from '@/components/elements/Spinner';
import Error from '@/components/exceptions/Error';
import type { Order, OrderItem } from '@/types/models';
import { useEffect, useState } from 'react';

export default function OrdersContainer() {
    const { data, error, isValidating, mutate } = getOrders();

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    if (error) return <Error />;

    return (
        <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Orders Overview</h2>
            <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                <div className='overflow-x-auto'>
                    {!data || isValidating ? (
                        <Spinner centered size='large' />
                    ) : (
                        <table className='w-full'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Order ID
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Date
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Status
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Items
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                        Total
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200'>
                                {data.map((order: Order) => (
                                    <tr
                                        key={order.id}
                                        className='hover:bg-gray-50 transition-colors'
                                    >
                                        <td className='px-6 py-4 font-semibold text-gray-900'>
                                            ORD-{order.id}
                                        </td>
                                        <td className='px-6 py-4 text-gray-600'>
                                            {new Date(order.createdAt).toLocaleDateString('en-EN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                                                    order.status === 'delivered'
                                                        ? 'bg-green-100 text-green-800'
                                                        : order.status === 'shipped'
                                                          ? 'bg-blue-100 text-blue-800'
                                                          : order.status === 'processing'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 text-gray-600'>
                                            {order.items?.reduce(
                                                (sum: number, item: OrderItem) =>
                                                    sum + (item.quantity || 0),
                                                0,
                                            )}{' '}
                                            items
                                        </td>
                                        <td className='px-6 py-4 font-bold text-gray-900'>
                                            €
                                            {order.items
                                                .reduce(
                                                    (sum: number, item: OrderItem) =>
                                                        sum + Number(item.price),
                                                    0,
                                                )
                                                .toFixed(2)}
                                        </td>
                                        <td className='px-6 py-4 text-right'>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className='text-blue-600 cursor-pointer hover:underline text-sm font-medium'
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <OrderModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                mutate={mutate}
            />
        </div>
    );
}

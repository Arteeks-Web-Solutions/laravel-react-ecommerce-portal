import { mockOrders } from '@/data/mockData';

export default function OrdersContainer() {
    return (
        <div>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Orders Overview</h2>
            <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                <div className='overflow-x-auto'>
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
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {mockOrders.map((order) => (
                                <tr key={order.id} className='hover:bg-gray-50 transition-colors'>
                                    <td className='px-6 py-4 font-semibold text-gray-900'>
                                        {order.id}
                                    </td>
                                    <td className='px-6 py-4 text-gray-600'>
                                        {new Date(order.date).toLocaleDateString('nl-NL', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                order.status === 'delivered'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.status === 'shipped'
                                                      ? 'bg-blue-100 text-blue-800'
                                                      : order.status === 'processing'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                                            {order.status === 'delivered'
                                                ? 'Bezorgd'
                                                : order.status === 'shipped'
                                                  ? 'Onderweg'
                                                  : order.status === 'processing'
                                                    ? 'In behandeling'
                                                    : 'In afwachting'}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 text-gray-600'>
                                        {order.items.length} items
                                    </td>
                                    <td className='px-6 py-4 font-bold text-gray-900'>
                                        €{order.total.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

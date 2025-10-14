import { mockOrders } from '@/data/mockData';

export default function OrdersContainer() {
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

    return (
        <div className='space-y-4'>
            {mockOrders.map((order) => (
                <div
                    key={order.id}
                    className='bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow'
                >
                    <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
                        <div>
                            <h3 className='text-lg font-bold text-gray-900'>Order {order.id}</h3>
                            <p className='text-gray-500 text-sm'>
                                {new Date(order.date).toLocaleDateString('nl-NL', {
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
                                €{order.total.toFixed(2)}
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
                                        €{item.price.toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

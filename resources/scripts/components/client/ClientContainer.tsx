import { useState } from 'react';
import { Package, User, MapPin, CreditCard } from 'lucide-react';
import { mockOrders, mockUser } from '@/data/mockData';

export default function ClientContainer() {
    const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

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

    const getStatusText = (status: string) => {
        switch (status) {
            case 'delivered':
                return 'Bezorgd';
            case 'shipped':
                return 'Onderweg';
            case 'processing':
                return 'In behandeling';
            default:
                return 'In afwachting';
        }
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl md:text-4xl font-bold'>Mijn Account</h1>
                    <p className='text-gray-300 mt-2'>Beheer je bestellingen en profiel</p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='bg-white rounded-xl shadow-sm mb-6'>
                    <div className='border-b border-gray-200'>
                        <nav className='flex'>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                                    activeTab === 'orders'
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <Package className='w-5 h-5 inline-block mr-2' />
                                Mijn Bestellingen
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                                    activeTab === 'profile'
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <User className='w-5 h-5 inline-block mr-2' />
                                Profiel
                            </button>
                        </nav>
                    </div>
                </div>

                {activeTab === 'orders' && (
                    <div className='space-y-4'>
                        {mockOrders.map((order) => (
                            <div
                                key={order.id}
                                className='bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow'
                            >
                                <div className='flex flex-col md:flex-row md:items-center justify-between mb-4'>
                                    <div>
                                        <h3 className='text-lg font-bold text-gray-900'>
                                            Bestelling {order.id}
                                        </h3>
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
                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                                        >
                                            {getStatusText(order.status)}
                                        </span>
                                        <span className='text-xl font-bold text-gray-900'>
                                            €{order.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                <div className='border-t border-gray-200 pt-4'>
                                    <h4 className='text-sm font-semibold text-gray-700 mb-3'>
                                        Producten:
                                    </h4>
                                    <div className='space-y-2'>
                                        {order.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className='flex justify-between items-center text-sm'
                                            >
                                                <span className='text-gray-700'>
                                                    {item.productName}{' '}
                                                    <span className='text-gray-500'>
                                                        x{item.quantity}
                                                    </span>
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
                )}

                {activeTab === 'profile' && (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <div className='flex items-center mb-4'>
                                <User className='w-6 h-6 text-gray-900 mr-3' />
                                <h3 className='text-xl font-bold text-gray-900'>
                                    Persoonlijke Gegevens
                                </h3>
                            </div>
                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Naam
                                    </label>
                                    <input
                                        type='text'
                                        defaultValue={mockUser.name}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Email
                                    </label>
                                    <input
                                        type='email'
                                        defaultValue={mockUser.email}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                    />
                                </div>
                                <button className='w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium'>
                                    Opslaan
                                </button>
                            </div>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <div className='flex items-center mb-4'>
                                <MapPin className='w-6 h-6 text-gray-900 mr-3' />
                                <h3 className='text-xl font-bold text-gray-900'>Adres</h3>
                            </div>
                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Straat
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Hoofdstraat 123'
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Postcode
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='1234 AB'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                                            Plaats
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='Amsterdam'
                                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                        />
                                    </div>
                                </div>
                                <button className='w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium'>
                                    Opslaan
                                </button>
                            </div>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <div className='flex items-center mb-4'>
                                <CreditCard className='w-6 h-6 text-gray-900 mr-3' />
                                <h3 className='text-xl font-bold text-gray-900'>Betaalmethoden</h3>
                            </div>
                            <div className='space-y-3'>
                                <div className='border border-gray-300 rounded-lg p-4 flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <div className='w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded'></div>
                                        <div className='ml-3'>
                                            <p className='font-medium text-gray-900'>•••• 4242</p>
                                            <p className='text-sm text-gray-500'>Verloopt 12/25</p>
                                        </div>
                                    </div>
                                    <span className='text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full'>
                                        Standaard
                                    </span>
                                </div>
                                <button className='w-full border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors font-medium'>
                                    + Nieuwe Kaart Toevoegen
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

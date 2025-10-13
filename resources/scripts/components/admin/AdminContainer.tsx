import { useState } from 'react';
import { Package, Users, TrendingUp, DollarSign, Plus, Edit2, Trash2 } from 'lucide-react';
import { mockProducts, mockOrders } from '@/data/mockData';
import type { Product } from '@/types/models';

export default function AdminArea() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = mockOrders.length;
    const totalProducts = products.length;
    const totalCustomers = 142;

    const stats = [
        {
            label: 'Totale Omzet',
            value: `€${totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: 'bg-green-100 text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            label: 'Bestellingen',
            value: totalOrders,
            icon: Package,
            color: 'bg-blue-100 text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            label: 'Producten',
            value: totalProducts,
            icon: TrendingUp,
            color: 'bg-orange-100 text-orange-600',
            bgColor: 'bg-orange-50',
        },
        {
            label: 'Klanten',
            value: totalCustomers,
            icon: Users,
            color: 'bg-purple-100 text-purple-600',
            bgColor: 'bg-purple-50',
        },
    ];

    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const handleSaveProduct = () => {
        if (editingProduct) {
            setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
            setEditingProduct(null);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl md:text-4xl font-bold'>Admin Dashboard</h1>
                    <p className='text-gray-300 mt-2'>Beheer je webshop</p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='bg-white rounded-xl shadow-sm mb-6'>
                    <div className='border-b border-gray-200'>
                        <nav className='flex'>
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                                    activeTab === 'dashboard'
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <TrendingUp className='w-5 h-5 inline-block mr-2' />
                                Dashboard
                            </button>
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                                    activeTab === 'products'
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <Package className='w-5 h-5 inline-block mr-2' />
                                Producten
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                                    activeTab === 'orders'
                                        ? 'border-gray-900 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <Package className='w-5 h-5 inline-block mr-2' />
                                Bestellingen
                            </button>
                        </nav>
                    </div>
                </div>

                {activeTab === 'dashboard' && (
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
                                        <p className='text-gray-600 text-sm font-medium'>
                                            {stat.label}
                                        </p>
                                        <p className='text-3xl font-bold text-gray-900 mt-1'>
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            <div className='bg-white rounded-xl shadow-sm p-6'>
                                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                                    Recente Bestellingen
                                </h3>
                                <div className='space-y-3'>
                                    {mockOrders.slice(0, 5).map((order) => (
                                        <div
                                            key={order.id}
                                            className='flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors'
                                        >
                                            <div>
                                                <p className='font-semibold text-gray-900'>
                                                    {order.id}
                                                </p>
                                                <p className='text-sm text-gray-500'>
                                                    {new Date(order.date).toLocaleDateString(
                                                        'nl-NL',
                                                    )}
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
                                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                                    Populaire Producten
                                </h3>
                                <div className='space-y-3'>
                                    {products.slice(0, 5).map((product, idx) => (
                                        <div
                                            key={product.id}
                                            className='flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors'
                                        >
                                            <div className='flex items-center'>
                                                <span className='font-bold text-gray-400 mr-3'>
                                                    #{idx + 1}
                                                </span>
                                                <div>
                                                    <p className='font-semibold text-gray-900'>
                                                        {product.name}
                                                    </p>
                                                    <p className='text-sm text-gray-500'>
                                                        Voorraad: {product.stock}
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
                )}

                {activeTab === 'products' && (
                    <div>
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-2xl font-bold text-gray-900'>Product Beheer</h2>
                            <button className='bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 font-medium'>
                                <Plus className='w-5 h-5' />
                                <span>Nieuw Product</span>
                            </button>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='bg-gray-50 border-b border-gray-200'>
                                        <tr>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Product
                                            </th>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Categorie
                                            </th>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Prijs
                                            </th>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Voorraad
                                            </th>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Acties
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {products.map((product) => (
                                            <tr
                                                key={product.id}
                                                className='hover:bg-gray-50 transition-colors'
                                            >
                                                <td className='px-6 py-4'>
                                                    <div className='flex items-center'>
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className='w-12 h-12 rounded-lg object-cover mr-3'
                                                        />
                                                        <div>
                                                            <p className='font-semibold text-gray-900'>
                                                                {product.name}
                                                            </p>
                                                            <p className='text-sm text-gray-500 line-clamp-1'>
                                                                {product.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium'>
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 font-semibold text-gray-900'>
                                                    €{product.price.toFixed(2)}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <span
                                                        className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-green-600'}`}
                                                    >
                                                        {product.stock}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <div className='flex space-x-2'>
                                                        <button
                                                            onClick={() =>
                                                                setEditingProduct(product)
                                                            }
                                                            className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                                                        >
                                                            <Edit2 className='w-4 h-4' />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteProduct(product.id)
                                                            }
                                                            className='p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors'
                                                        >
                                                            <Trash2 className='w-4 h-4' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div>
                        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                            Bestellingen Overzicht
                        </h2>
                        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead className='bg-gray-50 border-b border-gray-200'>
                                        <tr>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Bestelling ID
                                            </th>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Datum
                                            </th>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Status
                                            </th>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Items
                                            </th>
                                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                                Totaal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {mockOrders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className='hover:bg-gray-50 transition-colors'
                                            >
                                                <td className='px-6 py-4 font-semibold text-gray-900'>
                                                    {order.id}
                                                </td>
                                                <td className='px-6 py-4 text-gray-600'>
                                                    {new Date(order.date).toLocaleDateString(
                                                        'nl-NL',
                                                        {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        },
                                                    )}
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
                )}
            </div>

            {editingProduct && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-xl max-w-2xl w-full p-6'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-4'>Product Bewerken</h3>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                    Naam
                                </label>
                                <input
                                    type='text'
                                    value={editingProduct.name}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            name: e.target.value,
                                        })
                                    }
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                    Beschrijving
                                </label>
                                <textarea
                                    value={editingProduct.description}
                                    onChange={(e) =>
                                        setEditingProduct({
                                            ...editingProduct,
                                            description: e.target.value,
                                        })
                                    }
                                    rows={3}
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Prijs
                                    </label>
                                    <input
                                        type='number'
                                        value={editingProduct.price}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                price: parseFloat(e.target.value),
                                            })
                                        }
                                        step='0.01'
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                                        Voorraad
                                    </label>
                                    <input
                                        type='number'
                                        value={editingProduct.stock}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                stock: parseInt(e.target.value),
                                            })
                                        }
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                                    />
                                </div>
                            </div>
                            <div className='flex space-x-3 pt-4'>
                                <button
                                    onClick={handleSaveProduct}
                                    className='flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium'
                                >
                                    Opslaan
                                </button>
                                <button
                                    onClick={() => setEditingProduct(null)}
                                    className='flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium'
                                >
                                    Annuleren
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

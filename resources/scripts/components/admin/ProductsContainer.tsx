import { mockProducts } from '@/data/mockData';
import type { Product } from '@/types/models';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function ProductsContainer() {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>Product Management</h2>
                <button className='bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 font-medium'>
                    <Plus className='w-5 h-5' />
                    <span>New Product</span>
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
                                    Category
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Price
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Stock
                                </th>
                                <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {products.map((product) => (
                                <tr key={product.id} className='hover:bg-gray-50 transition-colors'>
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
                                                onClick={() => setEditingProduct(product)}
                                                className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                                            >
                                                <Edit2 className='w-4 h-4' />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
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

            {editingProduct && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
                    <div className='bg-white rounded-xl max-w-2xl w-full p-6'>
                        <h3 className='text-2xl font-bold text-gray-900 mb-4'>Edit Product</h3>
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                    Name
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
                                    Description
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
                                        Price
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
                                        Stock
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
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingProduct(null)}
                                    className='flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

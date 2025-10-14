import { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import type { Product } from '@/types/models';
import { mockProducts } from '@/data/mockData';

interface ShopProps {
    onAddToCart: (product: Product) => void;
}

export default function ShopContainer({ onAddToCart }: ShopProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', ...Array.from(new Set(mockProducts.map((p) => p.category)))];

    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Welkom bij TechStore</h1>
                    <p className='text-xl text-gray-300'>
                        Ontdek onze premium collectie tech producten
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='mb-8 space-y-4'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                        <input
                            type='text'
                            placeholder='Zoek producten...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                        />
                    </div>

                    <div className='flex flex-wrap gap-2'>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    selectedCategory === category
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                            >
                                {category === 'all' ? 'Alle' : category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className='bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'
                        >
                            <div className='relative overflow-hidden aspect-square'>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                />
                                {product.stock < 10 && (
                                    <span className='absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full'>
                                        Nog {product.stock} op voorraad
                                    </span>
                                )}
                            </div>

                            <div className='p-5'>
                                <div className='mb-2'>
                                    <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>
                                        {product.category}
                                    </span>
                                </div>
                                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                                    {product.name}
                                </h3>
                                <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                                    {product.description}
                                </p>

                                <div className='flex items-center justify-between'>
                                    <span className='text-2xl font-bold text-gray-900'>
                                        €{product.price.toFixed(2)}
                                    </span>
                                    <button
                                        onClick={() => onAddToCart(product)}
                                        disabled={product.stock === 0}
                                        className='bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
                                    >
                                        <ShoppingCart className='w-4 h-4' />
                                        <span>Toevoegen</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className='text-center py-12'>
                        <p className='text-gray-500 text-lg'>Geen producten gevonden</p>
                    </div>
                )}
            </div>
        </div>
    );
}

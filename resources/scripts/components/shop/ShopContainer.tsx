import { AddHttpError } from '@/api/http';
import addToCart from '@/api/shop/addToCart';
import getShopData from '@/api/shop/getShopData';
import Spinner from '@/components/elements/Spinner';
import Error from '@/components/exceptions/Error';
import { useStoreState } from '@/state/hooks';
import type { Product, ProductCategory } from '@/types/models';
import { Package, Search, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/elements/Button';

function getLocalCartCount(): number {
    const cartRaw = localStorage.getItem('cart');
    if (!cartRaw) return 0;

    try {
        const cart: { product_id: number; quantity: number }[] = JSON.parse(cartRaw);
        return cart.reduce((total, item) => total + item.quantity, 0);
    } catch {
        return 0;
    }
}

export default function ShopContainer() {
    const { data, error, isValidating, mutate } = getShopData();
    const navigate = useNavigate();

    const isAuthenticated = useStoreState((state) => !!state.user.data);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<number | null>(null);

    const handleAddToCart = (product: Product) => {
        setIsLoading(product.id);

        if (!isAuthenticated) {
            const cartRaw = localStorage.getItem('cart');
            const cart: { productId: number; quantity: number }[] = cartRaw
                ? JSON.parse(cartRaw)
                : [];

            const index = cart.findIndex((item) => item.productId === product.id);
            if (index !== -1) {
                cart[index]!.quantity += 1;
            } else {
                cart.push({ productId: product.id, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            mutate?.();
            setIsLoading(null);
        } else {
            addToCart(product.id)
                .then(() => {
                    mutate();
                })
                .catch((error) => {
                    console.error(error);
                    AddHttpError(error);
                })
                .finally(() => setIsLoading(null));
        }
    };

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    if (error) return <Error />;

    return (
        <div>
            {!data || isValidating ? (
                <Spinner size='large' centered />
            ) : (
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                    <div className='mb-8 space-y-4'>
                        <div className='relative'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                            <input
                                type='text'
                                placeholder='Search products...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                            />
                        </div>

                        <div className='flex flex-wrap gap-2'>
                            <Button
                                variant={selectedCategory !== null ? 'secondary' : 'primary'}
                                onClick={() => setSelectedCategory(null)}
                            >
                                All
                            </Button>
                            {data.categories.map((category: ProductCategory) => (
                                <Button
                                    variant={
                                        selectedCategory !== category.id ? 'secondary' : 'primary'
                                    }
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {data.products
                            .filter((p: Product) =>
                                !selectedCategory ? true : p.category.id === selectedCategory,
                            )
                            .map((product: Product) => (
                                <div
                                    key={product.id}
                                    className='bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full'
                                >
                                    <div className='relative overflow-hidden aspect-square'>
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                            />
                                        ) : (
                                            <Package className='w-full h-full text-gray-200 p-10' />
                                        )}
                                        {product.stock && product.stock < 10 && (
                                            <span className='absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full'>
                                                Only {product.stock} left in stock
                                            </span>
                                        )}
                                    </div>

                                    <div className='p-5 flex flex-col flex-grow'>
                                        <div className='mb-2'>
                                            <span className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>
                                                {product.category.name}
                                            </span>
                                        </div>
                                        <h3 className='text-lg font-bold text-gray-900 mb-2'>
                                            {product.name}
                                        </h3>
                                        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                                            {product.description}
                                        </p>

                                        <div className='flex items-center justify-between mt-auto pt-2'>
                                            <span className='text-2xl font-bold text-gray-900'>
                                                €{product.price}
                                            </span>
                                            <Button
                                                onClick={() => handleAddToCart(product)}
                                                disabled={product.stock === 0 || isLoading !== null}
                                                isLoading={isLoading === product.id}
                                            >
                                                <ShoppingCart className='w-4 h-4' />
                                                <span>Add</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {data.products.length === 0 && (
                        <div className='text-center py-12'>
                            <p className='text-gray-500 text-lg'>No products found</p>
                        </div>
                    )}
                </div>
            )}
            <button
                className='fixed bottom-6 cursor-pointer right-6 z-50 bg-gray-900 hover:bg-gray-800 text-white rounded-full p-4 shadow-xl transition-all flex items-center focus:outline-none focus:ring-4 focus:ring-gray-500'
                aria-label='View shopping cart'
                onClick={() => navigate('/shop/cart')}
                type='button'
                style={{
                    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.15)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <ShoppingCart className='w-7 h-7' />
                {(isAuthenticated ? data?.cartCount : getLocalCartCount()) > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow'>
                        {isAuthenticated ? data?.cartCount : getLocalCartCount()}
                    </span>
                )}
            </button>
        </div>
    );
}

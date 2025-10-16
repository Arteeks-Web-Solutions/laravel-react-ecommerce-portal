import Spinner from '@/components/elements/Spinner';
import Error from '@/components/exceptions/Error';
import { useStoreState } from '@/state/hooks';
import { Minus, Package, Plus, ShoppingCart, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../elements/Button';
import updateCart from '@/api/shop/updateCart';
import getCartData from '@/api/shop/getCartData';
import type { Cart, Product } from '@/types/models';
import { AddHttpError } from '@/api/http';

export default function CartContainer() {
    const { data, error, isValidating, mutate } = getCartData();

    const isAuthenticated = useStoreState((state) => !!state.user.data);

    // Cart state: for authenticated users we get it from backend, for guests from localStorage
    const [cartItems, setCartItems] = useState<Cart[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const fetchGuestCart = async () => {
        const cartRaw = localStorage.getItem('cart');
        setCartItems(cartRaw ? JSON.parse(cartRaw) : []);
    };

    useEffect(() => {
        // load cart items based on authentication status
        if (isAuthenticated) {
            setCartItems(data?.cart?.items ?? []);
        } else {
            fetchGuestCart();
        }
    }, [isAuthenticated, data]);

    const handleChangeQuantity = async (productId: number, quantity: number) => {
        if (quantity < 1) return;
        setIsLoading(true);

        if (isAuthenticated) {
            updateCart(productId, quantity)
                .then(() => {
                    mutate();
                })
                .catch((error) => {
                    console.error(error);
                    AddHttpError(error);
                })
                .finally(() => setIsLoading(false));
        } else {
            const cart = cartItems
                .map((item) => (item.productId === productId ? { ...item, quantity } : item))
                .filter((item) => item.quantity > 0);
            localStorage.setItem('cart', JSON.stringify(cart));
            fetchGuestCart();
        }
    };

    const handleRemove = async (productId: number) => {
        setIsLoading(true);

        if (isAuthenticated) {
            updateCart(productId, 0)
                .then(() => {
                    mutate();
                })
                .catch((error) => {
                    console.error(error);
                    AddHttpError(error);
                })
                .finally(() => setIsLoading(false));
        } else {
            const cart = cartItems.filter((item) => item.productId !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            fetchGuestCart();
        }
    };

    const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalPrice = cartItems.reduce((sum, item) => {
        const product = data?.products?.find((p: Product) => p.id === item.productId);
        if (!product) return sum;
        return sum + product.price * item.quantity;
    }, 0);

    if (error) return <Error />;

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Welcome to TechStore</h1>
                    <p className='text-xl text-gray-300'>
                        Discover our premium collection of tech products
                    </p>
                </div>
            </div>
            <div className='max-w-3xl mx-auto bg-white shadow rounded-xl p-6 mt-10 mb-10'>
                <h2 className='text-2xl font-bold flex items-center gap-2 mb-6'>
                    <ShoppingCart className='w-6 h-6' />
                    Shopping Cart
                </h2>
                {!data || isValidating ? (
                    <Spinner centered size='large' />
                ) : cartItems.length === 0 ? (
                    <div className='text-gray-500 text-lg text-center py-12'>
                        Your cart is empty.
                    </div>
                ) : (
                    <div>
                        <ul className='divide-y'>
                            {cartItems.map((item: Cart) => {
                                const product = data.products.find(
                                    (p: Product) => p.id === item.productId,
                                );

                                if (!product) return null;
                                return (
                                    <li key={product.id} className='py-4 flex items-center gap-4'>
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className='w-16 h-16 object-cover rounded'
                                            />
                                        ) : (
                                            <div className='w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center'>
                                                <Package className='w-10 h-10 text-gray-300' />
                                            </div>
                                        )}
                                        <div className='w-full'>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <div className='font-semibold text-gray-900'>
                                                        {product.name}
                                                    </div>
                                                    {typeof product.stock === 'number' &&
                                                        product.stock <= 10 &&
                                                        product.stock > 0 && (
                                                            <div className='text-sm text-orange-600 font-medium'>
                                                                Only {product.stock} left in stock
                                                            </div>
                                                        )}
                                                    <div className='text-gray-500 text-sm'>
                                                        {product.category?.name}
                                                    </div>
                                                </div>
                                                <div className='font-semibold text-gray-900'>
                                                    €{(product.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-4 justify-between'>
                                                    <Button
                                                        variant='secondary'
                                                        onClick={() =>
                                                            handleChangeQuantity(
                                                                product.id,
                                                                item.quantity - 1,
                                                            )
                                                        }
                                                        disabled={item.quantity <= 1 || isLoading}
                                                    >
                                                        <Minus className='w-4 h-4' />
                                                    </Button>
                                                    <span>{item.quantity}</span>
                                                    <Button
                                                        variant='secondary'
                                                        disabled={
                                                            isLoading ||
                                                            (product.stock !== null &&
                                                                item.quantity >= product.stock)
                                                        }
                                                        onClick={() =>
                                                            handleChangeQuantity(
                                                                product.id,
                                                                item.quantity + 1,
                                                            )
                                                        }
                                                    >
                                                        <Plus className='w-4 h-4' />
                                                    </Button>
                                                </div>
                                                <Button
                                                    className='mt-2'
                                                    variant='secondary'
                                                    disabled={isLoading}
                                                    onClick={() => handleRemove(product.id)}
                                                >
                                                    <Trash className='w-4 h-4' />
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className='border-t pt-6 flex justify-between items-center'>
                            <div className='text-lg'>
                                <span className='font-semibold'>
                                    Total ({totalCount} item{totalCount > 1 ? 's' : ''}):
                                </span>
                            </div>
                            <div className='text-2xl font-bold text-gray-900'>
                                €{totalPrice.toFixed(2)}
                            </div>
                        </div>
                        <div className='flex mt-8 justify-end'>
                            <Button>Proceed to Checkout</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

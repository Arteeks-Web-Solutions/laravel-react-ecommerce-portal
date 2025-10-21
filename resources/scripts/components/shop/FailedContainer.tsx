import getCartData from '@/api/shop/getCartData';
import Button from '@/components/elements/Button';
import Spinner from '@/components/elements/Spinner';
import Error from '@/components/exceptions/Error';
import type { CartItem, Product } from '@/types/models';
import { Package, ShoppingCart, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FailedContainer() {
    const navigate = useNavigate();

    const { data, error, isValidating } = getCartData();

    const cartItems = data?.cart?.items ?? [];
    const totalCount = cartItems.reduce(
        (sum: number, item: CartItem) => sum + (item.quantity || 0),
        0,
    );
    const totalPrice = cartItems.reduce((sum: number, item: CartItem) => {
        const product = data?.products?.find((p: Product) => p.id === item.productId);
        if (!product) return sum;
        return sum + product.price * item.quantity;
    }, 0);

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    if (error) return <Error />;

    return (
        <div className='max-w-3xl mx-auto bg-white shadow rounded-xl p-6 mt-10 mb-10'>
            <div className='flex items-center gap-3 mb-4'>
                <XCircle className='w-8 h-8 text-red-600' />
                <h1 className='text-2xl font-bold'>Payment Failed</h1>
            </div>

            <p className='text-gray-600 mb-6'>
                Unfortunately, your payment has failed. Your order has not been completed. Please
                try again or contact customer support if the issue persists.
            </p>

            {!data || isValidating ? (
                <Spinner centered size='large' />
            ) : (
                cartItems.length > 0 && (
                    <div>
                        <h2 className='text-lg font-semibold flex items-center gap-2 mb-4'>
                            <ShoppingCart className='w-5 h-5' />
                            Order summary
                        </h2>

                        <ul className='divide-y'>
                            {cartItems.map((item: CartItem) => {
                                const product = data.products.find(
                                    (p: Product) => p.id === item.productId,
                                );

                                return (
                                    <li
                                        key={item.productId}
                                        className='py-4 flex items-center gap-4'
                                    >
                                        {product?.image ? (
                                            <img
                                                src={product.image}
                                                alt={product?.name ?? `Product ${item.productId}`}
                                                className='w-16 h-16 min-w-16 min-h-16 object-cover rounded'
                                            />
                                        ) : (
                                            <div className='w-16 h-16 min-w-16 min-h-16 rounded-lg bg-gray-200 flex items-center justify-center'>
                                                <Package className='w-10 h-10 text-gray-300' />
                                            </div>
                                        )}
                                        <div className='w-full'>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <div className='font-semibold text-gray-900'>
                                                        {product?.name ??
                                                            `Product #${item.productId}`}
                                                    </div>
                                                    <div className='text-gray-500 text-sm'>
                                                        {product?.category?.name ?? ''}
                                                    </div>
                                                </div>
                                                <div className='font-semibold text-gray-900'>
                                                    €
                                                    {(product
                                                        ? product.price * item.quantity
                                                        : 0
                                                    ).toFixed(2)}
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-between mt-2'>
                                                <div className='text-sm text-gray-700'>
                                                    Quantity: {item.quantity}
                                                </div>
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
                    </div>
                )
            )}

            <div className='flex gap-3 mt-8 justify-end'>
                <Button variant='secondary' onClick={() => navigate('/shop')}>
                    Continue shopping
                </Button>
                <Button onClick={() => navigate('/shop/checkout')}>Retry Payment</Button>
                <Button
                    variant='secondary'
                    onClick={() => (window.location.href = 'mailto:info@arteeks.nl')}
                >
                    Contact Customer Support
                </Button>
            </div>
        </div>
    );
}

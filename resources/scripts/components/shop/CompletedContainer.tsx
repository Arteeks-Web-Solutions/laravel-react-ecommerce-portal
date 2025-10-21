import getOrder from '@/api/shop/getOrder';
import Button from '@/components/elements/Button';
import Spinner from '@/components/elements/Spinner';
import Error from '@/components/exceptions/Error';
import { useStoreState } from '@/state/hooks';
import { CheckCircle, Package, ShoppingCart } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Forbidden from '../exceptions/Forbidden';
import Unauthorized from '../exceptions/Unauthorized';

interface StripeLineItem {
    description: string;
    quantity: number;
    amountTotal: number;
    price: {
        product: {
            images: string[];
            metadata: {
                productId: string;
            };
        };
    };
}

export default function CheckoutCompleted() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id') ?? '';

    const { data, error, isValidating } = getOrder(Number(orderId));
    const isAuthenticated = useStoreState((s) => !!s.user.data);

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    if (error && error.response?.status === 403) {
        return <Forbidden />;
    } else if (error && error.response?.status === 401) {
        return <Unauthorized />;
    } else if (error) {
        return <Error />;
    }

    if (!data || isValidating) {
        return (
            <div className='max-w-3xl mx-auto bg-white shadow rounded-xl p-6 mt-10 mb-10'>
                <Spinner centered size='large' />
            </div>
        );
    }

    const totalCount = data?.items?.reduce(
        (sum: number, item: StripeLineItem) => sum + (item.quantity || 0),
        0,
    );
    const totalPrice = data?.items?.reduce(
        (sum: number, item: StripeLineItem) => sum + item.amountTotal,
        0,
    );

    return (
        <div className='max-w-3xl mx-auto bg-white shadow rounded-xl p-6 mt-10 mb-10'>
            <div className='flex items-center gap-3 mb-4'>
                <CheckCircle className='w-8 h-8 text-green-600' />
                <h1 className='text-2xl font-bold'>Thanks for your order!</h1>
            </div>

            <p className='text-gray-600 mb-6'>
                Your order <b>(ORD-{orderId})</b> has been successfully placed. We have sent a
                confirmation to your email.
            </p>

            {data?.items?.length === 0 ? (
                <div className='text-gray-500 text-lg text-center py-12'>
                    No items to display in the summary.
                </div>
            ) : (
                <div>
                    <h2 className='text-lg font-semibold flex items-center gap-2 mb-4'>
                        <ShoppingCart className='w-5 h-5' />
                        Order summary
                    </h2>

                    <ul className='divide-y'>
                        {data?.items?.map((item: StripeLineItem, index: number) => (
                            <li key={index} className='py-4 flex items-center gap-4'>
                                {item.price.product.images.length > 0 ? (
                                    <img
                                        src={item.price.product.images[0]}
                                        alt={item.description}
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
                                                {item.description}
                                            </div>
                                        </div>
                                        <div className='font-semibold text-gray-900'>
                                            €{(item.amountTotal / 100).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between mt-2'>
                                        <div className='text-sm text-gray-700'>
                                            Quantity: {item.quantity}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className='border-t pt-6 flex justify-between items-center'>
                        <div className='text-lg'>
                            <span className='font-semibold'>
                                Total ({totalCount} item{totalCount > 1 ? 's' : ''}):
                            </span>
                        </div>
                        <div className='text-2xl font-bold text-gray-900'>
                            €{(totalPrice / 100).toFixed(2)}
                        </div>
                    </div>
                </div>
            )}

            <div className='flex gap-3 mt-8 justify-end'>
                <Button variant='secondary' onClick={() => navigate('/shop')}>
                    Continue shopping
                </Button>
                <Button onClick={() => (isAuthenticated ? navigate('/client') : navigate('/shop'))}>
                    {isAuthenticated ? 'My orders' : 'Homepage'}
                </Button>
            </div>
        </div>
    );
}

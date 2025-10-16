import getCartData from '@/api/shop/getCartData';
import Button from '@/components/elements/Button';
import Spinner from '@/components/elements/Spinner';
import { useStoreState } from '@/state/hooks';
import { Form, Formik, type FormikHelpers } from 'formik';
import LoginForm from '../auth/forms/LoginForm';
import RegisterForm from '../auth/forms/RegisterForm';
import Field from '../elements/Field';
import type { CartItem, Product } from '@/types/models';
import Error from '../exceptions/Error';
import { useEffect } from 'react';
import updateCart from '@/api/shop/updateCart';
import { AddHttpError } from '@/api/http';
import { toast } from 'react-toastify';

interface Values {
    name: string;
    email: string;
    street: string;
    city: string;
    zip: string;
    country: string;
}

export default function CheckoutContainer() {
    const isAuthenticated = useStoreState((state) => !!state.user.data);
    const user = useStoreState((state) => state.user.data);

    const { data, isValidating, error, mutate } = getCartData();

    const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        // TODO: API call
        alert('Order placed!');
    };

    const cartItems = data?.cart?.items ?? [];
    const totalPrice = cartItems.reduce((sum: number, item: CartItem) => {
        const product = data?.products?.find((p: Product) => p.id === item.productId);
        if (!product) return sum;
        return sum + product.price * item.quantity;
    }, 0);

    // On component mount, ensure cart items are valid (product exists and stock is sufficient)
    useEffect(() => {
        if (!data || !isAuthenticated) return;
        data.cart?.items?.forEach((item: CartItem) => {
            const product = data.products.find((p: Product) => p.id === item.productId);

            if (!product) {
                updateCart(item.productId, 0)
                    .then(() => {
                        toast.info(`Removed unavailable product from cart.`);
                        mutate();
                    })
                    .catch((error) => {
                        console.error(error);
                        AddHttpError(error);
                    });
            } else if (product.stock && item.quantity > product.stock) {
                updateCart(item.productId, product.stock)
                    .then(() => {
                        toast.info(
                            `Adjusted quantity of ${product.name} to available stock (${product.stock}).`,
                        );
                        mutate();
                    })
                    .catch((error) => {
                        console.error(error);
                        AddHttpError(error);
                    });
            }
        });
    }, [data, isAuthenticated, mutate]);

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    if (error) return <Error />;

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-10 mb-10'>
            <h2 className='text-2xl font-bold mb-6'>Checkout</h2>
            {isValidating ? (
                <Spinner centered size='large' />
            ) : !isAuthenticated ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    <div className='flex flex-col px-4'>
                        <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-t-xl shadow-lg px-8 py-6 w-full max-w-md text-center'>
                            <h2 className='text-white font-bold text-xl mt-1'>
                                Already have an account?
                            </h2>
                        </div>

                        <LoginForm checkout />
                    </div>

                    <div className='flex flex-col px-4'>
                        <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-t-xl shadow-lg px-8 py-6 w-full max-w-md text-center'>
                            <h2 className='text-white font-bold text-xl mt-1'>Create an account</h2>
                        </div>

                        <RegisterForm checkout />
                    </div>
                </div>
            ) : (
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={{
                        name: user?.name || '',
                        email: user?.email || '',
                        street: user?.street || '',
                        city: user?.city || '',
                        zip: user?.postalCode || '',
                        country: user?.country || '',
                    }}
                >
                    {({ isSubmitting, submitForm }) => (
                        <Form>
                            <div className='mb-8'>
                                <h3 className='text-xl font-semibold mb-4'>Delivery Address</h3>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <Field
                                            name='name'
                                            type='text'
                                            label='Name'
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name='email'
                                            type='email'
                                            label='Email'
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name='street'
                                            type='text'
                                            label='Street'
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name='city'
                                            type='text'
                                            label='City'
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name='zip'
                                            type='text'
                                            label='Zip Code'
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name='country'
                                            type='text'
                                            label='Country'
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='mb-8'>
                                <h3 className='text-xl font-semibold mb-4'>Order Overview</h3>
                                <div className='bg-gray-50 rounded p-4'>
                                    {cartItems.length === 0 ? (
                                        <div className='text-gray-500'>Your cart is empty.</div>
                                    ) : (
                                        <ul className='divide-y'>
                                            {cartItems.map((item: CartItem) => {
                                                const product = data?.products?.find(
                                                    (p: Product) => p.id === item.productId,
                                                );
                                                if (!product) return null;
                                                return (
                                                    <li
                                                        key={product.id}
                                                        className='py-2 flex justify-between items-center'
                                                    >
                                                        <span>
                                                            {product.name}{' '}
                                                            <span className='text-gray-500'>
                                                                x {item.quantity}
                                                            </span>
                                                        </span>
                                                        <span className='font-medium'>
                                                            €
                                                            {(
                                                                product.price * item.quantity
                                                            ).toFixed(2)}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                    <div className='border-t pt-4 mt-4 flex justify-between font-bold text-lg'>
                                        <span>Total:</span>
                                        <span>€{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <Button onClick={submitForm}>Place Order</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
}

import NotFound from '@/components/exceptions/NotFound';
import CartContainer from '@/components/shop/CartCointainer';
import CheckoutContainer from '@/components/shop/CheckoutContainer';
import CheckoutCompleted from '@/components/shop/CompletedContainer';
import FailedContainer from '@/components/shop/FailedContainer';
import ShopContainer from '@/components/shop/ShopContainer';
import { Route, Routes } from 'react-router-dom';

export default function ClientRouter() {
    return (
        <div>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Welcome to TechStore</h1>
                    <p className='text-xl text-gray-300'>
                        Discover our premium collection of tech products
                    </p>
                </div>
            </div>

            <Routes>
                <Route path='/' element={<ShopContainer />} />
                <Route path='/cart' element={<CartContainer />} />
                <Route path='/checkout' element={<CheckoutContainer />} />
                <Route path='/checkout/completed' element={<CheckoutCompleted />} />
                <Route path='/checkout/failed' element={<FailedContainer />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    );
}

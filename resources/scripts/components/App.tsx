import receiveUser from '@/api/receiveUser';
import AdminContainer from '@/components/admin/AdminContainer';
import NotFound from '@/components/exceptions/NotFound';
import Navbar from '@/components/Navbar';
import ShopContainer from '@/components/shop/ShopContainer';
import AuthenticationRouter from '@/routers/AuthenticationRouter';
import ClientRouter from '@/routers/ClientRouter';
import { useStoreActions } from '@/state/hooks';
import type { Product } from '@/types/models';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function App() {
    const setUserData = useStoreActions((actions) => actions.user.setUserData);

    const [cartItems, setCartItems] = useState<Product[]>([]);

    const handleAddToCart = (product: Product) => {
        setCartItems([...cartItems, product]);
    };

    useEffect(() => {
        receiveUser()
            .then((data) => data && setUserData(data))
            .catch((err) => console.error('Failed to load user', err));
    }, [setUserData]);

    return (
        <Router>
            <div className='min-h-screen bg-gray-50'>
                <Navbar cartItemCount={cartItems.length} />
                <ToastContainer />

                <Routes>
                    <Route path='/' element={<ShopContainer onAddToCart={handleAddToCart} />} />

                    <Route path='/auth/*' element={<AuthenticationRouter />} />
                    <Route path='/client/*' element={<ClientRouter />} />

                    <Route path='/admin' element={<AdminContainer />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

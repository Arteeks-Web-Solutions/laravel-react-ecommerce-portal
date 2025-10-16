import receiveUser from '@/api/receiveUser';
import NotFound from '@/components/exceptions/NotFound';
import Navbar from '@/components/Navbar';
import ShopContainer from '@/components/shop/ShopContainer';
import AdminRouter from '@/routers/AdminRouter';
import AuthenticationRouter from '@/routers/AuthenticationRouter';
import ClientRouter from '@/routers/ClientRouter';
import { useStoreActions } from '@/state/hooks';
import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

export default function App() {
    const setUserData = useStoreActions((actions) => actions.user.setUserData);

    useEffect(() => {
        receiveUser()
            .then((data) => setUserData(data))
            .catch((err) => console.error('Failed to load user', err));
    }, [setUserData]);

    return (
        <SWRConfig
            value={{
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
            }}
        >
            <Router>
                <div className='min-h-screen bg-gray-50'>
                    <Navbar />
                    <ToastContainer />

                    <Routes>
                        <Route path='/' element={<ShopContainer />} />

                        <Route path='/auth/*' element={<AuthenticationRouter />} />
                        <Route path='/client/*' element={<ClientRouter />} />
                        <Route path='/admin/*' element={<AdminRouter />} />

                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </SWRConfig>
    );
}

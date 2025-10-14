import ForgotPasswordContainer from '@/components/auth/ForgotPasswordContainer';
import LoginContainer from '@/components/auth/LoginContainer';
import RegisterContainer from '@/components/auth/RegisterContainer';
import { Route, Routes } from 'react-router-dom';

export default () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginContainer />} />
            <Route path='/register' element={<RegisterContainer />} />
            <Route path='/password/email' element={<ForgotPasswordContainer />} />
        </Routes>
    );
};

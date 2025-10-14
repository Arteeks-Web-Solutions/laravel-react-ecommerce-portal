import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/elements/Button';
import Field from '@/components/elements/Field';
import Reaptcha from 'reaptcha';
import { AddHttpError } from '@/api/http';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useRef } from 'react';
import requestPasswordResetEmail from '@/api/auth/requestPasswordResetEmail';
import { toast } from 'react-toastify';

interface Values {
    email: string;
}

export default function ForgotPasswordContainer() {
    const navigate = useNavigate();

    const ref = useRef<Reaptcha>(null);
    const [token, setToken] = useState('');

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const handleSubmit = (
        { email }: Values,
        { setSubmitting, resetForm }: FormikHelpers<Values>,
    ) => {
        // If there is no token in the state yet, request the token and then abort this submit request
        // since it will be re-submitted when the recaptcha data is returned by the component.
        if (!token) {
            ref.current!.execute().catch((error) => {
                console.error(error);

                setSubmitting(false);
                AddHttpError(error);
            });

            return;
        }

        requestPasswordResetEmail(email, token)
            .then((response) => {
                resetForm();
                toast.success(response);
                navigate('/login');
            })
            .catch((error) => {
                console.error(error);

                AddHttpError(error);
            })
            .then(() => {
                setToken('');
                if (ref.current) ref.current.reset();

                setSubmitting(false);
            });
    };

    return (
        <div className='bg-gray-50 flex flex-col justify-center items-center px-4 mt-24'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-t-xl shadow-lg px-8 py-6 w-full max-w-md text-center'>
                <h1 className='text-3xl font-bold'>Forgot your password?</h1>
                <p className='text-gray-300 mt-1'>We will send you a reset link by email</p>
            </div>

            <Formik onSubmit={handleSubmit} initialValues={{ email: '' }}>
                {({ isSubmitting, setSubmitting, submitForm }) => (
                    <Form className='bg-white rounded-b-xl shadow-lg px-8 py-10 w-full max-w-md'>
                        <div className='mb-6 relative'>
                            <Field
                                name='email'
                                type='email'
                                placeholder='Email address'
                                icon={Mail}
                                disabled={isSubmitting}
                            />
                        </div>

                        <Button type='submit' isLoading={isSubmitting}>
                            Send reset link
                        </Button>

                        <Reaptcha
                            ref={ref}
                            size={'invisible'}
                            sitekey={siteKey || '_invalid_key'}
                            onVerify={(response) => {
                                setToken(response);
                                submitForm();
                            }}
                            onExpire={() => {
                                setSubmitting(false);
                                setToken('');
                            }}
                        />

                        <div className='text-center mt-4 text-sm text-gray-600'>
                            <Link
                                to='/login'
                                className='text-gray-900 font-semibold hover:underline'
                            >
                                Back to login
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

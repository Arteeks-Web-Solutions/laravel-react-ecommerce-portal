import login from '@/api/auth/login';
import { AddHttpError } from '@/api/http';
import Field from '@/components/elements/Field';
import { useStoreActions } from '@/state/hooks';
import { Form, Formik, type FormikHelpers } from 'formik';
import { Lock, Mail } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Reaptcha from 'reaptcha';
import Button from '@/components/elements/Button';

interface Values {
    email: string;
    password: string;
}

export default function LoginContainer() {
    const navigate = useNavigate();

    const ref = useRef<Reaptcha>(null);
    const [token, setToken] = useState('');

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const setUserData = useStoreActions((actions) => actions.user.setUserData);

    const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
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

        login({ ...values, recaptchaData: token })
            .then((data) => {
                setUserData(data);
                navigate('/client');
                setSubmitting(false);
            })
            .catch((error) => {
                console.error(error);

                AddHttpError(error);
                setToken('');
                if (ref.current) ref.current.reset();

                setSubmitting(false);
            });
    };

    return (
        <div className='bg-gray-50 flex flex-col justify-center items-center px-4 mt-24'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-t-xl shadow-lg px-8 py-6 w-full max-w-md text-center'>
                <h1 className='text-3xl font-bold'>Welkom terug</h1>
                <p className='text-gray-300 mt-1'>Log in om verder te gaan</p>
            </div>

            <Formik onSubmit={handleSubmit} initialValues={{ email: '', password: '' }}>
                {({ isSubmitting, setSubmitting, submitForm }) => (
                    <Form className='bg-white rounded-b-xl shadow-lg px-8 py-10 w-full max-w-md'>
                        <div className='mb-6 relative'>
                            <Field
                                name='email'
                                type='email'
                                placeholder='E-mailadres'
                                autoComplete='username'
                                icon={Mail}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className='mb-2 relative'>
                            <Field
                                name='password'
                                type='password'
                                placeholder='Wachtwoord'
                                autoComplete='current-password'
                                icon={Lock}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className='text-right mb-6'>
                            <Link
                                to='/forgot-password'
                                className='text-sm text-gray-500 hover:text-gray-900 font-medium underline'
                            >
                                Wachtwoord vergeten?
                            </Link>
                        </div>

                        <Button onClick={submitForm} isLoading={isSubmitting}>
                            Inloggen
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
                            <p>
                                Nog geen account?{' '}
                                <Link
                                    to='/register'
                                    className='text-gray-900 font-semibold hover:underline'
                                >
                                    Registreer hier
                                </Link>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

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

export default function LoginForm({ checkout }: { checkout?: boolean }) {
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
                if (!checkout) navigate('/client');
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
        <Formik onSubmit={handleSubmit} initialValues={{ email: '', password: '' }}>
            {({ isSubmitting, setSubmitting, submitForm }) => (
                <Form className='bg-white rounded-b-xl shadow-lg px-8 py-10 w-full max-w-md'>
                    <div className='mb-6 relative'>
                        <Field
                            name='email'
                            type='email'
                            placeholder='Email address'
                            autoComplete='email'
                            icon={Mail}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className='mb-2 relative'>
                        <Field
                            name='password'
                            type='password'
                            placeholder='Password'
                            autoComplete='current-password'
                            icon={Lock}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className='text-right mb-6'>
                        <Link
                            to='/auth/password/email'
                            className='text-sm text-gray-500 hover:text-gray-900 font-medium underline'
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <Button onClick={submitForm} isLoading={isSubmitting} fullWidth>
                        Login
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

                    {!checkout && (
                        <div className='text-center mt-4 text-sm text-gray-600'>
                            <p>
                                Don't have an account yet?{' '}
                                <Link
                                    to='/auth/register'
                                    className='text-gray-900 font-semibold hover:underline'
                                >
                                    Register here
                                </Link>
                            </p>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
}

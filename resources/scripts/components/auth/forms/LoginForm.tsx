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
    remember: boolean;
}

export default function LoginForm({ checkout }: { checkout?: boolean }) {
    const navigate = useNavigate();

    const ref = useRef<Reaptcha>(null);
    const [token, setToken] = useState('');

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    const setUserData = useStoreActions((actions) => actions.user.setUserData);

    const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        if (!token) {
            ref.current!.execute().catch((error) => {
                console.error(error);
                setSubmitting(false);
                AddHttpError(error);
            });
            return;
        }

        login({
            email: values.email,
            password: values.password,
            remember: values.remember,
            recaptchaData: token,
        })
            .then((data) => {
                setUserData(data.user);
                if (!checkout) navigate(data.redirect_url);
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
        <Formik
            onSubmit={handleSubmit}
            initialValues={{ email: '', password: '', remember: false }}
        >
            {({ isSubmitting, setSubmitting, submitForm, values, handleChange }) => (
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

                    <div className='flex items-center justify-between mb-6'>
                        <label className='flex items-center space-x-2 text-sm text-gray-600'>
                            <input
                                type='checkbox'
                                name='remember'
                                checked={values.remember}
                                onChange={handleChange}
                                className='rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                                disabled={isSubmitting}
                            />
                            <span>Remember me</span>
                        </label>

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
                        size='invisible'
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
                                Don&apos;t have an account yet?{' '}
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

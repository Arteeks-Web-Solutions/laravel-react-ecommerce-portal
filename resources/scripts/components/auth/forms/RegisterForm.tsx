import { useRef, useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/elements/Button';
import { Form, Formik, type FormikHelpers } from 'formik';
import Field from '@/components/elements/Field';
import Reaptcha from 'reaptcha';
import { AddHttpError } from '@/api/http';
import register from '@/api/auth/register';
import { useStoreActions } from '@/state/hooks';

interface Values {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export default function RegisterForm({ checkout }: { checkout?: boolean }) {
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

        register({ ...values, recaptchaData: token })
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
        <Formik
            onSubmit={handleSubmit}
            initialValues={{ name: '', email: '', password: '', passwordConfirmation: '' }}
        >
            {({ isSubmitting, setSubmitting, submitForm }) => (
                <Form className='bg-white rounded-b-xl shadow-lg px-8 py-10 w-full max-w-md'>
                    <div className='mb-6 relative'>
                        <Field
                            name='name'
                            type='text'
                            placeholder='Name'
                            autoComplete='name'
                            icon={User}
                            disabled={isSubmitting}
                        />
                    </div>

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

                    <div className='mb-6 relative'>
                        <Field
                            name='password'
                            type='password'
                            placeholder='Password'
                            autoComplete='new-password'
                            icon={Lock}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className='mb-6 relative'>
                        <Field
                            name='passwordConfirmation'
                            type='password'
                            placeholder='Confirm Password'
                            autoComplete='new-password'
                            icon={Lock}
                            disabled={isSubmitting}
                        />
                    </div>

                    <Button type='submit' isLoading={isSubmitting} fullWidth>
                        Register
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
                                Already have an account?{' '}
                                <Link
                                    to='/auth'
                                    className='text-gray-900 font-semibold hover:underline'
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    )}
                </Form>
            )}
        </Formik>
    );
}

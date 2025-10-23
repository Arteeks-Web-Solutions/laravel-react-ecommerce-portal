import resetPassword from '@/api/auth/resetPassword';
import { AddHttpError } from '@/api/http';
import Button from '@/components/elements/Button';
import Field from '@/components/elements/Field';
import { Form, Formik, type FormikHelpers } from 'formik';
import { Lock, Mail } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Values {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function ResetPasswordContainer() {
    const navigate = useNavigate();
    const params = useParams<{ token?: string }>();
    const [searchParams] = useSearchParams();

    const token = params.token;

    const handleSubmit = (values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
        if (!token) {
            toast.error('Invalid or missing reset token.');
            setSubmitting(false);
            return;
        }

        resetPassword(token, values.email, values.password, values.confirmPassword)
            .then((response) => {
                resetForm();
                toast.success(response);
                navigate('/auth');
            })
            .catch((error) => {
                console.error(error);
                AddHttpError(error);
            })
            .then(() => setSubmitting(false));
    };

    return (
        <div className='bg-gray-50 flex flex-col justify-center items-center px-4 mt-24'>
            <div className='bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-t-xl shadow-lg px-8 py-6 w-full max-w-md text-center'>
                <h1 className='text-3xl font-bold'>Reset your password</h1>
                <p className='text-gray-300 mt-1'>Choose a new password below</p>
            </div>

            <Formik
                initialValues={{
                    email: searchParams.get('email') || '',
                    password: '',
                    confirmPassword: '',
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className='bg-white rounded-b-xl shadow-lg px-8 py-10 w-full max-w-md'>
                        <div className='mb-6'>
                            <Field
                                name='email'
                                type='email'
                                placeholder='Email address'
                                icon={Mail}
                                disabled
                            />
                        </div>

                        <div className='mb-6'>
                            <Field
                                name='password'
                                type='password'
                                placeholder='New password'
                                icon={Lock}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className='mb-6'>
                            <Field
                                name='confirmPassword'
                                type='password'
                                placeholder='Confirm password'
                                icon={Lock}
                                disabled={isSubmitting}
                            />
                        </div>

                        <Button type='submit' isLoading={isSubmitting} fullWidth>
                            Reset password
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

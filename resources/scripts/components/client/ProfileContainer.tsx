import { useStoreActions, useStoreState } from '@/state/hooks';
import { Form, Formik, type FormikHelpers } from 'formik';
import { CreditCard, MapPin, User } from 'lucide-react';
import Field from '@/components/elements/Field';
import Button from '@/components/elements/Button';
import Spinner from '@/components/elements/Spinner';
import updatePersonalData from '@/api/client/updatePersonalData';
import { AddHttpError } from '@/api/http';
import { toast } from 'react-toastify';
import updateAddressData from '@/api/client/updateAddressData';

interface PersonalData {
    name: string;
    email: string;
}

interface AddressData {
    street: string;
    postalCode: string;
    city: string;
}

export default function ProfileContainer() {
    const user = useStoreState((state) => state.user.data);
    const setUserData = useStoreActions((actions) => actions.user.setUserData);

    const handlePersonalSubmit = (
        values: PersonalData,
        { setSubmitting }: FormikHelpers<PersonalData>,
    ) => {
        updatePersonalData(values.name, values.email)
            .then((data) => {
                setUserData(data);
                toast.success('Successfully updated personal data');
            })
            .catch((error) => {
                console.error(error);
                AddHttpError(error);
            })
            .then(() => setSubmitting(false));
    };

    const handleAdressSubmit = (
        values: AddressData,
        { setSubmitting }: FormikHelpers<AddressData>,
    ) => {
        updateAddressData(values.street, values.postalCode, values.city)
            .then((data) => {
                setUserData(data);
                toast.success('Successfully updated address data');
            })
            .catch((error) => {
                console.error(error);
                AddHttpError(error);
            })
            .then(() => setSubmitting(false));
    };

    return !user ? (
        <Spinner size='large' centered />
    ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-white rounded-xl shadow-sm p-6'>
                <div className='flex items-center mb-4'>
                    <User className='w-6 h-6 text-gray-900 mr-3' />
                    <h3 className='text-xl font-bold text-gray-900'>Personal Data</h3>
                </div>
                <Formik
                    onSubmit={handlePersonalSubmit}
                    initialValues={{ name: user.name, email: user.email }}
                >
                    {({ isSubmitting, submitForm }) => (
                        <Form className='space-y-4'>
                            <Field name='name' type='text' label='Name' className='mt-1' />
                            <Field name='email' type='email' label='Email' className='mt-1' />
                            <Button onClick={submitForm} isLoading={isSubmitting} fullWidth>
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6'>
                <div className='flex items-center mb-4'>
                    <MapPin className='w-6 h-6 text-gray-900 mr-3' />
                    <h3 className='text-xl font-bold text-gray-900'>Adress</h3>
                </div>
                <Formik
                    onSubmit={handleAdressSubmit}
                    initialValues={{
                        street: user?.street ?? '',
                        postalCode: user?.postalCode ?? '',
                        city: user?.city ?? '',
                    }}
                >
                    {({ isSubmitting, submitForm }) => (
                        <Form className='space-y-4'>
                            <div>
                                <Field
                                    name='street'
                                    type='text'
                                    label='Street'
                                    placeholder='123 Main Street'
                                    className='mt-1'
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <Field
                                        name='postalCode'
                                        type='text'
                                        label='Postal code'
                                        placeholder='1234 AB'
                                        className='mt-1'
                                    />
                                </div>
                                <div>
                                    <Field
                                        name='city'
                                        type='text'
                                        label='City'
                                        placeholder='Amsterdam'
                                    />
                                </div>
                            </div>
                            <Button onClick={submitForm} isLoading={isSubmitting} fullWidth>
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6'>
                <div className='flex items-center mb-4'>
                    <CreditCard className='w-6 h-6 text-gray-900 mr-3' />
                    <h3 className='text-xl font-bold text-gray-900'>Payment methods</h3>
                </div>
                <div className='space-y-3'>
                    <div className='border border-gray-300 rounded-lg p-4 flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div className='w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded'></div>
                            <div className='ml-3'>
                                <p className='font-medium text-gray-900'>•••• 4242</p>
                                <p className='text-sm text-gray-500'>Expires 12/25</p>
                            </div>
                        </div>
                        <span className='text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full'>
                            Default
                        </span>
                    </div>
                    <button className='w-full border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors font-medium'>
                        + Add New Card
                    </button>
                </div>
            </div>
        </div>
    );
}

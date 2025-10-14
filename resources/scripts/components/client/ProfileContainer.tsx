import { mockUser } from '@/data/mockData';
import { CreditCard, MapPin, User } from 'lucide-react';

export default function ProfileContainer() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-white rounded-xl shadow-sm p-6'>
                <div className='flex items-center mb-4'>
                    <User className='w-6 h-6 text-gray-900 mr-3' />
                    <h3 className='text-xl font-bold text-gray-900'>Personal Data</h3>
                </div>
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input
                            type='text'
                            defaultValue={mockUser.name}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Email
                        </label>
                        <input
                            type='email'
                            defaultValue={mockUser.email}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                        />
                    </div>
                    <button className='w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium'>
                        Save
                    </button>
                </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6'>
                <div className='flex items-center mb-4'>
                    <MapPin className='w-6 h-6 text-gray-900 mr-3' />
                    <h3 className='text-xl font-bold text-gray-900'>Adress</h3>
                </div>
                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Street
                        </label>
                        <input
                            type='text'
                            placeholder='Hoofdstraat 123'
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                Postal code
                            </label>
                            <input
                                type='text'
                                placeholder='1234 AB'
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>
                                City
                            </label>
                            <input
                                type='text'
                                placeholder='Amsterdam'
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent'
                            />
                        </div>
                    </div>
                    <button className='w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium'>
                        Save
                    </button>
                </div>
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

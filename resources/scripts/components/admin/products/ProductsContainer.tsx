import createCategory from '@/api/admin/products/createCategory';
import deleteCategory from '@/api/admin/products/deleteCategory';
import deleteProduct from '@/api/admin/products/deleteProduct';
import getProductsAndCategories from '@/api/admin/products/getProductsAndCategories';
import { AddHttpError } from '@/api/http';
import Modal from '@/components/elements/Modal';
import Error from '@/components/exceptions/Error';
import type { Product, ProductCategory } from '@/types/models';
import { Form, Formik, type FormikHelpers } from 'formik';
import { Edit2, FolderPlus, Package, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../../elements/Button';
import Field from '../../elements/Field';
import Spinner from '../../elements/Spinner';
import ProductModal from './ProductModal';

interface Category {
    name: string;
}

export default function ProductsContainer() {
    const { data, error, isValidating, mutate } = getProductsAndCategories();

    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    // null = not loading, 0 = loading for product delete, category id = loading for category delete
    const [isLoading, setIsLoading] = useState<number | null>(null);

    const handleDeleteProduct = (product: number) => {
        setIsLoading(0);
        deleteProduct(product)
            .then(() => mutate())
            .catch((error) => {
                console.error(error);
                AddHttpError(error);
            })
            .then(() => {
                setDeletingProduct(null);
                setIsLoading(null);
            });
    };

    const handleAddCategorySubmit = (
        { name }: Category,
        { setSubmitting, resetForm }: FormikHelpers<Category>,
    ) => {
        createCategory(name.trim())
            .then(() => {
                mutate();
                resetForm();
            })
            .catch((error) => {
                console.error(error);
                AddHttpError(error);
            })
            .then(() => setSubmitting(false));
    };

    const handleDeleteCategory = (category: number) => {
        setIsLoading(category);
        deleteCategory(category)
            .then(() => mutate())
            .catch((error) => {
                console.error(error);
                AddHttpError(error);
            })
            .then(() => setIsLoading(null));
    };

    useEffect(() => {
        if (error) console.error(error);
    }, [error]);

    if (error) return <Error />;

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>Product Management</h2>
                <Button onClick={() => setVisible(true)}>
                    <Plus className='w-5 h-5' />
                    <span>New Product</span>
                </Button>
            </div>

            {!data || isValidating ? (
                <Spinner size='large' centered />
            ) : (
                <div>
                    <div className='bg-white rounded-xl shadow-sm p-6 mb-8'>
                        <h3 className='text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2'>
                            <FolderPlus className='w-5 h-5 text-gray-700' />
                            <span>Product Categories</span>
                        </h3>

                        <div className='flex flex-wrap gap-3 mb-4'>
                            {data.categories.map((category: ProductCategory) => (
                                <div
                                    key={category.id}
                                    className='flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium'
                                >
                                    {category.name}
                                    <button
                                        onClick={() => handleDeleteCategory(category.id)}
                                        disabled={isLoading !== null}
                                        aria-label={`Delete category ${category.name}`}
                                        type='button'
                                        className='ml-2 disabled:text-red-300 text-red-500 hover:text-red-700 cursor-pointer'
                                    >
                                        {isLoading === category.id ? (
                                            <Spinner size='small' />
                                        ) : (
                                            <Trash2 className='w-4 h-4' />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <Formik onSubmit={handleAddCategorySubmit} initialValues={{ name: '' }}>
                            {({ isSubmitting, submitForm }) => (
                                <Form className='flex space-x-3'>
                                    <div className='flex-1'>
                                        <Field
                                            name='name'
                                            type='text'
                                            placeholder='Add new category...'
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <Button
                                        disabled={isLoading !== null && isLoading !== 0}
                                        onClick={submitForm}
                                        isLoading={isSubmitting}
                                    >
                                        Add
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                        <div className='overflow-x-auto'>
                            <table className='w-full'>
                                <thead className='bg-gray-50 border-b border-gray-200'>
                                    <tr>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                            Product
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                            Category
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                            Price
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                            Stock
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {data.products.length !== 0 ? (
                                        data.products.map((product: Product) => (
                                            <tr
                                                key={product.id}
                                                className='hover:bg-gray-50 transition-colors'
                                            >
                                                <td className='px-6 py-4'>
                                                    <div className='flex items-center'>
                                                        {product.image ? (
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className='w-12 h-12 rounded-lg object-cover mr-3'
                                                            />
                                                        ) : (
                                                            <div className='w-12 h-12 rounded-lg bg-gray-200 mr-3 flex items-center justify-center'>
                                                                <Package className='w-6 h-6 text-gray-300' />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className='font-semibold text-gray-900'>
                                                                {product.name}
                                                            </p>
                                                            <p className='text-sm text-gray-500 line-clamp-1'>
                                                                {product.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <span className='bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium'>
                                                        {product.category.name}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 font-semibold text-gray-900'>
                                                    €{product.price}
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <span
                                                        className={`font-semibold ${
                                                            product.stock === null
                                                                ? 'text-gray-900'
                                                                : product.stock < 10
                                                                  ? 'text-red-600'
                                                                  : 'text-green-600'
                                                        }`}
                                                    >
                                                        {product.stock ?? 'Unlimited'}
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <div className='flex space-x-2'>
                                                        <button
                                                            onClick={() =>
                                                                setEditingProduct(product)
                                                            }
                                                            className='p-2 cursor-pointer text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                                                        >
                                                            <Edit2 className='w-4 h-4' />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setDeletingProduct(product)
                                                            }
                                                            className='p-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors'
                                                        >
                                                            <Trash2 className='w-4 h-4' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <td colSpan={5} className='p-6 text-center text-gray-500'>
                                            No products found.
                                        </td>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Modal
                        title='Delete Product?'
                        visible={!!deletingProduct}
                        onDismiss={() => setDeletingProduct(null)}
                    >
                        <p>Are you sure you want to delete this product?</p>
                        <div className='flex justify-end gap-3 mt-4'>
                            <Button
                                variant='secondary'
                                disabled={isLoading === 0}
                                onClick={() => setDeletingProduct(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                isLoading={isLoading === 0}
                                onClick={() => handleDeleteProduct(deletingProduct!.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </Modal>

                    <ProductModal
                        visible={visible}
                        product={editingProduct}
                        onModalDismissed={() => {
                            setVisible(false);
                            setEditingProduct(null);
                        }}
                        mutate={mutate}
                        categories={data.categories}
                    />
                </div>
            )}
        </div>
    );
}

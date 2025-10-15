import createOrEditProduct from '@/api/admin/products/createOrEditProduct';
import { AddHttpError } from '@/api/http';
import Button from '@/components/elements/Button';
import Field, { SelectField, TextareaField } from '@/components/elements/Field';
import Modal from '@/components/elements/Modal';
import type { ProductCategory, Product as ProductModel } from '@/types/models';
import { Form, Formik, type FormikHelpers } from 'formik';

interface ProductModalProps {
    visible: boolean;
    product?: ProductModel | null;
    onModalDismissed: () => void;
    mutate: () => void;
    categories: ProductCategory[];
}

interface Product {
    name: string;
    description: string;
    category: number;
    image: string;
    price: string;
    stock: string;
}

export default function ProductModal({
    visible,
    product,
    onModalDismissed,
    mutate,
    categories,
}: ProductModalProps) {
    const handleSubmit = (
        values: Product,
        { setSubmitting, resetForm }: FormikHelpers<Product>,
    ) => {
        createOrEditProduct(
            values.name,
            values.description,
            values.category,
            values.image,
            values.price,
            values.stock,
            product?.id,
        )
            .then(() => {
                mutate();
                onModalDismissed();
                resetForm();
            })
            .catch((error) => {
                console.error(error);
                AddHttpError(error);
            })
            .then(() => setSubmitting(false));
    };

    return (
        <Modal
            visible={visible || !!product}
            title={product ? 'Edit Product' : 'Create Product'}
            onDismiss={onModalDismissed}
        >
            <Formik
                onSubmit={handleSubmit}
                initialValues={{
                    name: product?.name ?? '',
                    description: product?.description ?? '',
                    category: product?.category.id ?? categories[0]?.id ?? 0,
                    image: product?.image ?? '',
                    price: String(product?.price ?? ''),
                    stock: String(product?.stock ?? ''),
                }}
            >
                {({ isSubmitting, submitForm }) => (
                    <Form className='space-y-4'>
                        <Field name='name' type='text' label='Name' />
                        <TextareaField name='description' label='Description' rows={3} />
                        <SelectField
                            name='category'
                            label='Category'
                            options={categories.map((c) => ({
                                value: c.id,
                                label: c.name,
                            }))}
                        />
                        <Field name='image' type='text' label='Image' />
                        <div className='grid grid-cols-2 gap-4'>
                            <Field name='price' type='number' label='Price' />
                            <Field name='stock' type='number' label='Stock' />
                        </div>
                        <div className='flex space-x-3 pt-4'>
                            <Button
                                onClick={onModalDismissed}
                                disabled={isSubmitting}
                                variant='secondary'
                                fullWidth
                            >
                                Cancel
                            </Button>
                            <Button onClick={submitForm} isLoading={isSubmitting} fullWidth>
                                Save
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

import Input, { type InputProps } from '@/components/elements/Input';
import { Field as FormikField, type FieldProps } from 'formik';
import { forwardRef } from 'react';

interface OwnProps {
    name: string;
    label?: string;
    description?: string;
}

type Props = OwnProps & InputProps;

const Field = forwardRef<HTMLInputElement, Props>(
    ({ id, name, label, description, ...props }, ref) => (
        <FormikField innerRef={ref} name={name}>
            {({ field }: FieldProps) => (
                <div>
                    {label && (
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            {label}
                        </label>
                    )}
                    <Input id={id} {...field} {...props} />
                    {description && <p className={'input-help'}>{description}</p>}
                </div>
            )}
        </FormikField>
    ),
);
Field.displayName = 'Field';

export default Field;

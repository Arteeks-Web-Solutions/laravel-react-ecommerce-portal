import Input, {
    Select,
    Textarea,
    type InputProps,
    type SelectProps,
    type TextareaProps,
} from '@/components/elements/Input';
import { Field as FormikField, type FieldProps } from 'formik';
import { forwardRef } from 'react';

interface OwnProps {
    name: string;
    label?: string;
    description?: string;
}

type InputFieldProps = OwnProps & InputProps;

const Field = forwardRef<HTMLInputElement, InputFieldProps>(
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

type TextareaFieldProps = OwnProps & TextareaProps;

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
    ({ id, name, label, description, ...props }, ref) => (
        <FormikField innerRef={ref} name={name}>
            {({ field }: FieldProps) => (
                <div>
                    {label && (
                        <label
                            htmlFor={id || name}
                            className='block text-sm font-medium text-gray-700 mb-1'
                        >
                            {label}
                        </label>
                    )}
                    <Textarea id={id || name} {...field} {...props} />
                    {description && <p className={'input-help'}>{description}</p>}
                </div>
            )}
        </FormikField>
    ),
);
TextareaField.displayName = 'TextareaField';

type SelectFieldProps = OwnProps & SelectProps;

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
    ({ id, name, label, description, ...props }, ref) => (
        <FormikField innerRef={ref} name={name}>
            {({ field }: FieldProps) => (
                <div>
                    {label && (
                        <label
                            htmlFor={id || name}
                            className='block text-sm font-medium text-gray-700 mb-1'
                        >
                            {label}
                        </label>
                    )}
                    <Select id={id || name} {...field} {...props} />
                    {description && <p className={'input-help'}>{description}</p>}
                </div>
            )}
        </FormikField>
    ),
);
SelectField.displayName = 'SelectField';

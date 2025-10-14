import Input, { type InputProps } from '@/components/elements/Input';
import { Field as FormikField, type FieldProps } from 'formik';
import { forwardRef } from 'react';

interface OwnProps {
    name: string;
    description?: string;
}

type Props = OwnProps & InputProps;

const Field = forwardRef<HTMLInputElement, Props>(({ id, name, description, ...props }, ref) => (
    <FormikField innerRef={ref} name={name}>
        {({ field }: FieldProps) => (
            <div>
                <Input id={id} {...field} {...props} />
                {description && <p className={'input-help'}>{description}</p>}
            </div>
        )}
    </FormikField>
));
Field.displayName = 'Field';

export default Field;

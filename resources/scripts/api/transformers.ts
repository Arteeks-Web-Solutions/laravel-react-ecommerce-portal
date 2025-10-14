import type { UserData } from '@/state/user';
import type { FractalResponseData } from '@/api/http';

export const rawDataToUser = ({ data }: FractalResponseData): UserData => ({
    id: data.id,
    name: data.name,
    email: data.email,
    street: data.street,
    postalCode: data.postal_code,
    city: data.city,
    isAdmin: data.is_admin,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
});

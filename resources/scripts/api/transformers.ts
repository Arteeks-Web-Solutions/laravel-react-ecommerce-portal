import type { UserData } from '@/state/user';
import type { FractalResponseData } from './http';

export const rawDataToUser = ({ data }: FractalResponseData): UserData => ({
    id: data.id,
    name: data.name,
    email: data.email,
    isAdmin: data.is_admin,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
});

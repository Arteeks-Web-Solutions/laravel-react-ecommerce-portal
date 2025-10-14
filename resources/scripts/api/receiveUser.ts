import http, { type FractalResponseData } from '@/api/http';
import type { UserData } from '@/state/user';

const rawDataToUser = ({ data }: FractalResponseData): UserData => ({
    id: data.id,
    name: data.name,
    email: data.email,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
});

export default async (): Promise<UserData | null> => {
    const { data } = await http.get('/api/user');

    return data ? rawDataToUser(data) : null;
};

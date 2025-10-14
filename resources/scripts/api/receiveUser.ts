import http from '@/api/http';
import type { UserData } from '@/state/user';
import { rawDataToUser } from './transformers';

export default async (): Promise<UserData | null> => {
    const { data } = await http.get('/api/user');

    return data ? rawDataToUser(data) : null;
};

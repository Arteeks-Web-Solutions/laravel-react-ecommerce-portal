import http from '@/api/http';
import type { UserData } from '@/state/user';
import { rawDataToUser } from '@/api/transformers';

export default async (): Promise<UserData | null> => {
    const { data } = await http.get('/api/client/user');

    return data ? rawDataToUser(data) : null;
};

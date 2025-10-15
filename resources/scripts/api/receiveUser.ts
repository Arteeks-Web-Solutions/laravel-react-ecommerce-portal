import http from '@/api/http';
import type { UserData } from '@/state/user';

export default async (): Promise<UserData | undefined> => {
    const { data } = await http.get('/api/client/user');

    return data ?? undefined;
};

import http from '@/api/http';
import type { UserData } from '@/state/user';

export default (name: string, email: string): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        http.post('/api/client/client/personal', { name, email })
            .then((response) => resolve(response.data))
            .catch(reject);
    });
};

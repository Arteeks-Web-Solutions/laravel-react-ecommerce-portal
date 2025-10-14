import http from '@/api/http';
import type { UserData } from '@/state/user';
import { rawDataToUser } from '@/api/transformers';

export default (name: string, email: string): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        http.post('/api/client/personal', { name, email })
            .then((response) => resolve(rawDataToUser(response.data)))
            .catch(reject);
    });
};

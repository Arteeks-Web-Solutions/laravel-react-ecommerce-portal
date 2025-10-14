import http from '@/api/http';
import type { UserData } from '@/state/user';
import { rawDataToUser } from '@/api/transformers';

export default (street: string, postalCode: string, city: string): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        http.post('/api/client/address', { street, postal_code: postalCode, city })
            .then((response) => resolve(rawDataToUser(response.data)))
            .catch(reject);
    });
};

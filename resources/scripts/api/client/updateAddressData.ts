import http from '@/api/http';
import type { UserData } from '@/state/user';

export default (
    street: string,
    postalCode: string,
    city: string,
    country: string,
): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        http.post('/api/client/address', { street, postal_code: postalCode, city, country })
            .then((response) => resolve(response.data))
            .catch(reject);
    });
};

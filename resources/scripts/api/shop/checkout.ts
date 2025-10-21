import http from '@/api/http';

export default (
    name: string,
    email: string,
    street: string,
    city: string,
    zip: string,
    country: string,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/client/shop/checkout`, {
            name,
            email,
            street,
            city,
            postal_code: zip,
            country,
        })
            .then((response) => resolve(response.data))
            .catch(reject);
    });
};

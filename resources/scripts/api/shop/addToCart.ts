import http from '@/api/http';

export default (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/client/shop/cart/${id}`)
            .then(() => resolve())
            .catch(reject);
    });
};

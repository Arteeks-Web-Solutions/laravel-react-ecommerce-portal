import http from '@/api/http';

export default (id: number, quantity: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/client/shop/cart`, { product_id: id, quantity })
            .then(() => resolve())
            .catch(reject);
    });
};

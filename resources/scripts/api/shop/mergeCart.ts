import http from '@/api/http';

export default (cart: { product_id: number; quantity: number }[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post('/api/client/shop/cart/merge', { cart })
            .then(() => resolve())
            .catch(reject);
    });
};

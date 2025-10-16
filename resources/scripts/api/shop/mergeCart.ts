import http from '@/api/http';

export default (cart: { productId: number; quantity: number }[]): Promise<void> => {
    const transformedCart = cart.map((item) => ({
        product_id: item.productId,
        quantity: item.quantity,
    }));

    return new Promise((resolve, reject) => {
        http.post('/api/client/shop/cart/merge', { cart: transformedCart })
            .then(() => resolve())
            .catch(reject);
    });
};

import http from '@/api/http';
import useSWR from 'swr';

export default () => {
    return useSWR('shop:cart', async () => {
        const { data } = await http.get('/api/client/shop/cart');

        return {
            cart: data.cart || [],
            products: data.products || [],
        };
    });
};

import http from '@/api/http';
import useSWR from 'swr';

export default () => {
    return useSWR('shop:products', async () => {
        const { data } = await http.get('/api/client/shop');

        return {
            categories: data.categories || [],
            products: data.products || [],
            cartCount: data.cartCount || 0,
        };
    });
};

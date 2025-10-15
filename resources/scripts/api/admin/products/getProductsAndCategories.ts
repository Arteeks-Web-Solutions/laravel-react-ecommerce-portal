import http from '@/api/http';
import useSWR from 'swr';

export default () => {
    return useSWR('admin:products', async () => {
        const { data } = await http.get('/api/application/products');

        return {
            categories: data.categories || [],
            products: data.products || [],
        };
    });
};

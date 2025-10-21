import http from '@/api/http';
import useSWR from 'swr';

export default () => {
    return useSWR('admin:orders', async () => {
        const { data } = await http.get('/api/application/orders');

        return data;
    });
};

import http from '@/api/http';
import useSWR from 'swr';

export default () => {
    return useSWR(`client:orders`, async () => {
        const { data } = await http.get(`/api/client/orders`);

        return data;
    });
};

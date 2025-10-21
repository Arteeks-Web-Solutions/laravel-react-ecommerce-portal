import http from '@/api/http';
import useSWR from 'swr';

export default (id: number) => {
    return useSWR(`client:order:${id}`, async () => {
        const { data } = await http.get(`/api/client/order/${id}`);

        return data;
    });
};

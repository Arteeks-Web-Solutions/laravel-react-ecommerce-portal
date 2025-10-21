import http from '@/api/http';
import useSWR from 'swr';

export default () => {
    return useSWR('admin:statistics', async () => {
        const { data } = await http.get('/api/application');

        return data;
    });
};

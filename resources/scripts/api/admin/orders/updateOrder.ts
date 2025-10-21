import http from '@/api/http';

export default (id: number, status: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/application/orders/${id}`, {
            status,
        })
            .then(() => resolve())
            .catch(reject);
    });
};

import http from '@/api/http';

export default (
    name: string,
    description: string,
    category: number,
    image: string,
    price: string,
    stock: string,
    id?: number,
): Promise<void> => {
    return new Promise((resolve, reject) => {
        http.post(`/api/application/products${id ? `/${id}` : ''}`, {
            name,
            description,
            category_id: category === 0 ? null : category,
            image,
            price,
            stock,
        })
            .then(() => resolve())
            .catch(reject);
    });
};

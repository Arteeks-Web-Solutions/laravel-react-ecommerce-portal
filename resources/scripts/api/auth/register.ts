import http, { AddHttpError } from '@/api/http';
import type { UserData } from '@/state/user';
import mergeCart from '../shop/mergeCart';

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    recaptchaData?: string | null;
}

export default ({
    name,
    email,
    password,
    passwordConfirmation,
    recaptchaData,
}: RegisterData): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        http.get('/sanctum/csrf-cookie')
            .then(() =>
                http.post('/auth/register', {
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                    'g-recaptcha-response': recaptchaData,
                }),
            )
            .then((response) => {
                if (response.status !== 204 && !(response.data instanceof Object)) {
                    return reject(
                        new Error('An error occurred while processing the login request.'),
                    );
                }

                // Migrate the users local cart to the database
                mergeCart(
                    JSON.parse(localStorage.getItem('cart') || '[]') as {
                        product_id: number;
                        quantity: number;
                    }[],
                )
                    .then(() => localStorage.removeItem('cart'))
                    .catch((error) => {
                        AddHttpError(error);
                        console.error('Failed to merge cart after login:', error);
                    });

                return resolve(response.data);
            })
            .catch(reject);
    });
};

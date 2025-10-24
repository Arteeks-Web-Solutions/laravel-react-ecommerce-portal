import http, { AddHttpError } from '@/api/http';
import type { UserData } from '@/state/user';
import mergeCart from '@/api/shop/mergeCart';
import type { CartItem } from '@/types/models';

export interface LoginData {
    email: string;
    password: string;
    remember?: boolean;
    recaptchaData?: string | null;
}

interface LoginResponse {
    user: UserData;
    redirect_url: string;
}

export default ({
    email,
    password,
    remember,
    recaptchaData,
}: LoginData): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
        http.get('/sanctum/csrf-cookie')
            .then(() =>
                http.post('/auth/login', {
                    email,
                    password,
                    remember,
                    'g-recaptcha-response': recaptchaData,
                }),
            )
            .then((response) => {
                if (response.status !== 204 && !(response.data instanceof Object)) {
                    return reject(
                        new Error('An error occurred while processing the login request.'),
                    );
                }

                // Attempt to merge local cart with user's database cart
                mergeCart(JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[])
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

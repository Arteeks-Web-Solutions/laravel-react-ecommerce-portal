import http from '@/api/http';
import type { UserData } from '@/state/user';

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

                return resolve(response.data.data);
            })
            .catch(reject);
    });
};

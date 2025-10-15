import http from '@/api/http';
import type { UserData } from '@/state/user';

export interface LoginData {
    email: string;
    password: string;
    recaptchaData?: string | null;
}

export default ({ email, password, recaptchaData }: LoginData): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        http.get('/sanctum/csrf-cookie')
            .then(() =>
                http.post('/auth/login', {
                    email,
                    password,
                    'g-recaptcha-response': recaptchaData,
                }),
            )
            .then((response) => {
                if (response.status !== 204 && !(response.data instanceof Object)) {
                    return reject(
                        new Error('An error occurred while processing the login request.'),
                    );
                }

                return resolve(response.data);
            })
            .catch(reject);
    });
};

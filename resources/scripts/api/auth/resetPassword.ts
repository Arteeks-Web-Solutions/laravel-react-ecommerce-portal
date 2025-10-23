import http from '@/api/http';

export default (
    token: string,
    email: string,
    password: string,
    confirmPassword: string,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        http.post('/auth/password/reset', {
            token,
            email,
            password,
            password_confirmation: confirmPassword,
        })
            .then((response) => {
                resolve(response.data.message || '');
            })
            .catch(reject);
    });
};

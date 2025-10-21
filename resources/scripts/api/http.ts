import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const http: AxiosInstance = axios.create({
    withCredentials: true,
    timeout: 20000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

http.interceptors.response.use((response: AxiosResponse) => {
    // Laravel's API responses are always wrapped in a `data` object, so if that exists,
    // unwrap it so that callers don't need to do `response.data.data`.
    if (response.data && response.data.data !== undefined) {
        response.data = response.data.data;
    }

    return response;
});

export default http;

type HttpErrorResponse = {
    message?: string;
    errors?: Record<string, string[]>;
};

export function AddHttpError(error: AxiosError) {
    if (error.response && error.response.data) {
        let { data } = error.response;

        // Some non-JSON requests can still return the error as a JSON block. In those cases, attempt
        // to parse it into JSON so we can display an actual error.
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch {
                // do nothing, bad json
            }
        }

        const httpError = data as HttpErrorResponse;

        if (httpError.errors) {
            Object.values(httpError.errors).forEach((messages) => {
                messages.forEach((message) => {
                    toast.error(message);
                });
            });

            return;
        } else {
            return toast.error(httpError.message);
        }
    }

    return toast.error(error.message);
}

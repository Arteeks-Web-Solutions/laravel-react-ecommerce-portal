import axios, { AxiosError, type AxiosInstance } from 'axios';
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

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // prevent 401 AxiosError's from spamming the console if a user is not logged in.
            return Promise.resolve({ data: null });
        }
        return Promise.reject(error);
    },
);

export default http;

export interface FractalResponseData {
    object: string;
    data: {
        // using any typing here is fine, as this is just a passthrough for the data
        [k: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
        relationships?: Record<
            string,
            FractalResponseData | FractalResponseList | null | undefined
        >;
    };
}

export interface FractalResponseList {
    object: 'list';
    data: FractalResponseData[];
}

type ValidationErrorResponse = {
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
            } catch (e) {
                // do nothing, bad json
            }
        }

        const validationError = data as ValidationErrorResponse;

        if (validationError.errors) {
            Object.values(validationError.errors).forEach((messages) => {
                messages.forEach((message) => {
                    toast.error(message);
                });
            });

            return;
        }
    }

    return toast.error(error.message);
}

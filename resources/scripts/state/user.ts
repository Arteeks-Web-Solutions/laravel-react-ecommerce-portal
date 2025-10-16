import { action, type Action } from 'easy-peasy';

export interface UserData {
    id: number;
    name: string;
    email: string;
    street?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserStore {
    data?: UserData | undefined;
    setUserData: Action<UserStore, UserData | undefined>;
    updateUserData: Action<UserStore, Partial<UserData>>;
}

const user: UserStore = {
    data: undefined,
    setUserData: action((state, payload) => {
        state.data = payload;
    }),

    updateUserData: action((state, payload) => {
        if (!state.data) return;
        state.data = { ...state.data, ...payload };
    }),
};

export default user;

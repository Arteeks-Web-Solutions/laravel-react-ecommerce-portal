import user, { type UserStore } from '@/state/user';
import { createStore } from 'easy-peasy';

export interface StoreModel {
    user: UserStore;
}

const state = createStore<StoreModel>({
    user,
});

export default state;

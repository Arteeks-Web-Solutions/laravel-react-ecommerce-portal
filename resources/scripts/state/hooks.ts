import type { StoreModel } from '@/state/index';
import { createTypedHooks } from 'easy-peasy';

const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks<StoreModel>();

export { useStoreActions, useStoreDispatch, useStoreState };

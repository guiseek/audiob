export type GenericStoreStatus = 'pending' | 'loading' | 'loaded' | 'error';

export interface GenericState<T = null> {
  data: T;
  status: GenericStoreStatus;
  error: string | null;
}

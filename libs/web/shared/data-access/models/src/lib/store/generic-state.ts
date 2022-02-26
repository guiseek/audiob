export type GenericStoreStatus = 'pending' | 'loading' | 'loaded' | 'error';

export interface GenericState<T> {
  data: T | null;
  status: GenericStoreStatus;
  error: string | null;
}

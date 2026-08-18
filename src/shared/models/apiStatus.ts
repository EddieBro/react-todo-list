export type ApiStatus = 'idle' | 'loading' | 'ready' | 'error';

export type ApiStatusState<T> = {
  status: ApiStatus;
  data: T | null;
  error: string | null;
};

export const initialApiState: ApiStatusState<null> = {
  status: 'idle',
  data: null,
  error: null,
};

export type PayloadApiSuccess<T> = {
  data: T;
};

export type PayloadApiError = {
  error: string;
};

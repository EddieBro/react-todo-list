import type {UnknownAction} from 'redux';
import type {Epic} from 'redux-observable';
import type {rootReducer, store} from '@/core/store/store.ts';
import type {BoardApi, UserApi} from '@/shared/api/types.ts';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type EpicDependencies = {
  userApi: UserApi;
  boardApi: BoardApi;
};

export type AppEpic = Epic<UnknownAction, UnknownAction, RootState, EpicDependencies>;

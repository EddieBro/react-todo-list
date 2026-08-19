import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {readSessionFromStorage, sessionReducer} from '@/core/store/sessionSlice.ts';
import {USERS_SLICE, usersEpic, usersReducer} from '@/modules/users';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import type {UnknownAction} from 'redux';
import type {EpicDependencies, RootState} from '@/core/store/types.ts';
import {boardApi} from '@/shared/api/boardApi.ts';
import {userApi} from '@/shared/api/userApi.ts';

export const rootReducer = combineReducers({
  session: sessionReducer,
  [USERS_SLICE]: usersReducer,
});

const epicMiddleware = createEpicMiddleware<UnknownAction, UnknownAction, RootState, EpicDependencies>({
  dependencies: {userApi, boardApi},
});

const rootEpic = combineEpics(usersEpic);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
  preloadedState: {session: readSessionFromStorage()}
});

epicMiddleware.run(rootEpic);

let lastSession = store.getState().session;

store.subscribe(() => {
  const session = store.getState().session;
  if (session !== lastSession) {
    lastSession = session;
    localStorage.setItem('session', JSON.stringify(session))
  }
})

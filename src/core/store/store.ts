import {configureStore} from '@reduxjs/toolkit';
import {readSessionFromStorage, sessionReducer} from '@/core/store/sessionSlice.ts';
import {USERS_SLICE, usersReducer} from '@/modules/users';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [USERS_SLICE]: usersReducer
  },
  preloadedState: {session: readSessionFromStorage()}
})

let lastSession = store.getState().session;

store.subscribe(() => {
  const session = store.getState().session;
  if (session !== lastSession) {
    lastSession = session;
    localStorage.setItem('session', JSON.stringify(session))
  }
})

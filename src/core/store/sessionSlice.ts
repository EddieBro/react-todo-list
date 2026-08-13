import type {User} from '@/core/models/models.ts';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type SessionState = {
  userId: User['id'] | null;
};

const initialState: SessionState = {
  userId: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User['id']>) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.userId = null;
    }
  }
});

export const readSessionFromStorage = (): SessionState => {
  try {
    const raw = localStorage.getItem('session');
    if (!raw) {
      return initialState;
    }
    const parsed = JSON.parse(raw) as Partial<SessionState>;
    return {userId: typeof parsed.userId === 'string' ? parsed.userId : null};
  } catch {
    return initialState;
  }
}

export const {login, logout} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;

import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import type {User} from '@/core/models/models.ts';
import {USERS_SLICE} from './constants.ts';
import {fetchUsers} from './usersThunks.ts';

type UsersExtraState = {
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: string | null;
};

export const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = usersAdapter.getInitialState<UsersExtraState>({
  status: 'idle',
  error: null
});

const usersSlice = createSlice({
  name: USERS_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchUsers.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          usersAdapter.setAll(state, action.payload);
          state.status = 'ready';
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.status = 'error';
          state.error = action.error.message ?? 'Не удалось загрузить пользователей';
        });
  }
});

export const usersReducer = usersSlice.reducer;

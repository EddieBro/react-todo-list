import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import type {User} from '@/core/models/models.ts';
import type {ApiStatus} from '@/shared/models/apiStatus.ts';
import {USERS_SLICE} from './constants.ts';
import * as actions from './usersActions.ts';

type UsersExtraState = {
  status: ApiStatus;
  error: string | null;
  createStatus: ApiStatus;
  createError: string | null;
  deleteStatus: ApiStatus;
  deleteError: string | null
};

export const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = usersAdapter.getInitialState<UsersExtraState>({
  status: 'idle',
  error: null,
  createStatus: 'idle',
  createError: null,
  deleteStatus: 'idle',
  deleteError: null,
});

const usersSlice = createSlice({
  name: USERS_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(actions.fetchUsers, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(actions.fetchUsersSuccess, (state, action) => {
          usersAdapter.setAll(state, action.payload.data);
          state.status = 'ready';
        })
        .addCase(actions.fetchUsersError, (state, action) => {
          state.status = 'error';
          state.error = action.payload.error;
        })
        .addCase(actions.createUser, (state) => {
          state.createStatus = 'loading';
          state.createError = null;
        })
        .addCase(actions.createUserReset, (state) => {
          state.createStatus = 'idle';
          state.createError = null;
        })
        .addCase(actions.createUserSuccess, (state, action) => {
          usersAdapter.addOne(state, action.payload.data);
          state.createStatus = 'ready';
        })
        .addCase(actions.createUserError, (state, action) => {
          state.createStatus = 'error';
          state.createError = action.payload.error;
        })
        .addCase(actions.deleteUser, (state) => {
          state.deleteStatus = 'loading';
          state.deleteError = null;
        })
        .addCase(actions.deleteUserSuccess, (state, action) => {
          usersAdapter.removeOne(state, action.payload.data);
          state.deleteStatus = 'ready';          // ← добавить в существующую
        })
        .addCase(actions.deleteUserError, (state, action) => {
          state.deleteStatus = 'error';
          state.deleteError = action.payload.error;
        })
        .addCase(actions.usersModuleExit, () => initialState)
  }
});

export const usersReducer = usersSlice.reducer;

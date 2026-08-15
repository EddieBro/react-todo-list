import {createAsyncThunk} from '@reduxjs/toolkit';
import {userApi} from '@/shared/api/userApi.ts';
import type {RootState} from '@/core/store';
import {USERS_SLICE} from './constants.ts';

export const fetchUsers = createAsyncThunk(
    `${USERS_SLICE}/fetchUsers`,
    () => userApi.getUsers(),
    {
      condition: (_arg: void, {getState}) => {
        const state = getState() as RootState;
        return state[USERS_SLICE].status === 'idle';
      }
    }
);

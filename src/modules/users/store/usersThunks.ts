import {createAsyncThunk} from '@reduxjs/toolkit';
import {userApi} from '@/shared/api/userApi.ts';
import type {RootState} from '@/core/store';
import {USERS_SLICE} from './constants.ts';
import type {User} from '@/core/models/models.ts';
import {createId} from '@/shared/utils/id.ts';

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


export const createUser = createAsyncThunk(
    `${USERS_SLICE}/createUser`,
    (draft: Omit<User, 'id'>) => userApi.saveUser({...draft, id: createId()})
);

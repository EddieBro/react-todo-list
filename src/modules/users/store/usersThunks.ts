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
        const {status} = state[USERS_SLICE];
        return status === 'idle' || status === 'error';
      }
    }
);

export const createUser = createAsyncThunk(
    `${USERS_SLICE}/createUser`,
    (draft: Omit<User, 'id'>) => userApi.saveUser({...draft, id: createId()})
);

export const deleteUser = createAsyncThunk(
    `${USERS_SLICE}/deleteUser`,
    async (id: User['id']) => {
      await userApi.deleteUser(id);
      return id;
    }
)

import type {RootState} from '@/core/store';
import {USERS_SLICE} from './constants.ts';
import {usersAdapter} from './usersSlice.ts';

const selectors = usersAdapter.getSelectors((state: RootState) => state[USERS_SLICE]);

export const selectAllUsers = selectors.selectAll;
export const selectUserById = selectors.selectById;
export const selectUsersMap = selectors.selectEntities;
export const selectUsersStatus = (state: RootState) => state[USERS_SLICE].status;
export const selectUsersError = (state: RootState) => state[USERS_SLICE].error;
export const selectUsersCreateStatus = (state: RootState) => state[USERS_SLICE].createStatus;
export const selectUsersCreateError = (state: RootState) => state[USERS_SLICE].createError;
export const selectUsersDeleteStatus = (state: RootState) => state[USERS_SLICE].deleteStatus;
export const selectUsersDeleteError = (state: RootState) => state[USERS_SLICE].deleteError;

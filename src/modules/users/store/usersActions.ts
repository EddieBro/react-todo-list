import {createAction} from '@reduxjs/toolkit';
import {USERS_SLICE} from './constants.ts';
import type {User} from '@/core/models/models.ts';
import type {PayloadApiError, PayloadApiSuccess} from '@/shared/models/apiStatus.ts';

export const usersModuleEnter = createAction(`${USERS_SLICE}/moduleEnter`);
export const usersModuleExit = createAction(`${USERS_SLICE}/moduleExit`);

export const fetchUsers = createAction(`${USERS_SLICE}/fetchUsers`);
export const fetchUsersSuccess = createAction<PayloadApiSuccess<User[]>>(`${USERS_SLICE}/fetchUsersSuccess`);
export const fetchUsersError = createAction<PayloadApiError>(`${USERS_SLICE}/fetchUsersError`);

export const createUser = createAction<Omit<User, 'id'>>(`${USERS_SLICE}/createUser`);
export const createUserReset = createAction(`${USERS_SLICE}/createUserReset`);
export const createUserSuccess = createAction<PayloadApiSuccess<User>>(`${USERS_SLICE}/createUserSuccess`);
export const createUserError = createAction<PayloadApiError>(`${USERS_SLICE}/createUserError`);

export const deleteUser = createAction<User['id']>(`${USERS_SLICE}/deleteUser`);
export const deleteUserSuccess = createAction<PayloadApiSuccess<User['id']>>(`${USERS_SLICE}/deleteUserSuccess`);
export const deleteUserError = createAction<PayloadApiError>(`${USERS_SLICE}/deleteUserError`);

import {useAppDispatch, useAppSelector} from '@/core/store';
import {
  selectAllUsers,
  selectUsersCreateError,
  selectUsersCreateStatus, selectUsersDeleteError, selectUsersDeleteStatus,
  selectUsersError,
  selectUsersStatus
} from '../store/usersSelectors.ts';
import {useCallback, useMemo} from 'react';
import {createUser, createUserReset, deleteUser} from '../store/usersActions.ts';
import type { User } from '@/core/models/models.ts';

export const useUsers = () => ({
  users: useAppSelector(selectAllUsers),
  listStatus: useAppSelector(selectUsersStatus),
  listError: useAppSelector(selectUsersError)
})

export const useUsersCreate = () => {
  const dispatch = useAppDispatch();
  const createStatus = useAppSelector(selectUsersCreateStatus);
  const createError = useAppSelector(selectUsersCreateError);

  const create = useCallback((draft: Omit<User, 'id'>) => dispatch(createUser(draft)), [dispatch]);
  const reset = useCallback(() => dispatch(createUserReset()), [dispatch]);

  return useMemo(
      () => ({createStatus, createError, create, reset}),
      [createStatus, createError, create, reset],
  );
}

export const useUsersDelete = () => {
  const dispatch = useAppDispatch();
  const deleteStatus = useAppSelector(selectUsersDeleteStatus);
  const deleteError = useAppSelector(selectUsersDeleteError);

  const remove = useCallback((id: User['id']) => dispatch(deleteUser(id)), [dispatch]);

  return useMemo(
      () => ({deleteStatus, deleteError, remove}),
      [deleteStatus, deleteError, remove],
  );
}

import {useAppDispatch, useAppSelector} from '@/core/store';
import {
  selectAllUsers,
  selectUsersCreateError,
  selectUsersCreateStatus,
  selectUsersError,
  selectUsersStatus
} from '../store/usersSelectors.ts';
import {useCallback, useMemo} from 'react';
import {createUser, createUserReset} from '../store/usersActions.ts';
import type { User } from '@/core/models/models.ts';

export const useUsers = () => ({
  users: useAppSelector(selectAllUsers),
  status: useAppSelector(selectUsersStatus),
  error: useAppSelector(selectUsersError)
})

export const useUsersCreate = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectUsersCreateStatus);
  const error = useAppSelector(selectUsersCreateError);

  const create = useCallback((draft: Omit<User, 'id'>) => dispatch(createUser(draft)),
      [dispatch]);
  const reset = useCallback(() => dispatch(createUserReset()), [dispatch]);
  return useMemo(() => ({status, error, create, reset}), [status, error, create, reset]);
}

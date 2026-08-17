import {useAppSelector} from '@/core/store';
import {selectAllUsers, selectUsersError, selectUsersStatus} from '../store/usersSelectors.ts';

export const useUsers = () => ({
  users: useAppSelector(selectAllUsers),
  status: useAppSelector(selectUsersStatus),
  error: useAppSelector(selectUsersError)
})

import {login, logout, useAppDispatch, useAppSelector} from '@/core/store';

export const useSession = () => {
  const userId = useAppSelector(state => state.session.userId);
  const dispatch = useAppDispatch();
  return {
    currentUserId: userId,
    login: (id: string) => dispatch(login(id)),
    logout: () => dispatch(logout())
  }
}

import {login, logout, useAppDispatch, useAppSelector} from '@/core/store';
import {useCallback, useMemo} from 'react';

export const useSession = () => {
  const userId = useAppSelector(state => state.session.userId);
  const dispatch = useAppDispatch();

  const loginUser = useCallback((id: string) => dispatch(login(id)), [dispatch]);
  const logoutUser = useCallback(() => dispatch(logout()), [dispatch])
  return useMemo(
      () => ({currentUserId: userId, login: loginUser, logout: logoutUser}),
      [userId, loginUser, logoutUser]
  );
};

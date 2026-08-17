import {useParams} from 'react-router-dom';
import {useAppSelector} from '@/core/store';
import {selectUserById, selectUsersStatus} from '../store/usersSelectors.ts';

export const useUser = () => {
  const {userId} = useParams();
  const user = useAppSelector(state => (userId ? selectUserById(state, userId) : undefined));
  const status = useAppSelector(selectUsersStatus)
  return {user, status};
};

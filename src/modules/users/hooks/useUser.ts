import {useParams} from 'react-router-dom';
import {useAppSelector} from '@/core/store';
import {selectUserById} from '../store/usersSelectors.ts';

export const useUser = () => {
  const {userId} = useParams();
  return useAppSelector(state => (userId ? selectUserById(state, userId) : undefined));
};

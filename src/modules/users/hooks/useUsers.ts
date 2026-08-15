import {useAppSelector} from '@/core/store';
import {selectAllUsers} from '../store/usersSelectors.ts';

export const useUsers = () => useAppSelector(selectAllUsers);

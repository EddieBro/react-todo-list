import {useCallback} from 'react';
import {useAppDispatch} from '@/core/store';
import {moveTask, type MoveTaskPayload} from '../store/boardActions.ts';

export const useMoveTask = () => {
  const dispatch = useAppDispatch();
  return useCallback((payload: MoveTaskPayload) => dispatch(moveTask(payload)), [dispatch]);
};

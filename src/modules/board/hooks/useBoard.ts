import {useAppDispatch, useAppSelector} from '@/core/store';
import {
  selectBoard,
  selectBoardError,
  selectBoardStatus,
  selectCanEditBoard,
  selectIsBoardOwner
} from '../store/boardSelectors.ts';
import {setEditors} from '../store/boardActions.ts';
import {useCallback} from 'react';
import type {User} from '@/core/models/models.ts';

export const useBoard = () => ({
  board: useAppSelector(selectBoard),
  status: useAppSelector(selectBoardStatus),
  error: useAppSelector(selectBoardError),
  canEdit: useAppSelector(selectCanEditBoard),
  isOwner: useAppSelector(selectIsBoardOwner)
});

export const useSetEditors = () => {
  const dispatch = useAppDispatch();
  return useCallback((editorsIds: User['id'][]) => dispatch(setEditors(editorsIds)), [dispatch])
}

import {useAppDispatch, useAppSelector} from '@/core/store';
import {
  selectAllBoards, selectBoardsCreateError, selectBoardsCreateStatus, selectBoardsDeleteError,
  selectBoardsDeleteStatus,
  selectBoardsError,
  selectBoardsStatus
} from '../store/boardsSelectors.ts';
import {useCallback, useMemo} from 'react';
import type {Board} from '@/core/models/models.ts';
import {createBoard, createBoardReset, deleteBoard} from '../store/boardsActions.ts';

export const useBoards = () => ({
  boards: useAppSelector(selectAllBoards),
  listStatus: useAppSelector(selectBoardsStatus),
  listError: useAppSelector(selectBoardsError)
})

export const useBoardsCreate = () => {
  const dispatch = useAppDispatch();
  const createStatus = useAppSelector(selectBoardsCreateStatus);
  const createError = useAppSelector(selectBoardsCreateError);

  const create = useCallback((draft: Omit<Board, 'id'>) => dispatch(createBoard(draft)), [dispatch]);
  const reset = useCallback(() => dispatch(createBoardReset()), [dispatch]);

  return useMemo(
      () => ({createStatus, createError, create, reset}),
      [createStatus, createError, create, reset],
  )
}

export const useBoardsDelete = () => {
  const dispatch = useAppDispatch();
  const deleteStatus = useAppSelector(selectBoardsDeleteStatus);
  const deleteError = useAppSelector(selectBoardsDeleteError);

  const remove = useCallback((id: Board['id']) => dispatch(deleteBoard(id)), [dispatch]);

  return useMemo(
    () => ({deleteStatus, deleteError, remove}),
    [deleteStatus, deleteError, remove]
  )
}

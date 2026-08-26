import {useAppSelector} from '@/core/store';
import {selectBoard, selectBoardError, selectBoardStatus} from '../store/boardSelectors.ts';

export const useBoard = () => ({
  board: useAppSelector(selectBoard),
  status: useAppSelector(selectBoardStatus),
  error: useAppSelector(selectBoardError)
})

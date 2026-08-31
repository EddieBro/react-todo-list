import type {RootState} from '@/core/store';
import {BOARD_SLICE} from './constants.ts';

export const selectBoard = (state: RootState) => state[BOARD_SLICE].board;
export const selectBoardStatus = (state: RootState) => state[BOARD_SLICE].status;
export const selectBoardError = (state: RootState) => state[BOARD_SLICE].error;
export const selectCanEditBoard = (state: RootState) => {
  const board = selectBoard(state);
  const userId = state.session.userId;
  if (!board || !userId) return false;
  return board.ownerId === userId || board.editorsIds.includes(userId);
}

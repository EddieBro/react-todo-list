import {BOARDS_SLICE} from './constants.ts';
import {boardsAdapter} from './boardsSlice.ts'
import type {RootState} from '@/core/store';

const selectors = boardsAdapter.getSelectors((state: RootState) => state[BOARDS_SLICE]);

export const selectAllBoards = selectors.selectAll;
export const selectBoardById = selectors.selectById;
export const selectBoardsStatus = (state: RootState) => state[BOARDS_SLICE].status;
export const selectBoardsError = (state: RootState) => state[BOARDS_SLICE].error;
export const selectBoardsCreateStatus = (state: RootState) => state[BOARDS_SLICE].createStatus
export const selectBoardsCreateError = (state: RootState) => state[BOARDS_SLICE].createError
export const selectBoardsDeleteStatus = (state: RootState) => state[BOARDS_SLICE].deleteStatus;
export const selectBoardsDeleteError = (state: RootState) => state[BOARDS_SLICE].deleteError;

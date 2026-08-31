import {createAction} from '@reduxjs/toolkit';
import {createModuleLifecycle} from '@/shared/utils/moduleLifecycle.ts';
import type {Board, BoardDetails, Column, Task} from '@/core/models/models.ts';
import type {PayloadApiError, PayloadApiSuccess} from '@/shared/models/apiStatus.ts';
import {BOARD_SLICE} from './constants.ts';

export type MoveTaskPayload = {
  taskId: Task['id'];
  fromColumnId: Column['id'];
  toColumnId: Column['id'];
  toIndex: number;
}

export const {moduleEnter: boardModuleEnter, moduleExit: boardModuleExit} = createModuleLifecycle<Board['id']>(BOARD_SLICE);

export const fetchBoard = createAction<Board['id']>(`${BOARD_SLICE}/fetchBoard`);
export const fetchBoardSuccess = createAction<PayloadApiSuccess<BoardDetails>>(`${BOARD_SLICE}/fetchBoardSuccess`);
export const fetchBoardError = createAction<PayloadApiError>(`${BOARD_SLICE}/fetchBoardError`);

export const moveTask = createAction<MoveTaskPayload>(`${BOARD_SLICE}/moveTask`);
export const saveBoard = createAction<BoardDetails>(`${BOARD_SLICE}/saveBoard`);
export const saveBoardSuccess = createAction<PayloadApiSuccess<BoardDetails>>(`${BOARD_SLICE}/saveBoardSuccess`);
export const saveBoardError = createAction<PayloadApiError>(`${BOARD_SLICE}/saveBoardError`);

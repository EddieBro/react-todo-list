import {createAction} from '@reduxjs/toolkit';
import {BOARDS_SLICE} from './constants.ts';
import type {PayloadApiError, PayloadApiSuccess} from '@/shared/models/apiStatus.ts';
import type {Board} from '@/core/models/models.ts';

export const boardsModuleEnter = createAction(`${BOARDS_SLICE}/moduleEnter`);
export const boardsModuleExit = createAction(`${BOARDS_SLICE}/moduleExit`);

export const fetchBoards = createAction(`${BOARDS_SLICE}/fetchBoards`);
export const fetchBoardsSuccess = createAction<PayloadApiSuccess<Board[]>>(`${BOARDS_SLICE}/fetchBoardsSuccess`);
export const fetchBoardsError = createAction<PayloadApiError>(`${BOARDS_SLICE}/fetchBoardsError`);

export const createBoard = createAction<Omit<Board, 'id'>>(`${BOARDS_SLICE}/createBoard`);
export const createBoardSuccess = createAction<PayloadApiSuccess<Board>>(`${BOARDS_SLICE}/createBoardSuccess`);
export const createBoardError = createAction<PayloadApiError>(`${BOARDS_SLICE}/createBoardError`);
export const createBoardReset = createAction(`${BOARDS_SLICE}/createBoardReset`);

export const updateBoard = createAction<Board>(`${BOARDS_SLICE}/updateBoard`);
export const updateBoardSuccess = createAction<PayloadApiSuccess<Board>>(`${BOARDS_SLICE}/updateBoardSuccess`);
export const updateBoardError = createAction<PayloadApiError>(`${BOARDS_SLICE}/updateBoardError`);

export const deleteBoard = createAction<Board['id']>(`${BOARDS_SLICE}/deleteBoard`);
export const deleteBoardSuccess = createAction<PayloadApiSuccess<Board['id']>>(`${BOARDS_SLICE}/deleteBoardSuccess`);
export const deleteBoardError = createAction<PayloadApiError>(`${BOARDS_SLICE}/deleteBoardError`);

import type {ApiStatus} from '@/shared/models/apiStatus.ts';
import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import type {Board} from '@/core/models/models.ts';
import {BOARDS_SLICE} from './constants.ts';
import * as actions from './boardsActions.ts';

type BoardsExtraState = {
  status: ApiStatus;
  error: string | null;
  createStatus: ApiStatus;
  createError: string | null;
  deleteStatus: ApiStatus;
  deleteError: string | null;
}

export const boardsAdapter = createEntityAdapter<Board>({
  sortComparer: (a, b) => a.title.localeCompare(b.title)
});

const initialState = boardsAdapter.getInitialState<BoardsExtraState>({
  status: 'idle',
  error: null,
  createStatus: 'idle',
  createError: null,
  deleteStatus: 'idle',
  deleteError: null
});

const boardsSlice = createSlice({
  name: BOARDS_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(actions.fetchBoards, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(actions.fetchBoardsSuccess, (state, action) => {
          boardsAdapter.setAll(state, action.payload.data);
          state.status = 'ready'
        })
        .addCase(actions.fetchBoardsError, (state, action) => {
          state.status = 'error';
          state.error = action.payload.error;
        })
        .addCase(actions.boardsModuleExit, () => initialState)
        .addCase(actions.createBoard, (state) => {
          state.createStatus = 'loading';
          state.createError = null;
        })
        .addCase(actions.createBoardSuccess, (state, action) => {
          boardsAdapter.addOne(state, action.payload.data);
          state.createStatus = 'ready';
        })
        .addCase(actions.createBoardError, (state, action) => {
          state.createStatus = 'error';
          state.createError = action.payload.error;
        })
        .addCase(actions.createBoardReset, (state) => {
          state.createStatus = 'idle';
          state.createError = null;
        })
        .addCase(actions.updateBoardSuccess, (state, action) => {
          boardsAdapter.upsertOne(state, action.payload.data);
        })
        .addCase(actions.deleteBoard, (state) => {
          state.deleteStatus = 'loading';
          state.deleteError = null;
        })
        .addCase(actions.deleteBoardSuccess, (state, action) => {
          boardsAdapter.removeOne(state, action.payload.data);
          state.deleteStatus = 'ready';
        })
        .addCase(actions.deleteBoardError, (state, action) => {
          state.deleteStatus = 'error';
          state.deleteError = action.payload.error;
        })
  }
});

export const boardsReducer = boardsSlice.reducer;

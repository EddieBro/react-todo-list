import type {BoardDetails} from '@/core/models/models.ts';
import type {ApiStatus} from '@/shared/models/apiStatus.ts';
import {createSlice} from '@reduxjs/toolkit';
import {BOARD_SLICE} from './constants.ts';
import * as actions from './boardActions.ts';
import {resetOnExit} from '@/shared/utils/moduleLifecycle.ts';

type BoardModuleState = {
  board: BoardDetails | null;
  status: ApiStatus;
  error: string | null;
}

const initialModuleState: BoardModuleState = {board: null, status: 'idle', error: null};

const boardSlice = createSlice({
  name: BOARD_SLICE,
  initialState: initialModuleState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actions.fetchBoard, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(actions.fetchBoardSuccess, (state, action) => {
        state.board = action.payload.data
        state.status = 'ready'
      })
      .addCase(actions.fetchBoardError, (state, action) => {
        state.status = 'error';
        state.error = action.payload.error;
        state.board = null;
      })
      .addCase(actions.boardModuleExit, resetOnExit(initialModuleState));
  }
});

export const boardReducer = boardSlice.reducer;

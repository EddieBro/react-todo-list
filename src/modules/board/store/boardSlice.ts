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
  saveStatus: ApiStatus;
  saveError: string | null;
}


const initialModuleState: BoardModuleState = {board: null, status: 'idle', error: null, saveStatus: 'idle', saveError: null};

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
      .addCase(actions.moveTask, (state, action) => {
        const {taskId, fromColumnId, toColumnId, toIndex} = action.payload;
        if (!state.board) return;

        const from = state.board.columns.find(c => c.id === fromColumnId);
        const to = state.board.columns.find(c => c.id === toColumnId);
        if (!from || !to) return;
        const index = from.taskIds.indexOf(taskId);
        if (index === -1) return;

        from.taskIds.splice(index, 1);
        to.taskIds.splice(toIndex, 0, taskId);
      })
      .addCase(actions.saveBoard, (state) => {
        if (!state.board) return;
        state.saveStatus = 'loading';
        state.saveError = null;
      })
      .addCase(actions.saveBoardSuccess, (state) => {
        if (!state.board) return;
        state.saveStatus = 'ready';
      })
      .addCase(actions.saveBoardError, (state, action) => {
        if (!state.board) return;
        state.saveStatus = 'error';
        state.saveError = action.payload.error;
      })
      .addCase(actions.addTask, (state, action) => {
        const {task, columnId} = action.payload;
        if (!state.board) return;

        const column = state.board.columns.find(c => c.id === columnId);
        if (!column) return;

        state.board.tasks[task.id] = task;
        column.taskIds.push(task.id);
      })
      .addCase(actions.boardModuleExit, resetOnExit(initialModuleState));
  }
});

export const boardReducer = boardSlice.reducer;

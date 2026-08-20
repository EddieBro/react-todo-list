import type {AppEpic} from '@/core/store';
import {combineEpics, ofType} from 'redux-observable';
import * as actions from './boardsActions.ts'
import {catchError, filter, from, map, mergeMap, of, switchMap} from 'rxjs';
import {BOARDS_SLICE} from './constants.ts';
import {createId} from '@/shared/utils/id.ts';

const loadBoardsEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(actions.boardsModuleEnter.type),
    filter(() => {
      const {status} = state$.value[BOARDS_SLICE];
      return status === 'idle' || status === 'error'
    }),
    map(() => actions.fetchBoards())
)

const fetchBoardsEpic: AppEpic = (action$, _state$, {boardApi}) =>
  action$.pipe(
    ofType(actions.fetchBoards.type),
    switchMap(() =>
      from(boardApi.getBoards()).pipe(
        map(boards => actions.fetchBoardsSuccess({data: boards})),
        catchError(err => of(actions.fetchBoardsError({error: String(err)}))),
      )
    )
  );

const createBoardEpic: AppEpic = (action$, _state$, {boardApi}) =>
  action$.pipe(
    filter(actions.createBoard.match),
    mergeMap(action =>
      from(boardApi.createBoard({...action.payload, id: createId()})).pipe(
        map(board => actions.createBoardSuccess({data: board})),
        catchError(err => of(actions.createBoardError({error: String(err)}))),
      )
    )
  )

const updateBoardEpic: AppEpic = (action$, _state$, {boardApi}) =>
  action$.pipe(
    filter(actions.updateBoard.match),
    mergeMap(action =>
      from(boardApi.updateBoard(action.payload)).pipe(
        map(board => actions.updateBoardSuccess({data: board})),
        catchError(err => of(actions.updateBoardError({error: String(err)})))
      )
    )
  )

const deleteBoardEpic: AppEpic = (action$, _state$, {boardApi}) =>
  action$.pipe(
    filter(actions.deleteBoard.match),
    mergeMap(action =>
      from(boardApi.deleteBoard(action.payload)).pipe(
        map(() => actions.deleteBoardSuccess({data: action.payload})),
        catchError(err => of(actions.deleteBoardError({error: String(err)}))),
      )
    )
  )

export const boardsEpic = combineEpics(loadBoardsEpic, fetchBoardsEpic, createBoardEpic, updateBoardEpic, deleteBoardEpic);

import {combineEpics} from 'redux-observable';
import type {AppEpic} from '@/core/store';
import {catchError, debounce, filter, from, map, of, race, switchMap, takeUntil, timer, withLatestFrom} from 'rxjs';
import type {UnknownAction} from 'redux';
import type {BoardDetails} from '@/core/models/models.ts';
import {selectBoard} from './boardSelectors.ts';
import {SAVE_DELAY} from './constants.ts';
import * as actions from './boardActions.ts';

const BOARD_MUTATIONS = [actions.moveTask, actions.addTask, actions.setEditors];
const isBoardMutation =(a: UnknownAction) => BOARD_MUTATIONS.some(m => m.match(a));

const loadBoardEpic: AppEpic = action$ =>
  action$.pipe(
    filter(actions.boardModuleEnter.match),
    map(action => actions.fetchBoard(action.payload))
  );

const fetchBoardEpic: AppEpic = (action$, _state, {boardApi}) =>
  action$.pipe(
  filter(actions.fetchBoard.match),
  switchMap(action =>
    from(boardApi.getBoard(action.payload)).pipe(
      map(board => board
        ? actions.fetchBoardSuccess({data: board})
        : actions.fetchBoardError({error: 'Доска не найдена'})),
      catchError(err => of(actions.fetchBoardError({error: String(err)}))),
      takeUntil(action$.pipe(filter(actions.boardModuleExit.match)))
  ))
)

const autoSaveEpic: AppEpic = (action$, state$) =>
    action$.pipe(
        filter(isBoardMutation),
        withLatestFrom(state$),
        map(([, state]) => selectBoard(state)),
        filter((board): board is BoardDetails => board !== null),
        debounce(() => race(timer(SAVE_DELAY),
            action$.pipe(filter(actions.boardModuleExit.match)))),
        map(board => actions.saveBoard(board)),
    )

const saveBoardEpic: AppEpic = (action$, _state$, {boardApi}) =>
  action$.pipe(
    filter(actions.saveBoard.match),
    switchMap(action =>
    from(boardApi.saveBoard(action.payload)).pipe(
      map(saved => actions.saveBoardSuccess({data: saved})),
      catchError(err => of(actions.saveBoardError({error: String(err)})))
    ))
  )

export const boardEpic = combineEpics(loadBoardEpic, fetchBoardEpic, autoSaveEpic, saveBoardEpic);

import {combineEpics} from 'redux-observable';
import type {AppEpic} from '@/core/store';
import * as actions from './boardActions.ts';
import {catchError, filter, from, map, of, switchMap, takeUntil} from 'rxjs';

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

export const boardEpic = combineEpics(loadBoardEpic, fetchBoardEpic);

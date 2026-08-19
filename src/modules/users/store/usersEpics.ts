import {type AppEpic, logout} from '@/core/store';
import {combineEpics, ofType} from 'redux-observable';
import * as actions from './usersActions.ts';
import {catchError, filter, from, map, mergeMap, of, switchMap} from 'rxjs';
import {USERS_SLICE} from './constants.ts';
import {createId} from '@/shared/utils/id.ts';

const loadUsersEpic: AppEpic = (action$, state$) =>
    action$.pipe(
        ofType(actions.usersModuleEnter.type),
        filter(() => {
          const {status} = state$.value[USERS_SLICE];
          return status === 'idle' || status === 'error';
        }),
        map(() => actions.fetchUsers()),
    );

const fetchUsersEpic: AppEpic = (action$, _state$, {userApi}) =>
    action$.pipe(
        ofType(actions.fetchUsers.type),
        switchMap(() =>
            from(userApi.getUsers()).pipe(
                map(users => actions.fetchUsersSuccess({data: users})),
                catchError(err => of(actions.fetchUsersError({error: String(err)}))),
            ),
        ),
    );

const createUserEpic: AppEpic = (action$, _state$, {userApi}) =>
    action$.pipe(
      filter(actions.createUser.match),
      mergeMap(action =>
        from(userApi.saveUser({...action.payload, id: createId()})).pipe(
          map(user => actions.createUserSuccess({data: user})),
          catchError(err => of(actions.createUserError({error: String(err)})))
        )
      )
    )

const deleteUserEpic: AppEpic = (actions$, _state$, {userApi}) =>
    actions$.pipe(
      filter(actions.deleteUser.match),
      mergeMap(action =>
        from(userApi.deleteUser(action.payload)).pipe(
          map(() => actions.deleteUserSuccess({data: action.payload})),
          catchError(err => of(actions.deleteUserError({error: String(err)}))),
        )
      )
    )

const logoutOnSelfDeleteEpic: AppEpic = (action$, state$) =>
    action$.pipe(
        filter(actions.deleteUserSuccess.match),
        filter(action => action.payload.data === state$.value.session.userId),
        map(() => logout())
    )

export const usersEpic = combineEpics(loadUsersEpic, fetchUsersEpic, createUserEpic, deleteUserEpic, logoutOnSelfDeleteEpic);

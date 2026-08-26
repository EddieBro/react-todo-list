import type {AppDispatch, RootState} from '@/core/store/types.ts';
import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import type {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useModuleLifecycle(
  enter: ActionCreatorWithoutPayload,
  exit?: ActionCreatorWithoutPayload
): void;

export function useModuleLifecycle<P>(
  enter: ActionCreatorWithPayload<P>,
  exit: ActionCreatorWithoutPayload | undefined,
  arg: P
): void;

export function useModuleLifecycle<P>(
  enter: ActionCreatorWithoutPayload | ActionCreatorWithPayload<P>,
  exit?: ActionCreatorWithoutPayload,
  arg?: P,
) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch((enter as ActionCreatorWithPayload<P>)(arg as P));
    return () => {
      if (exit) {
        dispatch(exit());
      }
    };
  }, [dispatch, enter, exit, arg]);
}

import type {AppDispatch, RootState} from '@/core/store/types.ts';
import {type TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import type {ActionCreatorWithoutPayload} from '@reduxjs/toolkit';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useModuleLifecycle = (
    enter: ActionCreatorWithoutPayload,
    exit?: ActionCreatorWithoutPayload,
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(enter());
    return () => {
      if (exit) {
        dispatch(exit());
      }
    };
  }, [dispatch, enter, exit]);
};

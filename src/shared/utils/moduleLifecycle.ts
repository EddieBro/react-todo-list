import {createAction} from '@reduxjs/toolkit';

export const createModuleLifecycle = <P = void>(sliceName: string) => ({
  moduleEnter: createAction<P>(`${sliceName}/moduleEnter`),
  moduleExit: createAction(`${sliceName}/moduleExit`),
});

export const resetOnExit = <S>(initialState: S) => () => initialState;

export const moduleEnter = () => () => {
  // action for effects: page mounted
};

export const moduleExit = <S>(initialState: S) => () => initialState;

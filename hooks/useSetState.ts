import { useReducer, Reducer, Dispatch } from "react";

export const useSetState = <T>(
  initialState: T = {} as T
): [T, Dispatch<Partial<T>>] => {
  const [state, setState] = useReducer<Reducer<T, Partial<T>>>(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );

  return [state, setState];
};

import createAction from '../createAction';

export const SET_GLOBAL_LOADING = 'Global/SET_GLOBAL_LOADING';

export interface SetLoading {
  type: typeof SET_GLOBAL_LOADING;
  payload: boolean;
}

export type Action = SetLoading;

export const setGlobalLoading = createAction<boolean>(SET_GLOBAL_LOADING);

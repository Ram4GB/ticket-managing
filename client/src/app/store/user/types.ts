import { User } from '@acme/shared-models';

export const SET_USER_LIST = 'User/SET_USER_LIST';
export const SET_LOADING_LIST_USER = 'User/SET_LOADING_LIST_USER';

export interface SetUserList {
  type: typeof SET_USER_LIST;
  payload: User[];
}

export interface SetLoadingList {
  type: typeof SET_LOADING_LIST_USER;
  payload: boolean;
}

export type Action = SetUserList | SetLoadingList;

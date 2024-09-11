import createAction from '../createAction';
import { AppThunk } from '../../libs/store';
import instance from '../../libs/axios';
import { User } from '@acme/shared-models';

export const SET_USER_LIST = 'SET_USER_LIST';
export const SET_LOADING_LIST_USER = 'SET_LOADING_LIST_USER';

export interface SetUserList {
  type: typeof SET_USER_LIST;
  payload: User[];
}

export interface SetLoadingList {
  type: typeof SET_LOADING_LIST_USER;
  payload: boolean;
}

export type Action = SetUserList | SetLoadingList;

export const setUserList = createAction<Array<User>>(SET_USER_LIST);

export const setLoading = createAction<boolean>(SET_LOADING_LIST_USER);

export const fetchUserList = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await instance.get('/users');
      if (result.status !== 200) {
        // handle error
      }
      dispatch(setUserList(result.data));
    } catch (error) {
      // handle error
    } finally {
      dispatch(setLoading(false));
    }
  };
};

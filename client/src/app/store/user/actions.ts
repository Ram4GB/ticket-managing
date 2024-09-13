import { User } from '@acme/shared-models';
import createAction from '../createAction';
import { SET_LOADING_LIST_USER, SET_USER_LIST } from './types';

export const setUserList = createAction<Array<User>>(SET_USER_LIST);

export const setLoading = createAction<boolean>(SET_LOADING_LIST_USER);

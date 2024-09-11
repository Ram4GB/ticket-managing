import { User } from '@acme/shared-models';
import { Action, SET_LOADING_LIST_USER, SET_USER_LIST } from './actions';

interface InitialState {
  users: User[];
  loading: boolean;
}

const initialState: InitialState = {
  users: [],
  loading: false,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_USER_LIST:
      return {
        ...state,
        users: action.payload,
      };
    case SET_LOADING_LIST_USER:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const MODULE_NAME = 'user';

export default reducer;

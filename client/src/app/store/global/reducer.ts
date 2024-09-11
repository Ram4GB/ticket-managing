import { Action, SET_GLOBAL_LOADING } from './actions';

interface InitialState {
  loading: boolean;
}

const initialState: InitialState = {
  loading: false,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_GLOBAL_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export const MODULE_NAME = 'global';

export default reducer;

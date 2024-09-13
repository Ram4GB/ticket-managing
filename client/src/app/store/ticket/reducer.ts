import { Ticket } from '@acme/shared-models';
import {
  SET_TICKET_LIST,
  SET_LOADING_LIST,
  SET_LOADING_TICKET_ITEM,
  SET_TICKET_ITEM,
  Action,
} from './types';

interface InitialState {
  tickets: Ticket[];
  status: 'all' | 'completed' | 'incomplete';
  loading: boolean;
  ticket: {
    data: null;
    loading: boolean;
  };
}

const initialState: InitialState = {
  tickets: [],
  status: 'all',
  loading: false,
  ticket: {
    data: null,
    loading: false,
  },
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_TICKET_LIST:
      return {
        ...state,
        tickets: action.payload,
      };
    case SET_LOADING_LIST:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_LOADING_TICKET_ITEM:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          loading: action.payload,
        },
      };
    case SET_TICKET_ITEM:
      return {
        ...state,
        ticket: {
          ...state.ticket,
          data: action.payload,
        },
      };
    default:
      return state;
  }
};

export const MODULE_NAME = 'ticket';

export default reducer;

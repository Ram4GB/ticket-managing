import { Ticket } from '@acme/shared-models';

const SET_TICKET_LIST = 'SET_TICKET_LIST';
const FETCH_TICKET_LIST = 'FETCH_TICKET_LIST';

interface SetTicketList {
  type: typeof SET_TICKET_LIST;
  payload: Ticket[];
}

interface FetchTicketList {
  type: typeof FETCH_TICKET_LIST;
  payload: {
    status?: 'completed' | 'incomplete';
    page: number;
    limit: number;
  };
}

type Action = SetTicketList | FetchTicketList;

interface InitialState {
  tickets: Ticket[];
  page: number;
  limit: number;
  status: 'all' | 'completed' | 'incomplete';
}

const initialState: InitialState = {
  tickets: [],
  page: 1,
  limit: 10,
  status: 'all',
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const MODULE_NAME = 'ticket';

export default reducer;

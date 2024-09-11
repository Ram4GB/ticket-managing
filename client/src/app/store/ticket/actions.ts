import { Ticket } from '@acme/shared-models';
import instance from '../../libs/axios';
import { AppThunk } from '../../libs/store';
import createAction from '../createAction';
import { setGlobalLoading } from '../global/actions';

export const SET_TICKET_LIST = 'SET_TICKET_LIST';
export const SET_LOADING_LIST = 'SET_LOADING_LIST';
export const SET_LOADING_TICKET_ITEM = 'SET_LOADING_TICKET_ITEM';
export const SET_TICKET_ITEM = 'SET_TICKET_ITEM';

export interface SetTicketList {
  type: typeof SET_TICKET_LIST;
  payload: Ticket[];
}

export interface SetLoadingList {
  type: typeof SET_LOADING_LIST;
  payload: Ticket[];
}

export interface SetLoadingTicketItem {
  type: typeof SET_LOADING_TICKET_ITEM;
  payload: boolean;
}

export interface SetTicketItem {
  type: typeof SET_TICKET_ITEM;
  payload: Ticket;
}

export type Action =
  | SetTicketList
  | SetLoadingList
  | SetLoadingTicketItem
  | SetTicketItem;

export const setTicketList = createAction<Array<Ticket>>(SET_TICKET_LIST);

export const setLoading = createAction<boolean>(SET_LOADING_LIST);

export const setLoadingTicketItem = createAction<boolean>(
  SET_LOADING_TICKET_ITEM
);

export const setTicketItem = createAction<Ticket>(SET_TICKET_ITEM);

export const fetchTicketList = (query?: {
  page: number;
  limit: number;
}): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await instance.get('/tickets');
      if (result.status !== 200) {
        // handle error
      }
      dispatch(setTicketList(result.data));
    } catch (error) {
      // handle error
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const createNewTicket = (
  ticket?: Pick<Ticket, 'description'>
): AppThunk<Promise<boolean>> => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingTicketItem(true));
      const result = await instance.post('/tickets', ticket);
      console.log('result', result);
      if (result.status !== 201) {
        // handle error
      }

      return true;
    } catch (error) {
      // handle error
      return false;
    } finally {
      dispatch(setLoadingTicketItem(false));
    }
  };
};

export const assignTicket = (
  userId: number,
  ticketId: number
): AppThunk<Promise<boolean>> => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingTicketItem(true));
      const result = await instance.put(
        `/tickets/${ticketId}/assign/${userId}`
      );
      if (result.status !== 204) {
        // handle error
      }

      dispatch(fetchTicketList());

      return true;
    } catch (error) {
      // handle error
      return false;
    } finally {
      dispatch(setLoadingTicketItem(false));
    }
  };
};

export const unassignTicket = (
  ticketId: number
): AppThunk<Promise<boolean>> => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingTicketItem(true));
      const result = await instance.put(`/tickets/${ticketId}/unassign`);
      if (result.status !== 204) {
        // handle error
      }

      dispatch(fetchTicketList());

      return true;
    } catch (error) {
      // handle error
      return false;
    } finally {
      dispatch(setLoadingTicketItem(false));
    }
  };
};

export const completeTicket = (
  ticketId: number
): AppThunk<Promise<boolean>> => {
  return async (dispatch) => {
    try {
      dispatch(setGlobalLoading(true));
      const result = await instance.put(`/tickets/${ticketId}/complete`);
      if (result.status !== 204) {
        // handle error
      }

      dispatch(fetchTicketList());

      return true;
    } catch (error) {
      // handle error
      return false;
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };
};

export const uncompleteTicket = (
  ticketId: number
): AppThunk<Promise<boolean>> => {
  return async (dispatch) => {
    try {
      dispatch(setGlobalLoading(true));
      const result = await instance.delete(`/tickets/${ticketId}/complete`);
      if (result.status !== 204) {
        // handle error
      }

      dispatch(fetchTicketList());

      return true;
    } catch (error) {
      // handle error
      return false;
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };
};

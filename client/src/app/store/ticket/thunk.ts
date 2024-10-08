import { Ticket } from '@acme/shared-models';
import ENDPOINT from '../../const/endpoint';
import instance from '../../libs/axios';
import handleError from '../../utils/handle-error';
import { setGlobalLoading } from '../global/actions';
import {
  setLoading,
  setTicketList,
  setLoadingTicketItem,
  setTicketItem,
} from './actions';
import { AppThunk } from '../../libs/redux/types';

export const fetchTicketList = (query?: {
  page: number;
  limit: number;
}): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await instance.get(ENDPOINT.ticketList());
      if (result.status !== 200) {
        handleError(result.data);
      }
      dispatch(setTicketList(result.data));
    } catch (error) {
      handleError(error);
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
      const result = await instance.post(ENDPOINT.ticketList(), ticket);
      if (result.status !== 201) {
        handleError(result.data);
      }

      return true;
    } catch (error) {
      handleError(error);
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
        ENDPOINT.assignTicket(ticketId, userId)
      );
      if (result.status !== 204) {
        handleError(result.data);
      }

      dispatch(fetchTicketList());

      return true;
    } catch (error) {
      handleError(error);
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
      const result = await instance.put(ENDPOINT.unassignTicket(ticketId));
      if (result.status !== 204) {
        handleError(result.data);
      }

      dispatch(fetchTicketList());

      return true;
    } catch (error) {
      handleError(error);
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
      const result = await instance.put(
        ENDPOINT.updateCompleteTicket(ticketId)
      );
      if (result.status !== 204) {
        handleError(result.data);
      }

      dispatch(fetchTicketList());

      return true;
    } catch (error) {
      handleError(error);
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
      const result = await instance.delete(
        ENDPOINT.updateCompleteTicket(ticketId)
      );
      if (result.status !== 204) {
        handleError(result.data);
      }

      dispatch(fetchTicketList());

      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };
};

export const getTicketDetail = (
  ticketId: string
): AppThunk<Promise<boolean>> => {
  return async (dispatch) => {
    try {
      dispatch(setGlobalLoading(true));
      const result = await instance.get(ENDPOINT.ticketDetail(ticketId));
      if (result.status !== 200) {
        handleError(result.data);
      }
      dispatch(setTicketItem(result.data));
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      dispatch(setGlobalLoading(false));
    }
  };
};

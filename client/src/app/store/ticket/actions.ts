import { Ticket } from '@acme/shared-models';
import createAction from '../createAction';
import {
  SET_TICKET_LIST,
  SET_LOADING_LIST,
  SET_LOADING_TICKET_ITEM,
  SET_TICKET_ITEM,
} from './types';

export const setTicketList = createAction<Array<Ticket>>(SET_TICKET_LIST);

export const setLoading = createAction<boolean>(SET_LOADING_LIST);

export const setLoadingTicketItem = createAction<boolean>(
  SET_LOADING_TICKET_ITEM
);

export const setTicketItem = createAction<Ticket>(SET_TICKET_ITEM);

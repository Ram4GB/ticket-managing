import { Ticket } from '@acme/shared-models';

export const SET_TICKET_LIST = 'Ticket/SET_TICKET_LIST';
export const SET_LOADING_LIST = 'Ticket/SET_LOADING_LIST';
export const SET_LOADING_TICKET_ITEM = 'Ticket/SET_LOADING_TICKET_ITEM';
export const SET_TICKET_ITEM = 'Ticket/SET_TICKET_ITEM';

export interface SetTicketList {
  type: typeof SET_TICKET_LIST;
  payload: Ticket[];
}

export interface SetLoadingList {
  type: typeof SET_LOADING_LIST;
  payload: boolean;
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

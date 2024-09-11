const ENDPOINT = {
  ticketList: () => '/tickets',
  assignTicket: (ticketId: number, userId: number) =>
    `/tickets/${ticketId}/assign/${userId}`,
  unassignTicket: (ticketId: number) => `/tickets/${ticketId}/unassign`,
  updateCompleteTicket: (ticketId: number) => `/tickets/${ticketId}/complete`,
  userList: () => '/users',
  ticketDetail: (id: string) => `/tickets/${id}`,
};

export default ENDPOINT;

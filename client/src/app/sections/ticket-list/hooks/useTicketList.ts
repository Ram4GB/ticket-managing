import { Ticket } from '@acme/shared-models';
import { useAppDispatch, useAppSelector } from '../../../libs/store';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  assignTicket,
  completeTicket,
  fetchTicketList,
  unassignTicket,
  uncompleteTicket,
} from '../../../store/ticket/actions';
import { notification } from 'antd';

const useTicketList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const list = useAppSelector((state) => state.ticket.tickets);

  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  const [filter, setFilter] = useState<{
    status: 'All' | 'Completed' | 'Incompleted';
  }>({
    status: 'All',
  });

  const handleAddNewTicket = () => {
    navigate('/ticket/new');
  };

  useEffect(() => {
    dispatch(fetchTicketList());
  }, [dispatch]);

  const handleAssign = (data: { user: number }) => {
    if (!selectedTicket?.id) return;

    dispatch(assignTicket(data.user, selectedTicket?.id)).then((success) => {
      if (success) {
        notification.success({
          message: `Assign successfully`,
        });
        setSelectedTicket(undefined);
      }
    });
  };

  const handleUnassign = (ticket: Ticket) => {
    return dispatch(unassignTicket(ticket?.id)).then((success) => {
      if (success) {
        notification.success({
          message: `Unassign ticket successfully`,
        });
      }
    });
  };

  const handleCompleteTicket = (ticket: Ticket) => {
    return dispatch(completeTicket(ticket?.id)).then((success) => {
      if (success) {
        notification.success({
          message: `Complete ticket successfully`,
        });
      }
    });
  };

  const handleUncompleteTicket = (ticket: Ticket) => {
    return dispatch(uncompleteTicket(ticket?.id)).then((success) => {
      if (success) {
        notification.success({
          message: `Uncomplete ticket successfully`,
        });
      }
    });
  };

  const handleCloseModal = () => {
    setSelectedTicket(undefined);
  };

  const handleChangeStatus = (status: 'Completed' | 'Incompleted' | 'All') => {
    setFilter({
      ...filter,
      status,
    });
  };

  const getListByStatus = (
    list: Ticket[],
    status: 'Completed' | 'Incompleted'
  ) => {
    if (status === 'Completed') {
      return list.filter((item) => item.completed);
    }

    return list.filter((item) => !item.completed);
  };

  const filteredList =
    filter.status === 'All' ? list : getListByStatus(list, filter.status);

  return {
    list: filteredList,
    filter,
    selectedTicket,
    handleUnassign,
    handleAssign,
    handleAddNewTicket,
    handleChangeStatus,
    setSelectedTicket,
    handleCloseModal,
    handleCompleteTicket,
    handleUncompleteTicket,
  };
};

export default useTicketList;

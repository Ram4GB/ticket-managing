import { Ticket } from '@acme/shared-models';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Status } from '../../../const/status';
import {
  fetchTicketList,
  assignTicket,
  unassignTicket,
  completeTicket,
  uncompleteTicket,
} from '../../../store/ticket/thunk';
import {
  assignSuccess,
  completeSuccess,
  inCompleteSuccess,
  unAssignSuccess,
} from '../../../../app/const/message';
import { useAppDispatch, useAppSelector } from '../../../libs/redux/types';

const useTicketList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const list = useAppSelector((state) => state.ticket.tickets);
  const loading = useAppSelector((state) => state.ticket.loading);

  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  const [filter, setFilter] = useState<{
    status: Status;
  }>({
    status: Status['All'],
  });

  const handleAddNewTicket = () => {
    navigate('/ticket/new');
  };

  const handleClickDetail = (ticket: Ticket) => {
    navigate(`/ticket/${ticket.id}`);
  };

  useEffect(() => {
    dispatch(fetchTicketList());
  }, [dispatch]);

  const handleAssign = (data: { user: number }) => {
    if (!selectedTicket?.id) return;

    dispatch(assignTicket(data.user, selectedTicket?.id)).then((success) => {
      if (success) {
        notification.success({
          message: assignSuccess,
        });
        setSelectedTicket(undefined);
      }
    });
  };

  const handleUnassign = (ticket: Ticket) => {
    return dispatch(unassignTicket(ticket?.id)).then((success) => {
      if (success) {
        notification.success({
          message: unAssignSuccess,
        });
      }
    });
  };

  const handleCompleteTicket = (ticket: Ticket) => {
    return dispatch(completeTicket(ticket?.id)).then((success) => {
      if (success) {
        notification.success({
          message: completeSuccess,
        });
      }
    });
  };

  const handleUncompleteTicket = (ticket: Ticket) => {
    return dispatch(uncompleteTicket(ticket?.id)).then((success) => {
      if (success) {
        notification.success({
          message: inCompleteSuccess,
        });
      }
    });
  };

  const handleCloseModal = () => {
    setSelectedTicket(undefined);
  };

  const handleChangeStatus = (status: Status) => {
    setFilter({
      ...filter,
      status,
    });
  };

  const getListByStatus = (list: Ticket[], status: Status) => {
    if (status === Status['Completed']) {
      return list.filter((item) => item.completed);
    }

    return list.filter((item) => !item.completed);
  };

  const filteredList =
    filter.status === Status['All']
      ? list
      : getListByStatus(list, filter.status);

  return {
    loading,
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
    handleClickDetail,
  };
};

export default useTicketList;

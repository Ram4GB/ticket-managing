import { Ticket } from '@acme/shared-models';
import { useAppDispatch, useAppSelector } from '../../../libs/store';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  assignTicket,
  fetchTicketList,
  unassignTicket,
} from '../../../store/ticket/actions';
import { notification } from 'antd';

const useTicketList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const list = useAppSelector((state) => state.ticket.tickets);

  const [selectedTicket, setSelectedTicket] = useState<Ticket>();

  const handleChangeStatus = (value: string) => {
    console.log('value', value);
  };

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

  const handleCloseModal = () => {
    setSelectedTicket(undefined);
  };

  return {
    list,
    selectedTicket,
    handleUnassign,
    handleAssign,
    handleAddNewTicket,
    handleChangeStatus,
    setSelectedTicket,
    handleCloseModal,
  };
};

export default useTicketList;

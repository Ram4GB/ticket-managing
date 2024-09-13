import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../../components/heading/heading';
import TicketForm, { FormType } from '../../components/ticket-form/ticket-form';
import { getTicketDetail } from '../../store/ticket/thunk';
import { useAppDispatch, useAppSelector } from '../../libs/redux/types';

const TicketDetail: FC = () => {
  const dispatch = useAppDispatch();

  const params = useParams<{ id: string }>();
  const ticket = useAppSelector((state) => state.ticket.ticket.data);
  const loading = useAppSelector((state) => state.ticket.ticket.loading);

  useEffect(() => {
    if (!params.id) return;

    dispatch(getTicketDetail(params.id));
  }, [dispatch, params.id]);

  const initialValue = {
    description: ticket?.description ?? '',
    user: Number(ticket?.assigneeId),
    completed: ticket?.completed ?? false,
  };

  return (
    <div>
      <Heading>Ticket detail</Heading>
      <div className="max-w-[600px] mx-auto">
        {ticket && !loading && (
          <TicketForm
            hideSubmit
            type={FormType.DETAIL}
            initialValues={initialValue}
          />
        )}
      </div>
    </div>
  );
};

export default TicketDetail;

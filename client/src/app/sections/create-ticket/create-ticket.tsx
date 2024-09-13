import { Ticket } from '@acme/shared-models';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/heading/heading';
import TicketForm from '../../components/ticket-form/ticket-form';
import { useAppDispatch } from '../../libs/store';
import { createNewTicket } from '../../store/ticket/thunk';

const CreateTicket = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: Pick<Ticket, 'description'>) => {
    dispatch(createNewTicket(values)).then((result) => {
      if (result) {
        notification.success({
          message: 'Create ticket success',
        });
        navigate('/');
      }
    });
  };

  return (
    <div>
      <Heading>Create new ticket</Heading>
      <div style={{ maxWidth: 600, margin: 'auto' }}>
        <TicketForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateTicket;

import { Button, Flex, Select } from 'antd';
import Heading from '../../components/heading/heading';
import Tickets from '../../components/tickets/tickets';

import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../libs/store';
import { useEffect } from 'react';
import { fetchTicketList } from '../../store/ticket/actions';
import { useNavigate } from 'react-router-dom';

const TicketList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const list = useAppSelector((state) => state.ticket.tickets);

  const handleChangeStatus = (value: string) => {
    console.log('value', value);
  };

  useEffect(() => {
    dispatch(fetchTicketList());
  }, [dispatch]);

  console.log('list', list);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Flex style={{ marginBottom: 10 }} align="center" justify="space-between">
        <div>
          <Select
            value={'All'}
            size="large"
            style={{ minWidth: '300px' }}
            onChange={handleChangeStatus}
            options={[
              { value: 'All', label: <span>All</span> },
              { value: 'Completed', label: <span>Completed</span> },
              { value: 'Incomplete', label: <span>Incomplete</span> },
            ]}
          />
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Button
            onClick={() => navigate('/ticket/new')}
            size="large"
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Add new ticket
          </Button>
        </div>
      </Flex>
      <Heading>Ticket list</Heading>
      <Tickets tickets={list} />
    </div>
  );
};

export default TicketList;

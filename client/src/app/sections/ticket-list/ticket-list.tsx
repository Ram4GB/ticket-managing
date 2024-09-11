import { Button, Flex, Select } from 'antd';
import Heading from '../../components/heading/heading';
import Tickets from '../../components/tickets/tickets';

import { PlusCircleOutlined } from '@ant-design/icons';

import UserModal from '../../components/user-modal/user-modal';
import useTicketList from './hooks/useTicketList';

const TicketList = () => {
  const {
    list,
    selectedTicket,
    handleAddNewTicket,
    handleAssign,
    handleChangeStatus,
    setSelectedTicket,
    handleCloseModal,
    handleUnassign,
    handleCompleteTicket,
    handleUncompleteTicket,
  } = useTicketList();

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
            onClick={handleAddNewTicket}
            size="large"
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Add new ticket
          </Button>
        </div>
      </Flex>
      <Heading>Ticket list</Heading>
      <Tickets
        tickets={list}
        handleClickAssign={(ticket) => setSelectedTicket(ticket)}
        handleClickUnassign={handleUnassign}
        handleClickComplete={handleCompleteTicket}
        handleClickUncomplete={handleUncompleteTicket}
      />
      <UserModal
        open={Boolean(selectedTicket)}
        onSubmit={handleAssign}
        onCancel={handleCloseModal}
      />
    </div>
  );
};

export default TicketList;

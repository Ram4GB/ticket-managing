import { Button, Flex } from 'antd';
import Heading from '../../components/heading/heading';
import Tickets from '../../components/tickets/tickets';

import { PlusCircleOutlined } from '@ant-design/icons';

import UserModal from '../../components/user-modal/user-modal';
import useTicketList from './hooks/useTicketList';
import FilterStatus from '../../components/filter-status/filter-status';

const TicketList = () => {
  const {
    list,
    filter,
    selectedTicket,
    handleAddNewTicket,
    handleAssign,
    setSelectedTicket,
    handleCloseModal,
    handleUnassign,
    handleCompleteTicket,
    handleUncompleteTicket,
    handleChangeStatus,
  } = useTicketList();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Flex style={{ marginBottom: 10 }} align="center" justify="space-between">
        <FilterStatus value={filter.status} onChange={handleChangeStatus} />
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

import { Flex } from 'antd';
import Heading from '../../components/heading/heading';
import Tickets from '../../components/tickets/tickets';

import { PlusCircleOutlined } from '@ant-design/icons';

import UserModal from '../../components/user-modal/user-modal';
import useTicketList from './hooks/useTicketList';
import FilterStatus from '../../components/filter-status/filter-status';
import AppButton from '../../components/button/button';

const TicketList = () => {
  const {
    list,
    loading,
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
    handleClickDetail,
  } = useTicketList();

  return (
    <div className="flex flex-col">
      <Heading>Ticket list</Heading>
      <Flex
        wrap="wrap"
        className="flex-col justify-start md:flex-row mb-4 items-center"
      >
        <FilterStatus value={filter.status} onChange={handleChangeStatus} />
        <div className="ml-0 md:ml-auto mt-2 md:mt-2">
          <AppButton
            onClick={handleAddNewTicket}
            size="large"
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Add new ticket
          </AppButton>
        </div>
      </Flex>
      <Tickets
        loading={loading}
        tickets={list}
        handleClickAssign={(ticket) => setSelectedTicket(ticket)}
        handleClickUnassign={handleUnassign}
        handleClickComplete={handleCompleteTicket}
        handleClickUncomplete={handleUncompleteTicket}
        handleClickDetail={handleClickDetail}
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

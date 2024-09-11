import { Ticket } from '@acme/shared-models';
import { Table } from 'antd';

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets(props: TicketsProps) {
  return (
    <Table
      columns={[
        {
          title: 'Title',
        },
        {
          title: 'Assigned',
        },
        {
          title: 'Status',
        },
        {
          title: 'Actions',
        },
      ]}
    />
  );
}

export default Tickets;

import { Ticket } from '@acme/shared-models';
import { Button, Flex, Table, Tooltip } from 'antd';
import Badge from '../badge/badge';
import { CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets(props: TicketsProps) {
  const { tickets } = props;

  return (
    <Table
      bordered
      columns={[
        {
          title: 'Description',
          dataIndex: 'description',
          render(value, row) {
            return <Link to={`/${row.id}`}>{value}</Link>;
          },
        },
        {
          title: 'Assigned',
          align: 'center',
          render(value) {
            return value.assigneeId ? (
              <Tooltip title={value.assigneeId}>
                <UserOutlined />
              </Tooltip>
            ) : (
              'N/A'
            );
          },
        },
        {
          title: 'Status',
          dataIndex: 'completed',
          align: 'center',
          render(value) {
            return <Badge status={value} />;
          },
        },
        {
          title: 'Actions',
          render() {
            return (
              <Flex gap={8}>
                <Button type="dashed">Assign</Button>
                <Button icon={<CheckCircleOutlined />} type="primary">
                  Complete
                </Button>
              </Flex>
            );
          },
        },
      ]}
      dataSource={tickets}
      rowKey={(row) => row.id}
    />
  );
}

export default Tickets;

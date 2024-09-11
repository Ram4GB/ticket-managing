import { Ticket } from '@acme/shared-models';
import { Button, Flex, Popconfirm, Table, Tooltip } from 'antd';
import Badge from '../badge/badge';
import {
  CheckCircleOutlined,
  UserOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FC } from 'react';

export interface Props {
  tickets: Ticket[];
  handleClickAssign?: (ticket: Ticket) => void;
  handleClickUnassign?: (ticket: Ticket) => void;
}

const Tickets: FC<Props> = (props) => {
  const { tickets, handleClickAssign, handleClickUnassign } = props;

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
          render(_, row) {
            return (
              <Flex gap={8}>
                {row.assigneeId ? (
                  <Popconfirm
                    title="Unassign ticket"
                    description="Are you sure to un-assign this ticket?"
                    onConfirm={() => handleClickUnassign?.(row)}
                  >
                    <Button
                      type="dashed"
                      icon={<UserDeleteOutlined />}
                      style={{ minWidth: 120 }}
                    >
                      Unassign
                    </Button>
                  </Popconfirm>
                ) : (
                  <Button
                    type="dashed"
                    icon={<UserAddOutlined />}
                    style={{ minWidth: 120 }}
                    onClick={() => handleClickAssign?.(row)}
                  >
                    Assign
                  </Button>
                )}
                <Button
                  style={{ minWidth: 120 }}
                  icon={
                    row.completed ? <CloseOutlined /> : <CheckCircleOutlined />
                  }
                  type="primary"
                >
                  {row.completed ? 'Uncomplete' : 'Complete'}
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
};

export default Tickets;

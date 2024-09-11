import { Ticket } from '@acme/shared-models';
import {
  CheckCircleOutlined,
  CloseOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Flex, Popconfirm, Table, Tooltip } from 'antd';
import { FC } from 'react';
import Badge from '../badge/badge';
import AppLink from '../link/link';

export interface Props {
  loading?: boolean;
  tickets: Ticket[];
  handleClickAssign?: (ticket: Ticket) => void;
  handleClickUnassign?: (ticket: Ticket) => void;
  handleClickComplete?: (ticket: Ticket) => void;
  handleClickUncomplete?: (ticket: Ticket) => void;
}

const Tickets: FC<Props> = (props) => {
  const {
    loading,
    tickets,
    handleClickAssign,
    handleClickUnassign,
    handleClickComplete,
    handleClickUncomplete,
  } = props;

  return (
    <Table
      scroll={{ x: 800 }}
      loading={loading}
      bordered
      columns={[
        {
          title: 'ID',
          dataIndex: 'id',
          align: 'center',
          render(value) {
            return <AppLink to={`/ticket/${value}`}>{value}</AppLink>;
          },
        },
        {
          title: 'Description',
          dataIndex: 'description',
          render(value, row) {
            return <AppLink to={`/ticket/${row.id}`}>{value}</AppLink>;
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
              '---'
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
                      danger={!!row.assigneeId}
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
                  style={{ minWidth: 160 }}
                  icon={
                    row.completed ? <CloseOutlined /> : <CheckCircleOutlined />
                  }
                  type="primary"
                  danger={row.completed}
                  onClick={
                    row.completed
                      ? () => handleClickUncomplete?.(row)
                      : () => handleClickComplete?.(row)
                  }
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

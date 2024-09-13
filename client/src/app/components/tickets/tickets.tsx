import { Ticket } from '@acme/shared-models';
import {
  CheckCircleOutlined,
  CloseOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Flex, Popconfirm, Table, Tooltip } from 'antd';
import { FC } from 'react';
import { Status } from '../../const/status';
import Badge from '../badge/badge';
import AppButton from '../button/button';
import AppLink from '../link/link';

export interface Props {
  loading?: boolean;
  tickets: Ticket[];
  handleClickAssign?: (ticket: Ticket) => void;
  handleClickUnassign?: (ticket: Ticket) => void;
  handleClickComplete?: (ticket: Ticket) => void;
  handleClickUncomplete?: (ticket: Ticket) => void;
  handleClickDetail?: (ticket: Ticket) => void;
}

const Tickets: FC<Props> = (props) => {
  const {
    loading,
    tickets,
    handleClickAssign,
    handleClickUnassign,
    handleClickComplete,
    handleClickUncomplete,
    handleClickDetail,
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
            return <AppLink to={`/ticket/${value}`}>#{value}</AppLink>;
          },
        },
        {
          title: 'Description',
          dataIndex: 'description',
          width: '40%',
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
            return <Badge completed={value} />;
          },
        },
        {
          title: 'Actions',
          render(_, row) {
            return (
              <Flex className="gap-2">
                {row.assigneeId ? (
                  <Popconfirm
                    title="Unassign ticket"
                    description="Are you sure to un-assign this ticket?"
                    onConfirm={() => handleClickUnassign?.(row)}
                  >
                    <AppButton
                      type="dashed"
                      icon={<UserDeleteOutlined />}
                      danger={!!row.assigneeId}
                    >
                      Unassign
                    </AppButton>
                  </Popconfirm>
                ) : (
                  <AppButton
                    type="dashed"
                    icon={<UserAddOutlined />}
                    onClick={() => handleClickAssign?.(row)}
                  >
                    Assign
                  </AppButton>
                )}
                <AppButton
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
                  {row.completed ? Status.Incompleted : Status.Completed}
                </AppButton>
                <AppButton type="text" onClick={() => handleClickDetail?.(row)}>
                  Detail
                </AppButton>
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

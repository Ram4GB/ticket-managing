import { Button, Flex, Form, Modal, Select } from 'antd';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../libs/store';
import { fetchUserList } from '../../store/user/actions';

interface Props {
  open: boolean;
  onSubmit?: (data: { user: number }) => void;
  onCancel?: () => void;
}

const UserModal: FC<Props> = ({ open, onSubmit, onCancel }) => {
  const dispatch = useAppDispatch();
  const assignees = useAppSelector((state) => state.user.users);
  const loading = useAppSelector((state) => state.ticket.ticket.loading);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  return (
    <Modal onCancel={onCancel} footer={null} open={open} title="Choose user">
      <Form onFinish={onSubmit}>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please choose user',
            },
          ]}
          name="user"
        >
          <Select
            size="large"
            options={assignees.map((assignee) => ({
              value: assignee.id,
              label: assignee.name,
            }))}
          />
        </Form.Item>
        <Flex justify="flex-end" gap={6}>
          <Button
            disabled={loading}
            size="large"
            onClick={onCancel}
            type="default"
          >
            Cancel
          </Button>
          <Button
            loading={loading}
            size="large"
            htmlType="submit"
            type="primary"
          >
            OK
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default UserModal;

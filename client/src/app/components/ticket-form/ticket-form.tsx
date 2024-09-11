import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Flex, Form, FormProps, Input, Select } from 'antd';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../libs/store';
import { fetchUserList } from '../../store/user/actions';

interface Props {
  onSubmit?: (values: { description: string }) => void;
  type?: 'new';
}

type FieldType = {
  description?: string;
  assignee?: any;
  status?: string;
};

const TicketForm: FC<Props> = ({ type = 'new', onSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loadingUserList = useAppSelector((state) => state.user.loading);
  const loadinngTicketItem = useAppSelector(
    (state) => state.ticket.ticket.loading
  );
  const users = useAppSelector((state) => state.user.users);

  const handleCancel = () => {
    navigate('/');
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    onSubmit?.({ description: values.description ?? '' });
  };

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  return (
    <Form
      layout="vertical"
      initialValues={{ description: '' }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input size="large" />
      </Form.Item>
      {type !== 'new' && (
        <Form.Item label="Assignee" name="assignee">
          <Select
            showSearch
            loading={loadingUserList}
            size="large"
            options={users.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
      )}
      {type !== 'new' && (
        <Form.Item label="Status" name="status">
          <Select
            size="large"
            options={[
              {
                label: 'Completed',
                value: '1',
              },
              {
                label: 'Incomplete',
                value: '0',
              },
            ]}
          />
        </Form.Item>
      )}
      <Flex gap={6} justify="space-between" style={{ marginTop: 32 }}>
        <Button
          icon={<CloseOutlined />}
          size="large"
          htmlType="submit"
          type="dashed"
          onClick={handleCancel}
          disabled={loadinngTicketItem}
        >
          Cancel
        </Button>
        <Button
          icon={<SendOutlined />}
          size="large"
          htmlType="submit"
          type="primary"
          loading={loadinngTicketItem}
        >
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default TicketForm;

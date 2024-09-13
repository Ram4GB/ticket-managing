import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Flex, Form, FormProps, Input, Select } from 'antd';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../libs/store';
import { fetchUserList } from '../../store/user/thunk';

export enum FormType {
  'NEW' = 'NEW',
  'EDIT' = 'EDIT',
  'DETAIL' = 'DETAIL',
}

interface Props {
  onSubmit?: (values: { description: string }) => void;
  type?: FormType;
  initialValues?: { description: string; user: number; completed: boolean };
  hideSubmit?: boolean;
}

type FieldType = {
  description?: string;
  assignee?: any;
  status?: string;
};

const TicketForm: FC<Props> = ({
  type = FormType.NEW,
  initialValues,
  hideSubmit,
  onSubmit,
}) => {
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

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('errorInfo', errorInfo);
  };

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  return (
    <Form
      layout="vertical"
      initialValues={initialValues ? initialValues : { description: '' }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input size="large" readOnly={type === FormType.DETAIL} />
      </Form.Item>
      {type !== FormType.NEW && (
        <Form.Item label="Assignee" name="user">
          <Select
            showSearch
            disabled={type === FormType.DETAIL}
            loading={loadingUserList}
            size="large"
            options={users.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Form.Item>
      )}
      {type !== FormType.NEW && (
        <Form.Item label="Status" name="completed">
          <Select
            disabled={type === FormType.DETAIL}
            size="large"
            options={[
              {
                label: 'Completed',
                value: true,
              },
              {
                label: 'Incomplete',
                value: false,
              },
            ]}
          />
        </Form.Item>
      )}
      <Flex gap={6} justify="space-between" className="mt-7">
        <Button
          icon={<CloseOutlined />}
          size="large"
          type={type === FormType.DETAIL ? 'primary' : 'dashed'}
          onClick={handleCancel}
          disabled={loadinngTicketItem}
          style={{ width: hideSubmit ? '100%' : 'auto' }}
        >
          {type === FormType.DETAIL ? 'Back' : 'Cancel'}
        </Button>
        {!hideSubmit && (
          <Button
            icon={<SendOutlined />}
            size="large"
            htmlType="submit"
            type="primary"
            loading={loadinngTicketItem}
          >
            Submit
          </Button>
        )}
      </Flex>
    </Form>
  );
};

export default TicketForm;

import { Form, FormInstance } from 'antd';
import { FC } from 'react';
import UserDescription from '../user-description/user-description';
import { useAppSelector } from '../../libs/redux/types';

interface Props {
  form?: FormInstance<any>;
}

const UserDescriptionWrapper: FC<Props> = ({ form }) => {
  const userId = Form.useWatch('user', form);
  const users = useAppSelector((state) => state.user.users);

  const user = users.find((it) => it.id === userId);

  return <UserDescription item={user} />;
};

export default UserDescriptionWrapper;

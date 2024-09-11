import { User } from '@acme/shared-models';
import { Descriptions } from 'antd';
import { FC } from 'react';

interface Props {
  item: User | null | undefined;
}

const UserDescription: FC<Props> = ({ item }) => {
  if (!item) return null;

  return (
    <Descriptions bordered layout="horizontal" column={1}>
      <Descriptions.Item label="ID">{item.id}</Descriptions.Item>
      <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
    </Descriptions>
  );
};

export default UserDescription;

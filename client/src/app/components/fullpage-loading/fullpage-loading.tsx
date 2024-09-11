import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../libs/store';
import { FC } from 'react';

const FullPageLoading: FC = () => {
  const loading = useAppSelector((state) => state.global.loading);

  if (!loading) return null;

  return <Spin fullscreen indicator={<LoadingOutlined spin />} size="small" />;
};

export default FullPageLoading;

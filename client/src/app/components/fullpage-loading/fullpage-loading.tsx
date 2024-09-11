import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { FC } from 'react';
import { useAppSelector } from '../../libs/store';

const FullPageLoading: FC = () => {
  const loading = useAppSelector((state) => state.global.loading);

  if (!loading) return null;

  return <Spin fullscreen indicator={<LoadingOutlined spin />} size="small" />;
};

export default FullPageLoading;

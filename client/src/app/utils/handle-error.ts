import { notification } from 'antd';

const handleError = (error: any) => {
  if (error instanceof Error) {
    return notification.error({ message: error.message });
  }

  notification.error({ message: 'Unhandle error' });
};

export default handleError;

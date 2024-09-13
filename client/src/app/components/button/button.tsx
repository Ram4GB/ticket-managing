import { Button } from 'antd';
import { ComponentProps, FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ComponentProps<typeof Button> {}

const AppButton: FC<Props> = (props) => {
  return <Button {...props} className="min-w-32" />;
};

export default AppButton;

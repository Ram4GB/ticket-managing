import { Tag, Tooltip } from 'antd';
import { FC } from 'react';

interface Props {
  status: boolean;
}

const Badge: FC<Props> = ({ status }) => {
  const DEFAULT_COLOR = 'gray';
  let colorTag = DEFAULT_COLOR;

  let text;

  if (!status) {
    colorTag = '#f50';
    text = 'Incomplete';
  } else {
    colorTag = '#87d068';
    text = 'Completed';
  }

  return (
    <Tooltip title={text}>
      <Tag color={colorTag}>{text}</Tag>
    </Tooltip>
  );
};

export default Badge;

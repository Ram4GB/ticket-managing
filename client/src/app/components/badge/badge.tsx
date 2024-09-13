import { Tag, Tooltip } from 'antd';
import { FC } from 'react';

interface Props {
  completed: boolean;
}

const Badge: FC<Props> = ({ completed }) => {
  const DEFAULT_COLOR = 'gray';
  let colorTag = DEFAULT_COLOR;

  let text;

  if (!completed) {
    colorTag = '#f50';
    text = 'Incomplete';
  } else {
    colorTag = '#87d068';
    text = 'Completed';
  }

  return (
    <Tooltip data-testid="tool-tip" title={text}>
      <Tag className="uppercase" color={colorTag}>
        {text}
      </Tag>
    </Tooltip>
  );
};

export default Badge;

import { Tag, Tooltip } from 'antd';
import { FC } from 'react';

interface Props {
  completed?: boolean;
}

const Badge: FC<Props> = ({ completed }) => {
  const DEFAULT_COLOR = 'gray';
  let colorTag = DEFAULT_COLOR;

  let text;

  if (!completed) {
    colorTag = 'rgb(255, 85, 0)';
    text = 'Incomplete';
  } else {
    colorTag = 'rgb(135,208,104)';
    text = 'Completed';
  }

  return (
    <Tooltip data-testid="tooltip" title={text}>
      <Tag data-testid="tag" className="uppercase" color={colorTag}>
        {text}
      </Tag>
    </Tooltip>
  );
};

export default Badge;

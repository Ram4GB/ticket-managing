import { Select } from 'antd';
import { FC, useMemo } from 'react';
import status, { Status } from '../../const/status';

interface Props<T = Status> {
  value: T;
  onChange?: (value: T) => void;
}

const FilterStatus: FC<Props> = ({ value, onChange }) => {
  const options = useMemo(() => status, []);

  return (
    <Select
      value={value}
      size="large"
      className="min-w-48"
      options={options}
      onChange={onChange}
    />
  );
};

export default FilterStatus;

import { render, screen } from '@testing-library/react';
import Badge from './badge';

test('should render badge', () => {
  render(<Badge status />);
  screen.queryByTestId('data-test');
});

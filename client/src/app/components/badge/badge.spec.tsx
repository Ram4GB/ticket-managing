import { render, screen } from '@testing-library/react';
import Badge from './badge';

test('should render badge', () => {
  render(<Badge completed />);
  screen.queryByTestId('data-test');
  console.log('hello world');
});

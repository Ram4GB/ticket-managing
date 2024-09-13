import { render, screen } from '@testing-library/react';
import Badge from './badge';

it('should contain uppercase class', () => {
  render(<Badge />);
  const element = screen.getByTestId('tag');
  expect(element.className).toContain('uppercase');
});

it('should show /Completed/ when setting completed to true', () => {
  render(<Badge completed />);
  const element = screen.getByText(/Completed/);
  expect(element).toBeInTheDocument();
});

it('should set color to green when setting completed to true', () => {
  render(<Badge completed />);
  const element = screen.getByTestId(/tag/);
  expect(element.style.backgroundColor).toBe('rgb(135, 208, 104)');
});

it('should show /Incomplete/ when setting completed to false', () => {
  render(<Badge completed={false} />);
  const element = screen.getByText(/Incomplete/);
  expect(element).toBeInTheDocument();
});

it('should set color to orange when setting completed to false', () => {
  render(<Badge completed={false} />);
  const element = screen.getByTestId(/tag/);
  expect(element.style.backgroundColor).toBe('rgb(255, 85, 0)');
});

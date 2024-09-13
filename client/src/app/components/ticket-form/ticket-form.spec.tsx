import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../libs/store';
import TicketForm from './ticket-form';
import { ComponentProps } from 'react';

const MockRouter = (props: ComponentProps<typeof TicketForm>) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TicketForm {...props} />
      </BrowserRouter>
    </Provider>
  );
};

describe('Ticket form', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  it('should render successfully', () => {
    render(<MockRouter />);
    const frm = screen.getByTestId('form');
    expect(frm).toBeInTheDocument();
  });

  it('should show the submit button', () => {
    render(<MockRouter />);
    const btn = screen.getByTestId('btn-submit');
    expect(btn).toBeInTheDocument();
  });

  it('should hide the submit button when setting `hideSubmit` to `true`', () => {
    render(<MockRouter hideSubmit />);
    const btn = screen.queryByTestId('btn-submit');
    expect(btn).not.toBeInTheDocument();
  });
});

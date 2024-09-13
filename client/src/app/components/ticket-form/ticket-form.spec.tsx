import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../libs/store';
import TicketForm, { FormType } from './ticket-form';

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

  it('should show the `back to home` button when form mode is `FormType.DETAIL`', () => {
    render(<MockRouter type={FormType.DETAIL} />);
    const btnCancel = screen.getByTestId('cancel');
    expect(btnCancel).toBeInTheDocument();
    expect(btnCancel).toHaveTextContent('Back to home');
  });

  it('should hide the submit button when setting `hideSubmit` to `true`', () => {
    render(<MockRouter hideSubmit />);
    const btn = screen.queryByTestId('btn-submit');
    expect(btn).not.toBeInTheDocument();
  });

  it('should render `Assignee` & `Status` select component when setting type to different `NEW`', () => {
    render(<MockRouter type={FormType.EDIT} />);
    const frm = screen.getByTestId('form');
    const usercomboBox = frm.querySelector('#user');
    expect(usercomboBox).toBeInTheDocument();
    const completecomboBox = frm.querySelector('#completed');
    expect(completecomboBox).toBeInTheDocument();
  });

  it('should not render `Assignee` & `Status` select component when setting type to different `NEW`', () => {
    render(<MockRouter type={FormType.NEW} />);
    const frm = screen.getByTestId('form');
    const usercomboBox = frm.querySelector('#user');
    expect(usercomboBox).not.toBeInTheDocument();
    const completecomboBox = frm.querySelector('#completed');
    expect(completecomboBox).not.toBeInTheDocument();
  });
});

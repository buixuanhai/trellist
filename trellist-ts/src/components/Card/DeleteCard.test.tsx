import { render, screen, waitFor } from '@testing-library/react';
import { Card } from '../types';
import DeleteCard from './DeleteCard';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { RepoContext } from '../../hooks/useRepo';

const server = setupServer(
  rest.delete('/api/card/:id', (req, res, ctx) => {
    return res(ctx.status(204));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('DeleteCard', () => {
  const card: Card = {
    id: 'a',
    text: 'Fix a bug',
    stage: 'open',
    note: 'Fix a production bug'
  };
  test('render', () => {
    render(<DeleteCard card={card} handleClose={jest.fn()} />);
  });

  test('should create card', async () => {
    const mockDispatch = jest.fn();
    render(
      <RepoContext.Provider value={{ dispatch: mockDispatch }}>
        <DeleteCard card={card} handleClose={jest.fn()} />
      </RepoContext.Provider>
    );

    userEvent.click(screen.getByText('Delete'));

    expect(
      screen.getByText('Are you sure want to delete?')
    ).toBeInTheDocument();

    userEvent.click(screen.getByText('Yes, delete'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        card: {
          id: 'a',
          stage: 'open',
          note: 'Fix a production bug',
          text: 'Fix a bug'
        },
        type: 'DELETE_CARD'
      });
    });
  });
});

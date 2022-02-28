import { render, screen, waitFor } from '@testing-library/react';
import { CardList } from '../types';
import CreateCard from './CreateCard';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { RepoContext } from '../../hooks/useRepo';

const server = setupServer(
  rest.post('/api/list/:id/card', (req, res, ctx) => {
    return res(
      ctx.json({ id: 'z', text: 'Fix a bug', note: 'Fix a production bug' })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('CreateCard', () => {
  const list: CardList = {
    id: 'a',
    title: 'Open',
    stage: 'open',
    cards: []
  };
  test('render', () => {
    render(<CreateCard list={list} />);
  });

  test('should create card', async () => {
    const mockDispatch = jest.fn();
    render(
      <RepoContext.Provider value={{ dispatch: mockDispatch }}>
        <CreateCard list={list} />
      </RepoContext.Provider>
    );

    userEvent.click(screen.getByText('Add a card'));
    userEvent.type(screen.getByLabelText('Name'), 'Fix a bug');
    userEvent.type(screen.getByLabelText('Note'), 'Fix a production bug');
    userEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        card: { id: 'z', note: 'Fix a production bug', text: 'Fix a bug' },
        listId: 'a',
        type: 'ADD_CARD'
      });
    });
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../types';
import CardNote from './CardNote';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.put('/api/card/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'a',
        text: 'Fix a bug',
        stage: 'open',
        note: 'Fix a deployment issue'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let mockDispatch = jest.fn();

jest.mock('../../hooks/useRepo', () => {
  return { useRepo: () => ({ dispatch: mockDispatch }) };
});

describe('CardNote', () => {
  const card: Card = {
    id: 'a',
    text: 'Fix a bug',
    stage: 'open',
    note: 'Fix a production bug'
  };
  test('render', () => {
    render(<CardNote card={card} />);
    expect(screen.getByText('Fix a production bug')).toBeInTheDocument();
  });

  test('update card note', async () => {
    mockDispatch = jest.fn();

    render(<CardNote card={card} />);
    userEvent.click(screen.getByText('Fix a production bug'));
    userEvent.type(screen.getByLabelText('Notes'), ' and deploy');
    userEvent.click(screen.getByTestId('CheckIcon'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        card: {
          id: 'a',
          note: 'Fix a production bug and deploy',
          stage: 'open',
          text: 'Fix a bug'
        },
        type: 'UPDATE_CARD'
      });
    });
  });
});

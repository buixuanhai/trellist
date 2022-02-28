import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../types';
import CardTitle from './CardTitle';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.put('/api/card/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 'a',
        text: 'Fix a bug (urgent)',
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

describe('CardTitle', () => {
  const card: Card = {
    id: 'a',
    text: 'Fix a bug',
    stage: 'open',
    note: 'Fix a production bug'
  };
  test('render', () => {
    render(<CardTitle card={card} />);
    expect(screen.getByText('Fix a bug')).toBeInTheDocument();
  });

  test('update card title', async () => {
    mockDispatch = jest.fn();

    render(<CardTitle card={card} />);
    userEvent.click(screen.getByText('Fix a bug'));
    userEvent.type(screen.getByDisplayValue('Fix a bug'), ' (urgent)');
    userEvent.click(screen.getByTestId('CheckIcon'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        card: {
          id: 'a',
          note: 'Fix a production bug',
          stage: 'open',
          text: 'Fix a bug (urgent)'
        },
        type: 'UPDATE_CARD'
      });
    });
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../types';
import CardDetailMenu from './CardDetailMenu';

describe('CardDetailMenu', () => {
  const card: Card = {
    id: 'a',
    text: 'Fix a bug',
    stage: 'open',
    note: 'Fix a production bug'
  };
  test('render', () => {
    render(<CardDetailMenu card={card} />);
    userEvent.click(screen.getByTestId('MoreVertIcon'));
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});

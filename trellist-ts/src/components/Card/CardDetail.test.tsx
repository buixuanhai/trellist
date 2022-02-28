import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../types';
import CardDetail from './CardDetail';

describe('CardDetail', () => {
  const card: Card = {
    id: 'a',
    text: 'Fix a bug',
    stage: 'open',
    note: 'Fix a production bug'
  };
  test('render', () => {
    render(<CardDetail card={card} index={0} />);
    userEvent.click(screen.getByText('Fix a bug'));
    expect(screen.getAllByText('Fix a bug')).toHaveLength(3);
    expect(screen.getByText('Fix a production bug')).toBeInTheDocument();
  });
});

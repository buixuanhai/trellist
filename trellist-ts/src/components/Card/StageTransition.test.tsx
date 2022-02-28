import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../types';
import StageTransition from './StageTransition';
import { repo } from '../Repos/RepoDetail.test';
import { RepoContext } from '../../hooks/useRepo';

describe('StageTransition', () => {
  describe('render next stages correctly', () => {
    test('render list of available stages when current stage is open', () => {
      const card: Card = {
        id: 'a',
        text: 'Fix a bug',
        stage: 'open',
        note: 'Fix a production bug'
      };
      render(<StageTransition card={card} index={0} />);
      userEvent.click(screen.getByText('Open'));

      ['Confirmed', 'False positive', 'Fixed'].forEach(text => {
        expect(screen.getByText(text)).toBeInTheDocument();
      });
    });

    test('render list of available stages when current stage is confirmed', () => {
      const card: Card = {
        id: 'a',
        text: 'Fix a bug',
        stage: 'confirmed',
        note: 'Fix a production bug'
      };
      render(<StageTransition card={card} index={0} />);
      userEvent.click(screen.getByText('Confirmed'));

      expect(screen.getByText('Fixed')).toBeInTheDocument();
      expect(screen.queryByText('Open')).not.toBeInTheDocument();
      expect(screen.queryByText('False positive')).not.toBeInTheDocument();
    });

    test('render list of available stages when current stage is falsePositive', () => {
      const card: Card = {
        id: 'a',
        text: 'Fix a bug',
        stage: 'falsePositive',
        note: 'Fix a production bug'
      };
      render(<StageTransition card={card} index={0} />);
      userEvent.click(screen.getByText('False positive'));

      expect(screen.queryByText('Fixed')).not.toBeInTheDocument();
      expect(screen.queryByText('Open')).not.toBeInTheDocument();
      expect(screen.queryByText('Confirmed')).not.toBeInTheDocument();
    });

    test('render list of available stages when current stage is fixed', () => {
      const card: Card = {
        id: 'a',
        text: 'Fix a bug',
        stage: 'fixed',
        note: 'Fix a production bug'
      };
      render(<StageTransition card={card} index={0} />);
      userEvent.click(screen.getByText('Fixed'));

      expect(screen.queryByText('False positive')).not.toBeInTheDocument();
      expect(screen.queryByText('Open')).not.toBeInTheDocument();
      expect(screen.queryByText('Confirmed')).not.toBeInTheDocument();
    });
  });

  describe('handle select next stage correctly when current stage is open', () => {
    test('change stage to confirmed', () => {
      const mockDispatch = jest.fn();

      const card: Card = {
        id: 'a',
        text: 'Fix a bug',
        stage: 'open',
        note: 'Fix a production bug'
      };
      render(
        <RepoContext.Provider value={{ dispatch: mockDispatch, repo }}>
          <StageTransition card={card} index={0} />
        </RepoContext.Provider>
      );

      userEvent.click(screen.getByText('Open'));
      userEvent.click(screen.getByText('Confirmed'));
      expect(mockDispatch).toHaveBeenCalledWith({
        destination: { droppableId: 'b', index: 0 },
        source: { droppableId: 'a', index: 0 },
        type: 'MOVE_CARD_BETWEEN_LIST'
      });
    });
  });
});

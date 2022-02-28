import RepoDetail from './RepoDetail';
import { render, screen } from '@testing-library/react';
import { Repo } from '../types';

export const repo: Repo = {
  name: 'Repo 1',
  id: '1',
  lists: [
    {
      title: 'Open',
      stage: 'open',
      cards: [
        {
          text: 'Vulnerability 1',
          id: 'w',
          stage: 'open'
        },
        {
          text: 'Vulnerability 2',
          id: 'x',
          stage: 'open'
        }
      ],
      id: 'a'
    },
    {
      title: 'Confirmed',
      stage: 'confirmed',
      cards: [
        {
          text: 'Vulnerability 3',
          id: 'y',
          stage: 'confirmed'
        },
        {
          text: 'Vulnerability 4',
          id: 'z',
          stage: 'confirmed'
        }
      ],
      id: 'b'
    },
    {
      title: 'False Positive',
      stage: 'falsePositive',
      cards: [
        {
          text: 'Vulnerability 5',
          id: 'm',
          stage: 'falsePositive'
        },
        {
          text: 'Vulnerability 6',
          id: 'n',
          stage: 'falsePositive'
        }
      ],
      id: 'c'
    },
    {
      title: 'Fixed',
      stage: 'fixed',
      cards: [
        {
          text: 'Vulnerability 7',
          id: 'o',
          stage: 'fixed'
        },
        {
          text: 'Vulnerability 8',
          id: 'p',
          stage: 'fixed'
        }
      ],
      id: 'd'
    }
  ]
};

describe('RepoDetail', () => {
  test('render repo detail', () => {
    render(<RepoDetail repo={repo} navigate={jest.fn()} />);

    expect(screen.getByText('Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
    expect(screen.getByText('False Positive')).toBeInTheDocument();
    expect(screen.getByText('Fixed')).toBeInTheDocument();

    // assert card names
    for (let i = 1; i < 9; i++) {
      expect(screen.getByText(`Vulnerability ${i}`)).toBeInTheDocument();
    }
  });
});

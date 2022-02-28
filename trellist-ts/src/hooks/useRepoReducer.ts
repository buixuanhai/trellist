import produce from 'immer';
import { useReducer } from 'react';
import { Card, Repo } from '../components/types';

const reorder = (list: Card[], startIndex: number, endIndex: number) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

type MoveCardBetweenListAction = {
  type: 'MOVE_CARD_BETWEEN_LIST';
  source: {
    index: number;
    droppableId?: string;
  };
  destination: {
    index: number;
    droppableId?: string;
  };
};

type AddCardAction = {
  type: 'ADD_CARD';
  listId: string;
  card: Card;
};

type DeleteCardAction = {
  type: 'DELETE_CARD';
  card: Card;
};

type UpdateCardAction = {
  type: 'UPDATE_CARD';
  card: Card;
};

type ReorderCardInList = {
  type: 'REORDER_CARD_IN_LIST';
  source: {
    index: number;
    droppableId: string;
  };
  destination: {
    index: number;
    droppableId: string;
  };
};
export type RepoAction =
  | MoveCardBetweenListAction
  | AddCardAction
  | DeleteCardAction
  | UpdateCardAction
  | ReorderCardInList;

export function reducer(state: Repo, action: RepoAction) {
  switch (action.type) {
    case 'MOVE_CARD_BETWEEN_LIST': {
      const {
        source: { index: sourceCardIndex, droppableId: sourceListId },
        destination: {
          index: destinationCardIndex,
          droppableId: destinationListId
        }
      } = action;

      return produce(state, draftState => {
        const sourceListIndex = draftState.lists.findIndex(
          l => l.id === sourceListId
        );
        const destinationListIndex = draftState.lists.findIndex(
          l => l.id === destinationListId
        );

        // take out card
        const card = draftState.lists[sourceListIndex].cards[sourceCardIndex];
        card.stage = draftState.lists[destinationListIndex].stage;

        // delete from old list
        draftState.lists[sourceListIndex].cards.splice(sourceCardIndex, 1);

        // insert into new list
        draftState.lists[destinationListIndex].cards.splice(
          destinationCardIndex,
          0,
          card
        );
        return draftState;
      });
    }
    case 'ADD_CARD': {
      const { listId, card } = action;
      return produce(state, draftState => {
        const listIndex = draftState.lists.findIndex(l => l.id === listId);
        draftState.lists[listIndex].cards.push({
          ...card,
          stage: draftState.lists[listIndex].stage
        });
        return draftState;
      });
    }
    case 'DELETE_CARD': {
      const { card } = action;
      return produce(state, draftState => {
        const listIdnex = draftState.lists.findIndex(
          l => l.stage === card.stage
        );
        const cardIndex = draftState.lists[listIdnex].cards.findIndex(
          c => c.id === card.id
        );
        draftState.lists[listIdnex].cards.splice(cardIndex, 1);
        return draftState;
      });
    }
    case 'UPDATE_CARD': {
      const { card } = action;
      return produce(state, draftState => {
        const listIndex = draftState.lists.findIndex(
          l => l.stage === card.stage
        );
        const cardIndex = draftState.lists[listIndex].cards.findIndex(
          c => c.id === card.id
        );
        draftState.lists[listIndex].cards[cardIndex] = { ...card };
        return draftState;
      });
    }
    case 'REORDER_CARD_IN_LIST': {
      const {
        source: { index: sourceIndex, droppableId: listId },
        destination: { index: destinationIndex }
      } = action;
      return produce(state, draftState => {
        const listIndex = draftState.lists.findIndex(l => l.id === listId);
        draftState.lists[listIndex].cards = reorder(
          draftState.lists[listIndex].cards,
          sourceIndex,
          destinationIndex
        );
      });
    }
    default:
      return state;
  }
}

export default function useRepoReducer(repo: Repo) {
  return useReducer(reducer, repo);
}

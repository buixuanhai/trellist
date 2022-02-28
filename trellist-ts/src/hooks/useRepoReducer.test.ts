import { Droppable } from "react-beautiful-dnd";
import useRepoReducer, { reducer, RepoAction } from "./useRepoReducer";


const repo = {
  "name": "Repo 1",
  "id": "1",
  "lists": [
    {
      "title": "Open",
      "stage": "open",
      "cards": [
        {
          "text": "Vulnerability 1",
          "id": "w",
          "stage": "open"
        },
        {
          "text": "Vulnerability 2",
          "id": "x",
          "stage": "open"
        }
      ],
      "id": "a"
    },
    {
      "title": "Confirmed",
      "stage": "confirmed",
      "cards": [
        {
          "text": "Vulnerability 3",
          "id": "y",
          "stage": "confirmed"
        },
        {
          "text": "Vulnerability 4",
          "id": "z",
          "stage": "confirmed"
        }
      ],
      "id": "b"
    },
    {
      "title": "False Positive",
      "stage": "falsePositive",
      "cards": [
        {
          "text": "Vulnerability 5",
          "id": "m",
          "stage": "falsePositive"
        },
        {
          "text": "Vulnerability 6",
          "id": "n",
          "stage": "falsePositive"
        }
      ],
      "id": "c"
    },
    {
      "title": "Fixed",
      "stage": "fixed",
      "cards": [
        {
          "text": "Vulnerability 7",
          "id": "o",
          "stage": "fixed"
        },
        {
          "text": "Vulnerability 8",
          "id": "p",
          "stage": "fixed"
        }
      ],
      "id": "d"
    }
  ]
}

describe('useRepoReducer', () => {
  test('test move card between lists', () => {
    const action: RepoAction = {
      type: 'MOVE_CARD_BETWEEN_LIST',
      source: {
        index: 0,
        droppableId: 'a'
      },
      destination: {
        index: 0,
        droppableId: 'd'
      }
    }

    const state = reducer(repo, action);
    expect(state).toMatchSnapshot()
  });

  test('move card in list', () => {
    const action: RepoAction = {
      type: 'REORDER_CARD_IN_LIST',
      source: {
        index: 0,
        droppableId: 'a'
      },
      destination: {
        index: 1,
        droppableId: 'a'
      }
    }

    const state = reducer(repo, action);
    expect(state.lists[0]).toMatchSnapshot()
  });
  test('add card', () => {
    const action: RepoAction = {
      type: 'ADD_CARD',
      listId: 'b',
      card: {
        id: 't',
        text: 'new card',
        stage: 'confirmed'
      }
    }
    const state = reducer(repo, action);
    expect(state.lists[1]).toMatchSnapshot()
  });

  test('delete card', () => {
    const action: RepoAction = {
      type: "DELETE_CARD",
      card: {
        "text": "Vulnerability 4",
        "id": "z",
        "stage": "confirmed"
      }
    }
    const state = reducer(repo, action);
    expect(state.lists[1]).toMatchSnapshot()
  });

  describe('update card', () => {
    test('update card title', () => {
      const action: RepoAction = {
        type: "UPDATE_CARD",
        card: {
          "text": "Vulnerability 4 (UPDATED)",
          "id": "z",
          "stage": "confirmed"
        }
      }
      const state = reducer(repo, action);
      expect(state.lists[1]).toMatchSnapshot()
    });

    test('update card note ', () => {
      const action: RepoAction = {
        type: "UPDATE_CARD",
        card: {
          "text": "Vulnerability 4",
          "id": "z",
          "stage": "confirmed",
          "note": 'Add new note'
        }
      }
      const state = reducer(repo, action);
      expect(state.lists[1]).toMatchSnapshot()
    });
  });
});
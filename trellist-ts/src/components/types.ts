export type Card = {
  id: string,
  text: string,
  stage: string,
  note?: string
}

export type CardList = {
  id: string,
  title: string,
  stage: string,
  cards: Card[]
}

export type Repo = {
  name: string,
  id: string,
  lists: CardList[]
}
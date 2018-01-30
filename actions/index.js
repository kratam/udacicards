import * as API from '../utils/api'

export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

const _loadDecks = decks => ({ type: LOAD_DECKS, decks })

export const loadDecks = () => async dispatch => {
  const decks = await API.getDecks()
  dispatch(_loadDecks(decks))
}

const _addDeck = deck => ({ type: ADD_DECK, deck })

export const addDeck = title => async dispatch => {
  const deck = await API.saveDeckTitle(title)
  dispatch(_addDeck(deck))
}

const _addCard = deck => ({ type: ADD_CARD, deck })

export const addCard = (deckId, card) => async dispatch => {
  const deck = await API.addCardToDeck(deckId, card)
  dispatch(_addCard(deck))
}

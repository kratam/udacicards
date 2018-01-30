import { LOAD_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks(state = [], action) {
  switch (action.type) {
    case LOAD_DECKS:
      return [...state, ...action.decks]
    case ADD_DECK:
      if (action.deck) return [...state, action.deck]
      return state
    case ADD_CARD: {
      const newState = state.filter(deck => deck.id !== action.deck.id)
      newState.push(action.deck)
      return newState
    }
    default:
      return state
  }
}

export default decks

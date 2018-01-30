import { AsyncStorage } from 'react-native'
import { ID } from './index'

const STORAGE_KEY = 'flashcards'

const fakeDecks = [
  {
    id: ID(),
    title: 'yarn',
    questions: [
      {
        id: ID(),
        question: 'How to add dev dependency?',
        answer: 'yarn add -D',
      },
    ],
  },
  {
    id: ID(),
    title: 'npm',
    questions: [
      {
        id: ID(),
        question: 'How to add dev dependency?',
        answer: 'npm i -D',
      },
    ],
  },
]

export async function getDecks() {
  const storedDecks = await AsyncStorage.getItem(STORAGE_KEY)
  if (!storedDecks) return fakeDecks
  try {
    return JSON.parse(storedDecks)
  } catch (e) {
    return fakeDecks
  }
}

export async function getDeckById(id) {
  const decks = (await getDecks()) || []
  return decks.find(deck => deck.id === id)
}

export async function getDeckByTitle(title) {
  const decks = await getDecks()
  return decks.find(deck => deck.title === title)
}

export async function saveDeckTitle(title) {
  const deck = await getDeckByTitle(title)
  if (deck) return null
  const newDeck = {
    id: ID(),
    title,
    questions: [],
  }
  const decks = await getDecks()
  decks.push(newDeck)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
  return newDeck
}

export async function clearDecks() {
  return await AsyncStorage.removeItem(STORAGE_KEY)
}

export async function addCardToDeck(deckId, { question, answer }) {
  const deck = await getDeckById(deckId)
  deck.questions.push({
    id: ID(),
    question,
    answer,
  })
  let decks = await getDecks()
  decks = decks.filter(deck => deck.id !== deckId)
  decks.push(deck)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
  return deck
}

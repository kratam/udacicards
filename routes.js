import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Entypo } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { white, black, purple } from './utils/colors'

import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decklist',
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="list" size={30} color={tintColor} />
        ),
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add deck',
        tabBarIcon: ({ tintColor }) => (
          <Entypo name="add-to-list" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
)

export const MainPage = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
      headerBackTitle: null,
    },
  },
  AddCard: {
    screen: AddCard,
    title: 'Add card',
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
      headerBackTitle: null,
    },
  },
  Quiz: {
    screen: Quiz,
    title: 'Fun time!',
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
      headerBackTitle: null,
    },
  },
})

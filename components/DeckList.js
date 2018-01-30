import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, H1, Container, Content } from 'native-base'

import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { loadDecks } from '../actions'
import DeckListItem from './DeckListItem'
import { setLocalNotification } from '../utils/notification'

// import { clearDecks } from '../utils/api'

class DeckList extends Component {
  async componentDidMount() {
    // await clearDecks()
    const { dispatch, decks } = this.props
    if (!decks.length) await dispatch(loadDecks())
    setLocalNotification()
  }

  onDeckPress = deck => {
    this.props.navigation.navigate('Deck', { deck })
  }

  render() {
    const { decks } = this.props
    if (!decks.length) return <AppLoading />
    return (
      <Container>
        <Content padder>
          <H1>Available decks</H1>
          <List>
            {decks.map(deck => (
              <DeckListItem
                key={deck.id}
                {...deck}
                onPressHandler={() => this.onDeckPress(deck)}
              />
            ))}
          </List>
        </Content>
      </Container>
    )
  }
}

DeckList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  decks: PropTypes.arrayOf(PropTypes.object),
}

const mapStateToProps = decks => {
  return { decks }
}

export default connect(mapStateToProps)(DeckList)

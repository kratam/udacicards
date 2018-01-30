import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Content, Text, H1, Button, Icon, View } from 'native-base'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return { title: deck.title }
  }

  addCardPressed = () => {
    const { navigation, deck } = this.props
    navigation.navigate('AddCard', { deck })
  }

  startQuizPressed = () => {
    const { navigation, deck } = this.props
    navigation.navigate('Quiz', { deck })
  }

  render() {
    const { deck, numberOfCards } = this.props
    return (
      <Container>
        <Content padder>
          <View style={{ alignItems: 'center' }}>
            <H1>{deck.title}</H1>
            <Text>
              {numberOfCards} card{numberOfCards > 1 ? 's' : ''}
            </Text>
            <Button
              iconLeft
              style={{ alignSelf: 'center', marginTop: 36 }}
              onPress={this.addCardPressed}
            >
              <Icon name="add-circle" />
              <Text>Add card</Text>
            </Button>
            <Button
              iconLeft
              success
              style={{ alignSelf: 'center', marginTop: 36 }}
              onPress={this.startQuizPressed}
              disabled={numberOfCards === 0}
            >
              <Icon name="play" />
              <Text>Start quiz</Text>
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

Deck.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  numberOfCards: PropTypes.number.isRequired,
}

const mapStateToProps = (state, { navigation }) => {
  const { id } = navigation.state.params.deck
  const deck = state.find(deck => deck.id === id)
  const numberOfCards = deck.questions.length
  return { deck, numberOfCards }
}

export default connect(mapStateToProps)(Deck)

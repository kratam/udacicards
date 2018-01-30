import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  H1,
} from 'native-base'
import { NavigationActions } from 'react-navigation'
import { addCard } from '../actions'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  handleSubmit = async () => {
    const { dispatch, navigation, deck } = this.props
    const { question, answer } = this.state
    await dispatch(addCard(deck.id, { question, answer }))
    navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { deck } = this.props
    return (
      <Container>
        <Content padder>
          <H1 style={{ alignSelf: 'center', marginTop: 16 }}>
            Add a card to deck {deck.title}
          </H1>
          <Form>
            <Item>
              <Input
                placeholder="Question"
                onChangeText={question => {
                  this.setState({ question })
                }}
                value={this.state.question}
              />
            </Item>
            <Item>
              <Input
                placeholder="Answer"
                onChangeText={answer => {
                  this.setState({ answer })
                }}
                value={this.state.answer}
              />
            </Item>
            <Button
              onPress={this.handleSubmit}
              primary
              style={{ marginTop: 16, alignSelf: 'center' }}
            >
              <Text> Add deck </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

AddCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
}

const mapStateToProps = (state, { navigation }) => {
  const { deck } = navigation.state.params
  return { deck }
}

export default connect(mapStateToProps)(AddCard)

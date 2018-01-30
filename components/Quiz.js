import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import FlipCard from 'react-native-flip-card'
import { Container, Content, Button, View, Text, H1 } from 'native-base'
import { white } from '../utils/colors'

class Quiz extends Component {
  state = {
    currentQ: 0,
    correct: 0,
    finished: false,
  }

  startOver = () => {
    this.setState({
      finished: false,
      correct: 0,
      currentQ: 0,
    })
  }

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  handleAnswer = isCorrect => {
    const { questions } = this.props.deck
    if (this.state.currentQ + 1 === questions.length) {
      this.setState(({ correct }) => ({
        correct: isCorrect ? correct + 1 : correct,
        finished: true,
      }))
    } else {
      this.setState(({ currentQ, correct }) => ({
        correct: isCorrect ? correct + 1 : correct,
        currentQ: currentQ + 1,
      }))
    }
  }

  render() {
    const { currentQ, finished, correct } = this.state
    const { questions } = this.props.deck
    const question = questions[currentQ]
    return (
      <Container>
        <Content padder>
          {finished ? (
            <View style={{ alignItems: 'center' }}>
              <H1>Congratulations!</H1>
              <Text>
                Your score is {correct}/{questions.length} ({Math.round(
                  correct / questions.length * 100
                )}%)
              </Text>
              <Button
                onPress={this.startOver}
                style={{ alignSelf: 'center', marginTop: 16 }}
              >
                <Text>Start over</Text>
              </Button>
              <Button
                onPress={this.goBack}
                style={{ alignSelf: 'center', marginTop: 16 }}
              >
                <Text>Go back</Text>
              </Button>
            </View>
          ) : (
            <View>
              <FlipCard
                flipHorizontal
                flipVertical={false}
                style={{ backgroundColor: white }}
              >
                <View padder>
                  <H1>Question</H1>
                  <Text>{question.question}</Text>
                </View>
                <View padder>
                  <H1>Answer</H1>
                  <Text>{question.answer}</Text>
                </View>
              </FlipCard>
              <Button
                onPress={() => this.handleAnswer(true)}
                success
                style={{ alignSelf: 'center', marginTop: 16 }}
              >
                <Text>Correct</Text>
              </Button>
              <Button
                onPress={() => this.handleAnswer(false)}
                danger
                style={{ alignSelf: 'center', marginTop: 16 }}
              >
                <Text>Incorrect</Text>
              </Button>
            </View>
          )}
        </Content>
      </Container>
    )
  }
}

Quiz.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
}

const mapStateToProps = (state, { navigation }) => {
  const { id } = navigation.state.params.deck
  const deck = state.find(deck => deck.id === id)
  return { deck }
}

export default connect(mapStateToProps)(Quiz)

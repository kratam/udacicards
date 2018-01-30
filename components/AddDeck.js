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
import { addDeck } from '../actions'

class AddDeck extends Component {
  state = {
    title: '',
  }

  handleSubmit = () => {
    const { dispatch, navigation } = this.props
    const { title } = this.state
    dispatch(addDeck(title))
    navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
  }

  render() {
    return (
      <Container>
        <Content padder>
          <H1 style={{ alignSelf: 'center', marginTop: 16 }}>Add a deck</H1>
          <Form>
            <Item>
              <Input
                placeholder="Title"
                onChangeText={title => {
                  this.setState({ title })
                }}
                value={this.state.title}
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

AddDeck.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default connect()(AddDeck)

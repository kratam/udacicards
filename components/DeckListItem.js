import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListItem, Text, Right, Icon } from 'native-base'

class DeckListItem extends Component {
  render() {
    const { title, questions, onPressHandler } = this.props
    return (
      <ListItem button onPress={onPressHandler}>
        <Text style={{ flex: 1 }}>
          {title} ({questions.length} cards)
        </Text>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    )
  }
}

DeckListItem.propTypes = {
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  onPressHandler: PropTypes.func.isRequired,
}

export default DeckListItem

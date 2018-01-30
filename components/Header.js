import React from 'react'
import PropTypes from 'prop-types'
import { Constants } from 'expo'
import { View, StatusBar } from 'react-native'

const Header = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

Header.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
}

export default Header

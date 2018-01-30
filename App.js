import React from 'react'
import { Font, AppLoading } from 'expo'
import { Provider } from 'react-redux'
import { Container } from 'native-base'
import store from './store'
import { MainPage } from './routes'
import Header from './components/Header'
import { black } from './utils/colors'

export default class App extends React.Component {
  state = {
    isReady: false,
  }

  componentWillMount() {
    this.loadFonts()
  }

  async loadFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf'),
    })
    this.setState({ isReady: true })
  }

  render() {
    const { isReady } = this.state
    if (!isReady) return <AppLoading />
    return (
      <Provider store={store}>
        <Container>
          <Header backgroundColor={black} barStyle="light-content" />
          <MainPage />
        </Container>
      </Provider>
    )
  }
}

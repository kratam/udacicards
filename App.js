import React from 'react'
import { Provider } from 'react-redux'
import { Container } from 'native-base'
import store from './store'
import { MainPage } from './routes'
import Header from './components/Header'
import { black } from './utils/colors'

export default class App extends React.Component {
  render() {
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

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import reducer from '../reducers/'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enchancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(reducer, enchancer)

export default store

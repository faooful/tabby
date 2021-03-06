import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as reducers from 'src/reducers'

const store = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(
  combineReducers({
    ...reducers
  })
)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('src/reducers', () => {
    const newReducers = require('src/reducers')

    store.replaceReducer(combineReducers({
      ...newReducers
    }))
  })
}

export default store

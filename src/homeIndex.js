import 'babel-polyfill'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'src/store'
import HomePage from 'src/home/components/HomePage'

import 'src/base.css'

const rootElement = document.getElementById('root')
function renderApp() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <HomePage />
      </Provider>
    </AppContainer>,
    rootElement
  )
}

if (module.hot) {
  module.hot.accept('src/home/components/HomePage', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use `routes` here rather than require() a `newRoutes`.
    const newRoutes = require('src/home/components/HomePage').default
    renderApp(newRoutes)
  })
}

setTimeout(() => renderApp(), 0)

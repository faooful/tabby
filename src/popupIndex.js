import 'babel-polyfill'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from 'src/store'
import Popup from 'src/popup/components/Popup'

import 'src/base.css'

const rootElement = document.getElementById('root')
function renderApp() {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Popup />
      </Provider>
    </AppContainer>,
    rootElement
  )
}

if (module.hot) {
  module.hot.accept('src/popup/components/Popup', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use `routes` here rather than require() a `newRoutes`.
    const newRoutes = require('src/popup/components/Popup').default
    renderApp(newRoutes)
  })
}

setTimeout(() => renderApp(), 0)

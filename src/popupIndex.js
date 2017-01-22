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

setTimeout(() => renderApp(), 0)

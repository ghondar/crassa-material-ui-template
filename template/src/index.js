import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { loadableReady } from '@loadable/component'
// import registerServiceWorker from './registerServiceWorker'
import App from './App'

if(module.hot) module.hot.accept()

const render = (Component, type) => {
  ReactDOM[type](
    <AppContainer key={Math.random()}>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

if(process.env.NODE_ENV === 'production')
  loadableReady(() => {
    render(App, 'hydrate')
  })
else render(App, 'render')

// Webpack Hot Module Replacement API
if(module.hot)
  module.hot.accept('./App', () => {
    render(require('./App').default)
  })

// registerServiceWorker()

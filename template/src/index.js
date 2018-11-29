import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { loadComponents } from 'loadable-components'
// import registerServiceWorker from './registerServiceWorker'
import App from './App'
import AppClient from './AppClient'

if(module.hot) module.hot.accept()

const render = Component => {
  const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate

  renderMethod(
    <AppContainer key={Math.random()}>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

if(process.env.NODE_ENV === 'production')
  loadComponents()
    .then(() => {
      render(AppClient)
    })
    .catch(() => {
      render(App)
    })
else render(App)

// Webpack Hot Module Replacement API
if(module.hot)
  module.hot.accept('./App', () => {
    render(require('./App').default)
  })

// registerServiceWorker()
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import createReduxWaitForMiddleware from 'redux-wait-for-action'
import createSagaMiddleware from 'redux-saga'

import reducers from 'reducers'
import rootSaga from 'sagas'

const preloadedState = window.__PRELOADED_STATE__

delete window.__PRELOADED_STATE__

export const history = createHistory()

const initialState = {}
const sagaMiddleware = createSagaMiddleware()
const middleware = [ sagaMiddleware, routerMiddleware(history) ]

const finalCreateStore = compose(
  applyMiddleware(...middleware),
  applyMiddleware(createReduxWaitForMiddleware())
)

const store = createStore(reducers, preloadedState || initialState, finalCreateStore)

sagaMiddleware.run(rootSaga)

export default store

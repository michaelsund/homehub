import { createStore, applyMiddleware } from 'redux'
import devtools from 'remote-redux-devtools'
import socketMiddleware from '../middlewares/websockets'
import testMiddleware from '../middlewares/test'
import reducers from '../reducers'

const middleware = applyMiddleware(testMiddleware, socketMiddleware)

const configurestore = () => (
  createStore(
    reducers,
    devtools(),
    middleware,
  )
);

export default configurestore

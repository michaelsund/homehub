import { createStore, applyMiddleware } from 'redux'
import devtoolsEnhancer from 'remote-redux-devtools'
import socketMiddleware from '../middlewares/websockets'
import reducers from '../reducers'

const middleware = applyMiddleware(socketMiddleware)

console.log('loading store...')

const configureStore = createStore(
  reducers,
  devtoolsEnhancer({ realtime: true }),
  middleware
)

export default configureStore

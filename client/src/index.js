import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { ApolloLink, split } from 'apollo-client-preset'
import { split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { Provider } from 'react-redux'
import Menu from './components/Menu'
import App from './containers/App'
import Controls from './containers/Controls'
import Settings from './containers/Settings'
// import registerServiceWorker from './registerServiceWorker'
import './css/common.css'
import settings from './settings.json'
import configureStore from './store/configurestore'

const wsLink = new WebSocketLink({
  uri: settings.dev ? 'ws://localhost:5000/subscriptions' : `ws://${settings.prodIp}:5000/subscriptions`,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: localStorage.getItem(AUTH_TOKEN),
    // }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  new HttpLink()
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <Provider store={configureStore}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <input type="checkbox" id="slide" name="" value="" />
          <div className="container-sidebar">
            <label htmlFor="slide" className="toggle">☰</label>
            <nav className="sidebar">
              <Menu />
            </nav>
          </div>
          <div className="content-area">
            <Switch>
              <Route exact path='/' component={App} />
              <Route path='/Controls' component={Controls} />
              <Route path='/Settings' component={Settings} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)
// registerServiceWorker()

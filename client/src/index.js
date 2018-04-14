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
import { Provider } from 'react-redux'
import Menu from './components/Menu'
import App from './containers/App'
import Controls from './containers/Controls'
import Settings from './containers/Settings'
import registerServiceWorker from './registerServiceWorker'
import './css/common.css'
import configureStore from './store/configurestore'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/graphql' }),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <Provider store={configureStore}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <div className="sidebar-container">
            <Menu />
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
registerServiceWorker()

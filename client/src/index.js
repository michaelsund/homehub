import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import App from './containers/App'
import Controls from './containers/Controls'
import Settings from './containers/Settings'
import Sidebar from './components/Sidebar'
// import registerServiceWorker from './registerServiceWorker'
import './css/common.css'
import configureStore from './store/configurestore'
import { localClient } from './graphql/gqlClients'

ReactDOM.render(
  <Provider store={configureStore}>
    <ApolloProvider client={localClient}>
      <BrowserRouter>
        <div>
          <Sidebar />
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

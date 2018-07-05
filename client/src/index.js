import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import App from './containers/App'
import Controls from './containers/Controls'
import Settings from './containers/Settings'
import Sidebar from './components/Sidebar'
// import registerServiceWorker from './registerServiceWorker'
import './css/common.css'
import { localClient } from './graphql/gqlClients'

ReactDOM.render(
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
  </ApolloProvider>,
  document.getElementById('root')
)
// registerServiceWorker()

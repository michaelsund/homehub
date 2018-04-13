import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import Menu from './components/Menu'
import App from './containers/App'
import Controls from './containers/Controls'
import Settings from './containers/Settings'
import registerServiceWorker from './registerServiceWorker'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import './css/common.css'
import configureStore from './store/configurestore'

ReactDOM.render(
  <Provider store={configureStore}>
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
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

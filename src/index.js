import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import Menu from './components/Menu'
import App from './containers/App'
import About from './containers/About'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

ReactDOM.render(
  <BrowserRouter>
    <div>
      <div className="sidebar-container">
        <Menu />
      </div>
      <div className="content-area">
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/about' component={About}/>
        </Switch>
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()

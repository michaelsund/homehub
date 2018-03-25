// @flow

import React from 'react'
import { WidthProvider, Responsive } from 'react-grid-layout'
import RecurringEvent from '../RecurringEvent'
import Sensor from '../Sensor'
import './CardGrid.css'
import '../../css/common.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const originalLayouts = localStorage.getItem('layouts') || '{}'

type State = {
  layouts: any
}

class CardGrid extends React.Component<{}, State> {
  state = {
    layouts: {}
  }

  componentDidMount = () => {
    this.setState({ layouts: JSON.parse(originalLayouts) })
  }

  static defaultProps() {
    return {
      className: 'layout',
      cols: {
        lg: 10, md: 10, sm: 6, xs: 4, xxs: 2
      },
      rowHeight: 30
    };
  }

  onLayoutChange = (layouts: {}) => {
    localStorage.setItem('layouts', JSON.stringify(layouts))
    this.setState({ layouts })
  }

  render() {
    return (
      <div>
        <button onClick={() => localStorage.clear()}>Clear</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{
            lg: 10, md: 10, sm: 6, xs: 4, xxs: 2
          }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layouts)
          }
        >
          <div className="box" key="1" data-grid={{
            w: 2, h: 5, x: 0, y: 0, minW: 2, maxW: 2, minH: 5, maxH: 5
          }}>
            <RecurringEvent
              title="Pannan"
              note="Tömma aska"
              eventInterval="thu"
            />
          </div>
          <div className="box" key="2" data-grid={{
            w: 3, h: 8, x: 2, y: 0, minW: 3, maxW: 3, minH: 8, maxH: 8
          }}>
            <Sensor sensorId="5aaace08609e33b9d524d681" />
          </div>
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

export default CardGrid

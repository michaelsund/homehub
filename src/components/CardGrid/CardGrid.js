// @flow

import React from 'react'
import { WidthProvider, Responsive } from 'react-grid-layout'
import Countdown from '../Countdown'
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
            <Countdown
              title="Pannan"
              description="bladiblabla bladiblabla bladiblabla"
              dueDate={new Date('Sat Mar 03 2018 15:29:37 GMT+0100 (W. Europe Standard Time)')}
            />
          </div>
          <div className="box" key="2" data-grid={{
            w: 3, h: 6, x: 2, y: 0, minW: 3, minH: 6
          }}>
            <Sensor
              sensorId="5aaace08609e33b9d524d681"
            />
          </div>
          {/* <div className="box" key="3" data-grid={{
            w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">3</span>
          </div>
          <div className="box" key="4" data-grid={{
            w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">4</span>
          </div>
          <div className="box" key="6" data-grid={{
            w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">6</span>
          </div>
          <div className="box" key="5" data-grid={{
            w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">5</span>
          </div>
          <div className="box" key="7" data-grid={{
            w: 2, h: 3, x: 12, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">7</span>
          </div> */}
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

export default CardGrid

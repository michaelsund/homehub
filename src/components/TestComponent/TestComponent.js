// @flow

import React from 'react'
import { WidthProvider, Responsive } from 'react-grid-layout'
import './TestComponent.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

type State = {
  layouts: Object
}

class TestComponent extends React.Component<{}, State> {
  state = {
    className: 'layout',
    cols: {
      lg: 12, md: 10, sm: 6, xs: 4, xxs: 2
    },
    rowHeight: 30
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{
            lg: 12, md: 10, sm: 6, xs: 4, xxs: 2
          }}
          rowHeight={30}
          layouts={this.state.layouts}
        >
          <div className="box" key="1" data-grid={{
            w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">1</span>
          </div>
          <div className="box" key="2" data-grid={{
            w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">2</span>
          </div>
          <div className="box" key="3" data-grid={{
            w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">3</span>
          </div>
          <div className="box" key="4" data-grid={{
            w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">4</span>
          </div>
          <div className="box" key="5" data-grid={{
            w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">5</span>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

export default TestComponent

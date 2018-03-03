// @flow

import React from 'react'
import { WidthProvider, Responsive } from 'react-grid-layout'
import Countdown from '../Countdown'
import './TestComponent.css'
import '../../css/common.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

class TestComponent extends React.Component<{}> {
  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{
            lg: 12, md: 10, sm: 6, xs: 4, xxs: 2
          }}
          rowHeight={30}
        >
          <div className="box" key="1" data-grid={{
            w: 2, h: 5, x: 0, y: 0, minW: 2, maxW: 2, minH: 5, maxH: 5
          }}>
            <Countdown
              title="Pannan"
              description="bladiblabla bladiblabla bladiblabla"
              dueDate={new Date()}
            />
          </div>
          <div className="box" key="2" data-grid={{
            w: 2, h: 5, x: 2, y: 0, minW: 2, minH: 5
          }}>
            <Countdown
              title="Pannan 2"
              description="bladiblabla"
              dueDate={new Date()}
            />
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
          <div className="box" key="6" data-grid={{
            w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">6</span>
          </div>
          <div className="box" key="7" data-grid={{
            w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">7</span>
          </div>
          <div className="box" key="8" data-grid={{
            w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3
          }}>
            <span className="text">8</span>
          </div>
        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

export default TestComponent
